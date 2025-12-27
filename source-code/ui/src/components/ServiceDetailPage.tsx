import { useState } from 'react';
import { Star, Clock, MessageCircle, ArrowLeft, Tag, Folder, Bookmark, BookmarkCheck } from 'lucide-react';
import { User, ServiceListing } from '../App';
import { Header } from './Header';

type ServiceDetailPageProps = {
  user: User;
  service: ServiceListing;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
  isSaved: boolean;
  onSaveService: (service: ServiceListing) => void;
  onUnsaveService: (serviceId: string) => void;
};

export function ServiceDetailPage({ user, service, onNavigate, onLogout, isSaved, onSaveService, onUnsaveService }: ServiceDetailPageProps) {
  const [message, setMessage] = useState('');

  // Check if this is user's own service
  const isOwnService = service.providerId === user.id;
  
  // Determine back button destination
  const backDestination = (service as any).from || 'marketplace';
  const backLabel = backDestination === 'provider-dashboard' ? 'Dasbor Penyedia Jasa' : 'Marketplace';

  const handleOrder = () => {
    const mockOrder = {
      id: 'ORD' + Date.now(),
      serviceId: service.id,
      serviceName: service.title,
      serviceImage: service.image,
      categories: service.categories,
      hashtags: service.hashtags,
      buyerId: user.id,
      buyerName: user.name,
      buyerAvatar: user.avatar,
      sellerId: service.providerId,
      sellerName: service.providerName,
      sellerAvatar: service.providerAvatar,
      providerId: service.providerId,
      providerName: service.providerName,
      providerAvatar: service.providerAvatar,
      status: 'pending' as const,
      price: service.price,
      createdAt: new Date(),
      orderDate: new Date(),
      customNote: message || 'Halo! Saya tertarik dengan jasa Anda.',
      chatEnabled: true,
      isPriceFixed: service.priceType === 'fix',
      fromPage: 'service-detail', // Add reference to return to service detail
      serviceData: service // Add full service data to return
    };
    onNavigate('chat', mockOrder);
  };

  const handleSaveService = () => {
    if (isSaved) {
      onUnsaveService(service.id);
    } else {
      onSaveService(service);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="service-detail" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate(backDestination)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke {backLabel}
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={service.providerAvatar}
                  alt={service.providerName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{service.providerName}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span className="text-sm font-medium">{service.providerRating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({service.providerReviews} ulasan)</span>
                  </div>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Kategori & Tag</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {service.categories && service.categories.map((cat, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
                {service.hashtags && service.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.hashtags.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded text-sm">
                        <Tag className="w-3 h-3" />
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl mb-3 text-gray-900">Tentang Jasa Ini</h2>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Waktu Pengerjaan</p>
                    <p className="text-sm text-gray-600">{service.deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Star className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Rating</p>
                    <p className="text-sm text-gray-600">{service.providerRating}/5 dari {service.providerReviews} ulasan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl mb-6 text-gray-900">Ulasan Pelanggan</h2>
              <div className="space-y-6">
                {/* Mock Reviews */}
                {[
                  {
                    name: 'Ahmad Rizki',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
                    rating: 5,
                    date: '2 minggu lalu',
                    comment: 'Pelayanan sangat memuaskan! Pekerjaan selesai tepat waktu dan hasilnya melebihi ekspektasi.'
                  },
                  {
                    name: 'Siti Nurhaliza',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
                    rating: 5,
                    date: '1 bulan lalu',
                    comment: 'Sangat profesional dan responsif. Recommended!'
                  }
                ].map((review, idx) => (
                  <div key={idx} className="pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex items-start gap-3">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-900">{review.name}</p>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    {service.priceType === 'mulai-dari' ? 'Mulai dari' : 
                     service.priceType === 'per-jam' ? 'Harga per jam' : 'Harga'}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    Rp{(service.price || 0).toLocaleString()}
                  </p>
                  {service.priceType === 'per-jam' && (
                    <p className="text-sm text-gray-500">/jam</p>
                  )}
                  {service.priceType === 'mulai-dari' && (
                    <p className="text-sm text-gray-500">*Harga final setelah diskusi</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Catatan:</strong> Harga final akan ditentukan setelah diskusi dengan penyedia jasa sesuai kebutuhan Anda.
                  </p>
                </div>

                {isOwnService ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
                    <p className="text-sm text-gray-700 text-center">
                      <strong>Ini adalah jasa Anda</strong><br />
                      Gunakan Dasbor Penyedia Jasa untuk mengelola jasa ini.
                    </p>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleOrder}
                      className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat dengan Penyedia
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Chat untuk diskusi detail dan negosiasi harga
                    </p>
                  </>
                )}

                <button
                  onClick={handleSaveService}
                  className={`w-full px-6 py-3 ${isSaved ? 'bg-gray-300 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg transition-colors flex items-center justify-center gap-2 mt-3`}
                >
                  {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  {isSaved ? 'Simpan' : 'Simpan Jasa'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}