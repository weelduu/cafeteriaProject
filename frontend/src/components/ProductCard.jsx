import { Coffee, Utensils, ArrowUpRight } from 'lucide-react';

const ProductCard = ({ product, onReserve }) => {
  const isFood = product.category?.toLowerCase() === 'food' || product.category?.toLowerCase() === 'comida';
  const Icon = isFood ? Utensils : Coffee;
  
  return (
    <div className="card group flex flex-col h-full bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative mb-5 bg-gray-50 rounded-2xl overflow-hidden aspect-video flex items-center justify-center transition-colors">
         {product.imageUrl ? (
           <img 
             src={product.imageUrl} 
             alt={product.name} 
             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
           />
         ) : (
           <Icon className="text-gray-300 group-hover:text-primary transition-colors" size={48} />
         )}
         
         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-gray-900 uppercase tracking-widest border border-white/20 shadow-sm">
            {product.category || 'Producto'}
         </div>
      </div>
      
      <div className="flex-1 px-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-primary transition-colors pr-2">{product.name}</h3>
            <span className="text-xl font-black text-primary">{product.price.toFixed(2)}€</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed font-medium">{product.description}</p>
      </div>

      <button 
        onClick={() => onReserve(product)}
        className="w-full btn-primary flex items-center justify-center gap-3 py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
      >
        <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-45 transition-transform duration-500">
           <ArrowUpRight size={18} />
        </div>
        <span className="font-black uppercase tracking-widest text-xs">Reservar ahora</span>
      </button>
    </div>
  );
};

export default ProductCard;
