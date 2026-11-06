import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Edit3, 
  Trash2, 
  AlertCircle, 
  PlusCircle, 
  Calendar, 
  MapPin, 
  Building2,
  Clock,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { BUILDINGS, CATEGORIES, PRIORITIES } from '../data/mockData';

export default function MyReports({
  reports,
  onViewDetails,
  onDeleteReport,
  onEditReport,
  onNavigate
}) {
  const [editingReport, setEditingReport] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category: '',
    building: '',
    room: '',
    priority: 'Medium'
  });

  const myReports = reports.filter((r) => r.isCurrentUser);

  const startEdit = (report) => {
    setEditingReport(report);
    setEditFormData({
      title: report.title,
      description: report.description,
      category: report.category,
      building: report.building,
      room: report.room || '',
      priority: report.priority
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.title.trim() || !editFormData.description.trim()) return;

    onEditReport(editingReport.id, editFormData);
    setEditingReport(null);
  };

  const priorityStyles = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-blue-50 text-blue-700 border-blue-200',
    High: 'bg-orange-50 text-orange-700 border-orange-200',
    Urgent: 'bg-rose-50 text-rose-700 border-rose-200'
  };

  const statusStyles = {
    Pending: { badge: 'bg-slate-100 text-slate-700 border-slate-200', icon: Clock },
    'Under Review': { badge: 'bg-amber-50 text-amber-800 border-amber-200', icon: AlertCircle },
    'In Progress': { badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Sparkles },
    Resolved: { badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: CheckCircle2 }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Campus Reports</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your personal submissions, track maintenance progress, and edit active pending tickets.
          </p>
        </div>
        <button
          onClick={() => onNavigate('report')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Report</span>
        </button>
      </div>

      {/* Reports List */}
      {myReports.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Reports Filed Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Whenever you encounter an issue on campus, report it here to track its live status from submission to resolution.
          </p>
          <button
            onClick={() => onNavigate('report')}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create First Report</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Ticket ID</th>
                  <th className="py-3.5 px-4">Issue Details</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {myReports.map((report) => {
                  const statusConfig = statusStyles[report.status] || statusStyles.Pending;
                  const StatusIcon = statusConfig.icon;
                  const isPending = report.status === 'Pending';
                  const isResolved = report.status === 'Resolved';

                  return (
                    <tr key={report.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                        {report.id}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-bold text-slate-900 truncate">{report.title}</p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{report.category}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{report.building}</span>
                        </div>
                        {report.room && (
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{report.room}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${priorityStyles[report.priority]}`}>
                          {report.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusConfig.badge}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{report.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        {new Date(report.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View details */}
                          <button
                            onClick={() => onViewDetails(report)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit button (enabled only when Pending) */}
                          <button
                            onClick={() => startEdit(report)}
                            disabled={!isPending}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isPending
                                ? 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                                : 'text-slate-300 cursor-not-allowed opacity-40'
                            }`}
                            title={isPending ? "Edit Pending Report" : "Cannot edit ticket once reviewed/resolved"}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete button (enabled only when Pending) */}
                          <button
                            onClick={() => onDeleteReport(report.id)}
                            disabled={!isPending}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isPending
                                ? 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                                : 'text-slate-300 cursor-not-allowed opacity-40'
                            }`}
                            title={isPending ? "Delete Pending Report" : "Cannot delete active/resolved ticket"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Pending Report Modal */}
      {editingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">
                Edit Report ({editingReport.id})
              </h3>
              <button 
                onClick={() => setEditingReport(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Issue Title
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Building
                  </label>
                  <select
                    value={editFormData.building}
                    onChange={(e) => setEditFormData({ ...editFormData, building: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none"
                  >
                    {BUILDINGS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Room / Specific Area
                  </label>
                  <input
                    type="text"
                    value={editFormData.room}
                    onChange={(e) => setEditFormData({ ...editFormData, room: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Priority
                  </label>
                  <select
                    value={editFormData.priority}
                    onChange={(e) => setEditFormData({ ...editFormData, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none"
                  >
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingReport(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

