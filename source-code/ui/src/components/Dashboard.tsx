import { User, JobRequest } from '../App';
import { Navigation } from './Navigation';
import { Plus, MessageSquare, Clock, CheckCircle, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

type DashboardProps = {
  user: User;
  onNavigate: (page: 'home' | 'dashboard' | 'create' | 'browse' | 'chat' | 'profile') => void;
  onLogout: () => void;
  onOpenChat: (job: JobRequest) => void;
};

export function Dashboard({ user, onNavigate, onLogout, onOpenChat }: DashboardProps) {
  const [myRequests, setMyRequests] = useState<JobRequest[]>([]);
  const [myJobs, setMyJobs] = useState<JobRequest[]>([]);

  useEffect(() => {
    // Mock data - requests created by user
    const mockRequests: JobRequest[] = [
      {
        id: '1',
        title: 'Tolong Ambil Kucing di Pohon',
        description: 'Kucing saya застряла di pohon depan rumah, tingginya sekitar 3 meter. Butuh bantuan untuk menurunkannya.',
        category: 'HelpPet',
        location: 'Bandung, Jawa Barat',
        budget: 50000,
        status: 'in-progress',
        requesterId: user.id,
        requesterName: user.name,
        requesterAvatar: user.avatar,
        providerId: '2',
        providerName: 'Budi Santoso',
        createdAt: new Date('2024-12-26T10:00:00'),
        deadline: new Date('2024-12-26T18:00:00')
      },
      {
        id: '2',
        title: 'Bantu Angkat Galon ke Lantai 3',
        description: 'Butuh bantuan untuk mengangkat 2 galon air mineral ke lantai 3 (tanpa lift)',
        category: 'HelpLift',
        location: 'Jakarta Selatan',
        budget: 25000,
        status: 'open',
        requesterId: user.id,
        requesterName: user.name,
        requesterAvatar: user.avatar,
        createdAt: new Date('2024-12-26T14:30:00')
      }
    ];

    // Mock data - jobs taken by user as provider
    const mockJobs: JobRequest[] = [
      {
        id: '3',
        title: 'Perlu Teman Blind Date',
        description: 'Butuh seseorang untuk menemani blind date, just to make sure everything is safe',
        category: 'HelpLove',
        location: 'Cafe di Sudirman, Jakarta',
        budget: 100000,
        status: 'in-progress',
        requesterId: '3',
        requesterName: 'Sarah Wijaya',
        requesterAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        providerId: user.id,
        providerName: user.name,
        createdAt: new Date('2024-12-25T16:00:00'),
        deadline: new Date('2024-12-27T19:00:00')
      }
    ];

    setMyRequests(mockRequests);
    setMyJobs(mockJobs);
  }, [user]);

  const getStatusBadge = (status: string) => {
    const badges = {
      'open': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'in-progress': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      'completed': 'bg-green-500/10 text-green-500 border-green-500/20'
    };
    const labels = {
      'open': 'Mencari Provider',
      'in-progress': 'Sedang Dikerjakan',
      'completed': 'Selesai'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs border ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="dashboard" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl mb-2">Selamat Datang, {user.name}! 👋</h1>
          <p className="text-slate-300">Apa yang bisa kami bantu hari ini?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl">{user.rating}</p>
                  <p className="text-slate-300 text-sm">Rating</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl">{user.totalJobs}</p>
                  <p className="text-slate-300 text-sm">Total Pekerjaan</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl">{myRequests.filter(r => r.status === 'in-progress').length}</p>
                  <p className="text-slate-300 text-sm">Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => onNavigate('create')}
            className="bg-white border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-xl p-8 transition-all group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-orange-500 group-hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl">Buat Request Baru</h3>
              <p className="text-slate-500 text-sm">Butuh bantuan? Posting request Anda sekarang</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('browse')}
            className="bg-white border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 transition-all group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-blue-500 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl">Cari Pekerjaan</h3>
              <p className="text-slate-500 text-sm">Bantu orang lain dan dapatkan penghasilan</p>
            </div>
          </button>
        </div>

        {/* My Requests */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Request Saya</h2>
          <div className="space-y-4">
            {myRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{request.title}</h3>
                    <p className="text-slate-600 text-sm mb-2">{request.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="text-slate-500">📍 {request.location}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-orange-500">💰 Rp {request.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>{getStatusBadge(request.status)}</div>
                </div>
                {request.providerName && (
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <p className="text-sm text-slate-600">Provider: {request.providerName}</p>
                    <button
                      onClick={() => onOpenChat(request)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm transition-colors"
                    >
                      Chat
                    </button>
                  </div>
                )}
              </div>
            ))}
            {myRequests.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
                <p className="text-slate-500">Belum ada request. Buat request pertama Anda!</p>
              </div>
            )}
          </div>
        </div>

        {/* Jobs I'm Working On */}
        <div>
          <h2 className="text-2xl mb-4">Pekerjaan Saya</h2>
          <div className="space-y-4">
            {myJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{job.title}</h3>
                    <p className="text-slate-600 text-sm mb-2">{job.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="text-slate-500">📍 {job.location}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-orange-500">💰 Rp {job.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>{getStatusBadge(job.status)}</div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <img src={job.requesterAvatar} alt={job.requesterName} className="w-8 h-8 rounded-full" />
                    <p className="text-sm text-slate-600">Client: {job.requesterName}</p>
                  </div>
                  <button
                    onClick={() => onOpenChat(job)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm transition-colors"
                  >
                    Chat dengan Client
                  </button>
                </div>
              </div>
            ))}
            {myJobs.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
                <p className="text-slate-500">Belum ada pekerjaan yang diambil.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}