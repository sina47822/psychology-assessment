import { demographicsQuestions } from '@/data/welcomeData';
import {provincesAndCities} from '@/data/provincesAndCities'
import { DemographicsData } from '@/types/types';
import { User, GraduationCap, Briefcase, MapPin, Home, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DemographicsScreenProps {
  demographics: DemographicsData;
  onChange: (field: keyof DemographicsData, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

export default function DemographicsScreen({
  demographics,
  onChange,
  onNext,
  onPrev,
  isValid
}: DemographicsScreenProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>(demographics.province);
  
  // بستن dropdown هنگام کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (field: string) => {
    setOpenDropdown(openDropdown === field ? null : field);
  };

  const handleSelect = (field: keyof DemographicsData, value: string) => {
    onChange(field, value);
    
    if (field === 'province') {
      setSelectedProvince(value);
      onChange('city', '');
      setOpenDropdown('city'); // باز کردن dropdown شهرها بعد از انتخاب استان
    }
    
    setTimeout(() => setOpenDropdown(null), 300); // بستن dropdown بعد از انتخاب
  };

  const getCitiesForProvince = (province: string) => {
    return provincesAndCities[province as keyof typeof provincesAndCities] || [];
  };

  const renderDropdown = (
    field: keyof DemographicsData,
    label: string,
    options: string[],
    icon: React.ReactNode,
    selectedValue: string
  ) => {
    const isOpen = openDropdown === field;
    
    return (
      <div className="mb-6 dropdown-container">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <label className="text-gray-700 font-medium">
            {label}
          </label>
        </div>
        
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown(field)}
            className={`w-full p-3 text-right rounded-lg border transition-all duration-200 flex items-center justify-between ${
              selectedValue
                ? 'border-sky-500 bg-sky-50 text-sky-700 font-medium'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <span className="flex-1 text-right">
              {selectedValue || 'لطفاً انتخاب کنید...'}
            </span>
            <span className="mr-2">
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </span>
          </button>
          
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg  overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(field, option)}
                  className={`w-full p-3 text-right hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                    selectedValue === option ? 'bg-sky-50 text-sky-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {selectedValue && (
          <div className="mt-2 p-2 bg-sky-50 border border-sky-200 rounded">
            <p className="text-sky-700 text-sm flex items-center gap-2">
              <span className="font-medium">انتخاب شما:</span>
              {selectedValue}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderParentSection = (parentType: 'father' | 'mother') => {
    const isLiving = demographics[parentType === 'father' ? 'fatherLiving' : 'motherLiving'];
    
    if (!isLiving) return null;
    
    const prefix = parentType === 'father' ? 'پدر' : 'مادر';
    
    const fields = {
      age: `${parentType}Age` as keyof DemographicsData,
      education: `${parentType}Education` as keyof DemographicsData,
      occupation: `${parentType}Occupation` as keyof DemographicsData
    };
    
    return (
      <div className="space-y-6 mt-6 border-r-4 border-sky-500 pr-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          اطلاعات {prefix}
        </h3>
        
        {/* سن */}
        {renderDropdown(
          `${parentType}Age` as keyof DemographicsData,
          demographicsQuestions[`${parentType}Age`].question,
          demographicsQuestions[`${parentType}Age`].options,
          <User className="h-5 w-5 text-gray-600" />,
          demographics[`${parentType}Age`] as string
        )}
        
        {/* تحصیلات */}
        {renderDropdown(
          `${parentType}Education` as keyof DemographicsData,
          demographicsQuestions[`${parentType}Education`].question,
          demographicsQuestions[`${parentType}Education`].options,
          <GraduationCap className="h-5 w-5 text-gray-600" />,
          demographics[`${parentType}Education`] as string
        )}
        
        {/* شغل */}
        {renderDropdown(
          `${parentType}Occupation` as keyof DemographicsData,
          demographicsQuestions[`${parentType}Occupation`].question,
          demographicsQuestions[`${parentType}Occupation`].options,
          <Briefcase className="h-5 w-5 text-gray-600" />,
          demographics[`${parentType}Occupation`] as string
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
          <User className="h-8 w-8 text-sky-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">اطلاعات دموگرافیک</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          لطفاً اطلاعات خود را به دقت وارد کنید. این اطلاعات به تحلیل دقیق‌تر نتایج کمک می‌کند.
        </p>
      </div>

      <div className="space-y-8 overflow-y-auto pr-2">
        {/* بخش ۱: اطلاعات نوجوان */}
        <div className="space-y-6 border-r-4 border-sky-500 pr-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="h-6 w-6 text-sky-500" />
            اطلاعات نوجوان
          </h3>
          
          {/* سن نوجوان */}
          {renderDropdown(
            'age',
            demographicsQuestions.age.question,
            demographicsQuestions.age.options,
            <User className="h-5 w-5 text-gray-600" />,
            demographics.age
          )}
          
          {/* تحصیلات نوجوان */}
          {renderDropdown(
            'education',
            demographicsQuestions.education.question,
            demographicsQuestions.education.options,
            <GraduationCap className="h-5 w-5 text-gray-600" />,
            demographics.education
          )}
          
          {/* وضعیت نوجوان */}
          {renderDropdown(
            'occupation',
            demographicsQuestions.occupation.question,
            demographicsQuestions.occupation.options,
            <Briefcase className="h-5 w-5 text-gray-600" />,
            demographics.occupation
          )}
        </div>

        {/* بخش ۲: سوال اول: زندگی با چه کسی */}
        {renderDropdown(
          'livingWith',
          demographicsQuestions.livingWith.question,
          demographicsQuestions.livingWith.options,
          <Home className="h-6 w-6 text-sky-500" />,
          demographics.livingWith
        )}

        {/* بخش ۳: وضعیت زندگی والدین */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-sky-500" />
            وضعیت والدین
          </h3>
          
          {/* پدر زنده است؟ */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-gray-600" />
              <label className="text-gray-700 font-medium">آیا پدر زنده است؟</label>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onChange('fatherLiving', true)}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  demographics.fatherLiving 
                    ? 'bg-sky-100 border-sky-500 text-sky-700 font-medium' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                بله
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('fatherLiving', false);
                  // پاک کردن اطلاعات پدر اگر زنده نیست
                  onChange('fatherAge', '');
                  onChange('fatherEducation', '');
                  onChange('fatherOccupation', '');
                }}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  !demographics.fatherLiving 
                    ? 'bg-red-100 border-red-500 text-red-700 font-medium' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                خیر
              </button>
            </div>
          </div>

          {/* مادر زنده است؟ */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-gray-600" />
              <label className="text-gray-700 font-medium">آیا مادر زنده است؟</label>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onChange('motherLiving', true)}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  demographics.motherLiving 
                    ? 'bg-sky-100 border-sky-500 text-sky-700 font-medium' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                بله
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('motherLiving', false);
                  // پاک کردن اطلاعات مادر اگر زنده نیست
                  onChange('motherAge', '');
                  onChange('motherEducation', '');
                  onChange('motherOccupation', '');
                }}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  !demographics.motherLiving 
                    ? 'bg-red-100 border-red-500 text-red-700 font-medium' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                خیر
              </button>
            </div>
          </div>
        </div>

        {/* بخش ۴: اطلاعات پدر (اگر زندگی می‌کند) */}
        {demographics.fatherLiving && (
          <div className="space-y-6 border-r-4 border-sky-500 pr-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              اطلاعات پدر
            </h3>
            
            {/* سن پدر */}
            {renderDropdown(
              'fatherAge',
              demographicsQuestions.fatherAge.question,
              demographicsQuestions.fatherAge.options,
              <User className="h-5 w-5 text-gray-600" />,
              demographics.fatherAge
            )}
            
            {/* تحصیلات پدر */}
            {renderDropdown(
              'fatherEducation',
              demographicsQuestions.fatherEducation.question,
              demographicsQuestions.fatherEducation.options,
              <GraduationCap className="h-5 w-5 text-gray-600" />,
              demographics.fatherEducation
            )}
            
            {/* شغل پدر */}
            {renderDropdown(
              'fatherOccupation',
              demographicsQuestions.fatherOccupation.question,
              demographicsQuestions.fatherOccupation.options,
              <Briefcase className="h-5 w-5 text-gray-600" />,
              demographics.fatherOccupation
            )}
          </div>
        )}

        {/* بخش ۵: اطلاعات مادر (اگر زندگی می‌کند) */}
        {demographics.motherLiving && (
          <div className="space-y-6 border-r-4 border-sky-500 pr-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              اطلاعات مادر
            </h3>
            
            {/* سن مادر */}
            {renderDropdown(
              'motherAge',
              demographicsQuestions.motherAge.question,
              demographicsQuestions.motherAge.options,
              <User className="h-5 w-5 text-gray-600" />,
              demographics.motherAge
            )}
            
            {/* تحصیلات مادر */}
            {renderDropdown(
              'motherEducation',
              demographicsQuestions.motherEducation.question,
              demographicsQuestions.motherEducation.options,
              <GraduationCap className="h-5 w-5 text-gray-600" />,
              demographics.motherEducation
            )}
            
            {/* شغل مادر */}
            {renderDropdown(
              'motherOccupation',
              demographicsQuestions.motherOccupation.question,
              demographicsQuestions.motherOccupation.options,
              <Briefcase className="h-5 w-5 text-gray-600" />,
              demographics.motherOccupation
            )}
          </div>
        )}

        {/* استان و شهر */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-sky-500" />
            موقعیت جغرافیایی
          </h3>
          
          {/* انتخاب استان */}
          {renderDropdown(
            'province',
            'استان محل سکونت',
            Object.keys(provincesAndCities),
            <MapPin className="h-5 w-5 text-gray-600" />,
            demographics.province
          )}
          
          {/* انتخاب شهر (فقط اگر استان انتخاب شده) */}
          {selectedProvince && renderDropdown(
            'city',
            'شهر محل سکونت',
            getCitiesForProvince(selectedProvince),
            <MapPin className="h-5 w-5 text-gray-600" />,
            demographics.city
          )}
          
          {demographics.province && demographics.city && (
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg">
              <p className="text-sky-700 font-medium">
                موقعیت انتخاب شده: {demographics.province} - {demographics.city}
              </p>
            </div>
          )}
        </div>

        {/* بخش ۷: وضعیت تاهل */}
        {renderDropdown(
          'maritalStatus',
          demographicsQuestions.maritalStatus.question,
          demographicsQuestions.maritalStatus.options,
          <Users className="h-6 w-6 text-sky-500" />,
          demographics.maritalStatus
        )}
      </div>

      <div className="mt-8 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <p className="text-sky-800 text-sm">
          <strong>توجه:</strong> تمامی اطلاعات وارد شده کاملاً محرمانه تلقی شده و صرفاً برای تحلیل علمی و ارائه خدمات بهتر استفاده می‌شود.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <button
            onClick={onPrev}
            className="btn-secondary flex items-center justify-center gap-2 py-3 px-6 order-2 md:order-1"
          >
            بازگشت
          </button>
          
          <button
            onClick={onNext}
            disabled={!isValid}
            className={`btn-primary flex items-center justify-center gap-2 py-3 px-6 ${
              !isValid ? 'opacity-50 cursor-not-allowed' : ''
            } order-1 md:order-2`}
          >
            ادامه به بخش سوالات
          </button>
        </div>
        
        {!isValid && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700 text-sm">
              لطفاً تمامی فیلدهای ضروری را تکمیل کنید:
              <ul className="list-disc pr-5 mt-2 space-y-1">
                {/* اطلاعات نوجوان */}
                {!demographics.age && <li>سن نوجوان را انتخاب کنید</li>}
                {!demographics.education && <li>تحصیلات نوجوان را انتخاب کنید</li>}
                {!demographics.occupation && <li>وضعیت تحصیلی/شغلی نوجوان را انتخاب کنید</li>}
                
                {/* اطلاعات زندگی */}
                {!demographics.livingWith && <li>نحوه زندگی نوجوان را انتخاب کنید</li>}
                {!demographics.province && <li>استان محل سکونت را انتخاب کنید</li>}
                {!demographics.city && <li>شهر محل سکونت را انتخاب کنید</li>}
                {!demographics.maritalStatus && <li>وضعیت تاهل والدین را انتخاب کنید</li>}
                
                {/* اطلاعات پدر - از آنجایی که پیش‌فرض زنده است */}
                {demographics.fatherLiving && !demographics.fatherAge && <li>سن پدر را انتخاب کنید</li>}
                {demographics.fatherLiving && !demographics.fatherEducation && <li>تحصیلات پدر را انتخاب کنید</li>}
                {demographics.fatherLiving && !demographics.fatherOccupation && <li>شغل پدر را انتخاب کنید</li>}
                
                {/* اطلاعات مادر - از آنجایی که پیش‌فرض زنده است */}
                {demographics.motherLiving && !demographics.motherAge && <li>سن مادر را انتخاب کنید</li>}
                {demographics.motherLiving && !demographics.motherEducation && <li>تحصیلات مادر را انتخاب کنید</li>}
                {demographics.motherLiving && !demographics.motherOccupation && <li>شغل مادر را انتخاب کنید</li>}
              </ul>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}