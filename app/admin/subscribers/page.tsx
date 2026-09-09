'use client';

import { useEffect, useState } from 'react';
import { Save, Trash2 } from 'lucide-react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminShell from '@/components/admin/AdminShell';
import { adminRequest } from '@/lib/adminApi';

type Subscriber = {
  _id: string;
  email: string;
  name?: string;
  source?: string;
  status: 'active' | 'unsubscribed';
  createdAt?: string;
};

type ListResponse = { items: Subscriber[]; total: number };

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const refreshSubscribers = async () => {
    const query = status ? `?status=${status}` : '';
    const data = await adminRequest<ListResponse>(`/subscribers${query}`);
    setSubscribers(data.items);
  };

  useEffect(() => {
    let active = true;
    const query = status ? `?status=${status}` : '';

    adminRequest<ListResponse>(`/subscribers${query}`)
      .then((data) => {
        if (active) setSubscribers(data.items);
      })
      .catch((error: Error) => {
        if (active) setMessage(error.message);
      });

    return () => {
      active = false;
    };
  }, [status]);

  const updateSubscriber = (id: string, field: keyof Subscriber, value: string) => {
    setSubscribers((items) => items.map((item) => (item._id === id ? { ...item, [field]: value } : item)));
  };

  const saveSubscriber = async (subscriber: Subscriber) => {
    await adminRequest(`/subscribers/${subscriber._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: subscriber.name || '', source: subscriber.source || '', status: subscriber.status }),
    });
    setMessage('Subscriber updated.');
  };

  const deleteSubscriber = async (subscriber: Subscriber) => {
    if (!window.confirm(`Delete ${subscriber.email}?`)) return;
    await adminRequest(`/subscribers/${subscriber._id}`, { method: 'DELETE' });
    await refreshSubscribers().catch((error: Error) => setMessage(error.message));
  };

  return (
    <AdminGuard>
      <AdminShell title="Subscribers">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <label className="block max-w-xs space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            Status Filter
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]">
              <option value="">All subscribers</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </label>
        </div>

        {message && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{message}</p>}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[64rem] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber._id}>
                    <td className="px-4 py-4 font-bold text-[#141753]">{subscriber.email}</td>
                    <td className="px-4 py-4">
                      <input value={subscriber.name || ''} onChange={(event) => updateSubscriber(subscriber._id, 'name', event.target.value)} className="w-40 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-[#e17c22]" />
                    </td>
                    <td className="px-4 py-4">
                      <input value={subscriber.source || 'website'} onChange={(event) => updateSubscriber(subscriber._id, 'source', event.target.value)} className="w-36 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-[#e17c22]" />
                    </td>
                    <td className="px-4 py-4">
                      <select value={subscriber.status} onChange={(event) => updateSubscriber(subscriber._id, 'status', event.target.value)} className="rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-[#e17c22]">
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString() : 'Unknown'}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => saveSubscriber(subscriber)} className="rounded-md border border-slate-200 p-2 text-slate-600 transition hover:border-[#e17c22] hover:text-[#e17c22]" aria-label="Save subscriber">
                          <Save className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => deleteSubscriber(subscriber)} className="rounded-md border border-slate-200 p-2 text-slate-600 transition hover:border-red-300 hover:text-red-600" aria-label="Delete subscriber">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {subscribers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm font-semibold text-slate-500">No subscribers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
