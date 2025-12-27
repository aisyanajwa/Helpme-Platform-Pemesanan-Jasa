import { Search, Users, Shield, Zap, ArrowRight, Wrench, Laptop, GraduationCap, Heart, PawPrint, Sparkles, PenTool, MoreHorizontal, Check, Star, MessageSquare, TrendingUp } from 'lucide-react';
import logo from 'figma:asset/0d69f06dfcc57b87cc69df263fd51f5857528e31.png';

type LandingPageProps = {
  onNavigate: (page: any) => void;
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img 
              src={logo} 
              alt="HelpMe!" 
              className="h-12 cursor-pointer" 
              onClick={() => onNavigate('landing')}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('login')}
                className="px-5 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Masuk
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md"
              >
                Daftar Gratis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full mb-6">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">Platform Marketplace Jasa Terpercaya</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Temukan Jasa yang Anda{' '}
                <span className="text-orange-500">Butuhkan</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Platform marketplace yang menghubungkan Anda dengan ribuan penyedia jasa profesional. Dari kebutuhan harian hingga layanan khusus.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => onNavigate('register')}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30"
                >
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg transition-all font-semibold hover:bg-slate-50"
                >
                  Jelajahi Platform
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Penyedia Jasa</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">1,200+</div>
                  <div className="text-sm text-gray-600">Project Selesai</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">4.8/5</div>
                  <div className="text-sm text-gray-600">Rating Platform</div>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Element */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/60 p-8 border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                      <Wrench className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Jasa Desain Website</div>
                      <div className="text-sm text-gray-600">oleh Ahmad Rizki</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(48 review)</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Jasa pembuatan website profesional untuk bisnis Anda. Responsif, modern, dan SEO friendly.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Mulai dari</div>
                      <div className="text-2xl font-bold text-slate-900">Rp 500.000</div>
                    </div>
                    <button className="px-5 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                      Lihat Detail
                    </button>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Verified</div>
                      <div className="text-sm font-semibold text-slate-900">Terpercaya</div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Response Time</div>
                      <div className="text-sm font-semibold text-slate-900">{'< 1 jam'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Mengapa Memilih HelpMe?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform lengkap yang dirancang untuk memudahkan transaksi jasa dengan aman dan profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: 'Mudah Ditemukan',
                description: 'Sistem kategori dan hashtag yang powerful memudahkan Anda menemukan jasa yang tepat',
                color: 'bg-blue-500'
              },
              {
                icon: Users,
                title: 'Komunitas Aktif',
                description: 'Ribuan penyedia dan pencari jasa aktif setiap harinya dengan rating transparan',
                color: 'bg-orange-500'
              },
              {
                icon: Shield,
                title: 'Aman & Terpercaya',
                description: 'Sistem verifikasi pengguna dan proteksi transaksi untuk keamanan bersama',
                color: 'bg-green-500'
              },
              {
                icon: Zap,
                title: 'Proses Cepat',
                description: 'Chat real-time, negosiasi langsung, dan proses booking yang efisien',
                color: 'bg-purple-500'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-xl h-full">
                    <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Cara Kerja Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proses sederhana untuk memulai, baik sebagai pencari maupun penyedia jasa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Buyers */}
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Untuk Pencari Jasa</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Cari atau Buat Request',
                    description: 'Telusuri marketplace atau buat custom request dengan detail kebutuhan Anda'
                  },
                  {
                    step: '2',
                    title: 'Pilih & Diskusi',
                    description: 'Pilih penyedia jasa terbaik dan diskusikan detail melalui chat langsung'
                  },
                  {
                    step: '3',
                    title: 'Deal & Bayar',
                    description: 'Sepakati harga final dan lakukan pembayaran dengan aman'
                  },
                  {
                    step: '4',
                    title: 'Terima & Review',
                    description: 'Terima layanan berkualitas dan berikan rating untuk membantu komunitas'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1.5">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Sellers */}
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Untuk Penyedia Jasa</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Buat Listing Jasa',
                    description: 'Upload jasa Anda dengan deskripsi lengkap, portofolio, dan harga kompetitif'
                  },
                  {
                    step: '2',
                    title: 'Terima Request',
                    description: 'Dapatkan notifikasi untuk request baru dan inquiry dari calon klien'
                  },
                  {
                    step: '3',
                    title: 'Negosiasi & Deal',
                    description: 'Diskusikan detail project dan sepakati harga yang sesuai'
                  },
                  {
                    step: '4',
                    title: 'Kerjakan & Rating',
                    description: 'Selesaikan pekerjaan dengan profesional dan tingkatkan reputasi Anda'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center font-bold shadow-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1.5">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Kategori Jasa Populer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai kategori jasa yang sesuai dengan kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Jasa Harian', icon: Wrench, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
              { name: 'Teknis & Digital', icon: Laptop, gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
              { name: 'Jasa Edukasi', icon: GraduationCap, gradient: 'from-green-500 to-green-600', bg: 'bg-green-50' },
              { name: 'Jasa Personal', icon: Heart, gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
              { name: 'Jasa Hewan', icon: PawPrint, gradient: 'from-pink-500 to-pink-600', bg: 'bg-pink-50' },
              { name: 'Jasa Khusus', icon: Sparkles, gradient: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50' },
              { name: 'Custom Request', icon: PenTool, gradient: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50' },
              { name: 'Dan Lainnya', icon: MoreHorizontal, gradient: 'from-gray-500 to-gray-600', bg: 'bg-gray-50' },
            ].map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => onNavigate('login')}
                  className={`group relative overflow-hidden rounded-2xl p-8 ${category.bg} hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300`}
                >
                  <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-slate-900">{category.name}</p>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Siap Memulai dengan HelpMe?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Bergabunglah dengan ribuan pengguna yang sudah mempercayai platform kami untuk kebutuhan jasa mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('register')}
              className="px-8 py-4 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-all font-semibold shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Daftar Gratis Sekarang
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold"
            >
              Masuk ke Akun
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-white rounded-lg p-2">
                  <img 
                    src={logo} 
                    alt="HelpMe!" 
                    className="h-8" 
                  />
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Platform marketplace jasa terpercaya yang menghubungkan penyedia dan pencari jasa dengan aman, cepat, dan profesional.
              </p>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <div className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </div>
                <div className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>
                </div>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cara Kerja</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">Dukungan</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>

            {/* Team */}
            <div>
              <h4 className="font-semibold text-white mb-4">Tim Pengembang</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>Inaya Revalina</li>
                <li>Aisya Mufidah Najwa</li>
                <li>Mutiara Elzella Putri</li>
                <li>Tyavan Mirantino</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              &copy; 2024 HelpMe! - Tugas Akhir. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Syarat Layanan</a>
              <a href="#" className="hover:text-white transition-colors">Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}