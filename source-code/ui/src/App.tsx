import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { MarketplacePage } from './components/MarketplacePage';
import { BrowseRequestsPage } from './components/BrowseRequestsPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { RequestDetailPage } from './components/RequestDetailPage';
import { CreateRequestPage } from './components/CreateRequestPage';
import { ProviderDashboard } from './components/ProviderDashboard';
import { RequesterDashboard } from './components/RequesterDashboard';
import { ChatPage } from './components/ChatPage';
import { ChatListPage } from './components/ChatListPage';
import { CreateServicePage } from './components/CreateServicePage';
import { EditServicePage } from './components/EditServicePage';
import { SavedServicesPage } from './components/SavedServicesPage';
import { mockPublicRequests } from './data/mockPublicRequests';
import { Toaster } from './components/ui/Toaster';
import { toast } from 'sonner@2.0.3';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  totalReviews: number;
  totalCompleted: number;
  memberSince: string;
  isProvider: boolean;
  subscribedHashtags?: string[];
};

export type ServiceListing = {
  id: string;
  title: string;
  description: string;
  categories: string[]; // Multi-category, no subcategory
  hashtags?: string[];
  price: number;
  priceType: 'tetap' | 'per-jam' | 'mulai-dari';
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRating: number;
  providerReviews: number;
  image: string;
  deliveryTime: string;
  isActive: boolean;
  createdAt: Date;
};

export type ServiceRequest = {
  id: string;
  title: string;
  description: string;
  categories: string[]; // Multi-category
  hashtags?: string[];
  budget: { min: number; max: number };
  timeline: string;
  deadlineType?: 'deadline' | 'jam-ditutup';
  deadlineValue?: string;
  status: 'terbuka' | 'diterima' | 'proses' | 'selesai' | 'dibatalkan';
  requesterId: string;
  requesterName: string;
  requesterAvatar: string;
  providerId?: string;
  providerName?: string;
  providerAvatar?: string;
  createdAt: Date;
  acceptedAt?: Date;
  proposalCount?: number;
};

export type Order = {
  id: string;
  serviceId?: string;
  serviceName: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  providerId: string;
  providerName: string;
  status: 'menunggu' | 'proses' | 'menunggu-konfirmasi' | 'selesai' | 'dibatalkan';
  price: number;
  finalPrice: number | null;
  isPriceFixed: boolean;
  customNote?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  rating?: number;
  review?: string;
  reviewedAt?: Date;
  fromPage?: string; // Track where the chat was initiated from
  serviceData?: any; // Store service data to return to detail page
};

