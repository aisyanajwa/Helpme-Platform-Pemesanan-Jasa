import { MessageCircle, Search, Clock, User as UserIcon } from 'lucide-react';
import { User, Order } from '../App';
import { Header } from './Header';
import { getOrdersByProviderId } from '../data/mockOrders';
import { getBuyerOrdersByUserId } from '../data/mockBuyerOrders';

type ChatListPageProps = {
  user: User;
  onNavigate: (page: any, data?: any) => void;
  onLogout: () => void;
};

type ChatConversation = {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  serviceName: string;
  order: Order;
  unreadCount: number;
};

export function ChatListPage({ user, onNavigate, onLogout }: ChatListPageProps) {
  // Get all orders (both as provider and buyer)
  const providerOrders = getOrdersByProviderId(user.id);
  const buyerOrders = getBuyerOrdersByUserId(user.id);
  
  // Combine and create conversations
  const conversations: ChatConversation[] = [];
  
  // Add provider conversations (chats dengan buyers)
  providerOrders.forEach(order => {
    conversations.push({
      id: `provider-${order.id}`,
      otherUserId: order.buyerId,
      otherUserName: order.buyerName,
      otherUserAvatar: order.buyerAvatar,
      lastMessage: order.customNote || 'Tidak ada pesan',
      lastMessageTime: order.updatedAt,
      serviceName: order.serviceName,
      order: order,
      unreadCount: 0
    });
  });
  
  // Add buyer conversations (chats dengan providers)
  buyerOrders.forEach(order => {
    const providerAvatar = order.providerName === 'Inaya Revalina' 
      ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
      : order.buyerAvatar;
      
    conversations.push({
      id: `buyer-${order.id}`,
      otherUserId: order.providerId,
      otherUserName: order.providerName,
      otherUserAvatar: providerAvatar,
      lastMessage: order.customNote || 'Tidak ada pesan',
      lastMessageTime: order.updatedAt,
      serviceName: order.serviceName,
      order: order,
      unreadCount: 0
    });
  });
  
  // Sort by last message time
  conversations.sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime());
  
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'menunggu': 'text-yellow-600',
      'proses': 'text-blue-600',
      'menunggu-konfirmasi': 'text-orange-600',
      'selesai': 'text-green-600',
      'dibatalkan': 'text-red-600'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'menunggu': 'Menunggu',
      'proses': 'Dalam Proses',
      'menunggu-konfirmasi': 'Menunggu Konfirmasi',
      'selesai': 'Selesai',
      'dibatalkan': 'Dibatalkan'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="chat-list" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesan</h1>
          <p className="text-gray-600">Kelola semua percakapan Anda di satu tempat</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari percakapan..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {conversations.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Percakapan</h3>
              <p className="text-gray-600 mb-6">
                Percakapan dengan penyedia jasa atau customer akan muncul di sini
              </p>
              <button
                onClick={() => onNavigate('marketplace')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Jelajahi Marketplace
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => onNavigate('chat', { ...conv.order, fromPage: 'chat-list' })}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={conv.otherUserAvatar}
                        alt={conv.otherUserName}
                        className="w-14 h-14 rounded-full"
                      />
                      {conv.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{conv.unreadCount}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate pr-2">
                          {conv.otherUserName}
                        </h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {getTimeAgo(conv.lastMessageTime)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2 truncate">
                        {conv.serviceName}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate pr-2">
                          {conv.lastMessage}
                        </p>
                        <span className={`text-xs font-medium flex-shrink-0 ${getStatusColor(conv.order.status)}`}>
                          {getStatusLabel(conv.order.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {conversations.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Percakapan</p>
                  <p className="text-xl font-bold text-gray-900">{conversations.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dalam Proses</p>
                  <p className="text-xl font-bold text-gray-900">
                    {conversations.filter(c => c.order.status === 'proses').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Unik Kontak</p>
                  <p className="text-xl font-bold text-gray-900">
                    {new Set(conversations.map(c => c.otherUserId)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}