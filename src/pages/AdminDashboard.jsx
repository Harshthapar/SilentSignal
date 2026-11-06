import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Sliders, 
  Filter, 
  Building2, 
  MapPin, 
  Calendar,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { STATUSES, PRIORITIES, CATEGORIES } from '../data/mockData';

export default function AdminDashboard({
  reports,
  onUpdateStatus,
  onUpdatePriority,
  onUpdateCategory,
  onViewDetails
}) {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'Pending').length;
  const inProgressReports = reports.filter(r => r.status === 'In Progress').length;
  const underReviewReports = reports.filter(r => r.status === 'Under Review').length;
  const resolvedReports = reports.filter(r => r.status === 'Resolved').length;

  const filteredReports = reports.filter(r => {
    if (filterStatus && r.status !== filterStatus) return false;
    if (filterPriority && r.priority !== filterPriority) return false;
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'In Progress':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Facilities & Maintenance Portal</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dispatch & Ticket Console</h2>
          <p className="text-xs text-slate-400 mt-1">
            Transition reported issues through review stages, reassign maintenance priorities, and close tickets.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Role: Campus Facilities Lead</span>
        </div>
      </div>

      {/* 4 Summary Stats as required */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Reports</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalReports}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all campuses</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{pendingReports}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Need immediate triage</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">In Progress</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{inProgressReports}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Dispatched crew on-site</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Resolved</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{resolvedReports}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Closed tickets</p>
        </div>
      </div>

      {/* Filter and Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Table Filters Toolbar */}
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filter Queue:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-white border border-slate-200 py-1.5 px-3 rounded-xl text-slate-700 outline-none"
            >
              <option value="">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="text-xs bg-white border border-slate-200 py-1.5 px-3 rounded-xl text-slate-700 outline-none"
            >
              <option value="">All Priorities</option>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {(filterStatus || filterPriority) && (
              <button
                onClick={() => { setFilterStatus(''); setFilterPriority(''); }}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-slate-400">
            Managing <strong className="text-slate-800">{filteredReports.length}</strong> active tickets
          </div>
        </div>

        {/* Management Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Issue & Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority Control</th>
                <th className="py-3 px-4">Status Transition</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 whitespace-nowrap">
                    {report.id}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-bold text-slate-900 truncate">{report.title}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {report.building} {report.room ? `• ${report.room}` : ''}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={report.category}
                      onChange={(e) => onUpdateCategory(report.id, e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-lg text-slate-700 focus:ring-1 focus:ring-indigo-300 outline-none"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={report.priority}
                      onChange={(e) => onUpdatePriority(report.id, e.target.value)}
                      className={`text-xs font-bold py-1 px-2.5 rounded-lg border outline-none ${getPriorityBadge(report.priority)}`}
                    >
                      {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={report.status}
                      onChange={(e) => onUpdateStatus(report.id, e.target.value)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border outline-none ${getStatusBadge(report.status)}`}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onViewDetails(report)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Review</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

