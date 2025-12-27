import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Package, MessageCircle, TrendingUp, DollarSign, Calendar, CheckCircle, Star, AlertCircle } from 'lucide-react';
import { User, ServiceListing, Order } from '../App';
import { Header } from './Header';
import { getOrdersByProviderId } from '../data/mockOrders';
import { FeedbackModal } from './ui/FeedbackModal';

type ProviderDashboardProps = {
  user: User;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
  myServices: ServiceListing[];
  onDeleteService: (serviceId: string) => void;
  savedServices: ServiceListing[];
  onSaveService: (service: ServiceListing) => void;
  onUnsaveService: (serviceId: string) => void;
  initialTab?: 'services' | 'orders' | 'reviews';
  orderUpdates?: Record<string, Partial<Order>>;
};

export function ProviderDashboard({ user, onNavigate, onLogout, myServices, onDeleteService, savedServices, onSaveService, onUnsaveService, initialTab, orderUpdates = {} }: ProviderDashboardProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'orders' | 'reviews'>(initialTab || 'services');
  
  // Get orders from mock data and apply updates
  const baseOrders = getOrdersByProviderId(user.id);
  const orders = baseOrders.map(order => ({
    ...order,
    ...(orderUpdates[order.id] || {})
  }));
  
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);
  
  // State for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  // Handler untuk update order dari chat (misal: fix harga)
  const handleUpdateOrder = (orderId: string, updates: Partial<Order>) => {
    setLocalOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, ...updates, updatedAt: new Date() }
          : order
      )
    );
  };

  // State for feedback modal
  const [feedbackModal, setFeedbackModal] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
    details?: string[];
  }>({
    show: false,
    type: 'success',
    title: '',
    message: '',
    details: []
  });

  const handleViewService = (service: ServiceListing) => {
    onNavigate('service-detail', { 
      service, 
      from: 'provider-dashboard' // Add from parameter for navigation
    });
  };

  const handleMarkComplete = (orderId: string) => {
    // Update status to "menunggu-konfirmasi" 
    setLocalOrders(localOrders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'menunggu-konfirmasi', updatedAt: new Date() }
        : order
    ));
    
    setFeedbackModal({
      show: true,
      type: 'info',
      title: 'Pesanan Ditandai Selesai',
      message: 'Pesanan telah ditandai selesai dan menunggu konfirmasi dari customer.',
      details: []
    });
  };

  const getStatusBadge = (status: string, isPriceFixed?: boolean) => {
    const styles = {
      'menunggu': 'bg-yellow-100 text-yellow-800',
      'proses': 'bg-blue-100 text-blue-800',
      'menunggu-konfirmasi': 'bg-orange-100 text-orange-800',
      'selesai': 'bg-green-100 text-green-800',
      'dibatalkan': 'bg-red-100 text-red-800',
    };

    const labels = {
      'menunggu': isPriceFixed ? 'Menunggu Dikerjakan' : 'Menunggu Fix Harga',
      'proses': 'Sedang Dikerjakan',
      'menunggu-konfirmasi': 'Menunggu Konfirmasi Customer',
      'selesai': 'Selesai',
      'dibatalkan': 'Dibatalkan'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const handleDeleteService = (serviceId: string) => {
    setServiceToDelete(serviceId);
    setShowDeleteModal(true);
  };

  const confirmDeleteService = () => {
    if (serviceToDelete) {
      onDeleteService(serviceToDelete);
      setShowDeleteModal(false);
    }
  };

  const activeServices = myServices.filter(s => s.isActive);
  const pendingOrders = localOrders.filter(o => o.status === 'menunggu');
  const activeOrdersList = localOrders.filter(o => o.status === 'proses' || o.status === 'menunggu-konfirmasi');
  const completedOrders = localOrders.filter(o => o.status === 'selesai');
  const reviewedOrders = completedOrders.filter(o => o.rating && o.rating > 0);
  const totalEarnings = completedOrders.reduce((sum, order) => sum + (order.finalPrice || 0), 0);
  const activeOrders = pendingOrders.length + activeOrdersList.length;
  const averageRating = reviewedOrders.length > 0 
    ? (reviewedOrders.reduce((sum, order) => sum + (order.rating || 0), 0) / reviewedOrders.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="provider-dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dasbor Penyedia Jasa</h1>
          <p className="text-gray-600">Kelola jasa dan pesanan Anda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Jasa Aktif</p>
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{activeServices.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total {myServices.length} jasa</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Pesanan Aktif</p>
              <MessageCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{activeOrders}</p>
            <p className="text-xs text-gray-500 mt-1">Sedang berjalan</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Pendapatan</p>
              <DollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">Rp{(totalEarnings / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500 mt-1">Bulan ini</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Rating</p>
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
            <p className="text-xs text-gray-500 mt-1">{reviewedOrders.length} review</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Selesai</p>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{completedOrders.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total pesanan</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('services')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'services'
                    ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Jasa Saya ({myServices.length})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'orders'
                    ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Pesanan ({activeOrders})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Review & Rating ({reviewedOrders.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Daftar Jasa</h2>
                  <button
                    onClick={() => onNavigate('create-service')}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Buat Jasa Baru
                  </button>
                </div>

                {myServices.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Jasa</h3>
                    <p className="text-gray-600 mb-6">Mulai tawarkan jasa Anda kepada ribuan pengguna</p>
                    <button
                      onClick={() => onNavigate('create-service')}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Buat Jasa Pertama Anda
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myServices.map((service) => (
                      <div
                        key={service.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                {service.isActive ? (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    Aktif
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium flex items-center gap-1">
                                    <EyeOff className="w-3 h-3" />
                                    Nonaktif
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {service.categories.map((cat, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                                  {cat}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {service.priceType === 'mulai-dari' ? 'Mulai dari' :
                                   service.priceType === 'per-jam' ? 'Per jam' : 'Harga tetap'}
                                </p>
                                <p className="font-semibold text-gray-900">Rp{service.price.toLocaleString()}</p>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleViewService(service)}
                                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Lihat detail"
                                >
                                  <Eye className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => onNavigate('edit-service', service)}
                                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit jasa"
                                >
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteService(service.id)}
                                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Hapus jasa"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Daftar Pesanan</h2>
                
                {localOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Pesanan</h3>
                    <p className="text-gray-600">Pesanan dari klien akan muncul di sini</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {localOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4 flex-1">
                            <img 
                              src={order.buyerAvatar} 
                              alt={order.buyerName}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{order.serviceName}</h3>
                              <p className="text-sm text-gray-600 mb-2">Customer: {order.buyerName}</p>
                              <p className="text-sm text-gray-700">{order.customNote}</p>
                            </div>
                          </div>
                          {getStatusBadge(order.status, order.isPriceFixed)}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            💰 {order.isPriceFixed ? `Rp${(order.finalPrice || order.price).toLocaleString()}` : `Rp${order.price.toLocaleString()} (belum fix)`}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => onNavigate('chat', { ...order, fromPage: 'provider-dashboard', fromTab: 'orders' })}
                            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                          >
                            <MessageCircle className="w-4 h-4 inline mr-1" />
                            Chat Customer
                          </button>
                          {order.status === 'proses' && (
                            <button
                              onClick={() => handleMarkComplete(order.id)}
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                            >
                              <CheckCircle className="w-4 h-4 inline mr-1" />
                              Tandai Selesai Dikerjakan
                            </button>
                          )}
                          {order.status === 'menunggu-konfirmasi' && (
                            <div className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Menunggu customer konfirmasi
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Rating dari Customer</h2>
                
                {reviewedOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Review</h3>
                    <p className="text-gray-600">Review dari customer akan muncul di sini setelah pesanan selesai</p>
                  </div>
                ) : (
                  <div>
                    {/* Rating Summary */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6 mb-6">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</p>
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-5 h-5 ${star <= parseFloat(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{reviewedOrders.length} review</p>
                        </div>

                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = reviewedOrders.filter(o => o.rating === rating).length;
                            const percentage = reviewedOrders.length > 0 ? (count / reviewedOrders.length) * 100 : 0;
                            return (
                              <div key={rating} className="flex items-center gap-3 mb-2">
                                <span className="text-sm text-gray-600 w-8">{rating} ⭐</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-yellow-400 h-2 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600 w-8">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-4">
                      {reviewedOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4 mb-3">
                            <img 
                              src={order.buyerAvatar} 
                              alt={order.buyerName}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{order.buyerName}</h3>
                              <p className="text-sm text-gray-600">{order.serviceName}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                      key={star} 
                                      className={`w-4 h-4 ${star <= (order.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {order.reviewedAt && new Date(order.reviewedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {order.review && (
                            <div className="bg-gray-50 rounded-lg p-4 mt-3">
                              <p className="text-sm text-gray-700 leading-relaxed">{order.review}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {feedbackModal.show && (
        <FeedbackModal
          type={feedbackModal.type}
          title={feedbackModal.title}
          message={feedbackModal.message}
          details={feedbackModal.details}
          onClose={() => setFeedbackModal({ ...feedbackModal, show: false })}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Hapus Jasa</h3>
                  <p className="text-sm text-blue-200">Konfirmasi tindakan</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <p className="text-gray-600 leading-relaxed mb-6">
                Apakah Anda yakin ingin menghapus jasa ini? Tindakan ini tidak dapat dibatalkan dan semua data jasa akan dihapus permanen.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDeleteService}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-orange-500/25"
                >
                  Hapus Jasa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}