import React, { useEffect } from 'react';
import { 
  AlertTriangle, 
  ThumbsUp, 
  ArrowRight, 
  X, 
  Building2, 
  MapPin, 
  Layers,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function DuplicateIssueModal({ 
  similarReport, 
  onSupportExisting, 
  onSubmitAnyway, 
  onClose 
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!similarReport) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight leading-tight">Similar Issue Already Reported</h3>
              <p className="text-xs text-amber-100">Duplicate detection match found on your campus</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            A fellow student has already filed a maintenance report in this location with matching characteristics. Upvoting it raises urgency for facility managers faster than creating duplicates!
          </p>

          {/* Existing Report Card Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                {similarReport.category}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                {similarReport.status}
              </span>
            </div>

            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              {similarReport.title}
            </h4>

            <p className="text-xs text-slate-600 line-clamp-2 mb-3">
              {similarReport.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{similarReport.building}</span>
              </div>
              {similarReport.room && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{similarReport.room}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-indigo-600 font-semibold ml-auto">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{similarReport.upvotes} student upvotes</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Supporting this issue combines student votes into a higher-priority service ticket.</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onSubmitAnyway}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors order-2 sm:order-1"
            >
              Submit New Report Anyway
            </button>
            <button
              type="button"
              onClick={() => onSupportExisting(similarReport.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-600/25 transition-all duration-150 active:scale-95 order-1 sm:order-2"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Support Existing Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

