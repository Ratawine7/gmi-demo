import { NextRequest, NextResponse } from 'next/server';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import databaseConnect from '@/config/database';

export type NextRouteHandler = (req: ExpressRequest, res: ExpressResponse) => Promise<unknown> | unknown;

function parseBody(request: NextRequest) {
  const method = request.method.toUpperCase();
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return {};
  }

  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return request.json().catch(() => ({}));
  }

  return request.formData().then((formData) => Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, typeof value === 'string' ? value : String(value)]))).catch(() => ({}));
}

export function makeNextRouteHandler(handler: NextRouteHandler) {
  return async function routeHandler(
    request: NextRequest,
    context?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ): Promise<Response> {
    const resolvedParams = context?.params ? (context.params instanceof Promise ? await context.params : context.params) : {};
    const body = await parseBody(request);
    const query: Record<string, string | undefined> = {};
    request.nextUrl.searchParams.forEach((value, key) => {
      query[key] = value;
    });

    await databaseConnect();

    const cookieEntries = Object.fromEntries(request.cookies.getAll().map((cookie) => [cookie.name, cookie.value]));
    const outgoingCookies = new Map<string, { value: string; options: Record<string, unknown> }>();
    let statusCode = 200;

    const req = {
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body,
      query,
      params: resolvedParams,
      cookies: cookieEntries,
      get: (headerName: string) => request.headers.get(headerName) ?? undefined,
    };

    const res = {
      status(code: number) {
        statusCode = code;
        return res;
      },
      json(payload: unknown) {
        const response = NextResponse.json(payload, { status: statusCode });
        for (const [name, cookie] of outgoingCookies.entries()) {
          response.cookies.set(name, cookie.value, cookie.options as never);
        }
        return response;
      },
      cookie(name: string, value: string, options: Record<string, unknown> = {}) {
        outgoingCookies.set(name, {
          value,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            ...options,
          },
        });
        return res;
      },
      clearCookie(name: string, options: Record<string, unknown> = {}) {
        outgoingCookies.set(name, {
          value: '',
          options: {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 0,
            expires: new Date(0),
            ...options,
          },
        });
        return res;
      },
    };

    const result = await handler(req as unknown as ExpressRequest, res as unknown as ExpressResponse);
    if (result instanceof Response) {
      return result;
    }

    if (result instanceof NextResponse) {
      return result;
    }

    if (result === undefined) {
      return NextResponse.json({ success: true, data: undefined }, { status: statusCode });
    }

    return NextResponse.json(result, { status: statusCode });
  };
}
