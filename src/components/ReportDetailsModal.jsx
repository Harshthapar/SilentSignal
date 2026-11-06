import React, { useEffect } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  ThumbsUp, 
  Calendar, 
  User, 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles,
  Share2
} from 'lucide-react';

export default function ReportDetailsModal({ report, onClose, onUpvote }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!report) return null;

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

  const statusConfig = statusStyles[report.status] || statusStyles.Pending;
  const StatusIcon = statusConfig.icon;

  const formattedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              {report.id}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.badge}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {report.status}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Image if available */}
          {report.image && (
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm max-h-72 w-full bg-slate-100">
              <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {report.category}
              </span>
              <span>•</span>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${priorityStyles[report.priority]}`}>
                {report.priority} Priority
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {report.title}
            </h2>
          </div>

          {/* Description Section */}
          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {report.description}
            </p>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-medium">Campus Building</p>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-800">{report.building}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-medium">Room / Location</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-800">{report.room || 'General Area'}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-medium">Reported By</p>
              <div className="flex items-center gap-2 mt-1">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-800">{report.reporter}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-medium">Date & Time</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-800">{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            <strong className="text-slate-900 font-bold">{report.upvotes}</strong> campus members upvoted this
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpvote(report.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 ${
                report.upvotedByUser
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${report.upvotedByUser ? 'fill-white' : ''}`} />
              <span>{report.upvotedByUser ? 'Upvoted' : 'Upvote Issue'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

