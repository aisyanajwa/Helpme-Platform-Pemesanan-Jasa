export type Proposal = {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRating: number;
  providerReviews: number;
  proposedPrice: number;
  message: string;
  timeline: string;
  createdAt: Date;
};

export const mockProposals: Proposal[] = [
  // Proposals untuk MYREQ001 (Pindahan Furniture)
  {
    id: 'PROP001',
    requestId: 'MYREQ001',
    providerId: '102',
    providerName: 'Andi Pratama',
    providerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    providerRating: 4.9,
    providerReviews: 89,
    proposedPrice: 650000,
    message: 'Saya sudah berpengalaman 5 tahun dalam jasa pindahan. Tim saya profesional, memiliki peralatan lengkap dan asuransi untuk barang-barang Anda. Harga sudah termasuk packing materials dan tenaga 3 orang.',
    timeline: '1 hari',
    createdAt: new Date('2024-12-25T10:30:00')
  },
  {
    id: 'PROP002',
    requestId: 'MYREQ001',
    providerId: '505',
    providerName: 'Budi Transport',
    providerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    providerRating: 4.7,
    providerReviews: 156,
    proposedPrice: 700000,
    message: 'Kami menyediakan layanan pindahan dengan armada lengkap. Sudah termasuk bubble wrap, kardus, dan 4 tenaga kerja. Gratis bongkar pasang furniture sederhana.',
    timeline: '1 hari',
    createdAt: new Date('2024-12-25T14:15:00')
  },
  {
    id: 'PROP003',
    requestId: 'MYREQ001',
    providerId: '506',
    providerName: 'Express Movers',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    providerRating: 4.6,
    providerReviews: 72,
    proposedPrice: 600000,
    message: 'Siap membantu pindahan Anda dengan cepat dan aman. Sudah berpengalaman menangani furniture. Harga negotiable.',
    timeline: '2 hari',
    createdAt: new Date('2024-12-25T16:45:00')
  },
  
  // Proposals untuk MYREQ002 (Desain Logo)
  {
    id: 'PROP004',
    requestId: 'MYREQ002',
    providerId: '202',
    providerName: 'Dewi Santika',
    providerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    providerRating: 4.9,
    providerReviews: 178,
    proposedPrice: 500000,
    message: 'Halo! Saya seorang graphic designer dengan pengalaman 6 tahun di bidang branding. Portfolio saya bisa dilihat di website. Untuk logo brand fashion, saya akan berikan 3 konsep desain dengan unlimited revision. Format file: AI, PNG, SVG, PDF.',
    timeline: '5 hari',
    createdAt: new Date('2024-12-26T09:20:00')
  },
  {
    id: 'PROP005',
    requestId: 'MYREQ002',
    providerId: '702',
    providerName: 'Maya Kusuma',
    providerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    providerRating: 4.8,
    providerReviews: 98,
    proposedPrice: 450000,
    message: 'Saya spesialis desain logo minimalis modern. Sudah menangani 50+ brand lokal. Paket termasuk: 2 konsep awal, 3x revisi, dan semua format file. Bonus design guideline sederhana.',
    timeline: '7 hari',
    createdAt: new Date('2024-12-26T11:00:00')
  },
  {
    id: 'PROP006',
    requestId: 'MYREQ002',
    providerId: '801',
    providerName: 'Creative Studio ID',
    providerAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
    providerRating: 5.0,
    providerReviews: 234,
    proposedPrice: 600000,
    message: 'Kami adalah studio desain yang fokus di branding fashion. Paket premium kami termasuk: Logo design, color palette, typography guideline, dan mockup aplikasi pada berbagai media. Portfolio bisa dilihat di IG kami.',
    timeline: '5 hari',
    createdAt: new Date('2024-12-26T13:30:00')
  },
  {
    id: 'PROP007',
    requestId: 'MYREQ002',
    providerId: '802',
    providerName: 'Raka Designer',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    providerRating: 4.7,
    providerReviews: 112,
    proposedPrice: 400000,
    message: 'Logo minimalis untuk fashion brand adalah specialty saya. Saya akan berikan 3 konsep berbeda dengan 5x revisi. Fast response dan komunikatif.',
    timeline: '4 hari',
    createdAt: new Date('2024-12-26T15:45:00')
  },
  {
    id: 'PROP008',
    requestId: 'MYREQ002',
    providerId: '803',
    providerName: 'Pixel Perfect Design',
    providerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    providerRating: 4.8,
    providerReviews: 167,
    proposedPrice: 550000,
    message: 'Hi! Saya sudah 8 tahun di industri fashion branding. Akan saya buatkan logo yang memorable dan timeless. Termasuk brand guideline PDF dan mockup presentasi.',
    timeline: '6 hari',
    createdAt: new Date('2024-12-26T17:20:00')
  },
  {
    id: 'PROP009',
    requestId: 'MYREQ002',
    providerId: '804',
    providerName: 'Arta Creative',
    providerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    providerRating: 4.6,
    providerReviews: 89,
    proposedPrice: 350000,
    message: 'Saya menawarkan desain logo dengan harga terjangkau tapi tetap berkualitas. 2 konsep awal, unlimited minor revisi, semua format file.',
    timeline: '5 hari',
    createdAt: new Date('2024-12-26T19:00:00')
  },
  {
    id: 'PROP010',
    requestId: 'MYREQ002',
    providerId: '805',
    providerName: 'Modern Brand Co',
    providerAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
    providerRating: 4.9,
    providerReviews: 201,
    proposedPrice: 580000,
    message: 'Kami specialized dalam modern minimalist branding. Package termasuk complete brand identity: logo variations, color system, typography, dan usage guidelines. Portfolio available upon request.',
    timeline: '7 hari',
    createdAt: new Date('2024-12-26T20:30:00')
  },
];

export const getProposalsByRequestId = (requestId: string): Proposal[] => {
  return mockProposals.filter(p => p.requestId === requestId);
};
