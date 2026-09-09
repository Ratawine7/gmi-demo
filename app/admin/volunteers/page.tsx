'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminShell from '@/components/admin/AdminShell';
import { adminRequest } from '@/lib/adminApi';

type Volunteer = {
  _id: string;
  membershipId: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  institutionName: string;
  membershipStatus: 'Pending' | 'Approved' | 'Rejected';
  chapterAssigned?: string;
  remarks?: string;
};

type ListResponse = { items: Volunteer[]; total: number };

const statuses = ['Pending', 'Approved', 'Rejected'] as const;

export default function AdminVolunteersPage() {
  const [status, setStatus] = useState('');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = status ? `?status=${status}&limit=100` : '?limit=100';
    adminRequest<ListResponse>(`/volunteers${query}`)
      .then((data) => setVolunteers(data.items))
      .catch((error: Error) => setMessage(error.message));
  }, [status]);

  const updateVolunteer = (id: string, field: keyof Volunteer, value: string) => {
    setVolunteers((items) => items.map((item) => (item._id === id ? { ...item, [field]: value } : item)));
  };

  const saveVolunteer = async (volunteer: Volunteer) => {
    await adminRequest(`/volunteers/${volunteer._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        membershipStatus: volunteer.membershipStatus,
        chapterAssigned: volunteer.chapterAssigned || '',
        remarks: volunteer.remarks || '',
      }),
    });
    setMessage('Volunteer updated.');
  };

  return (
    <AdminGuard>
      <AdminShell title="Volunteer Management">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <label className="block max-w-xs space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            Status Filter
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]">
              <option value="">All volunteers</option>
              {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        {message && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{message}</p>}

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[72rem] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Volunteer</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Institution</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Chapter</th>
                  <th className="px-4 py-3">Remarks</th>
                  <th className="px-4 py-3 text-right">Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {volunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="align-top">
                    <td className="px-4 py-4">
                      <p className="font-bold text-[#141753]">{volunteer.fullName}</p>
                      <p className="text-xs text-slate-500">{volunteer.membershipId}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      <p>{volunteer.emailAddress}</p>
                      <p className="text-xs">{volunteer.phoneNumber}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{volunteer.institutionName}</td>
                    <td className="px-4 py-4">
                      <select value={volunteer.membershipStatus} onChange={(event) => updateVolunteer(volunteer._id, 'membershipStatus', event.target.value)} className="rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-[#e17c22]">
                        {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <input value={volunteer.chapterAssigned || ''} onChange={(event) => updateVolunteer(volunteer._id, 'chapterAssigned', event.target.value)} className="w-40 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-[#e17c22]" />
                    </td>
                    <td className="px-4 py-4">
                      <input value={volunteer.remarks || ''} onChange={(event) => updateVolunteer(volunteer._id, 'remarks', event.target.value)} className="w-52 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-[#e17c22]" />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button type="button" onClick={() => saveVolunteer(volunteer)} className="rounded-md border border-slate-200 p-2 text-slate-600 transition hover:border-[#e17c22] hover:text-[#e17c22]" aria-label="Save volunteer">
                        <Save className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {volunteers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm font-semibold text-slate-500">No volunteers found.</td>
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
