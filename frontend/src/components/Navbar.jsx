import { useEffect } from 'react';
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

  // Lógica de temas dinámicos
  useEffect(() => {
    if (!user) return;

    // Detectar ID (puede venir del objeto institute o del prefijo del personalId)
    const instId = user.institute?.id || (user.personalId ? parseInt(user.personalId.split('-')[0]) : null);
    
    console.log("DEBUG - User:", user);
    console.log("DEBUG - Detected Institute ID:", instId);

    const isSerpis = instId === 1;
    const isCabanyal = instId === 2;

    let primary, dark, secondary;

    if (isSerpis) {
      primary = '#2d5a27'; // Verde serpiente
      dark = '#1a3b18';
      secondary = '#4a7c44';
      console.log("DEBUG - Aplicando tema SERPIS");
    } else if (isCabanyal) {
      primary = '#00bfff'; // Azul cielo
      dark = '#008bc2';
      secondary = '#5cc8ff';
      console.log("DEBUG - Aplicando tema CABANYAL");
    } else {
      primary = '#F97316'; // Naranja por defecto
      dark = '#92400E';
      secondary = '#92400E';
      console.log("DEBUG - Aplicando tema DEFECTO");
    }

    document.documentElement.style.setProperty('--color-primary', primary);
    document.documentElement.style.setProperty('--color-primary-dark', dark);
    document.documentElement.style.setProperty('--color-secondary', secondary);
    
    // Forzar un pequeño repintado si fuera necesario (aunque no debería)
    document.body.style.display = 'none';
    document.body.offsetHeight; // trigger reflow
    document.body.style.display = '';
  }, [user]);

  const instituteName = user?.institute?.name || 'IES';

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-xl p-2 shadow-lg shadow-primary/20 transition-all duration-500">
              <Coffee className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none mb-1">Cafetería</span>
                <span 
                   onClick={() => navigate('/home')} 
                   className="text-xl font-black text-gray-900 tracking-tight cursor-pointer hover:text-primary transition-colors"
                >
                   {instituteName}
                </span>
            </div>
            
            {user?.role === 'ADMIN' && (
              <button 
                onClick={() => navigate('/admin')}
                className="ml-4 px-4 py-2 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md hover:scale-105 transition-all"
              >
                Panel Admin
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden sm:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-gray-700">
                Hola, {user?.email ? `${user.email.split('@')[0]} (${user.personalId || 'S/N'})` : 'Estudiante'}
              </span>
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
