import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api, { setAuthToken } from '../api/axios';
import { Mail, Lock, AlertCircle, Coffee } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.success) {
        const { id, username: name, email: userEmail, role, token, personalId, institute } = response.data.data;
        const user = { id, username: name, email: userEmail, role, personalId, institute };

        setAuthToken(token || 'demo-token');
        login(user, token || 'demo-token');
        navigate('/home');
      } else {
        setError(response.data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Por favor, revisa tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 bg-white md:bg-gray-50">
      <div className="max-w-md w-full mx-auto group">
        <div className="text-center mb-10 animate-fade-in">
          <div className="mx-auto h-20 w-20 bg-primary rounded-[2.5rem] flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500">
            <Coffee className="text-white" size={40} />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Bienvenido</h2>
          <p className="mt-2 text-gray-500">Inicia sesión con tu correo escolar</p>
        </div>

        <div className="bg-white md:p-10 md:rounded-3xl md:shadow-xl md:border md:border-gray-100 animate-slide-up">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-fade-in">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Institucional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="input-field pl-11"
                  placeholder="ej. alumno@alu.edu.gva.es"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" aria-label="Password field" className="block text-sm font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="input-field pl-11"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <span className="font-semibold text-primary hover:opacity-80 transition-colors cursor-pointer">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Acceder'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
                Regístrate ahora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
