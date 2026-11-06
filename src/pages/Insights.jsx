import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Building2, 
  Layers, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES, BUILDINGS } from '../data/mockData';

export default function Insights({ reports }) {
  // 1. Reports by Category
  const categoryCounts = CATEGORIES.map((cat) => ({
    name: cat,
    count: reports.filter((r) => r.category === cat).length
  })).sort((a, b) => b.count - a.count);

  // 2. Reports by Status
  const statusCounts = [
    { name: 'Pending', count: reports.filter((r) => r.status === 'Pending').length, color: '#94a3b8' },
    { name: 'Under Review', count: reports.filter((r) => r.status === 'Under Review').length, color: '#f59e0b' },
    { name: 'In Progress', count: reports.filter((r) => r.status === 'In Progress').length, color: '#6366f1' },
    { name: 'Resolved', count: reports.filter((r) => r.status === 'Resolved').length, color: '#10b981' }
  ];

  // 3. Most Reported Buildings
  const buildingCounts = BUILDINGS.map((b) => ({
    name: b.replace("Department", "Dept."),
    fullName: b,
    reports: reports.filter((r) => r.building === b).length
  })).sort((a, b) => b.reports - a.reports);

  // 4. Monthly Trend Data (Simulated academic term trend)
  const monthlyData = [
    { month: 'Jun', submitted: 18, resolved: 16 },
    { month: 'Jul', submitted: 24, resolved: 21 },
    { month: 'Aug', submitted: 45, resolved: 38 },
    { month: 'Sep', submitted: 58, resolved: 52 },
    { month: 'Oct', submitted: 62, resolved: 59 },
    { month: 'Nov', submitted: reports.length, resolved: reports.filter(r => r.status === 'Resolved').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Campus Infrastructure Insights</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Analytics on recurring facility breakdowns, resolution speed, and hotspot campus buildings.
        </p>
      </div>

      {/* Top 2 Charts: Category & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Reports by Category</h3>
              <p className="text-xs text-slate-500">Distribution across equipment, electrical & plumbing</p>
            </div>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryCounts} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  angle={-25} 
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown Pie */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Reports by Lifecycle Status</h3>
              <p className="text-xs text-slate-500">Current state of maintenance pipeline</p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <PieIcon className="w-4 h-4" />
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusCounts}
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => <span className="text-xs text-slate-600 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom 2 Charts: Monthly Trend & Top Reported Buildings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Resolution Trend */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Monthly Resolution Trend</h3>
              <p className="text-xs text-slate-500">Tickets submitted vs resolved across semesters</p>
            </div>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="submitted" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Issues Submitted" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Issues Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Reported Campus Buildings */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Most Reported Campus Buildings</h3>
              <p className="text-xs text-slate-500">Facility degradation hotspot detection</p>
            </div>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={buildingCounts} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }} width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="reports" fill="#818cf8" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

