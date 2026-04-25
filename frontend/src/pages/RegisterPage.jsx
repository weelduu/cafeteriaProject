import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Lock, Mail, Building, AlertCircle, ArrowLeft } from 'lucide-react';

const institutes = [
  { id: 1, name: 'IES Serpis' },
  { id: 2, name: 'IES Cabanyal' }
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    instituteId: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.email.toLowerCase().endsWith('@alu.edu.gva.es')) {
      setError('Debes usar tu correo oficial @alu.edu.gva.es');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        instituteId: parseInt(formData.instituteId)
      });
      
      if (response.data.success) {
        navigate('/login');
      } else {
        setError(response.data.message || 'Error al registrarse');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-10 px-4 bg-white md:bg-gray-50">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8 animate-fade-in">
           <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/5 px-4 py-2 rounded-xl mb-4 transition-colors">
              <ArrowLeft size={16} /> 
              Volver al inicio de sesión
           </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Crea tu cuenta</h2>
          <p className="mt-2 text-gray-500">Únete con tu correo de alumno</p>
        </div>

        <div className="bg-white md:p-8 md:rounded-3xl md:shadow-xl md:border md:border-gray-100 animate-slide-up">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-fade-in">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Escolar (@alu.edu.gva.es)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field pl-11"
                  placeholder="nombre@alu.edu.gva.es"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="instituteId" className="block text-sm font-semibold text-gray-700 mb-1">
                Tu Centro Educativo
              </label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Building size={18} />
                  </div>
                  <select
                      id="instituteId"
                      name="instituteId"
                      required
                      className="input-field pl-11 appearance-none"
                      value={formData.instituteId}
                      onChange={handleChange}
                  >
                      <option value="">Selecciona tu instituto...</option>
                      {institutes.map(inst => (
                          <option key={inst.id} value={inst.id}>{inst.name}</option>
                      ))}
                  </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" aria-label="Password entry" className="block text-sm font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field pl-11"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" aria-label="Confirm password" className="block text-sm font-semibold text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input-field pl-11"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex justify-center items-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Registrarse'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest font-semibold">
             Sistema de Gestión de Comedor
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
