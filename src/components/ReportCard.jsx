import React from 'react';
import { 
  Building2, 
  MapPin, 
  ThumbsUp, 
  Calendar, 
  Eye, 
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function ReportCard({ report, onUpvote, onViewDetails }) {
  const priorityStyles = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    Medium: 'bg-blue-50 text-blue-700 border-blue-200/80',
    High: 'bg-orange-50 text-orange-700 border-orange-200/80',
    Urgent: 'bg-rose-50 text-rose-700 border-rose-200/80'
  };

  const statusStyles = {
    Pending: {
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: Clock,
      dot: 'bg-slate-400'
    },
    'Under Review': {
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertCircle,
      dot: 'bg-amber-500'
    },
    'In Progress': {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Sparkles,
      dot: 'bg-indigo-500'
    },
    Resolved: {
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CheckCircle2,
      dot: 'bg-emerald-500'
    }
  };

  const statusConfig = statusStyles[report.status] || statusStyles.Pending;
  const StatusIcon = statusConfig.icon;

  const formattedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-slate-300">
      <div>
        {/* Card Image if available */}
        {report.image && (
          <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
            <img 
              src={report.image} 
              alt={report.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm backdrop-blur-md bg-white/90 ${priorityStyles[report.priority]}`}>
                {report.priority}
              </span>
            </div>
          </div>
        )}

        <div className="p-5">
          {/* Header Badges if no image */}
          {!report.image && (
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${priorityStyles[report.priority]}`}>
                {report.priority} Priority
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></span>
                {report.status}
              </span>
            </div>
          )}

          {/* Title and Category */}
          <div className="mb-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                {report.category}
              </span>
              {report.image && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusConfig.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></span>
                  {report.status}
                </span>
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors mt-1 line-clamp-1 leading-snug">
              {report.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {report.description}
          </p>

          {/* Location info */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-700 truncate">{report.building}</span>
            </div>
            {report.room && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-600 truncate">{report.room}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="truncate">{report.reporter.split('(')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer with Actions */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => onUpvote(report.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
            report.upvotedByUser
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25 ring-2 ring-indigo-300'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:text-indigo-600'
          }`}
          title={report.upvotedByUser ? "Click to remove upvote" : "Upvote this issue"}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${report.upvotedByUser ? 'fill-white' : ''}`} />
          <span>{report.upvotes}</span>
        </button>

        <button
          onClick={() => onViewDetails(report)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}

