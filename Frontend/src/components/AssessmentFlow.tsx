import { DemographicsData } from "@/types/types";
import { useState } from "react";

// در کامپوننت والد (مثلاً AssessmentFlow.tsx)
const [demographics, setDemographics] = useState<DemographicsData>({
  // اطلاعات نوجوان
  age: '',
  education: '',
  occupation: '',
  
  // اطلاعات زندگی - والدین به طور پیش‌فرض زنده هستند
  livingWith: '',
  fatherLiving: true, // ✅ پیش‌فرض true
  motherLiving: true, // ✅ پیش‌فرض true
  
  // اطلاعات پدر
  fatherAge: '',
  fatherEducation: '',
  fatherOccupation: '',
  
  // اطلاعات مادر
  motherAge: '',
  motherEducation: '',
  motherOccupation: '',
  
  // موقعیت جغرافیایی
  province: '',
  city: '',
  
  // سایر
  maritalStatus: '',
});