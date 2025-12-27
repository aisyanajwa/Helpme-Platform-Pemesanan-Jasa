import { useState } from 'react';
import { User } from '../App';
import { Navigation } from './Navigation';
import { MapPin, DollarSign, Calendar, Tag } from 'lucide-react';

type CreateRequestProps = {
  user: User;
  onNavigate: (page: 'home' | 'dashboard' | 'create' | 'browse' | 'chat' | 'profile') => void;
  onLogout: () => void;
};

const categories = [
  'HelpLift - Angkat barang, pindahan, angkat galon',
  'HelpRun - Kurir lokal, titip beli, ambil barang',
  'HelpPet - Penjagaan hewan, mencari hewan hilang',
  'HelpLove - Blind date assistant, intel pasangan',
  'HelpFix - Bantuan teknis ringan',
  'HelpTask - Antri, print tugas, beli makan',
  'HelpCustom - Permintaan unik apa saja'
];

export function CreateRequest({ user, onNavigate, onLogout }: CreateRequestProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would send to backend
    console.log({ title, description, category, location, budget, deadline });
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setLocation('');
    setBudget('');
    setDeadline('');

    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="create" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl mb-2">Buat Request Baru</h1>
          <p className="text-slate-600 mb-8">Ceritakan bantuan apa yang Anda butuhkan</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-slate-700 mb-2">
                Judul Request <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Contoh: Tolong Ambil Kucing di Pohon"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-700 mb-2">
                Deskripsi Detail <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Jelaskan secara detail bantuan yang Anda butuhkan..."
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-slate-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-slate-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Lokasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Contoh: Bandung, Jawa Barat"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-slate-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Budget (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="50000"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-slate-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Deadline (Opsional)
              </label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Posting Request
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl mb-2">Request Berhasil Dibuat!</h2>
            <p className="text-slate-600">Request Anda telah dipublikasikan dan akan segera dilihat oleh provider.</p>
          </div>
        </div>
      )}
    </div>
  );
}