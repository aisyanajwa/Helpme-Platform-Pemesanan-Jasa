import { useState } from 'react';
import { ArrowLeft, Plus, X, Tag } from 'lucide-react';
import { User, ServiceListing } from '../App';
import { Header } from './Header';
import { getCategoryOptions, getSuggestedHashtags } from '../utils/categories';

type CreateServicePageProps = {
  user: User;
  onNavigate: (page: any) => void;
  onLogout: () => void;
  onCreateService: (service: Omit<ServiceListing, 'id' | 'providerId' | 'providerName' | 'providerAvatar' | 'providerRating' | 'providerReviews' | 'createdAt' | 'isActive'>) => void;
};

export function CreateServicePage({ user, onNavigate, onLogout, onCreateService }: CreateServicePageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<'tetap' | 'per-jam' | 'mulai-dari'>('mulai-dari');
  const [deliveryTime, setDeliveryTime] = useState('');

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
    
    if (!title || !description || categories.length === 0 || !price || !deliveryTime) {
      alert('Mohon lengkapi semua kolom yang wajib diisi');
      return;
    }

    onCreateService({
      title,
      description,
      categories,
      hashtags,
      price: parseFloat(price),
      priceType,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      deliveryTime
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="create-service" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('provider-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Jasa Baru</h1>
          <p className="text-gray-600 mb-6">Jasa Anda akan muncul di katalog jasa dan dapat dilihat semua pengguna</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Jasa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Jasa Pembuatan Website Profesional"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan jasa Anda secara detail..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori (Pilih 1-5) <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">Pilih beberapa kategori agar jasa Anda lebih mudah ditemukan</p>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleToggleCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      categories.includes(cat)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={!categories.includes(cat) && categories.length >= 5}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {categories.length > 0 && (
                <p className="text-xs text-green-600 mt-2">
                  {categories.length} kategori dipilih (maks 5)
                </p>
              )}
            </div>

            {/* Hashtags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagar (Opsional, maks 8)
              </label>
              <p className="text-xs text-gray-500 mb-3">Tambahkan tagar untuk membantu pencarian dan notifikasi</p>
              
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
                  placeholder="Ketik tagar dan tekan Enter"
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
                  <p className="text-xs text-gray-500 mb-2">Saran tagar populer:</p>
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

            {/* Pricing */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="50000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Harga final bisa didiskusikan dengan klien</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Harga <span className="text-red-500">*</span>
                </label>
                <select
                  value={priceType}
                  onChange={(e) => setPriceType(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="mulai-dari">Mulai Dari</option>
                  <option value="per-jam">Per Jam</option>
                  <option value="tetap">Harga Tetap</option>
                </select>
              </div>
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimasi Waktu Pengerjaan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                placeholder="Contoh: 3-5 hari, 1 minggu, Fleksibel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('provider-dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Buat Jasa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
