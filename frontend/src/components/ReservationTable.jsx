import { Calendar, Clock, ChevronRight, CheckCircle2, Clock3, XCircle } from 'lucide-react';

const ReservationTable = ({ reservations }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmada':
      case 'completa':
        return 'bg-green-50 text-green-600 border-green-100';
      case 'pendiente':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'cancelada':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmada':
      case 'completed':
      case 'active':
        return <CheckCircle2 size={14} />;
      case 'pendiente':
      case 'pending':
        return <Clock3 size={14} />;
      case 'cancelada':
      case 'cancelled':
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  const translateShift = (shift) => {
    const shifts = {
      'MORNING': 'Desayuno/Almuerzo',
      'MIDDAY': 'Comida/Menú',
      'AFTERNOON': 'Merienda/Tarde',
      'ALMUERZO': 'Desayuno/Almuerzo',
      'COMIDA': 'Comida/Menú',
      'MERIENDA': 'Merienda/Tarde'
    };
    return shifts[shift?.toUpperCase()] || shift;
  };

  const translateStatus = (status) => {
    const statuses = {
      'ACTIVE': 'ACTIVA',
      'PENDING': 'PENDIENTE',
      'CANCELLED': 'CANCELADA',
      'COMPLETED': 'COMPLETADA'
    };
    return statuses[status?.toUpperCase()] || status;
  };

  if (!reservations || reservations.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-gray-100 text-center">
        <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
          <Calendar size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Sin reservas todavía</h3>
        <p className="text-gray-500 max-w-xs mx-auto">Tus próximos pedidos aparecerán aquí una vez realices una reserva.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Producto</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest hidden md:table-cell">Fecha</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Turno</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Estado</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reservations.map((res, index) => (
              <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                     <div className="bg-primary/5 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Clock size={16} />
                     </div>
                     <span className="font-extrabold text-gray-800">{res.productName || res.product?.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 hidden md:table-cell">
                  <span className="text-sm font-semibold text-gray-500">{new Date(res.date).toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 uppercase tracking-tight">
                     {translateShift(res.shift)}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border uppercase tracking-widest ${getStatusStyle(translateStatus(res.status))}`}>
                    {getStatusIcon(res.status)}
                    {translateStatus(res.status)}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                   <button className="p-2 text-gray-300 hover:text-primary transition-colors">
                      <ChevronRight size={18} />
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

export default ReservationTable;
