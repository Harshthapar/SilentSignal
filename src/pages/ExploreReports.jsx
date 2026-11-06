import React from 'react';
import { Compass, Inbox, RotateCcw } from 'lucide-react';
import ReportCard from '../components/ReportCard';
import FilterBar from '../components/FilterBar';

export default function ExploreReports({
  reports,
  onUpvote,
  onViewDetails,
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
  onClearFilters
}) {
  return (
    <div className="space-y-6">
      {/* Page Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Campus Reports</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Browse public maintenance tickets, monitor progress, and upvote unresolved campus issues.
          </p>
        </div>
      </div>

      {/* Filter and Sorting Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onClearFilters={onClearFilters}
        totalResults={reports.length}
      />

      {/* Reports Grid or Empty State */}
      {reports.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-sm max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Reports Match Your Criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Try adjusting your search keywords, clearing specific category filters, or selecting another building.
          </p>
          <button
            onClick={onClearFilters}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onUpvote={onUpvote}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

