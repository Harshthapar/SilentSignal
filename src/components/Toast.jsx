import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      border: 'border-emerald-200',
      bg: 'bg-emerald-50 text-emerald-900',
      iconColor: 'text-emerald-600'
    },
    error: {
      icon: AlertCircle,
      border: 'border-rose-200',
      bg: 'bg-rose-50 text-rose-900',
      iconColor: 'text-rose-600'
    },
    info: {
      icon: Info,
      border: 'border-indigo-200',
      bg: 'bg-indigo-50 text-indigo-900',
      iconColor: 'text-indigo-600'
    }
  };

  const config = typeConfig[type] || typeConfig.success;
  const Icon = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${config.bg} ${config.border} max-w-md`}>
        <Icon className={`w-5 h-5 shrink-0 ${config.iconColor}`} />
        <p className="text-xs font-semibold leading-relaxed flex-1">{message}</p>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 transition-colors text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

