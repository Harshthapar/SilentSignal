import React, { useState } from 'react';
import { 
  MapPin, 
  Eye, 
  Building2, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  Navigation,
  Compass,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';
import { MAP_BUILDING_COORDINATES } from '../data/mockData';

export default function CampusMap({ reports, onViewDetails }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return '#f43f5e'; // rose-500
      case 'High':
        return '#f97316'; // orange-500
      case 'Medium':
        return '#3b82f6'; // blue-500
      case 'Low':
        return '#10b981'; // emerald-500
      default:
        return '#64748b';
    }
  };

  // Group reports by building
  const buildingReports = {};
  for (const rep of reports) {
    if (!buildingReports[rep.building]) {
      buildingReports[rep.building] = [];
    }
    buildingReports[rep.building].push(rep);
  }

  const activeReportsForBuilding = selectedBuilding ? (buildingReports[selectedBuilding] || []) : [];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Campus Floor & Geography</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Campus Infrastructure Map</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on buildings or issue pins to inspect localized hazards and active repair statuses.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="font-semibold text-slate-700">Urgent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span className="font-semibold text-slate-700">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="font-semibold text-slate-700">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-700">Low</span>
          </div>
        </div>
      </div>

      {/* Main Map View & Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Illustrated Map */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[460px]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <svg viewBox="0 0 1000 520" className="w-full h-auto max-h-[500px] select-none">
            {/* Campus Paths & Walkways */}
            <g stroke="#334155" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
              <path d="M 200 370 Q 300 240 440 190" />
              <path d="M 440 190 L 660 215" />
              <path d="M 660 215 Q 750 240 815 370" />
              <path d="M 415 335 L 615 345" />
              <path d="M 415 335 L 530 190" />
              <path d="M 615 345 L 735 215" />
            </g>

            {/* Central Green Plaza Area */}
            <circle cx="515" cy="265" r="50" fill="#0f766e" opacity="0.15" />
            <circle cx="515" cy="265" r="42" fill="#0f766e" opacity="0.25" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 4" />
            <text x="515" y="269" fill="#2dd4bf" fontSize="11" fontWeight="700" textAnchor="middle">
              CENTRAL LAWN
            </text>

            {/* Render Buildings */}
            {Object.entries(MAP_BUILDING_COORDINATES).map(([name, coords]) => {
              const reps = buildingReports[name] || [];
              const isSelected = selectedBuilding === name;
              const hasUrgent = reps.some(r => r.priority === 'Urgent');

              return (
                <g 
                  key={name}
                  onClick={() => {
                    setSelectedBuilding(name);
                    setSelectedMarker(reps[0] || null);
                  }}
                  className="cursor-pointer group transition-all duration-200"
                >
                  {/* Building Block Shadow */}
                  <rect
                    x={coords.x + 4}
                    y={coords.y + 4}
                    width={coords.width}
                    height={coords.height}
                    rx="16"
                    fill="#020617"
                    opacity="0.5"
                  />

                  {/* Building Block */}
                  <rect
                    x={coords.x}
                    y={coords.y}
                    width={coords.width}
                    height={coords.height}
                    rx="16"
                    fill={isSelected ? '#312e81' : '#1e293b'}
                    stroke={isSelected ? '#818cf8' : hasUrgent ? '#f43f5e' : '#475569'}
                    strokeWidth={isSelected ? '3' : '2'}
                    className="transition-colors group-hover:fill-slate-800"
                  />

                  {/* Building Name */}
                  <text
                    x={coords.x + coords.width / 2}
                    y={coords.y + 36}
                    fill="#f8fafc"
                    fontSize="13"
                    fontWeight="700"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {name}
                  </text>

                  {/* Building report count pill */}
                  <rect
                    x={coords.x + coords.width / 2 - 40}
                    y={coords.y + 50}
                    width="80"
                    height="20"
                    rx="10"
                    fill={reps.length > 0 ? '#4338ca' : '#334155'}
                    opacity="0.8"
                  />
                  <text
                    x={coords.x + coords.width / 2}
                    y={coords.y + 64}
                    fill="#e0e7ff"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {reps.length} {reps.length === 1 ? 'Report' : 'Reports'}
                  </text>
                </g>
              );
            })}

            {/* Individual Issue Marker Pins */}
            {reports.map((report, idx) => {
              const coords = MAP_BUILDING_COORDINATES[report.building];
              if (!coords) return null;

              // Scatter markers slightly inside building boundaries
              const offsetX = ((idx * 37) % (coords.width - 40)) + 20;
              const offsetY = coords.height - 20;
              const posX = coords.x + offsetX;
              const posY = coords.y + offsetY;
              const isSelected = selectedMarker?.id === report.id;
              const pinColor = getPriorityColor(report.priority);

              return (
                <g
                  key={report.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBuilding(report.building);
                    setSelectedMarker(report);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Ping Animation for Urgent markers */}
                  {report.priority === 'Urgent' && (
                    <circle
                      cx={posX}
                      cy={posY}
                      r="12"
                      fill={pinColor}
                      opacity="0.3"
                      className="animate-ping origin-center"
                    />
                  )}

                  <circle
                    cx={posX}
                    cy={posY}
                    r={isSelected ? "9" : "6"}
                    fill={pinColor}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "3" : "2"}
                    className="transition-all duration-150 group-hover:scale-125"
                  />
                </g>
              );
            })}
          </svg>

          {/* Map Footer helper note */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 pointer-events-none">
            <span>🗺️ Campus Grid View • Live Geocoded Pins</span>
            <span>Click any block to filter reports</span>
          </div>
        </div>

        {/* Selected Marker & Building Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  {selectedBuilding || 'Select a Building'}
                </h3>
              </div>
              {selectedBuilding && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                  {activeReportsForBuilding.length} active
                </span>
              )}
            </div>

            {selectedMarker ? (
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                    {selectedMarker.category}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: getPriorityColor(selectedMarker.priority) }}
                  >
                    {selectedMarker.priority} Priority
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {selectedMarker.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {selectedMarker.description}
                </p>

                <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-500 space-y-1">
                  <div><strong>Location:</strong> {selectedMarker.room || 'General Area'}</div>
                  <div><strong>Status:</strong> {selectedMarker.status}</div>
                  <div className="flex items-center gap-1 text-indigo-600 font-semibold pt-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{selectedMarker.upvotes} campus upvotes</span>
                  </div>
                </div>

                <button
                  onClick={() => onViewDetails(selectedMarker)}
                  className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Full Report</span>
                </button>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Navigation className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
                <p className="text-xs font-medium">Click on any map pin or building to review local issues</p>
              </div>
            )}

            {/* List of other issues in this building */}
            {selectedBuilding && activeReportsForBuilding.length > 1 && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Other Issues in {selectedBuilding}
                </p>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {activeReportsForBuilding
                    .filter((r) => r.id !== selectedMarker?.id)
                    .map((r) => (
                      <div
                        key={r.id}
                        onClick={() => setSelectedMarker(r)}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50/60 cursor-pointer text-xs flex items-center justify-between border border-transparent hover:border-indigo-200 transition-colors"
                      >
                        <span className="font-medium text-slate-800 truncate pr-2">{r.title}</span>
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: getPriorityColor(r.priority) }}
                        ></span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100">
            Coordinates and campus infrastructure updated in real-time.
          </div>
        </div>
      </div>
    </div>
  );
}

