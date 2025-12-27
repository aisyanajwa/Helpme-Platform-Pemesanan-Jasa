import { useState } from 'react';
import { ArrowLeft, Plus, X, Tag } from 'lucide-react';
import { User, ServiceRequest } from '../App';
import { Header } from './Header';
import { getCategoryOptions, getSuggestedHashtags } from '../utils/categories';

type CreateRequestPageProps = {
  user: User;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
  onCreateRequest: (request: Omit<ServiceRequest, 'id' | 'requesterId' | 'requesterName' | 'requesterAvatar' | 'createdAt' | 'status' | 'proposalCount'>) => void;
  from?: string;
};

const timelineOptions = [
  'Hari ini',
  'Besok',
  '1-3 hari',
  '1 minggu',
  '2 minggu',
  '1 bulan',
  'Fleksibel'
];

export function CreateRequestPage({ user, onNavigate, onLogout, onCreateRequest, from }: CreateRequestPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [deadlineType, setDeadlineType] = useState<'deadline' | 'jam-ditutup'>('deadline');
  const [deadlineValue, setDeadlineValue] = useState('');

  const allCategories = getCategoryOptions();
  const suggestedHashtags = categories.length > 0 ? getSuggestedHashtags(categories[0]) : [];

  const handleAddHashtag = () => {
    const tag = hashtagInput.trim().toLowerCase().replace(/^#/, '');
    if (tag && !hashtags.includes(tag) && hashtags.length < 8) {
      setHashtags([...hashtags, tag]);
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handleAddSuggestedHashtag = (tag: string) => {
    if (!hashtags.includes(tag) && hashtags.length < 8) {
      setHashtags([...hashtags, tag]);
    }
  };

  const handleToggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else if (categories.length < 5) {
      setCategories([...categories, cat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || categories.length === 0 || !minBudget || !maxBudget || !timeline) {
      alert('Mohon lengkapi semua kolom yang wajib diisi');
      return;
    }

    onCreateRequest({
      title,
      description,
      categories,
      hashtags,
      budget: { min: parseFloat(minBudget), max: parseFloat(maxBudget) },
      timeline,
      deadlineType: deadlineValue ? deadlineType : undefined,
      deadlineValue: deadlineValue || undefined
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="create-request" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate(from || 'requester-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Request Jasa</h1>
          <p className="text-gray-600 mb-6">Request Anda akan muncul di feed publik dan dapat dilihat oleh semua penyedia jasa</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Request <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Butuh Bantuan Angkat Galon ke Lantai 5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Kebutuhan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan kebutuhan Anda secara detail..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Category */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleToggleCategory(cat)}
                      className={`px-3 py-1 rounded-full ${categories.includes(cat) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hashtag (Opsional, maks 8)
              </label>
              <p className="text-xs text-gray-500 mb-3">Tambahkan hashtag agar request Anda lebih mudah ditemukan</p>
              
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddHashtag();
                    }
                  }}
                  placeholder="Ketik hashtag dan tekan Enter"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={hashtags.length >= 8}
                />
                <button
                  type="button"
                  onClick={handleAddHashtag}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
                  disabled={hashtags.length >= 8}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Current Hashtags */}
              {hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveHashtag(tag)}
                        className="hover:text-green-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Suggested Hashtags */}
              {suggestedHashtags.length > 0 && hashtags.length < 8 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Saran hashtag populer:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedHashtags.filter(tag => !hashtags.includes(tag)).slice(0, 5).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleAddSuggestedHashtag(tag)}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget (Rp) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  placeholder="Minimum"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="number"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  placeholder="Maksimum"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Berikan range budget yang realistis</p>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline Pengerjaan <span className="text-red-500">*</span>
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Pilih timeline</option>
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline (Opsional)
              </label>
              <div className="flex gap-2">
                <select
                  value={deadlineType}
                  onChange={(e) => setDeadlineType(e.target.value as 'deadline' | 'jam-ditutup')}
                  className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="deadline">Deadline</option>
                  <option value="jam-ditutup">Jam Ditutup</option>
                </select>
                <input
                  type="text"
                  value={deadlineValue}
                  onChange={(e) => setDeadlineValue(e.target.value)}
                  placeholder="Contoh: 2023-12-31 23:59"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => onNavigate(from || 'requester-dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Buat Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}