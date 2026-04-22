import { Tag, Sparkles } from 'lucide-react';

const OfferCard = ({ name, discount }) => {
  return (
    <div className="flex-shrink-0 w-64 md:w-80 bg-gradient-to-br from-primary to-primary-dark p-6 rounded-3xl shadow-lg shadow-primary/20 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute -right-4 -top-4 bg-white/10 h-24 w-24 rounded-full blur-2xl"></div>
      <div className="absolute -left-4 -bottom-4 bg-white/5 h-20 w-20 rounded-full blur-xl"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
           <Tag size={20} />
        </div>
        <div className="bg-white text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
           Activa
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-1 truncate">{name}</h3>
      <div className="flex items-center gap-2">
         <span className="text-3xl font-black">{discount}%</span>
         <span className="text-sm font-medium opacity-80 leading-tight">DTO. en todos<br/>los pedidos</span>
      </div>
      
      <div className="mt-4 flex items-center justify-end">
         <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            <Sparkles size={16} />
         </div>
      </div>
    </div>
  );
};

export default OfferCard;
