import React from 'react';
import { Filter, X, ArrowUpDown, RotateCcw } from 'lucide-react';
import { BUILDINGS, CATEGORIES, PRIORITIES, STATUSES } from '../data/mockData';

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  selectedBuilding,
  setSelectedBuilding,
  sortBy,
  setSortBy,
  onClearFilters,
  totalResults
}) {
  const hasActiveFilters =
    selectedCategory ||
    selectedStatus ||
    selectedPriority ||
    selectedBuilding ||
    sortBy !== 'recent';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
          >
            <option value="">All Priorities</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Building */}
          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
          >
            <option value="">All Buildings</option>
            {BUILDINGS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-2 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <span className="text-xs text-slate-400">
            Showing <strong className="text-slate-800 font-bold">{totalResults}</strong> issues
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
            >
              <option value="recent">Recently Reported</option>
              <option value="upvotes">Most Upvoted</option>
              <option value="priority">Highest Priority</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

