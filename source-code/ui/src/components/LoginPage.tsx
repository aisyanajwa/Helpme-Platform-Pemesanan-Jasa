import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/0d69f06dfcc57b87cc69df263fd51f5857528e31.png';

type LoginPageProps = {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: 'landing' | 'login' | 'register') => void;
};

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <img 
              src={logo} 
              alt="HelpMe!" 
              className="h-12 cursor-pointer" 
              onClick={() => onNavigate('landing')}
            />
          </div>
        </div>
      </div>

      {/* Form Masuk */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Kembali</span>
            </button>
            
            <h1 className="text-3xl mb-2 text-gray-900">Selamat Datang Kembali</h1>
            <p className="text-gray-600 mb-8">Masuk ke akun HelpMe! Anda</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="anda@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                </label>
                <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                  Lupa kata sandi?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Masuk
              </button>

              <p className="text-center text-sm text-gray-600">
                Demo: Gunakan email dan kata sandi apa saja untuk masuk
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <button
                  onClick={() => onNavigate('register')}
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Daftar Sekarang
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}