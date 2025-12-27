import { User } from '../App';
import { Navigation } from './Navigation';
import { Star, Award, Clock, MapPin, Mail, Edit } from 'lucide-react';
import { useState } from 'react';

type ProfileProps = {
  user: User;
  onNavigate: (page: 'home' | 'dashboard' | 'create' | 'browse' | 'chat' | 'profile') => void;
  onLogout: () => void;
};

type Review = {
  id: string;
  from: string;
  fromAvatar: string;
  rating: number;
  comment: string;
  date: Date;
  jobTitle: string;
};

export function Profile({ user, onNavigate, onLogout }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');
  
  const reviews: Review[] = [
    {
      id: '1',
      from: 'Sarah Wijaya',
      fromAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      rating: 5,
      comment: 'Sangat membantu dan responsif! Pekerjaannya cepat dan rapi. Recommended!',
      date: new Date('2024-12-20'),
      jobTitle: 'Bantu Setting Wifi Router'
    },
    {
      id: '2',
      from: 'Budi Santoso',
      fromAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      rating: 5,
      comment: 'Orangnya baik dan sabar. Terima kasih banyak atas bantuannya!',
      date: new Date('2024-12-18'),
      jobTitle: 'Tolong Ambil Kucing di Pohon'
    },
    {
      id: '3',
      from: 'Linda Permata',
      fromAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      rating: 4,
      comment: 'Bagus, tapi sedikit terlambat. Overall good service!',
      date: new Date('2024-12-15'),
      jobTitle: 'Antar Paket ke Kantor Pos'
    }
  ];

  const stats = [
    { icon: Star, label: 'Rating', value: user.rating.toFixed(1), color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { icon: Award, label: 'Total Pekerjaan', value: user.totalJobs, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: Clock, label: 'Member Sejak', value: 'Nov 2024', color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-orange-500 text-orange-500' : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="profile" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-slate-900 to-slate-700"></div>
          
          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 mt-16 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl mb-1">{user.name}</h1>
                    <div className="flex flex-wrap gap-4 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Bandung, Indonesia
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm">
                        Requester
                      </span>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm">
                        Provider
                      </span>
                    </div>
                  </div>
                  
                  <button className="px-6 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    Edit Profil
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl">{stat.value}</p>
                        <p className="text-slate-600 text-sm">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 px-6 py-4 transition-colors ${
                  activeTab === 'about'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tentang
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 px-6 py-4 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ulasan ({reviews.length})
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-3">Bio</h3>
                  <p className="text-slate-700">
                    Halo! Saya {user.name}, senang membantu orang lain dalam berbagai hal. 
                    Saya berpengalaman dalam HelpLift (angkat barang), HelpRun (kurir lokal), HelpFix (teknis ringan), 
                    dan berbagai jasa lainnya. Saya selalu berusaha memberikan pelayanan terbaik dan memastikan kepuasan klien.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg mb-3">Keahlian</h3>
                  <div className="flex flex-wrap gap-2">
                    {['HelpLift', 'HelpRun', 'HelpFix', 'HelpTask', 'HelpPet'].map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-3">Ketersediaan</h3>
                  <p className="text-slate-700">Senin - Minggu, 08:00 - 20:00</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-slate-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <img 
                        src={review.fromAvatar} 
                        alt={review.from}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{review.from}</p>
                            <p className="text-sm text-slate-500">
                              {review.jobTitle}
                            </p>
                          </div>
                          <div className="text-right">
                            {renderStars(review.rating)}
                            <p className="text-xs text-slate-500 mt-1">
                              {review.date.toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-slate-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}