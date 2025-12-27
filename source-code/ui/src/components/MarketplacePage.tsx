import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Star, Plus, Bookmark, BookmarkCheck } from 'lucide-react';
import { User, ServiceListing } from '../App';
import { Header } from './Header';
import { getAllCategories } from '../utils/categories';
import { mockServiceListings } from '../data/mockServices';

type MarketplacePageProps = {
  user: User;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
  savedServices: ServiceListing[];
  onSaveService: (service: ServiceListing) => void;
  onUnsaveService: (serviceId: string) => void;
};

const priceRanges = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: 'Di bawah Rp50.000', min: 0, max: 50000 },
  { label: 'Rp50.000 - Rp200.000', min: 50000, max: 200000 },
  { label: 'Rp200.000 - Rp500.000', min: 200000, max: 500000 },
  { label: 'Di atas Rp500.000', min: 500000, max: Infinity },
];

export function MarketplacePage({ user, onNavigate, onLogout, savedServices, onSaveService, onUnsaveService }: MarketplacePageProps) {
  const [services, setServices] = useState<ServiceListing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Jasa');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setServices(mockServiceListings);
  }, []);

  const filteredServices = services
    .filter((service) => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua Jasa' || service.categories.includes(selectedCategory);
      const matchesPrice = service.price >= selectedPriceRange.min && service.price <= selectedPriceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt.getTime() - a.createdAt.getTime();
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.providerRating - a.providerRating; // popular (by rating)
    });

  const formatPrice = (price: number, type: string) => {
    const formatted = `Rp${price.toLocaleString()}`;
    if (type === 'per-jam') return `${formatted}/jam`;
    if (type === 'mulai-dari') return `Mulai dari ${formatted}`;
    return formatted;
  };

  const allCategories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="marketplace" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Jelajahi Jasa</h1>
          <p className="text-gray-600">Telusuri jasa yang tersedia dari berbagai penyedia jasa terpercaya</p>
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari jasa..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filter
            </button>
            <button
              onClick={() => onNavigate('browse-requests')}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Lihat Request Terbuka
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
                <select
                  value={selectedPriceRange.label}
                  onChange={(e) => setSelectedPriceRange(priceRanges.find(r => r.label === e.target.value) || priceRanges[0])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="newest">Terbaru</option>
                  <option value="price-low">Harga: Rendah ke Tinggi</option>
                  <option value="price-high">Harga: Tinggi ke Rendah</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                }}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredServices.length} jasa ditemukan
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onNavigate('service-detail', service)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {service.categories.slice(0, 2).map((cat, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                      {cat}
                    </span>
                  ))}
                  {service.categories.length > 2 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      +{service.categories.length - 2}
                    </span>
                  )}
                </div>
                
                {/* Hashtags */}
                {service.hashtags && service.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.hashtags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                    {service.hashtags.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        +{service.hashtags.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={service.providerAvatar}
                    alt={service.providerName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{service.providerName}</span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  <span className="text-sm font-medium text-gray-900">{service.providerRating}</span>
                  <span className="text-sm text-gray-500">({service.providerReviews})</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    {service.priceType === 'mulai-dari' && (
                      <p className="text-xs text-gray-500">Mulai dari</p>
                    )}
                    <span className="font-semibold text-gray-900">
                      Rp{service.price.toLocaleString()}
                      {service.priceType === 'per-jam' && <span className="text-xs text-gray-500">/jam</span>}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{service.deliveryTime}</span>
                </div>

                {/* Save Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (savedServices.some(s => s.id === service.id)) {
                      onUnsaveService(service.id);
                    } else {
                      onSaveService(service);
                    }
                  }}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm transition-colors"
                >
                  {savedServices.some(s => s.id === service.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-gray-400 hover:text-orange-500" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Tidak ada jasa yang sesuai dengan kriteria pencarian Anda.</p>
            <button
              onClick={() => onNavigate('create-request', { from: 'marketplace' })}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Buat Request Custom
            </button>
          </div>
        )}
      </div>
    </div>
  );
}