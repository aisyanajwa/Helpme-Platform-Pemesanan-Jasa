import { Bookmark, BookmarkCheck, Trash2 } from 'lucide-react';
import { User, ServiceListing } from '../App';
import { Header } from './Header';
import { useState } from 'react';

type SavedServicesPageProps = {
  user: User;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
  savedServices: ServiceListing[];
  onUnsaveService: (serviceId: string) => void;
};

export function SavedServicesPage({ user, onNavigate, onLogout, savedServices, onUnsaveService }: SavedServicesPageProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [serviceToRemove, setServiceToRemove] = useState<string | null>(null);

  const handleUnsave = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setServiceToRemove(serviceId);
    setShowConfirmModal(true);
  };

  const confirmRemove = () => {
    if (serviceToRemove) {
      onUnsaveService(serviceToRemove);
    }
    setShowConfirmModal(false);
    setServiceToRemove(null);
  };

  const cancelRemove = () => {
    setShowConfirmModal(false);
    setServiceToRemove(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="saved-services" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Koleksi Jasa Tersimpan</h1>
          <p className="text-gray-600">Jasa yang Anda simpan untuk referensi atau kebutuhan di masa depan</p>
        </div>

        {savedServices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Jasa yang Disimpan</h3>
            <p className="text-gray-600 mb-6">
              Simpan jasa yang menarik agar mudah ditemukan kembali
            </p>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Jelajahi Jasa
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {savedServices.length} jasa tersimpan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => onNavigate('service-detail', service)}
                >
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={(e) => handleUnsave(service.id, e)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                        title="Hapus dari koleksi"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <div className="p-2 bg-orange-500 rounded-full shadow-md">
                        <BookmarkCheck className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      {service.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={service.providerAvatar}
                        alt={service.providerName}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{service.providerName}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.categories.slice(0, 2).map((cat, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                          {cat}
                        </span>
                      ))}
                      {service.categories.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          +{service.categories.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">
                          {service.priceType === 'mulai-dari' ? 'Mulai dari' :
                           service.priceType === 'per-jam' ? 'Per jam' : 'Harga tetap'}
                        </p>
                        <p className="font-semibold text-gray-900">
                          Rp{service.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="font-medium text-gray-900">{service.providerRating}/5</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Hapus dari Koleksi</h3>
                    <p className="text-sm text-blue-200">Konfirmasi tindakan</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Apakah Anda yakin ingin menghapus jasa ini dari koleksi? Anda dapat menyimpannya kembali kapan saja.
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={cancelRemove}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmRemove}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-orange-500/25"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}