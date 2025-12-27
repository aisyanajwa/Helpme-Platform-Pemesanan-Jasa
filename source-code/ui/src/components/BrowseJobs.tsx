import { useState, useEffect } from 'react';
import { User, JobRequest } from '../App';
import { Navigation } from './Navigation';
import { Search, Filter, MapPin } from 'lucide-react';

type BrowseJobsProps = {
  user: User;
  onNavigate: (page: 'home' | 'dashboard' | 'create' | 'browse' | 'chat' | 'profile') => void;
  onLogout: () => void;
  onOpenChat: (job: JobRequest) => void;
};

const categories = [
  'Semua',
  'HelpLift',
  'HelpRun',
  'HelpPet',
  'HelpLove',
  'HelpFix',
  'HelpTask',
  'HelpCustom'
];

export function BrowseJobs({ user, onNavigate, onLogout, onOpenChat }: BrowseJobsProps) {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobRequest | null>(null);

  useEffect(() => {
    // Mock available jobs
    const mockJobs: JobRequest[] = [
      {
        id: '10',
        title: 'Tolong Ambil Kucing di Pohon',
        description: 'Kucing saya застряла di pohon depan rumah, tingginya sekitar 3 meter. Butuh bantuan untuk menurunkannya dengan aman.',
        category: 'HelpPet',
        location: 'Bandung, Jawa Barat',
        budget: 75000,
        status: 'open',
        requesterId: '5',
        requesterName: 'Linda Permata',
        requesterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T11:00:00'),
        deadline: new Date('2024-12-26T18:00:00')
      },
      {
        id: '11',
        title: 'Bantu Angkat Galon ke Lantai 4',
        description: 'Butuh bantuan untuk mengangkat 3 galon air mineral ke lantai 4 (tanpa lift). Saya lagi hamil jadi gak bisa angkat berat.',
        category: 'HelpLift',
        location: 'Jakarta Selatan',
        budget: 30000,
        status: 'open',
        requesterId: '6',
        requesterName: 'Siti Nurhaliza',
        requesterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T09:30:00')
      },
      {
        id: '12',
        title: 'Cari Anjing Hilang - Golden Retriever',
        description: 'Anjing saya hilang di sekitar area Kemang. Nama: Bobby, warna: golden, pakai kalung merah. Ada reward!',
        category: 'HelpPet',
        location: 'Kemang, Jakarta Selatan',
        budget: 500000,
        status: 'open',
        requesterId: '7',
        requesterName: 'Ryan Gosling',
        requesterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T07:00:00')
      },
      {
        id: '13',
        title: 'Perlu Teman Blind Date',
        description: 'First time blind date, butuh teman untuk duduk di meja sebelah buat jaga-jaga. Free makan & minum!',
        category: 'HelpLove',
        location: 'Cafe di Sudirman, Jakarta',
        budget: 150000,
        status: 'open',
        requesterId: '8',
        requesterName: 'Dewi Santika',
        requesterAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T10:00:00'),
        deadline: new Date('2024-12-27T19:00:00')
      },
      {
        id: '14',
        title: 'Bantu Setting Wifi Router',
        description: 'Wifi di rumah bermasalah. Butuh bantuan untuk setting router & extender. Peralatan sudah ada.',
        category: 'HelpFix',
        location: 'Tangerang',
        budget: 100000,
        status: 'open',
        requesterId: '9',
        requesterName: 'Budi Hartono',
        requesterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T08:00:00')
      },
      {
        id: '15',
        title: 'Antar Paket ke Kantor Pos',
        description: 'Punya paket urgent harus dikirim hari ini, tapi saya lagi sibuk meeting. Tolong antarkan ke kantor pos terdekat.',
        category: 'HelpRun',
        location: 'BSD, Tangerang Selatan',
        budget: 50000,
        status: 'open',
        requesterId: '10',
        requesterName: 'Amanda Putri',
        requesterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T12:00:00'),
        deadline: new Date('2024-12-26T16:00:00')
      },
      {
        id: '16',
        title: 'Tolong Antrikan Print Tugas',
        description: 'Ada tugas urgent yang harus di-print dan jilid pagi ini, tapi saya gak bisa keluar rumah. Lokasi di print shop dekat kampus.',
        category: 'HelpTask',
        location: 'Dekat Telkom University, Bandung',
        budget: 35000,
        status: 'open',
        requesterId: '11',
        requesterName: 'Fikri Ahmad',
        requesterAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T06:30:00'),
        deadline: new Date('2024-12-26T11:00:00')
      },
      {
        id: '17',
        title: 'Intel Mantan - Need Private Detective',
        description: 'Butuh orang untuk cari tau kegiatan mantan (jangan di-judge dulu). Diskret dan professional. Info lengkap via chat.',
        category: 'HelpLove',
        location: 'Jakarta & Sekitarnya',
        budget: 300000,
        status: 'open',
        requesterId: '12',
        requesterName: 'Anonymous User',
        requesterAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T13:00:00')
      },
      {
        id: '18',
        title: 'Titip Beli Kue Bandung Kunafe',
        description: 'Lagi di luar kota, butuh orang untuk belikan Bandung Kunafe dan kirim via kurir. Uang ditransfer dulu.',
        category: 'HelpRun',
        location: 'Bandung',
        budget: 80000,
        status: 'open',
        requesterId: '13',
        requesterName: 'Laras Puspita',
        requesterAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
        createdAt: new Date('2024-12-26T11:30:00')
      },
    ];

    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAcceptJob = (job: JobRequest) => {
    setSelectedJob(job);
    setShowAcceptModal(true);
  };

  const confirmAcceptJob = () => {
    if (selectedJob) {
      // In real app, this would update backend
      console.log('Accepting job:', selectedJob.id);
      setShowAcceptModal(false);
      
      // Open chat with requester
      const updatedJob = { ...selectedJob, providerId: user.id, providerName: user.name, status: 'in-progress' as const };
      onOpenChat(updatedJob);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru saja';
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    return `${Math.floor(diffInHours / 24)} hari yang lalu`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="browse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Cari Pekerjaan</h1>
          <p className="text-slate-600">Temukan pekerjaan yang sesuai dengan keahlian Anda</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pekerjaan..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <img 
                  src={job.requesterAvatar} 
                  alt={job.requesterName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg mb-1">{job.title}</h3>
                      <p className="text-sm text-slate-600">oleh {job.requesterName} • {formatTimeAgo(job.createdAt)}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm">
                      💰 Rp {job.budget.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-slate-700 mb-3">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-3 text-sm mb-4">
                    <span className="inline-flex items-center gap-1 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {job.category}
                    </span>
                    {job.deadline && (
                      <span className="text-red-500">
                        ⏰ Deadline: {new Date(job.deadline).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAcceptJob(job)}
                      className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      Terima Pekerjaan
                    </button>
                    <button
                      onClick={() => onOpenChat(job)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      Chat Dulu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
              <Filter className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500">Tidak ada pekerjaan yang sesuai dengan pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Accept Job Modal */}
      {showAcceptModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl mb-4">Konfirmasi Terima Pekerjaan</h2>
            <p className="text-slate-600 mb-6">
              Anda akan mengambil pekerjaan "{selectedJob.title}" dengan budget Rp {selectedJob.budget.toLocaleString()}.
              Setelah menerima, Anda bisa langsung chat dengan requester untuk koordinasi.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmAcceptJob}
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Ya, Terima
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}