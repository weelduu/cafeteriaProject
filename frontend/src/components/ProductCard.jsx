import { Coffee, Utensils, ArrowUpRight } from 'lucide-react';

const ProductCard = ({ product, onReserve }) => {
  const isFood = product.category?.toLowerCase() === 'food' || product.type?.toLowerCase() === 'food';
  const Icon = isFood ? Utensils : Coffee;
  
  return (
    <div className="card group flex flex-col h-full bg-white border border-gray-100 rounded-3xl p-5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
      <div className="relative mb-4 bg-gray-50 rounded-2xl flex items-center justify-center p-6 sm:p-8 group-hover:bg-primary/5 transition-colors">
         <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-100 shadow-sm">
            {product.category || 'Product'}
         </div>
         <Icon className="text-gray-400 group-hover:text-primary transition-colors" size={48} />
      </div>
      
      <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-extrabold text-gray-800 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
            <span className="text-xl font-black text-primary">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
      </div>

      <button 
        onClick={() => onReserve(product)}
        className="w-full btn-primary flex items-center justify-center gap-2 mt-auto"
      >
        <div className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-45 transition-transform duration-300">
           <ArrowUpRight size={16} />
        </div>
        <span>Reservar ahora</span>
      </button>
    </div>
  );
};

export default ProductCard;
