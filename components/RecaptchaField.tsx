'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (element: HTMLElement, params: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type RecaptchaFieldProps = {
  siteKey: string;
  value: string;
  onChange: (token: string) => void;
};

export default function RecaptchaField({ siteKey, value, onChange }: RecaptchaFieldProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey) {
      setIsLoaded(false);
      return;
    }

    const scriptId = 'g-recaptcha-script';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    const renderWidget = () => {
      if (!containerRef.current || !window.grecaptcha) {
        return;
      }

      window.grecaptcha.ready(() => {
        if (widgetIdRef.current === null) {
          widgetIdRef.current = window.grecaptcha!.render(containerRef.current!, {
            sitekey: siteKey,
            callback: (token: string) => onChange(token),
            'expired-callback': () => onChange(''),
          });
        }
      });

      setIsLoaded(true);
    };

    if (window.grecaptcha) {
      renderWidget();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener('load', renderWidget, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    document.body.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [onChange, siteKey]);

  useEffect(() => {
    if (!value && widgetIdRef.current && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  }, [value]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="space-y-2 text-left">
      <div ref={containerRef} className="flex justify-start" />
      {!isLoaded && <p className="text-xs text-slate-500">Loading security check…</p>}
    </div>
  );
}
