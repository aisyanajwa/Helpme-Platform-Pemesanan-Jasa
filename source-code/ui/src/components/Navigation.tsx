import { User } from '../App';
import { Home, Search, PlusCircle, User as UserIcon, LogOut } from 'lucide-react';
import logo from 'figma:asset/0d69f06dfcc57b87cc69df263fd51f5857528e31.png';

type NavigationProps = {
  user: User;
  onNavigate: (page: 'home' | 'dashboard' | 'create' | 'browse' | 'chat' | 'profile') => void;
  onLogout: () => void;
  currentPage: string;
};

export function Navigation({ user, onNavigate, onLogout, currentPage }: NavigationProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'browse', label: 'Cari Pekerjaan', icon: Search },
    { id: 'create', label: 'Buat Request', icon: PlusCircle },
    { id: 'profile', label: 'Profil', icon: UserIcon },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <img src={logo} alt="HelpMe!" className="h-10 cursor-pointer" onClick={() => onNavigate('dashboard')} />
            
            <div className="hidden md:flex gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-orange-500 text-white' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full border-2 border-orange-500" />
              <div className="hidden sm:block">
                <p className="text-white text-sm">{user.name}</p>
                <p className="text-slate-400 text-xs">⭐ {user.rating}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex gap-1 pb-3 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-orange-500 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}