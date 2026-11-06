import React, { useState } from 'react';
import { 
  UploadCloud, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Send, 
  MapPin, 
  Building, 
  Layers, 
  Flame,
  Info
} from 'lucide-react';
import { BUILDINGS, CATEGORIES, PRIORITIES } from '../data/mockData';

export default function ReportForm({ onSubmit, isCheckingDuplicate }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    building: '',
    room: '',
    priority: 'Medium',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setErrors((prev) => ({ ...prev, image: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Issue title is required';
    else if (formData.title.length < 5) newErrors.title = 'Title must be at least 5 characters';

    if (!formData.description.trim()) newErrors.description = 'Please describe the issue in detail';
    else if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';

    if (!formData.category) newErrors.category = 'Please select an issue category';
    if (!formData.building) newErrors.building = 'Please select a campus building';
    if (!formData.priority) newErrors.priority = 'Priority is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData, resetForm);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      building: '',
      room: '',
      priority: 'Medium',
      image: null
    });
    setImagePreview(null);
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase mb-1">
          <Layers className="w-4 h-4" />
          <span>Campus Infrastructure Dispatch</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Report a Campus Issue</h2>
        <p className="text-sm text-slate-500 mt-1">
          Submit broken equipment, plumbing faults, Wi-Fi outages, or hazards for swift resolution by facilities.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Issue Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Issue Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Projector not working in Room 204"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.title
                ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100 bg-rose-50/20'
                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Category & Building Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.category
                  ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100 bg-rose-50/20'
                  : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white'
              }`}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Building */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Campus Building <span className="text-rose-500">*</span>
            </label>
            <select
              name="building"
              value={formData.building}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.building
                  ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100 bg-rose-50/20'
                  : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white'
              }`}
            >
              <option value="">Select Building</option>
              {BUILDINGS.map((bld) => (
                <option key={bld} value={bld}>
                  {bld}
                </option>
              ))}
            </select>
            {errors.building && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.building}
              </p>
            )}
          </div>
        </div>

        {/* Room / Specific Location & Priority Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Room / Specific Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Room / Specific Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                placeholder="e.g. Room 204, 3rd Floor Restroom"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white outline-none transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Helps detect existing reports in the exact spot.</p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Priority Level <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRIORITIES.map((lvl) => {
                const isSelected = formData.priority === lvl;
                const colors = {
                  Low: isSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'hover:border-emerald-300 text-slate-700',
                  Medium: isSelected ? 'bg-blue-600 text-white border-blue-600' : 'hover:border-blue-300 text-slate-700',
                  High: isSelected ? 'bg-orange-600 text-white border-orange-600' : 'hover:border-orange-300 text-slate-700',
                  Urgent: isSelected ? 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-500/20' : 'hover:border-rose-300 text-slate-700'
                };

                return (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setFormData(prev => ({ ...prev, priority: lvl }))}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${colors[lvl] || ''}`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Detailed Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Explain what is broken, how long it has been occurring, and any hazard it presents..."
            className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.description
                ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100 bg-rose-50/20'
                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Upload Photo Proof (Optional)
          </label>
          
          {imagePreview ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-w-sm group">
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-slate-900/80 text-white rounded-full hover:bg-rose-600 transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-slate-900/70 text-white text-[11px] font-medium backdrop-blur-sm">
                Photo ready for upload
              </div>
            </div>
          ) : (
            <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Click to upload an image</p>
              <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, or WEBP up to 5MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
          {errors.image && (
            <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.image}
            </p>
          )}
        </div>

        {/* Duplicate Notice Banner */}
        <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            <strong>Smart duplicate detection:</strong> SilentSignal automatically compares your building, room, and keywords with open campus tickets to prevent redundant reports.
          </span>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={resetForm}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isCheckingDuplicate}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-150 active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isCheckingDuplicate ? 'Checking duplicates...' : 'Submit Report'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

