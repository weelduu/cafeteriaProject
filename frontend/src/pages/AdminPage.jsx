import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { 
  Users, 
  ShoppingBag, 
  Tag, 
  ClipboardList, 
  Trash2, 
  Edit3, 
  Plus, 
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchTabData = async (tab) => {
    setLoading(true);
    try {
      let endpoint = '';
      switch (tab) {
        case 'users': endpoint = '/users'; break;
        case 'products': endpoint = '/products'; break;
        case 'offers': endpoint = '/offers/all'; break;
        case 'reservations': endpoint = '/reservations/all'; break;
        default: endpoint = '/users';
      }
      const res = await api.get(endpoint);
      setData(res.data.data);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
      setError('Error al cargar datos. Verifica la conexión con el backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) return;
    
    try {
      let endpoint = '';
      switch (activeTab) {
        case 'users': endpoint = `/users/${id}`; break;
        case 'products': endpoint = `/products/${id}`; break;
        case 'offers': endpoint = `/offers/${id}`; break;
        case 'reservations': endpoint = `/reservations/${id}`; break;
      }
      await api.delete(endpoint);
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Error al eliminar el elemento.');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    
    try {
      if (activeTab === 'products') {
        payload.available = true; // Default for new products
      }

      if (editingItem) {
        await api.put(`/${activeTab}/${editingItem.id}`, payload);
      } else {
        await api.post(`/${activeTab}`, payload);
      }
      
      setIsModalOpen(false);
      setEditingItem(null);
      fetchTabData(activeTab);
    } catch (err) {
      console.error('Save failed', err);
      alert('Error al guardar los cambios.');
    }
  };

  const renderTable = () => {
    if (loading) return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

    if (data.length === 0) return (
      <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-100">
        <p className="text-gray-400 font-medium">No se encontraron elementos.</p>
      </div>
    );

    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Info</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Detalles</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-extrabold text-gray-900">
                      {item.username || item.name || `Pedido #${item.id}`}
                    </div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-tight">
                      {item.email || item.category || (item.product?.name ? `Para: ${item.product.name}` : '')}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-gray-600">
                    {activeTab === 'users' && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg text-xs">{item.role}</span>}
                    {activeTab === 'products' && <span>{item.price}€</span>}
                    {activeTab === 'offers' && <span className="text-secondary">-{item.discountPercent}%</span>}
                    {activeTab === 'reservations' && <span>{item.user?.username} - {item.shift}</span>}
                  </td>
                  <td className="px-6 py-5 text-right space-x-2">
                    {activeTab !== 'reservations' && (
                      <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Edit3 size={18} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Panel de Control</h1>
            <p className="text-gray-500 font-medium">Gestiona usuarios, productos, ofertas y pedidos del sistema.</p>
          </div>
          
          {activeTab !== 'reservations' && (
            <button 
              onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus size={20} />
              <span>Añadir {activeTab === 'users' ? 'Usuario' : activeTab === 'products' ? 'Producto' : 'Oferta'}</span>
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'users', label: 'Alumnos', icon: Users },
            { id: 'products', label: 'Productos', icon: ShoppingBag },
            { id: 'offers', label: 'Ofertas', icon: Tag },
            { id: 'reservations', label: 'Pedidos', icon: ClipboardList },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                activeTab === tab.id 
                  ? 'bg-gray-900 text-white shadow-lg' 
                  : 'bg-white text-gray-400 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-bold">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {renderTable()}
      </main>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                {editingItem ? 'Editar' : 'Añadir'} {activeTab}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-4">
              {activeTab === 'users' && (
                <>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Nombre de Usuario</label>
                    <input name="username" defaultValue={editingItem?.username} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email</label>
                    <input name="email" type="email" defaultValue={editingItem?.email} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Rol</label>
                    <select name="role" defaultValue={editingItem?.role || 'USER'} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold">
                      <option value="USER">Alumno (USER)</option>
                      <option value="ADMIN">Administrador (ADMIN)</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'products' && (
                <>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Nombre</label>
                    <input name="name" defaultValue={editingItem?.name} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Descripción</label>
                    <textarea name="description" defaultValue={editingItem?.description} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Precio (€)</label>
                      <input name="price" type="number" step="0.01" defaultValue={editingItem?.price} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Categoría</label>
                      <input name="category" defaultValue={editingItem?.category} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'offers' && (
                <>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Nombre Oferta</label>
                    <input name="name" defaultValue={editingItem?.name} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Descuento (%)</label>
                    <input name="discountPercent" type="number" defaultValue={editingItem?.discountPercent} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ID Producto Relacionado</label>
                    <input name="productId" type="number" defaultValue={editingItem?.productId} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary font-bold" required />
                  </div>
                </>
              )}

              <div className="pt-4">
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
