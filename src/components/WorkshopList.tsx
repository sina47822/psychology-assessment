// components/WorkshopList.tsx
import { useState, useEffect } from 'react';
import { workshopApi, Workshop } from '@/lib/api';

interface WorkshopListProps {
  type?: 'featured' | 'upcoming' | 'ongoing';
  limit?: number;
}

export default function WorkshopList({ type = 'upcoming', limit }: WorkshopListProps) {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkshops();
  }, [type]);

  const fetchWorkshops = async () => {
    setIsLoading(true);
    setError('');

    try {
      let data: Workshop[];
      
      switch (type) {
        case 'featured':
          data = await workshopApi.getFeaturedWorkshops();
          break;
        case 'ongoing':
          data = await workshopApi.getOngoingWorkshops();
          break;
        default:
          data = await workshopApi.getUpcomingWorkshops();
      }

      if (limit && data.length > limit) {
        data = data.slice(0, limit);
      }

      setWorkshops(data);
    } catch (err: any) {
      setError(err.message || 'خطا در دریافت کارگاه‌ها');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchWorkshops}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  if (workshops.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">هیچ کارگاهی یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workshops.map((workshop) => (
        <div
          key={workshop.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {workshop.cover_image && (
            <img
              src={workshop.cover_image}
              alt={workshop.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{workshop.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                workshop.workshop_type === 'online' 
                  ? 'bg-blue-100 text-blue-800'
                  : workshop.workshop_type === 'in_person'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {workshop.workshop_type === 'online' ? 'آنلاین' : 
                 workshop.workshop_type === 'in_person' ? 'حضوری' : 'ترکیبی'}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {workshop.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div>
                <span className="font-medium">تاریخ شروع: </span>
                {new Date(workshop.start_date).toLocaleDateString('fa-IR')}
              </div>
              <div>
                <span className="font-medium">مدت: </span>
                {workshop.duration_hours} ساعت
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                {workshop.is_free ? (
                  <span className="font-bold text-green-600">رایگان</span>
                ) : (
                  <div>
                    {workshop.discount_price ? (
                      <div className="flex items-center gap-2">
                        <span className="line-through text-gray-400">
                          {workshop.price.toLocaleString()} تومان
                        </span>
                        <span className="font-bold text-red-600">
                          {workshop.discount_price.toLocaleString()} تومان
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold">
                        {workshop.price.toLocaleString()} تومان
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="text-sm">
                <span className="font-medium">ظرفیت: </span>
                <span>{workshop.registered_count}/{workshop.capacity}</span>
              </div>
            </div>
            
            {workshop.is_registration_open && (
              <button
                onClick={() => handleRegister(workshop.id)}
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                disabled={workshop.available_seats <= 0}
              >
                {workshop.available_seats > 0 ? 'ثبت‌نام' : 'تکمیل ظرفیت'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}