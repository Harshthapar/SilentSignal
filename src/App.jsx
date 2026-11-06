import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReportDetailsModal from './components/ReportDetailsModal';
import DuplicateIssueModal from './components/DuplicateIssueModal';
import Toast from './components/Toast';

// Pages
import Dashboard from './pages/Dashboard';
import ExploreReports from './pages/ExploreReports';
import ReportForm from './components/ReportForm';
import MyReports from './pages/MyReports';
import CampusMap from './components/CampusMap';
import AdminDashboard from './pages/AdminDashboard';
import Insights from './pages/Insights';

// Mock data & helpers
import { INITIAL_REPORTS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { findSimilarReports } from './utils/duplicateDetection';

const STORAGE_KEY_REPORTS = 'silentsignal_reports_v1';
const STORAGE_KEY_NOTIFS = 'silentsignal_notifs_v1';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Persistent Reports & Notifications
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading localStorage reports', e);
    }
    return INITIAL_REPORTS;
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading localStorage notifications', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Global Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Modal States
  const [detailedReport, setDetailedReport] = useState(null);
  const [duplicateMatch, setDuplicateMatch] = useState(null);
  const [pendingSubmission, setPendingSubmission] = useState(null);
  const [toast, setToast] = useState(null);

  // Save reports to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error('Failed saving reports', e);
    }
  }, [reports]);

  // Save notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed saving notifications', e);
    }
  }, [notifications]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Add in-app notification helper
  const addNotification = (title, message, type = 'status') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Mark notification read
  const handleMarkNotificationRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  // Upvote / Toggle Upvote
  const handleUpvote = (reportId) => {
    let message = '';
    setReports(prev =>
      prev.map(r => {
        if (r.id === reportId) {
          const isUpvoted = r.upvotedByUser;
          const newUpvotes = isUpvoted ? Math.max(0, r.upvotes - 1) : r.upvotes + 1;
          message = isUpvoted 
            ? `Removed support for "${r.title.slice(0, 30)}..."` 
            : `Supported "${r.title.slice(0, 30)}..." (+1 upvote)`;
          return {
            ...r,
            upvotes: newUpvotes,
            upvotedByUser: !isUpvoted
          };
        }
        return r;
      })
    );
    showToast(message, 'info');

    // Update details modal state if active
    if (detailedReport && detailedReport.id === reportId) {
      setDetailedReport(prev => ({
        ...prev,
        upvotes: prev.upvotedByUser ? Math.max(0, prev.upvotes - 1) : prev.upvotes + 1,
        upvotedByUser: !prev.upvotedByUser
      }));
    }
  };

  // Handle Initial Report Form Submission with Duplicate Checking
  const handleReportFormSubmit = (formData, resetCallback) => {
    // Run duplicate detection against current reports
    const duplicates = findSimilarReports(formData, reports);

    if (duplicates.length > 0) {
      // Similar report detected! Show modal
      setDuplicateMatch(duplicates[0]);
      setPendingSubmission({ formData, resetCallback });
    } else {
      // Proceed directly to create report
      finalizeReportCreation(formData);
      if (resetCallback) resetCallback();
    }
  };

  // Finalize new report creation
  const finalizeReportCreation = (formData) => {
    const generatedId = `REP-${1000 + reports.length + 1}`;
    const newReport = {
      id: generatedId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      building: formData.building,
      room: formData.room ? formData.room.trim() : '',
      priority: formData.priority,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      upvotes: 1,
      upvotedByUser: true,
      reporter: 'Dev Mehta (Roll #21BCS012)',
      isCurrentUser: true,
      image: formData.image || null
    };

    setReports(prev => [newReport, ...prev]);
    addNotification('Report Submitted Successfully', `Ticket ${generatedId} created for ${newReport.building}. Status is Pending.`, 'status');
    showToast(`Ticket ${generatedId} submitted successfully! Facilities team notified.`, 'success');

    // Switch to Explore or My Reports to see it
    setCurrentView('my-reports');
  };

  // Support Existing Report from Duplicate Modal
  const handleSupportExistingFromModal = (existingReportId) => {
    handleUpvote(existingReportId);
    showToast('Supported existing report instead of creating a duplicate. Thank you!', 'success');
    addNotification('Supported Existing Issue', `You upvoted ticket ${existingReportId} instead of filing a duplicate.`, 'upvote');

    if (pendingSubmission && pendingSubmission.resetCallback) {
      pendingSubmission.resetCallback();
    }
    setDuplicateMatch(null);
    setPendingSubmission(null);
    setCurrentView('explore');
  };

  // Submit Anyway from Duplicate Modal
  const handleSubmitAnywayFromModal = () => {
    if (pendingSubmission) {
      finalizeReportCreation(pendingSubmission.formData);
      if (pendingSubmission.resetCallback) {
        pendingSubmission.resetCallback();
      }
    }
    setDuplicateMatch(null);
    setPendingSubmission(null);
  };

  // Admin Actions: Status update
  const handleUpdateStatus = (reportId, newStatus) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === reportId) {
          addNotification(
            `Status Updated: ${r.id}`,
            `Ticket "${r.title.slice(0, 24)}..." moved to "${newStatus}".`,
            newStatus === 'Resolved' ? 'resolved' : 'status'
          );
          return { ...r, status: newStatus };
        }
        return r;
      })
    );
    showToast(`Status updated to "${newStatus}"`, 'success');
  };

  // Admin Actions: Priority update
  const handleUpdatePriority = (reportId, newPriority) => {
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, priority: newPriority } : r))
    );
    showToast(`Priority adjusted to ${newPriority}`, 'info');
  };

  // Admin Actions: Category update
  const handleUpdateCategory = (reportId, newCategory) => {
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, category: newCategory } : r))
    );
    showToast(`Category adjusted to ${newCategory}`, 'info');
  };

  // Edit Pending Report (My Reports)
  const handleEditReport = (reportId, updatedFields) => {
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, ...updatedFields } : r))
    );
    showToast(`Report ${reportId} updated successfully`, 'success');
  };

  // Delete Pending Report (My Reports)
  const handleDeleteReport = (reportId) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    showToast(`Report ${reportId} deleted`, 'info');
  };

  // Clear all exploration filters
  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedPriority('');
    setSelectedBuilding('');
    setSortBy('recent');
    setSearchQuery('');
  };

  // Filtered & Sorted reports calculation
  const filteredAndSortedReports = useMemo(() => {
    return reports
      .filter(r => {
        // Search query across title, description, building, room
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchDesc = r.description.toLowerCase().includes(q);
          const matchBuilding = r.building.toLowerCase().includes(q);
          const matchRoom = (r.room || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchBuilding && !matchRoom) return false;
        }

        // Dropdown filters
        if (selectedCategory && r.category !== selectedCategory) return false;
        if (selectedStatus && r.status !== selectedStatus) return false;
        if (selectedPriority && r.priority !== selectedPriority) return false;
        if (selectedBuilding && r.building !== selectedBuilding) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === 'priority') {
          const priorityWeights = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
        }
        // default: recent
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [reports, searchQuery, selectedCategory, selectedStatus, selectedPriority, selectedBuilding, sortBy]);

  const pendingCount = reports.filter(r => r.status === 'Pending').length;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          reportCount={reports.length}
          pendingCount={pendingCount}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative z-10 w-72 h-full bg-slate-900 shadow-2xl flex flex-col">
            <Sidebar
              currentView={currentView}
              setCurrentView={(view) => {
                setCurrentView(view);
                setMobileMenuOpen(false);
              }}
              reportCount={reports.length}
              pendingCount={pendingCount}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          onSearch={(query) => {
            setSearchQuery(query);
            if (query && currentView !== 'explore') {
              setCurrentView('explore');
            }
          }}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onNotificationClick={() => setCurrentView('explore')}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onQuickReport={() => setCurrentView('report')}
        />

        {/* Dynamic Body Pages */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && (
            <Dashboard
              reports={reports}
              onUpvote={handleUpvote}
              onViewDetails={setDetailedReport}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'report' && (
            <div className="py-2">
              <ReportForm
                onSubmit={handleReportFormSubmit}
                isCheckingDuplicate={false}
              />
            </div>
          )}

          {currentView === 'explore' && (
            <ExploreReports
              reports={filteredAndSortedReports}
              onUpvote={handleUpvote}
              onViewDetails={setDetailedReport}
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
              onClearFilters={handleClearFilters}
            />
          )}

          {currentView === 'my-reports' && (
            <MyReports
              reports={reports}
              onViewDetails={setDetailedReport}
              onDeleteReport={handleDeleteReport}
              onEditReport={handleEditReport}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'campus-map' && (
            <CampusMap
              reports={reports}
              onViewDetails={setDetailedReport}
            />
          )}

          {currentView === 'insights' && (
            <Insights reports={reports} />
          )}

          {currentView === 'admin' && (
            <AdminDashboard
              reports={reports}
              onUpdateStatus={handleUpdateStatus}
              onUpdatePriority={handleUpdatePriority}
              onUpdateCategory={handleUpdateCategory}
              onViewDetails={setDetailedReport}
            />
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      {detailedReport && (
        <ReportDetailsModal
          report={detailedReport}
          onClose={() => setDetailedReport(null)}
          onUpvote={handleUpvote}
        />
      )}

      {duplicateMatch && (
        <DuplicateIssueModal
          similarReport={duplicateMatch}
          onSupportExisting={handleSupportExistingFromModal}
          onSubmitAnyway={handleSubmitAnywayFromModal}
          onClose={() => {
            setDuplicateMatch(null);
            setPendingSubmission(null);
          }}
        />
      )}

      {/* Global Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

