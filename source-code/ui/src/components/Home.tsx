import { useState } from 'react';
import { Search, Shield, Users, Zap, ArrowRight } from 'lucide-react';
import logo from 'figma:asset/0d69f06dfcc57b87cc69df263fd51f5857528e31.png';

type HomeProps = {
  onLogin: (email: string, password: string) => void;
};

export function Home({ onLogin }: HomeProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Transparent Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-[200px] font-bold text-white">HELP</div>
        <div className="absolute top-60 right-20 text-[200px] font-bold text-white">ME!</div>
        <div className="absolute bottom-40 left-1/4 text-[150px] font-bold text-white">HELP</div>
        <div className="absolute bottom-20 right-1/3 text-[150px] font-bold text-white">ME!</div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logo} alt="HelpMe!" className="h-10" />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-2 text-white hover:text-orange-400 transition-colors"
              >
                Masuk
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6">
            Butuh Bantuan?
            <span className="block text-orange-500 mt-2">Kami Siap Membantu!</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Platform jasa serbaguna yang menghubungkan Anda dengan ribuan penyedia jasa siap membantu. 
            Dari hal sederhana hingga permintaan unik.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-lg"
          >
            Mulai Sekarang <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white mb-2">Cari Jasa Mudah</h3>
            <p className="text-slate-400 text-sm">
              Temukan penyedia jasa dengan cepat berdasarkan kategori dan lokasi
            </p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white mb-2">Respon Cepat</h3>
            <p className="text-slate-400 text-sm">
              Chat langsung dengan penyedia jasa dan dapatkan bantuan segera
            </p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white mb-2">Terpercaya</h3>
            <p className="text-slate-400 text-sm">
              Sistem rating dan ulasan untuk memastikan kualitas layanan
            </p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white mb-2">Komunitas Aktif</h3>
            <p className="text-slate-400 text-sm">
              Ribuan pengguna dan penyedia jasa siap membantu Anda
            </p>
          </div>
        </div>

        {/* Categories Preview */}
        <div className="mt-20">
          <h2 className="text-3xl text-white text-center mb-10">Kategori Layanan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { name: 'HelpLift', desc: 'Angkat barang' },
              { name: 'HelpRun', desc: 'Kurir lokal' },
              { name: 'HelpPet', desc: 'Jaga hewan' },
              { name: 'HelpLove', desc: 'Blind date' },
              { name: 'HelpFix', desc: 'Teknis ringan' },
              { name: 'HelpTask', desc: 'Antri & print' },
              { name: 'HelpCustom', desc: 'Custom' }
            ].map((cat) => (
              <div key={cat.name} className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-4 rounded-lg text-center hover:border-orange-500 transition-colors cursor-pointer">
                <p className="text-white font-medium">{cat.name}</p>
                <p className="text-slate-400 text-xs mt-1">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-white">Masuk ke HelpMe!</h2>
              <button
                onClick={() => setShowLogin(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Masuk
              </button>
              <p className="text-center text-slate-400 text-sm">
                Demo: gunakan email dan password apa saja
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}