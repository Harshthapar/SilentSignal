import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ title, value, label, trend, trendType = 'up', icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      ring: 'group-hover:border-indigo-300'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      ring: 'group-hover:border-emerald-300'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      ring: 'group-hover:border-amber-300'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      ring: 'group-hover:border-purple-300'
    }
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden ${scheme.ring}`}>
      {/* Top row with icon & trend */}
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center transition-transform group-hover:scale-105 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            trendType === 'up' 
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60' 
              : 'text-rose-700 bg-rose-50 border border-rose-200/60'
          }`}>
            {trendType === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>

      {/* Main Number & Labels */}
      <div>
        <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </h3>
        <p className="text-xs font-semibold text-slate-700 mt-1 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {label}
        </p>
      </div>

      {/* Subtle bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-indigo-500 group-hover:to-blue-500 transition-all duration-300`}></div>
    </div>
  );
}