type Page = 
  | 'landing'
  | 'login'
  | 'register'
  | 'marketplace'
  | 'browse-requests'
  | 'service-detail'
  | 'request-detail'
  | 'create-request'
  | 'create-service'
  | 'edit-service'
  | 'provider-dashboard'
  | 'requester-dashboard'
  | 'saved-services'
  | 'chat'
  | 'chat-list';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceListing | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [pageData, setPageData] = useState<any>(null);

  // STATE MANAGEMENT untuk prototype interaktif
  const [myServices, setMyServices] = useState<ServiceListing[]>([]);
  const [myRequests, setMyRequests] = useState<ServiceRequest[]>([]);
  const [savedServices, setSavedServices] = useState<ServiceListing[]>([]);
  const [publicRequests, setPublicRequests] = useState<ServiceRequest[]>(mockPublicRequests);
  const [orderUpdates, setOrderUpdates] = useState<Record<string, Partial<Order>>>({});

  const handleLogin = (email: string, password: string) => {
    const mockUser: User = {
      id: 'USER001',
      name: 'Inaya Revalina',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      rating: 4.8,
      totalReviews: 127,
      totalCompleted: 89,
      memberSince: 'November 2024',
      isProvider: true
    };
    
    // Initialize dengan sample services milik user (untuk provider)
    const sampleMyServices: ServiceListing[] = [
      {
        id: 'MYSVC001',
        title: 'Jasa Desain UI/UX untuk Aplikasi Mobile',
        description: 'Desain antarmuka aplikasi mobile yang modern dan user-friendly. Termasuk wireframe, mockup, dan prototype interaktif.',
        categories: ['Jasa Teknis & Digital', 'Jasa Kreatif & Desain'],
        hashtags: ['ui-ux', 'mobile-app', 'figma', 'prototype'],
        price: 1500000,
        priceType: 'mulai-dari',
        providerId: 'USER001',
        providerName: 'Inaya Revalina',
        providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        providerRating: 4.8,
        providerReviews: 127,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        deliveryTime: '7-10 hari',
        isActive: true,
        createdAt: new Date('2024-12-20')
      },
      {
        id: 'MYSVC002',
        title: 'Konsultasi Website & Digital Strategy',
        description: 'Konsultasi lengkap untuk strategi digital bisnis Anda. Termasuk analisis website, SEO, dan rekomendasi improvement.',
        categories: ['Jasa Teknis & Digital'],
        hashtags: ['konsultasi', 'digital-strategy', 'seo', 'website'],
        price: 200000,
        priceType: 'per-jam',
        providerId: 'USER001',
        providerName: 'Inaya Revalina',
        providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        providerRating: 4.8,
        providerReviews: 127,
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
        deliveryTime: 'Fleksibel',
        isActive: true,
        createdAt: new Date('2024-12-18')
      },
      {
        id: 'MYSVC003',
        title: 'Jasa Pembuatan Landing Page Profesional',
        description: 'Landing page yang convert dengan desain modern dan responsive. Optimized untuk SEO dan mobile-friendly.',
        categories: ['Jasa Teknis & Digital'],
        hashtags: ['landing-page', 'responsive', 'seo', 'conversion'],
        price: 800000,
        priceType: 'mulai-dari',
        providerId: 'USER001',
        providerName: 'Inaya Revalina',
        providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        providerRating: 4.8,
        providerReviews: 127,
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
        deliveryTime: '5-7 hari',
        isActive: true,
        createdAt: new Date('2024-12-22')
      },
    ];
    
    // Initialize dengan sample requests milik user
    const sampleMyRequests: ServiceRequest[] = [
      {
        id: 'MYREQ001',
        title: 'Butuh Pindahan Furniture Segera',
        description: 'Perlu bantuan untuk pindahan furniture dari apartemen lama ke yang baru. Ada sofa 3-seater, meja makan, dan beberapa lemari. Jarak tempuh sekitar 10km dalam kota Jakarta.',
        categories: ['Jasa Harian'],
        hashtags: ['pindahan', 'furniture', 'jakarta', 'urgent'],
        budget: { min: 500000, max: 800000 },
        timeline: '2 hari',
        deadlineType: 'deadline',
        deadlineValue: '2024-12-30',
        status: 'terbuka',
        requesterId: 'USER001',
        requesterName: 'Inaya Revalina',
        requesterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-25'),
        proposalCount: 3
      },
      {
        id: 'MYREQ002',
        title: 'Cari Desainer untuk Logo Brand Baru',
        description: 'Sedang merintis brand fashion lokal dan butuh logo yang modern, minimalis, dan memorable. Prefer yang sudah berpengalaman dengan portfolio yang bagus.',
        categories: ['Jasa Teknis & Digital'],
        hashtags: ['desain', 'logo', 'branding', 'minimalis'],
        budget: { min: 300000, max: 600000 },
        timeline: '1 minggu',
        deadlineType: 'deadline',
        deadlineValue: '2025-01-02',
        status: 'terbuka',
        requesterId: 'USER001',
        requesterName: 'Inaya Revalina',
        requesterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26'),
        proposalCount: 7
      },
    ];
    
    setMyServices(sampleMyServices);
    setMyRequests(sampleMyRequests);
    setCurrentUser(mockUser);
    setCurrentPage('marketplace');
  };

  const handleRegister = (name: string, email: string, password: string, isProvider: boolean) => {
    const mockUser: User = {
      id: 'USER' + Date.now(),
      name: name,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      rating: 0,
      totalReviews: 0,
      totalCompleted: 0,
      memberSince: 'Desember 2024',
      isProvider: isProvider
    };
    setCurrentUser(mockUser);
    setCurrentPage('marketplace');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: Page, data?: any) => {
    if (page === 'service-detail' && data) {
      // Handle service detail data properly - extract service from object if needed
      if (data.service) {
        // Data from provider dashboard includes 'service' property
        setSelectedService({ ...data.service, from: data.from });
      } else {
        // Direct service object from marketplace
        setSelectedService(data);
      }
    }
    if (page === 'request-detail' && data) {
      // Handle navigation with 'from' parameter
      if (data.request) {
        setSelectedRequest({ ...data.request, from: data.from });
      } else {
        setSelectedRequest(data);
      }
    }
    if (page === 'chat' && data) {
      setSelectedOrder(data);
    }
    if (page === 'edit-service' && data) {
      setSelectedService(data);
    }
    // Save page data for provider-dashboard to handle initialTab
    if (page === 'provider-dashboard' && data) {
      setPageData(data);
    } else if (page === 'create-request' && data) {
      // Save page data for create-request to handle 'from' navigation
      setPageData(data);
    } else {
      setPageData(null);
    }
    setCurrentPage(page);
  };

  // Handler untuk CREATE SERVICE (simulasi upload)
  const handleCreateService = (serviceData: Omit<ServiceListing, 'id' | 'providerId' | 'providerName' | 'providerAvatar' | 'providerRating' | 'providerReviews' | 'createdAt' | 'isActive'>) => {
    if (!currentUser) return;

    const newService: ServiceListing = {
      ...serviceData,
      id: 'JS' + Date.now(),
      providerId: currentUser.id,
      providerName: currentUser.name,
      providerAvatar: currentUser.avatar,
      providerRating: currentUser.rating,
      providerReviews: currentUser.totalReviews,
      isActive: true,
      createdAt: new Date()
    };

    setMyServices([newService, ...myServices]);
    toast.success('Jasa berhasil dibuat!', {
      description: 'Jasa Anda sekarang dapat dilihat oleh pengguna lain.'
    });
    handleNavigate('provider-dashboard');
  };

  // Handler untuk EDIT SERVICE
  const handleEditService = (serviceId: string, updatedData: Partial<ServiceListing>) => {
    setMyServices(myServices.map(service => 
      service.id === serviceId ? { ...service, ...updatedData } : service
    ));
    toast.success('Jasa berhasil diperbarui!', {
      description: 'Perubahan telah disimpan.'
    });
    handleNavigate('provider-dashboard');
  };

  // Handler untuk DELETE SERVICE
  const handleDeleteService = (serviceId: string) => {
    setMyServices(myServices.filter(service => service.id !== serviceId));
    toast.success('Jasa berhasil dihapus!');
  };

  // Handler untuk CREATE REQUEST (simulasi)
  const handleCreateRequest = (requestData: Omit<ServiceRequest, 'id' | 'requesterId' | 'requesterName' | 'requesterAvatar' | 'createdAt' | 'status' | 'proposalCount'>) => {
    if (!currentUser) return;

    const newRequest: ServiceRequest = {
      ...requestData,
      id: 'REQ' + Date.now(),
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requesterAvatar: currentUser.avatar,
      status: 'terbuka',
      createdAt: new Date(),
      proposalCount: 0
    };

    setMyRequests([newRequest, ...myRequests]);
    setPublicRequests([newRequest, ...publicRequests]);
    toast.success('Request berhasil dibuat!', {
      description: 'Request Anda sekarang dapat dilihat oleh penyedia jasa.'
    });
    handleNavigate('requester-dashboard');
  };

  // Handler untuk SAVE SERVICE (koleksi)
  const handleSaveService = (service: ServiceListing) => {
    if (!savedServices.find(s => s.id === service.id)) {
      setSavedServices([...savedServices, service]);
      toast.success('Disimpan ke koleksi!', {
        description: service.title
      });
    }
  };

  // Handler untuk UNSAVE SERVICE
  const handleUnsaveService = (serviceId: string) => {
    const service = savedServices.find(s => s.id === serviceId);
    setSavedServices(savedServices.filter(s => s.id !== serviceId));
    toast.success('Dihapus dari koleksi!', {
      description: service?.title
    });
  };

  // Handler untuk UPDATE ORDER (misal: fix harga)
  const handleUpdateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrderUpdates(prev => ({
      ...prev,
      [orderId]: { ...prev[orderId], ...updates }
    }));
    
    // Also update selected order if it's the current one
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, ...updates, updatedAt: new Date() });
    }
  };

  if (!currentUser) {
    if (currentPage === 'login') {
      return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
    }
    if (currentPage === 'register') {
      return <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />;
    }
    return <LandingPage onNavigate={handleNavigate} />;
  }

  return (
    <>
      {currentPage === 'marketplace' && (
        <MarketplacePage 
          user={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          savedServices={savedServices}
          onSaveService={handleSaveService}
          onUnsaveService={handleUnsaveService}
        />
      )}
      {currentPage === 'browse-requests' && (
        <BrowseRequestsPage 
          user={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          publicRequests={publicRequests}
        />
      )}
      {currentPage === 'service-detail' && selectedService && (
        <ServiceDetailPage 
          user={currentUser} 
          service={selectedService}
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          isSaved={savedServices.some(s => s.id === selectedService.id)}
          onSaveService={handleSaveService}
          onUnsaveService={handleUnsaveService}
        />
      )}
      {currentPage === 'request-detail' && selectedRequest && (
        <RequestDetailPage 
          user={currentUser} 
          request={selectedRequest}
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'create-request' && (
        <CreateRequestPage 
          user={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          onCreateRequest={handleCreateRequest}
          from={pageData?.from}
        />
      )}
      {currentPage === 'create-service' && (
        <CreateServicePage 
          user={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          onCreateService={handleCreateService}
        />
      )}
      {currentPage === 'edit-service' && selectedService && (
        <EditServicePage 
          user={currentUser}
          service={selectedService}
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          onEditService={handleEditService}
        />
      )}
      {currentPage === 'provider-dashboard' && (
        <ProviderDashboard 
          user={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          myServices={myServices}
          onDeleteService={handleDeleteService}
          savedServices={savedServices}
          onSaveService={handleSaveService}
          onUnsaveService={handleUnsaveService}
          initialTab={pageData?.initialTab}
          orderUpdates={orderUpdates}
        />
      )}
      {currentPage === 'requester-dashboard' && (
        <RequesterDashboard 
          user={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          myRequests={myRequests}
          initialProposalRequestId={pageData?.proposalRequestId}
        />
      )}
      {currentPage === 'saved-services' && (
        <SavedServicesPage 
          user={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          savedServices={savedServices}
          onUnsaveService={handleUnsaveService}
        />
      )}
      {currentPage === 'chat' && selectedOrder && (
        <ChatPage 
          user={currentUser} 
          order={selectedOrder}
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
          onUpdateOrder={handleUpdateOrder}
        />
      )}
      {currentPage === 'chat-list' && (
        <ChatListPage 
          user={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
        />
      )}
      <Toaster />
    </>
  );
}