import { useState } from 'react';
import { Plus, Eye, Clock, CheckCircle, XCircle, MessageCircle, Star, Users, Package, ShoppingBag, MessageSquare } from 'lucide-react';
import { User, ServiceRequest, Order } from '../App';
import { Header } from './Header';
import { getProposalsByRequestId, Proposal } from '../data/mockProposals';
import { getBuyerOrdersByUserId } from '../data/mockBuyerOrders';
import { FeedbackModal } from './ui/FeedbackModal';

type RequesterDashboardProps = {
  user: User;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
  myRequests: ServiceRequest[];
  initialProposalRequestId?: string;
};

export function RequesterDashboard({ user, onNavigate, onLogout, myRequests, initialProposalRequestId }: RequesterDashboardProps) {
  const [activeTab, setActiveTab] = useState<'requests' | 'purchases'>('requests');
  const [purchaseSubTab, setPurchaseSubTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(initialProposalRequestId || null);
  const [showProposals, setShowProposals] = useState<boolean>(!!initialProposalRequestId);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  
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

  // State untuk manage buyer orders
  const [buyerOrders, setBuyerOrders] = useState<Order[]>(getBuyerOrdersByUserId(user.id));

  const handleViewProposals = (requestId: string) => {
    setSelectedRequestId(requestId);
    setShowProposals(true);
  };

  const getProposalsForRequest = (requestId: string): Proposal[] => {
    return getProposalsByRequestId(requestId);
  };

  const handleConfirmComplete = (order: Order) => {
    setSelectedOrder(order);
    setRating(0);
    setReviewText('');
    setShowReviewModal(true);
  };

  const handleSubmitReview = () => {
    // Validate rating
    if (!selectedOrder || rating === 0) {
      setFeedbackModal({
        show: true,
        type: 'error',
        title: 'Rating Diperlukan',
        message: 'Mohon berikan rating minimal 1 bintang untuk melanjutkan',
        details: []
      });
      return;
    }

    // Update order status to "selesai" and add rating & review
    setBuyerOrders(buyerOrders.map(order => 
      order.id === selectedOrder.id 
        ? {
            ...order,
            status: 'selesai',
            rating: rating,
            review: reviewText || undefined,
            reviewedAt: new Date(),
            completedAt: new Date()
          }
        : order
    ));

    // Show professional confirmation feedback
    const details = [
      `Rating: ${rating} bintang`
    ];
    if (reviewText) {
      details.push(`Review: ${reviewText}`);
    }

    setFeedbackModal({
      show: true,
      type: 'success',
      title: 'Pesanan Dikonfirmasi Selesai',
      message: 'Terima kasih atas rating dan feedback Anda!',
      details: details
    });
    
    setShowReviewModal(false);
    setSelectedOrder(null);
    setRating(0);
    setReviewText('');
    // Stay on the same page (purchases tab) - no navigation needed
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'terbuka': 'bg-green-100 text-green-800',
      'diterima': 'bg-blue-100 text-blue-800',
      'proses': 'bg-yellow-100 text-yellow-800',
      'selesai': 'bg-gray-100 text-gray-800',
      'dibatalkan': 'bg-red-100 text-red-800',
      'menunggu': 'bg-yellow-100 text-yellow-800',
      'menunggu-konfirmasi': 'bg-orange-100 text-orange-800',
    };

    const labels = {
      'terbuka': 'Terbuka',
      'diterima': 'Diterima',
      'proses': 'Dalam Proses',
      'selesai': 'Selesai',
      'dibatalkan': 'Dibatalkan',
      'menunggu': 'Menunggu',
      'menunggu-konfirmasi': 'Menunggu Konfirmasi Anda'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const openRequests = myRequests.filter(r => r.status === 'terbuka');
  const activeRequests = myRequests.filter(r => r.status === 'diterima' || r.status === 'proses');
  const completedRequests = myRequests.filter(r => r.status === 'selesai');
  
  // Filter untuk purchases
  const completedPurchases = buyerOrders.filter(o => o.status === 'selesai');
  const inProgressPurchases = buyerOrders.filter(o => o.status === 'menunggu' || o.status === 'proses' || o.status === 'menunggu-konfirmasi');
  const pendingConfirmation = buyerOrders.filter(o => o.status === 'menunggu-konfirmasi');

  // Filter berdasarkan sub-tab
  const getFilteredPurchases = () => {
    if (purchaseSubTab === 'in-progress') {
      return inProgressPurchases;
    } else if (purchaseSubTab === 'completed') {
      return completedPurchases;
    }
    return buyerOrders; // 'all'
  };

  const filteredPurchases = getFilteredPurchases();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="requester-dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dasbor Saya</h1>
          <p className="text-gray-600">Kelola request dan pesanan Anda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Request Terbuka</p>
              <Eye className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{openRequests.length}</p>
            <p className="text-xs text-gray-500 mt-1">Menunggu proposal</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Request Aktif</p>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{activeRequests.length}</p>
            <p className="text-xs text-gray-500 mt-1">Sedang dikerjakan</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Pesanan Jasa</p>
              <ShoppingBag className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{inProgressPurchases.length}</p>
            <p className="text-xs text-gray-500 mt-1">Sedang berlangsung</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Selesai</p>
              <CheckCircle className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{completedRequests.length + completedPurchases.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total transaksi</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'requests'
                    ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Request Saya ({myRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('purchases')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'purchases'
                    ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Riwayat Pembelian Jasa ({buyerOrders.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Daftar Request</h2>
                  <button
                    onClick={() => onNavigate('create-request')}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Buat Request Baru
                  </button>
                </div>

                {myRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Request</h3>
                    <p className="text-gray-600 mb-6">Buat request pertama Anda dan terima proposal dari penyedia jasa</p>
                    <button
                      onClick={() => onNavigate('create-request')}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Buat Request Sekarang
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myRequests.map((request) => {
                      const proposals = getProposalsForRequest(request.id);
                      
                      return (
                        <div
                          key={request.id}
                          className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">{request.title}</h3>
                              <p className="text-sm text-gray-600 mb-3">{request.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {request.categories.map((cat, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                                    {cat}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center gap-6 text-sm text-gray-600">
                                <span>💰 Rp{request.budget.min.toLocaleString()} - Rp{request.budget.max.toLocaleString()}</span>
                                <span>⏱️ {request.timeline}</span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {proposals.length} proposal
                                </span>
                              </div>
                            </div>
                            {getStatusBadge(request.status)}
                          </div>

                          <div className="flex gap-3 pt-3 border-t border-gray-100">
                            <button
                              onClick={() => onNavigate('request-detail', { request, from: 'requester-dashboard' })}
                              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                            >
                              <Eye className="w-4 h-4 inline mr-1" />
                              Lihat Detail
                            </button>
                            {proposals.length > 0 && (
                              <button
                                onClick={() => handleViewProposals(request.id)}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm"
                              >
                                <Users className="w-4 h-4 inline mr-1" />
                                Lihat Proposal ({proposals.length})
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Riwayat Pembelian Jasa</h2>
                
                {/* Sub Tabs for Purchase Status */}
                <div className="flex gap-2 mb-6 border-b border-gray-200">
                  <button
                    onClick={() => setPurchaseSubTab('all')}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                      purchaseSubTab === 'all'
                        ? 'text-orange-600 border-orange-600'
                        : 'text-gray-600 border-transparent hover:text-gray-900'
                    }`}
                  >
                    Semua ({buyerOrders.length})
                  </button>
                  <button
                    onClick={() => setPurchaseSubTab('in-progress')}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                      purchaseSubTab === 'in-progress'
                        ? 'text-orange-600 border-orange-600'
                        : 'text-gray-600 border-transparent hover:text-gray-900'
                    }`}
                  >
                    Dalam Proses ({inProgressPurchases.length})
                  </button>
                  <button
                    onClick={() => setPurchaseSubTab('completed')}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                      purchaseSubTab === 'completed'
                        ? 'text-orange-600 border-orange-600'
                        : 'text-gray-600 border-transparent hover:text-gray-900'
                    }`}
                  >
                    Selesai ({completedPurchases.length})
                  </button>
                </div>

                {buyerOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Pembelian</h3>
                    <p className="text-gray-600 mb-6">Jelajahi marketplace dan pesan jasa yang Anda butuhkan</p>
                    <button
                      onClick={() => onNavigate('marketplace')}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      Jelajahi Jasa
                    </button>
                  </div>
                ) : filteredPurchases.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {purchaseSubTab === 'in-progress' ? 'Tidak Ada Pesanan Dalam Proses' : 'Tidak Ada Pesanan Selesai'}
                    </h3>
                    <p className="text-gray-600">
                      {purchaseSubTab === 'in-progress' 
                        ? 'Pesanan yang sedang berlangsung akan muncul di sini' 
                        : 'Pesanan yang sudah selesai akan muncul di sini'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPurchases.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4 flex-1">
                            <img 
                              src={order.providerName === 'Inaya Revalina' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' : order.buyerAvatar}
                              alt={order.providerName}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{order.serviceName}</h3>
                              <p className="text-sm text-gray-600 mb-2">Provider: {order.providerName}</p>
                              <p className="text-sm text-gray-700">{order.customNote}</p>
                            </div>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                          <span>📅 {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span>💰 Rp{(order.finalPrice || order.price).toLocaleString()}</span>
                          {order.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {order.rating}/5
                            </span>
                          )}
                        </div>

                        {/* Show review if exists */}
                        {order.review && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-gray-700 mb-1">
                              <span className="font-medium">Review Anda: </span>
                              {order.review}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= (order.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3">
                          {order.status === 'menunggu-konfirmasi' && (
                            <button
                              onClick={() => handleConfirmComplete(order)}
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                            >
                              <CheckCircle className="w-4 h-4 inline mr-1" />
                              Konfirmasi Selesai & Beri Rating
                            </button>
                          )}
                          {(order.status === 'proses' || order.status === 'menunggu-konfirmasi') && (
                            <button
                              onClick={() => onNavigate('chat', { 
                                ...order,
                                fromPage: 'requester-dashboard' 
                              })}
                              className="px-4 py-2 border border-slate-900 text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-sm"
                            >
                              <MessageSquare className="w-4 h-4 inline mr-1" />
                              Chat
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Proposals Modal */}
        {showProposals && selectedRequestId && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Proposal yang Masuk</h3>
                <p className="text-sm text-gray-600 mt-1">Pilih penyedia jasa terbaik untuk request Anda</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {getProposalsForRequest(selectedRequestId).map((proposal) => (
                    <div key={proposal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4 mb-3">
                        <img
                          src={proposal.providerAvatar}
                          alt={proposal.providerName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{proposal.providerName}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{proposal.providerRating} ({proposal.providerReviews} review)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Harga penawaran</p>
                          <p className="font-semibold text-gray-900">Rp{proposal.proposedPrice.toLocaleString()}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{proposal.message}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          {new Date(proposal.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              // Create a mock order for chat purposes
                              const requestData = myRequests.find(r => r.id === selectedRequestId);
                              const chatOrder = {
                                id: `CHAT-${proposal.id}`,
                                serviceName: requestData?.title || 'Request',
                                buyerId: user.id,
                                buyerName: user.name,
                                buyerAvatar: user.avatar,
                                providerId: proposal.providerId,
                                providerName: proposal.providerName,
                                status: 'menunggu' as const,
                                price: proposal.proposedPrice,
                                finalPrice: null,
                                isPriceFixed: false,
                                customNote: `Proposal: ${proposal.message}`,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                fromPage: 'requester-dashboard-proposal',
                                // Save request data to return to proposal modal
                                proposalModalData: {
                                  requestId: selectedRequestId,
                                  requestTitle: requestData?.title
                                }
                              };
                              onNavigate('chat', chatOrder);
                            }}
                            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm flex items-center gap-1"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Chat
                          </button>
                          <button
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm"
                          >
                            Terima Proposal
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowProposals(false)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Konfirmasi & Beri Rating</h3>
                <p className="text-sm text-gray-600 mt-1">Bagaimana pengalaman Anda dengan jasa ini?</p>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Jasa</p>
                  <p className="font-medium text-gray-900">{selectedOrder.serviceName}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Provider</p>
                  <p className="font-medium text-gray-900">{selectedOrder.providerName}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review (opsional)
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={4}
                    placeholder="Ceritakan pengalaman Anda..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Konfirmasi & Kirim Rating
                </button>
              </div>
            </div>
          </div>
        )}
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
    </div>
  );
}