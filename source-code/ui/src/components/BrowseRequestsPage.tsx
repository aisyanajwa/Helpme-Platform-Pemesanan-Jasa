import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, DollarSign, Clock, MessageCircle, Plus } from 'lucide-react';
import { User, ServiceRequest } from '../App';
import { Header } from './Header';
import { getAllCategories } from '../utils/categories';

type BrowseRequestsPageProps = {
  user: User;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
  publicRequests: ServiceRequest[];
};

export function BrowseRequestsPage({ user, onNavigate, onLogout, publicRequests }: BrowseRequestsPageProps) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Jasa');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'budget-high' | 'budget-low' | 'responses'>('newest');
  const [subscribedOnly, setSubscribedOnly] = useState(false);

  useEffect(() => {
    setRequests(publicRequests);
  }, [publicRequests]);

  const filteredRequests = requests
    .filter((request) => {
      const matchesSearch = 
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'Semua Jasa' || 
        request.categories.includes(selectedCategory);

      const matchesSubscription = 
        !subscribedOnly || 
        !user.subscribedHashtags ||
        request.hashtags?.some(tag => user.subscribedHashtags?.includes(tag));

      return matchesSearch && matchesCategory && matchesSubscription;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt.getTime() - a.createdAt.getTime();
      if (sortBy === 'budget-high') return b.budget.max - a.budget.max;
      if (sortBy === 'budget-low') return a.budget.min - b.budget.min;
      if (sortBy === 'responses') return (b.proposalCount || 0) - (a.proposalCount || 0);
      return 0;
    });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Baru saja';
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} hari yang lalu`;
  };

  const allCategories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="browse-requests" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Jelajahi Request Jasa</h1>
          <p className="text-gray-600">Request publik dari pengguna yang membutuhkan jasa Anda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{filteredRequests.length}</p>
                <p className="text-sm text-gray-600">Request Aktif</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {requests.reduce((sum, r) => sum + (r.proposalCount || 0), 0)}
                </p>
                <p className="text-sm text-gray-600">Total Proposal</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {requests.filter(r => {
                    const hoursSince = (Date.now() - r.createdAt.getTime()) / (1000 * 60 * 60);
                    return hoursSince < 24;
                  }).length}
                </p>
                <p className="text-sm text-gray-600">Request Hari Ini</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari request jasa..."
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
            {user.isProvider && (
              <button
                onClick={() => onNavigate('create-request', { from: 'browse-requests' })}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Buat Request Jasa
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="newest">Terbaru</option>
                  <option value="budget-high">Budget Tertinggi</option>
                  <option value="budget-low">Budget Terendah</option>
                  <option value="responses">Paling Banyak Proposal</option>
                </select>
              </div>
              {user.isProvider && user.subscribedCategories && user.subscribedCategories.length > 0 && (
                <div className="flex items-end">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscribedOnly}
                      onChange={(e) => setSubscribedOnly(e.target.checked)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 mr-2"
                    />
                    <span className="text-sm text-gray-700">Hanya kategori yang saya ikuti</span>
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
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

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredRequests.length} request ditemukan
          </p>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={request.requesterAvatar}
                  alt={request.requesterName}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{request.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        oleh {request.requesterName} • {formatTimeAgo(request.createdAt)}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium whitespace-nowrap ml-4">
                      Rp{request.budget.min.toLocaleString()} - Rp{request.budget.max.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{request.description}</p>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {request.categories.slice(0, 2).map((cat, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                        {cat}
                      </span>
                    ))}
                    {request.categories.length > 2 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                        +{request.categories.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      ⏱️ {request.timeline}
                    </span>
                    <span className="flex items-center gap-1">
                      💼 {request.proposalCount || 0} proposal
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => onNavigate('request-detail', { ...request, from: 'browse-requests' })}
                      className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Lihat Detail
                    </button>
                    {request.requesterId !== user.id && (
                      <button 
                        onClick={() => {
                          // Create a mock order for chat purposes - provider chatting with requester
                          const chatOrder = {
                            id: `CHAT-REQ-${request.id}`,
                            serviceName: request.title,
                            buyerId: request.requesterId,
                            buyerName: request.requesterName,
                            buyerAvatar: request.requesterAvatar,
                            providerId: user.id,
                            providerName: user.name,
                            status: 'menunggu' as const,
                            price: request.budget.min,
                            finalPrice: null,
                            isPriceFixed: false,
                            customNote: `Request: ${request.description}`,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            fromPage: 'browse-requests'
                          };
                          onNavigate('chat', chatOrder);
                        }}
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Chat Sekarang
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">Tidak ada request yang sesuai dengan filter Anda</p>
              <button
                onClick={() => {
                  setSelectedCategory('Semua Jasa');
                  setSearchQuery('');
                  setSubscribedOnly(false);
                }}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}