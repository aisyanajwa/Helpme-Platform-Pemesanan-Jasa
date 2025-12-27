import { useState } from 'react';
import { ArrowLeft, MessageCircle, Clock, DollarSign, Tag, Calendar } from 'lucide-react';
import { User, ServiceRequest } from '../App';
import { Header } from './Header';

type RequestDetailPageProps = {
  user: User;
  request: ServiceRequest;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
};

export function RequestDetailPage({ user, request, onNavigate, onLogout }: RequestDetailPageProps) {
  const handleChatWithRequester = () => {
    // Bisa langsung chat tanpa harus terima request dulu
    const mockOrder = {
      id: 'ORD' + Date.now(),
      requestId: request.id,
      serviceTitle: request.title,
      serviceName: request.title,
      serviceImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      categories: request.categories,
      hashtags: request.hashtags,
      buyerId: request.requesterId,
      buyerName: request.requesterName,
      buyerAvatar: request.requesterAvatar,
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatar: user.avatar,
      providerId: user.id,
      providerName: user.name,
      providerAvatar: user.avatar,
      status: 'menunggu' as const,
      price: request.budget.min,
      createdAt: new Date(),
      orderDate: new Date(),
      customNote: request.description,
      chatEnabled: true,
      isPriceFixed: false,
      fromPage: 'request-detail',
      requestData: request
    };
    onNavigate('chat', mockOrder);
  };

  // Determine back button destination based on 'from' parameter
  const backDestination = (request as any).from || 'browse-requests';
  const backLabel = backDestination === 'requester-dashboard' ? 'Dasbor Saya' : 
                    backDestination === 'provider-dashboard' ? 'Dasbor Penyedia Jasa' : 'Request Terbuka';
  
  // Check if viewing from provider dashboard - if so, disable chat
  const isViewOnlyMode = backDestination === 'provider-dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="request-detail" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate(backDestination)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke {backLabel}
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Request Header */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{request.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={request.requesterAvatar}
                  alt={request.requesterName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{request.requesterName}</p>
                  <p className="text-sm text-gray-500">Diposting {new Date(request.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
              </div>

              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                request.status === 'terbuka' ? 'bg-green-100 text-green-700' :
                request.status === 'diterima' ? 'bg-blue-100 text-blue-700' :
                request.status === 'proses' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {request.status === 'terbuka' ? 'Terbuka' :
                 request.status === 'diterima' ? 'Diterima' :
                 request.status === 'proses' ? 'Dalam Proses' : request.status}
              </span>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-6 mb-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Deskripsi Kebutuhan</h2>
              <p className="text-gray-700 leading-relaxed">{request.description}</p>
            </div>

            {/* Categories & Hashtags */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Kategori & Tagar</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {request.categories.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    {cat}
                  </span>
                ))}
              </div>
              {request.hashtags && request.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {request.hashtags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded text-sm">
                      <Tag className="w-3 h-3" />
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Budget</p>
                  <p className="text-sm text-gray-600">
                    Rp{request.budget.min.toLocaleString()} - Rp{request.budget.max.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Timeline</p>
                  <p className="text-sm text-gray-600">{request.timeline}</p>
                </div>
              </div>

              {request.deadlineType && request.deadlineValue && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.deadlineType === 'deadline' ? 'Deadline' : 'Jam Ditutup'}
                    </p>
                    <p className="text-sm text-gray-600">{request.deadlineValue}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <MessageCircle className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Proposal</p>
                  <p className="text-sm text-gray-600">{request.proposalCount || 0} penyedia tertarik</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {request.status === 'terbuka' && user.isProvider && request.requesterId !== user.id && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Tertarik dengan Request Ini?</h3>
              <p className="text-sm text-gray-600 mb-4">
                {isViewOnlyMode 
                  ? 'Detail request ini hanya untuk dilihat dari dasbor penyedia jasa.'
                  : 'Hubungi klien untuk mendiskusikan detail dan harga sebelum mengambil pekerjaan ini.'}
              </p>
              <button
                onClick={isViewOnlyMode ? undefined : handleChatWithRequester}
                disabled={isViewOnlyMode}
                className={`w-full px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-sm ${
                  isViewOnlyMode 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Chat dengan Klien
              </button>
              {!isViewOnlyMode && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Anda bisa chat langsung tanpa harus menerima request terlebih dahulu
                </p>
              )}
            </div>
          )}

          {/* Info untuk Request Sendiri */}
          {request.requesterId === user.id && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Ini Request Anda</h3>
              <p className="text-sm text-gray-600">
                Anda tidak dapat mengambil request yang Anda buat sendiri. Tunggu penyedia jasa lain untuk menghubungi Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}