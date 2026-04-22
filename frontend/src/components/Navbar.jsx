import { useAuth } from '../context/AuthContext';
import { LogOut, User, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-xl p-2 shadow-lg shadow-primary/20">
              <Coffee className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">Cafetería IES Serpis</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden sm:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">Hola, {user?.username || 'Estudiante'}</span>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <User size={16} />
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-500 transition-colors group"
            >
              <div className="bg-gray-100 p-2 rounded-xl group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </div>
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
