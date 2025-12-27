export type CategoryType = 
  | 'Semua Jasa'
  | 'Jasa Harian'
  | 'Jasa Teknis & Digital'
  | 'Jasa Edukasi'
  | 'Jasa Personal'
  | 'Jasa Hewan'
  | 'Jasa Kreatif & Desain'
  | 'Jasa Khusus'
  | 'Request Custom';

export const getAllCategories = (): string[] => {
  return [
    'Semua Jasa',
    'Jasa Harian',
    'Jasa Teknis & Digital',
    'Jasa Edukasi',
    'Jasa Personal',
    'Jasa Hewan',
    'Jasa Kreatif & Desain',
    'Jasa Khusus',
    'Request Custom'
  ];
};

export const getCategoryOptions = (): string[] => {
  return getAllCategories().filter(cat => cat !== 'Semua Jasa');
};

export const getSuggestedHashtags = (category: string): string[] => {
  const hashtagMap: Record<string, string[]> = {
    'Jasa Harian': [
      'bantuan-harian', 'asisten-rumah', 'angkat-galon', 'belanja', 
      'antar-jemput', 'bersih-rumah', 'cuci-setrika', 'masak'
    ],
    'Jasa Teknis & Digital': [
      'web-development', 'desain-grafis', 'mobile-app', 'seo',
      'digital-marketing', 'coding', 'wordpress', 'ui-ux'
    ],
    'Jasa Edukasi': [
      'les-privat', 'bimbel', 'tutor', 'mengajar', 'bahasa-inggris',
      'matematika', 'fisika', 'online-class', 'konsultasi-akademik'
    ],
    'Jasa Personal': [
      'makeup', 'hairdo', 'personal-trainer', 'gaya-hidup',
      'konseling', 'terapi', 'styling', 'kecantikan'
    ],
    'Jasa Hewan': [
      'pet-sitting', 'grooming', 'penitipan', 'dog-walking',
      'perawatan-hewan', 'veteriner', 'training-hewan'
    ],
    'Jasa Kreatif & Desain': [
      'fotografi', 'videografi', 'editing', 'logo-design',
      'branding', 'ilustrasi', 'animasi', 'content-creator'
    ],
    'Jasa Khusus': [
      'event-organizer', 'wedding-planner', 'catering', 'mc',
      'photography', 'dekorasi', 'entertainment', 'sound-system'
    ],
    'Request Custom': [
      'custom', 'khusus', 'freelance', 'project-based',
      'konsultasi', 'one-time', 'urgent', 'spesial'
    ]
  };

  return hashtagMap[category] || [];
};

export const getPopularHashtags = (): string[] => {
  return [
    'cepat', 'profesional', 'terpercaya', 'murah', 'berkualitas',
    'berpengalaman', 'ramah', 'flexibel', 'urgent', 'rekomendasi'
  ];
};