// apps/web/components/auth/profile-form.tsx
'use client';

import { useState } from 'react';
import { Button } from '@workspace/ui/components/button';

export function ProfileForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    telegram: '',
    age: '',
    university: '',
    faculty: '',
    academicYear: '',
    specialization: '',
    yearsOfExperience: '',
    linkedin: '',
    cvUrl: '',
    portfolioUrl: '',
    shareData: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Redirect or show success message
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">المعلومات الشخصية</h2>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">الاسم الكامل</label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">رقم الهاتف</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="telegram" className="block text-sm font-medium mb-1">حساب تيليجرام</label>
            <input
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-1">العمر</label>
            <input
              id="age"
              name="age"
              type="number"
              min="16"
              max="100"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">المعلومات الأكاديمية</h2>
          <div>
            <label htmlFor="university" className="block text-sm font-medium mb-1">الجامعة</label>
            <input
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="faculty" className="block text-sm font-medium mb-1">الكلية</label>
            <input
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="academicYear" className="block text-sm font-medium mb-1">السنة الدراسية</label>
            <input
              id="academicYear"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">المعلومات المهنية</h2>
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium mb-1">التخصص</label>
            <input
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium mb-1">عدد سنوات الخبرة</label>
            <input
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label htmlFor="cvUrl" className="block text-sm font-medium mb-1">رابط السيرة الذاتية</label>
            <input
              id="cvUrl"
              name="cvUrl"
              type="url"
              value={formData.cvUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/cv.pdf"
            />
          </div>
          <div>
            <label htmlFor="portfolioUrl" className="block text-sm font-medium mb-1">رابط المعرض</label>
            <input
              id="portfolioUrl"
              name="portfolioUrl"
              type="url"
              value={formData.portfolioUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/portfolio"
            />
          </div>
          <div>
            <label htmlFor="shareData">
              <input
                type="checkbox"
                id="shareData"
                name="shareData"
                checked={formData.shareData}
                onChange={handleChange}
              />
              هل انت مهتم بمشاركة بياناتك في حالة وجود فرص توظيفية للمستقبل؟
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <Button type="button" onClick={() => setStep(step - 1)}>
            السابق
          </Button>
        )}
        {step < 3 ? (
          <Button type="button" onClick={() => setStep(step + 1)}>
            التالي
          </Button>
        ) : (
          <Button type="submit">إرسال</Button>
        )}
      </div>
    </form>
  );
}