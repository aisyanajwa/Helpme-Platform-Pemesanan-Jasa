import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, ArrowLeft, MoreVertical, DollarSign, CheckCircle } from 'lucide-react';
import { User, Order } from '../App';
import { Header } from './Header';

type ChatPageProps = {
  user: User;
  order: Order;
  onNavigate: (page: any) => void;
  onLogout: () => void;
  onUpdateOrder?: (orderId: string, updates: Partial<Order>) => void;
};

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type?: 'text' | 'price-offer' | 'price-accepted';
  price?: number;
};

export function ChatPage({ user, order, onNavigate, onLogout, onUpdateOrder }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [customPrice, setCustomPrice] = useState('');
  const [isPriceFixed, setIsPriceFixed] = useState(order.isPriceFixed);
  const [finalPrice, setFinalPrice] = useState(order.finalPrice);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine if user is provider or buyer
  const isProvider = order.providerId === user.id;
  
  const otherUser = isProvider
    ? { id: order.buyerId, name: order.buyerName, avatar: order.buyerAvatar }
    : { id: order.providerId, name: order.providerName, avatar: order.providerName };

  // Handle back navigation
  const handleBackNavigation = () => {
    // Check if this chat was started from proposal modal
    if (order.fromPage === 'requester-dashboard-proposal' && (order as any).proposalModalData) {
      // Return to requester dashboard with proposal modal open
      onNavigate('requester-dashboard', { 
        proposalRequestId: (order as any).proposalModalData.requestId 
      });
    } else if (order.fromPage === 'service-detail' && order.serviceData) {
      // Check if this chat was started from service detail page
      onNavigate('service-detail', order.serviceData);
    } else if (order.fromPage === 'request-detail' && (order as any).requestData) {
      // Return to request detail page
      onNavigate('request-detail', (order as any).requestData);
    } else if (order.fromPage === 'provider-dashboard' && order.fromTab) {
      // Return to provider dashboard with the specific tab
      onNavigate('provider-dashboard', { initialTab: order.fromTab });
    } else if (order.fromPage === 'requester-dashboard') {
      // Return to requester dashboard
      onNavigate('requester-dashboard');
    } else if (order.fromPage === 'browse-requests') {
      // Return to browse requests page
      onNavigate('browse-requests');
    } else if (order.fromPage === 'chat-list') {
      // Return to chat list
      onNavigate('chat-list');
    } else {
      // Default behavior: go back to respective dashboard
      onNavigate(isProvider ? 'provider-dashboard' : 'requester-dashboard');
    }
  };

  useEffect(() => {
    // Mock initial messages based on order
    const baseTime = order.createdAt ? new Date(order.createdAt).getTime() : Date.now();
    
    // Check if this is a proposal chat (from requester-dashboard-proposal or browse-requests)
    const isProposalChat = order.fromPage === 'requester-dashboard-proposal' || order.fromPage === 'browse-requests';
    
    let mockMessages: Message[] = [];
    
    if (isProposalChat) {
      // For proposal chat: Provider sends proposal first
      mockMessages = [
        {
          id: '1',
          senderId: order.providerId,
          text: order.customNote?.replace('Proposal: ', '').replace('Request: ', '') || 'Halo! Saya tertarik dengan request Anda dan ingin mengajukan proposal.',
          timestamp: new Date(baseTime + 60000),
          type: 'text'
        },
        {
          id: '2',
          senderId: order.providerId,
          text: `Saya menawarkan harga Rp${order.price.toLocaleString()} untuk project ini. Kualitas dan deadline terjamin!`,
          timestamp: new Date(baseTime + 120000),
          type: 'text'
        },
      ];
    } else {
      // For regular service order: Buyer initiates contact
      mockMessages = [
        {
          id: '1',
          senderId: order.buyerId,
          text: order.customNote || 'Halo! Saya tertarik dengan jasa Anda.',
          timestamp: new Date(baseTime + 60000),
          type: 'text'
        },
        {
          id: '2',
          senderId: order.providerId,
          text: 'Halo! Terima kasih sudah menghubungi. Saya sudah baca kebutuhan Anda.',
          timestamp: new Date(baseTime + 120000),
          type: 'text'
        },
        {
          id: '3',
          senderId: order.providerId,
          text: 'Untuk project seperti ini, saya bisa kerjakan dengan baik. Berapa timeline yang Anda butuhkan?',
          timestamp: new Date(baseTime + 180000),
          type: 'text'
        },
        {
          id: '4',
          senderId: order.buyerId,
          text: 'Saya butuhkan dalam 2 minggu. Untuk harganya bagaimana?',
          timestamp: new Date(baseTime + 240000),
          type: 'text'
        },
      ];
    }

    // Jika harga sudah fix, tambahkan history price negotiation
    if (order.isPriceFixed && order.finalPrice) {
      mockMessages.push(
        {
          id: '5',
          senderId: order.providerId,
          text: `Saya tawarkan harga Rp${order.finalPrice.toLocaleString()} untuk kebutuhan ini. Apakah Anda setuju?`,
          timestamp: new Date(baseTime + 300000),
          type: 'price-offer',
          price: order.finalPrice
        },
        {
          id: '6',
          senderId: order.buyerId,
          text: 'Harga tersebut oke untuk saya. Saya setuju dengan penawaran Anda!',
          timestamp: new Date(baseTime + 360000),
          type: 'text'
        },
        {
          id: '7',
          senderId: 'system',
          text: `Harga telah disepakati: Rp${order.finalPrice.toLocaleString()}. Status pesanan diubah menjadi "Dalam Proses".`,
          timestamp: new Date(baseTime + 420000),
          type: 'price-accepted',
          price: order.finalPrice
        }
      );
    }

    setMessages(mockMessages);
  }, [order, user.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      text: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: otherUser.id,
        text: 'Baik, saya mengerti! Terima kasih atas informasinya.',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const handleSendPriceOffer = () => {
    if (!customPrice) return;

    const priceValue = parseInt(customPrice);

    // 1. Provider mengirim penawaran harga
    const priceOfferMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      text: `Saya tawarkan harga Rp${priceValue.toLocaleString()} untuk kebutuhan ini. Apakah Anda setuju?`,
      timestamp: new Date(),
      type: 'price-offer',
      price: priceValue
    };

    setMessages(prev => [...prev, priceOfferMessage]);
    setShowPriceModal(false);
    setCustomPrice('');

    // 2. Customer menerima penawaran
    setTimeout(() => {
      const acceptMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: otherUser.id,
        text: 'Harga tersebut oke untuk saya. Saya setuju dengan penawaran Anda!',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, acceptMessage]);

      // 3. System message konfirmasi harga fix
      setTimeout(() => {
        const systemMessage: Message = {
          id: (Date.now() + 2).toString(),
          senderId: 'system',
          text: `Harga telah disepakati: Rp${priceValue.toLocaleString()}. Status pesanan diubah menjadi "Dalam Proses".`,
          timestamp: new Date(),
          type: 'price-accepted',
          price: priceValue
        };
        setMessages(prev => [...prev, systemMessage]);

        // Update state
        setIsPriceFixed(true);
        setFinalPrice(priceValue);

        // Update order status and price
        if (onUpdateOrder) {
          onUpdateOrder(order.id, {
            isPriceFixed: true,
            finalPrice: priceValue,
            status: 'proses'
          });
        }
      }, 1500);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));

    if (diffHours < 24) {
      return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="chat" />

      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackNavigation}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-medium text-gray-900">{otherUser.name}</h2>
              <p className="text-sm text-gray-600">{order.serviceName}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Order Info Banner */}
      <div className={`border-b px-6 py-3 ${isPriceFixed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className={isPriceFixed ? 'text-green-900' : 'text-yellow-900'}>
              <strong>Order ID:</strong> {order.id}
            </span>
            <span className={isPriceFixed ? 'text-green-900' : 'text-yellow-900'}>
              <strong>Harga:</strong> {isPriceFixed 
                ? `Rp${(finalPrice || order.price).toLocaleString()} (sudah fix)` 
                : `Rp${order.price.toLocaleString()} (belum fix)`}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              order.status === 'proses' ? 'bg-blue-200 text-blue-900' :
              order.status === 'selesai' ? 'bg-green-200 text-green-900' :
              'bg-yellow-200 text-yellow-900'
            }`}>
              {order.status === 'menunggu' ? 'Menunggu' :
               order.status === 'proses' ? 'Dalam Proses' :
               order.status === 'selesai' ? 'Selesai' :
               order.status === 'dibatalkan' ? 'Dibatalkan' : order.status}
            </span>
          </div>
          {isProvider && !isPriceFixed && order.status === 'menunggu' && (
            <button 
              onClick={() => setShowPriceModal(true)}
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
            >
              <DollarSign className="w-4 h-4" />
              Fix Harga Custom
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 space-y-4">
          {messages.map((message) => {
            const isMyMessage = message.senderId === user.id;
            const isSystemMessage = message.senderId === 'system';
            
            if (isSystemMessage) {
              return (
                <div key={message.id} className="flex justify-center">
                  <div className="bg-green-100 border border-green-200 px-4 py-2 rounded-lg max-w-md text-center">
                    <p className="text-sm text-green-900 font-medium">{message.text}</p>
                    <p className="text-xs text-green-700 mt-1">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[70%] ${isMyMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                  <img
                    src={isMyMessage ? user.avatar : otherUser.avatar}
                    alt={isMyMessage ? user.name : otherUser.name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.type === 'price-offer'
                          ? 'bg-orange-100 border-2 border-orange-500 text-gray-900'
                          : isMyMessage
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${isMyMessage ? 'text-right' : 'text-left'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          {/* Terima Proposal Button for Proposal Chat */}
          {order.fromPage === 'requester-dashboard-proposal' && !isProvider && (
            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Sudah yakin dengan provider ini?</p>
                  <p className="text-xs text-gray-600">Anda dapat menerima proposal ini untuk melanjutkan ke tahap pengerjaan</p>
                </div>
                <button
                  onClick={() => {
                    // Tombol bisa diklik tapi tidak ada navigasi
                    console.log('Terima Proposal clicked');
                  }}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Terima Proposal
                </button>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Fix Price Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Fix Harga Custom</h3>
              <p className="text-sm text-gray-600 mt-1">Tentukan harga final untuk pesanan ini</p>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Jasa</p>
                <p className="font-medium text-gray-900">{order.serviceName}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Customer</p>
                <p className="font-medium text-gray-900">{order.buyerName}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Catatan Customer</p>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{order.customNote}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Custom (Rp)
                </label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Masukkan harga"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Harga base: Rp{order.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowPriceModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSendPriceOffer}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Kirim Harga ke Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}