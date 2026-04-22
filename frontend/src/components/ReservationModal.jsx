import { useState } from 'react';
import { X, Clock, CheckCircle2 } from 'lucide-react';

const ReservationModal = ({ isOpen, onClose, onConfirm, product }) => {
  const [shift, setShift] = useState('Almuerzo');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await onConfirm(product.id, shift);
    setIsSubmitting(false);
    onClose();
  };

  const shifts = [
    { id: 'Almuerzo', label: 'Desayuno/Almuerzo', time: '08:00 - 11:00', icon: '🌅' },
    { id: 'Comida', label: 'Comida/Menú', time: '12:00 - 15:00', icon: '☀️' },
    { id: 'Merienda', label: 'Merienda/Tarde', time: '16:00 - 19:00', icon: '🌇' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-slide-up transform transition-all">
        <div className="p-8 pb-4 flex justify-between items-start">
           <div>
             <h2 className="text-3xl font-black text-gray-900 leading-tight">Confirmar Reserva</h2>
             <p className="text-gray-500 mt-1 font-medium">Producto: <span className="text-primary">{product?.name}</span></p>
           </div>
           <button 
             onClick={onClose}
             className="p-2 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400"
           >
             <X size={24} />
           </button>
        </div>

        <div className="p-8 pt-4">
           <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Selecciona tu turno</label>
           <div className="grid grid-cols-1 gap-3">
              {shifts.map((s) => (
                <button
                   key={s.id}
                   onClick={() => setShift(s.id)}
                   className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all duration-300 ${
                     shift === s.id 
                     ? 'border-primary bg-primary/5 ring-4 ring-primary/10' 
                     : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                   }`}
                >
                   <div className="flex items-center gap-4">
                      <span className="text-2xl">{s.icon}</span>
                      <div className="text-left">
                        <p className={`font-bold ${shift === s.id ? 'text-primary' : 'text-gray-900'}`}>{s.label}</p>
                        <p className="text-xs text-gray-500 font-semibold">{s.time}</p>
                      </div>
                   </div>
                   {shift === s.id && (
                     <div className="bg-primary text-white p-1.5 rounded-full">
                        <CheckCircle2 size={16} />
                     </div>
                   )}
                </button>
              ))}
           </div>

           <div className="mt-8 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                 Cancelar
              </button>
              <button 
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-[2] btn-primary flex items-center justify-center gap-2 py-4"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Clock size={20} />
                    <span>Confirmar Pedido</span>
                  </>
                )}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
