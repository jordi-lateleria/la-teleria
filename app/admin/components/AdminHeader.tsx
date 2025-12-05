'use client';

import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  userEmail?: string;
  onMenuClick: () => void;
}

export default function AdminHeader({ userEmail, onMenuClick }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    document.cookie = 'adminSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Menu button (mobile) */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="lg:hidden ml-2 text-lg font-medium text-gray-900">La Teleria Admin</span>
      </div>

      {/* Right side - User info and logout */}
      <div className="flex items-center space-x-4">
        {userEmail && (
          <span className="hidden sm:block text-sm text-gray-600">{userEmail}</span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Cerrar sesion</span>
        </button>
      </div>
    </header>
  );
}
