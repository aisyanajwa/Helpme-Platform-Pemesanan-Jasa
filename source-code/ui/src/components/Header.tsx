import { User as UserType } from '../App';
import { User, Package, LayoutDashboard, MessageSquare, LogOut, ChevronDown, Bookmark } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/0d69f06dfcc57b87cc69df263fd51f5857528e31.png';

type HeaderProps = {
  user: UserType;
  onNavigate: (page: any) => void;
  onLogout: () => void;
  currentPage: string;
};

export function Header({ user, onNavigate, onLogout, currentPage }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <img 
              src={logo} 
              alt="HelpMe!" 
              className="h-12 cursor-pointer" 
              onClick={() => onNavigate('marketplace')}
            />
            
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onNavigate('marketplace')}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === 'marketplace'
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Jelajahi Jasa
              </button>
              <button
                onClick={() => onNavigate('browse-requests')}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === 'browse-requests'
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Request Terbuka
              </button>
              {user.isProvider && (
                <button
                  onClick={() => onNavigate('provider-dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    currentPage === 'provider-dashboard'
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Dasbor Penyedia Jasa
                </button>
              )}
              <button
                onClick={() => onNavigate('requester-dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === 'requester-dashboard'
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Dasbor Saya
              </button>
              <button
                onClick={() => onNavigate('saved-services')}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === 'saved-services'
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Koleksi Jasa Tersimpan
              </button>
              <button
                onClick={() => onNavigate('chat-list')}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
                  currentPage === 'chat-list'
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Pesan
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user.isProvider && (
              <button
                onClick={() => onNavigate('create-service')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm hidden md:block"
              >
                Buat Jasa
              </button>
            )}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('marketplace');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      Jelajahi Jasa
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('saved-services');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Bookmark className="w-4 h-4" />
                      Koleksi Jasa Tersimpan
                    </button>

                    {user.isProvider && (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigate('provider-dashboard');
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dasbor Penyedia Jasa
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('requester-dashboard');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Dasbor Saya
                    </button>

                    <div className="border-t border-gray-200 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}