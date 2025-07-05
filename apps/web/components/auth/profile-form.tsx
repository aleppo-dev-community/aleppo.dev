// apps/web/components/auth/profile-form.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';
import { authClient } from '@/lib/auth-client';

type FormData = {
  fullName: string;
  phone: string;
  telegram?: string;
  age?: number;
  university?: string;
  faculty?: string;
  academicYear?: string;
  specialization?: string;
  yearsOfExperience?: number;
  linkedinUrl?: string;
  cvUrl?: string;
  websiteUrl?: string;
  canShareData: boolean;
};

const INITIAL_DATA: FormData = {
  fullName: '',
  phone: '',
  telegram: '',
  age: undefined,
  university: '',
  faculty: '',
  academicYear: '',
  specialization: '',
  yearsOfExperience: undefined,
  linkedinUrl: '',
  cvUrl: '',
  websiteUrl: '',
  canShareData: false,
};

const STEPS = [
  {
    title: "المعلومات الشخصية",
    fields: ['fullName', 'phone', 'telegram', 'age'] as const,
  },
  {
    title: "المعلومات الأكاديمية",
    fields: ['university', 'faculty', 'academicYear'] as const,
  },
  {
    title: "المعلومات المهنية",
    fields: ['specialization', 'yearsOfExperience', 'linkedinUrl', 'cvUrl', 'websiteUrl', 'canShareData'] as const,
  },
];

export function ProfileForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const session = await authClient.getSession();
        if (!session || !session.data) {
          router.push('/signup');
          return;
        }

        const response = await fetch(`/api/profile?userId=${session.data.user.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) setFormData(data);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const session = await authClient.getSession();
      if (!session || !session.data) {
        router.push('/signup');
        return;
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: session.data.user.id,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const currentStep = STEPS[step]!;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">{currentStep.title}</h2>
      
      <div className="space-y-4">
        {currentStep.fields.map(field => {
          const isCheckbox = field === 'canShareData';
          const isNumber = field === 'age' || field === 'yearsOfExperience';
          const isUrl = field.endsWith('Url');

          return (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-1">
                {getFieldLabel(field)}
              </label>
              {isCheckbox ? (
                <input
                  id={field}
                  name={field}
                  type="checkbox"
                  checked={!!formData[field]}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              ) : (
                <input
                  id={field}
                  name={field}
                  type={isNumber ? 'number' : isUrl ? 'url' : 'text'}
                  value={formData[field] ?? ''}
                  onChange={handleChange}
                  required={!isCheckbox && !isUrl}
                  min={isNumber ? 0 : undefined}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={getFieldPlaceholder(field)}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        {step > 0 && (
          <Button 
            type="button" 
            onClick={() => setStep(step - 1)}
            variant="outline"
          >
            السابق
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button 
            type="button" 
            onClick={() => setStep(step + 1)}
            disabled={!validateStep(step, formData)}
          >
            التالي
          </Button>
        ) : (
          <Button 
            type="submit" 
            disabled={isSubmitting || !validateStep(step, formData)}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                جاري الحفظ...
              </span>
            ) : 'إرسال'}
          </Button>
        )}
      </div>
    </form>
  );
}

// Helper functions
function getFieldLabel(field: keyof FormData): string {
  const labels: Record<keyof FormData, string> = {
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    telegram: 'حساب تيليجرام',
    age: 'العمر',
    university: 'الجامعة',
    faculty: 'الكلية',
    academicYear: 'السنة الدراسية',
    specialization: 'التخصص',
    yearsOfExperience: 'عدد سنوات الخبرة',
    linkedinUrl: 'LinkedIn',
    cvUrl: 'رابط السيرة الذاتية',
    websiteUrl: 'رابط الموقع الشخصي',
    canShareData: 'هل توافق على مشاركة بياناتك؟',
  };
  return labels[field];
}

function getFieldPlaceholder(field: keyof FormData): string {
  const placeholders: Partial<Record<keyof FormData, string>> = {
    linkedinUrl: 'https://linkedin.com/in/username',
    cvUrl: 'https://example.com/cv.pdf',
    websiteUrl: 'https://example.com',
  };
  return placeholders[field] || '';
}

function validateStep(step: number, data: FormData): boolean {
  const requiredFields = STEPS[step]!.fields.filter(field => 
    field !== 'canShareData' && field !== 'telegram' && field !== 'websiteUrl'
  );
  return requiredFields.every(field => Boolean(data[field]));
}