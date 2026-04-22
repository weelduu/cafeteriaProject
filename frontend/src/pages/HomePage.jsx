import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import OfferCard from '../components/OfferCard';
import ProductCard from '../components/ProductCard';
import ReservationTable from '../components/ReservationTable';
import ReservationModal from '../components/ReservationModal';
import api from '../api/axios';
import { Sparkles, ShoppingBasket, History, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, offRes, resRes] = await Promise.all([
          api.get('/products'),
          api.get('/offers'),
          api.get(`/reservations/my?userId=${user.id}`)
        ]);
        setProducts(prodRes.data.data);
        setOffers(offRes.data.data);
        setReservations(resRes.data.data);
      } catch (err) {
        console.error('Failed to fetch data', err);
        // Fallback for UI demonstration (Spanish Regional Terms)
        setProducts([
          { id: 1, name: 'Bocadillo de Atún', description: 'Atún fresco con lechuga y mayonesa', price: 3.50, category: 'Comida' },
          { id: 2, name: 'Café Espresso', description: 'Café intenso estilo italiano', price: 1.20, category: 'Bebida' },
          { id: 3, name: 'Ensalada de Frutas', description: 'Fruta de temporada recién cortada', price: 2.50, category: 'Comida' },
          { id: 4, name: 'Zumo de Naranja', description: 'Naranja natural recién exprimida', price: 2.00, category: 'Bebida' }
        ]);
        setOffers([
          { id: 1, name: 'Combo Desayuno', discount: 15 },
          { id: 2, name: 'Especial Comida', discount: 10 }
        ]);
        setReservations([
          { productName: 'Bocadillo de Atún', shift: 'Comida', date: new Date(), status: 'Confirmada' },
          { productName: 'Café Espresso', shift: 'Almuerzo', date: new Date(), status: 'Pendiente' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleReserveClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmReservation = async (productId, shift) => {
    try {
      await api.post('/reservations', { userId: user.id, productId, shift });
      // Refresh reservations
      const res = await api.get(`/reservations/my?userId=${user.id}`);
      setReservations(res.data.data);
    } catch (err) {
      console.error('Reservation failed', err);
      // For demo: add locally if API fails
      if (!api.defaults.headers.common['Authorization'] || api.defaults.headers.common['Authorization'].includes('demo')) {
         setReservations(prev => [{ 
           productName: selectedProduct.name, 
           shift, 
           date: new Date(), 
           status: 'Pendiente' 
         }, ...prev]);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
         <div className="relative">
            <div className="h-24 w-24 border-b-4 border-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-primary font-black">C</div>
         </div>
         <h2 className="mt-8 text-2xl font-black text-gray-900 animate-pulse">Cargando experiencia...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* Active Offers Section */}
        <section className="animate-fade-in">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
               <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                  <Sparkles size={14} />
                  <span>Exclusivo</span>
               </div>
               <h2 className="text-4xl font-black text-gray-900 tracking-tight">Ofertas Activas</h2>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300">
               Ver todas <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
             {offers.map(offer => (
                <OfferCard key={offer.id} {...offer} />
             ))}
          </div>
        </section>

        {/* Available Products Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-8">
             <div className="bg-primary/10 p-2.5 rounded-2xl text-primary">
                <ShoppingBasket size={24} />
             </div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Productos Disponibles</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             {products.map(product => (
                <ProductCard 
                   key={product.id} 
                   product={product} 
                   onReserve={handleReserveClick} 
                />
             ))}
          </div>
        </section>

        {/* My Reservations Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-8">
             <div className="bg-secondary/10 p-2.5 rounded-2xl text-secondary">
                <History size={24} />
             </div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Mis Reservas</h2>
          </div>
          
          <ReservationTable reservations={reservations} />
        </section>

      </main>

      <ReservationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onConfirm={handleConfirmReservation}
      />
    </div>
  );
};

export default HomePage;
