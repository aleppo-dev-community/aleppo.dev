// apps/web/components/auth/profile-form.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';
import { authClient } from '@/lib/auth-client';
import { z } from 'zod';

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

type ValidationErrors = Partial<Record<keyof FormData, string>>;

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

// Frontend validation schema matching backend
const zodUserDetails = z.object({
  fullName: z.string().min(1, "الاسم الكامل مطلوب"),
  phone: z.string().min(1, "رقم الهاتف مطلوب"),
  telegram: z.string().url("رابط تيليجرام غير صحيح").optional().or(z.literal('')),
  age: z.number().int().min(0, "العمر يجب أن يكون رقماً موجباً").max(150, "العمر غير صحيح"),
  university: z.string().min(1, "الجامعة مطلوبة"),
  faculty: z.string().min(1, "الكلية مطلوبة"),
  specialization: z.string().min(1, "التخصص مطلوب"),
  academicYear: z.string().min(1, "السنة الدراسية مطلوبة"),
  yearsOfExperience: z.number().int().min(0, "سنوات الخبرة يجب أن تكون رقماً موجباً").max(30, "سنوات الخبرة كثيرة جداً"),
  linkedinUrl: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
      "رابط LinkedIn يجب أن يكون بالشكل: linkedin.com/in/username"
    )
    .optional()
    .or(z.literal('')),
  cvUrl: z.string().url("رابط السيرة الذاتية غير صحيح").optional().or(z.literal('')),
  websiteUrl: z.string().url("رابط الموقع الشخصي غير صحيح").optional().or(z.literal('')),
  canShareData: z.boolean().optional(),
});

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
  const [errors, setErrors] = useState<ValidationErrors>({});
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

  // Validate a single field
  const validateField = (name: keyof FormData, value: any): string | null => {
    try {
      const fieldSchema = zodUserDetails.shape[name];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || 'خطأ في التحقق';
      }
      return 'خطأ في التحقق';
    }
  };

  // Validate current step (without setting state)
  const validateStepData = (stepIndex: number, data: FormData): { isValid: boolean; errors: ValidationErrors } => {
    const currentStepFields = STEPS[stepIndex]!.fields;
    const stepErrors: ValidationErrors = {};
    let isValid = true;

    for (const field of currentStepFields) {
      const value = data[field];
      
      // Skip validation for optional fields that are empty
      if ((field === 'telegram' || field === 'linkedinUrl' || field === 'cvUrl' || field === 'websiteUrl') && 
          (value === '' || value === undefined)) {
        continue;
      }

      // Skip validation for canShareData (it's a boolean)
      if (field === 'canShareData') {
        continue;
      }

      const error = validateField(field, value);
      if (error) {
        stepErrors[field] = error;
        isValid = false;
      }
    }

    return { isValid, errors: stepErrors };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    const newValue = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error for this field and validate
    setErrors(prev => ({ ...prev, [name]: undefined }));
    
    // Validate field on change for better UX
    if (newValue !== '' && newValue !== undefined) {
      const error = validateField(name as keyof FormData, newValue);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleNext = () => {
    const validation = validateStepData(step, formData);
    setErrors(prev => ({ ...prev, ...validation.errors }));
    
    if (validation.isValid) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all steps before submission
    let allValid = true;
    let allErrors: ValidationErrors = {};
    
    for (let i = 0; i < STEPS.length; i++) {
      const validation = validateStepData(i, formData);
      if (!validation.isValid) {
        allValid = false;
        allErrors = { ...allErrors, ...validation.errors };
      }
    }

    if (!allValid) {
      setErrors(allErrors);
      // Go back to first step with errors
      setStep(0);
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await authClient.getSession();
      if (!session || !session.data) {
        router.push('/signup');
        return;
      }

      // Prepare data for submission (convert empty strings to undefined for optional fields)
      const submitData = {
        ...formData,
        telegram: formData.telegram === '' ? undefined : formData.telegram,
        linkedinUrl: formData.linkedinUrl === '' ? undefined : formData.linkedinUrl,
        cvUrl: formData.cvUrl === '' ? undefined : formData.cvUrl,
        websiteUrl: formData.websiteUrl === '' ? undefined : formData.websiteUrl,
        userId: session.data.user.id,
      };

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const errorData = await response.json();
        console.error('Server validation error:', errorData);
        // Handle server-side validation errors
        if (errorData.errors) {
          setErrors(errorData.errors);
        }
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
  const currentStepValidation = validateStepData(step, formData);
  const isStepValid = currentStepValidation.isValid;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{currentStep.title}</h2>
        <span className="text-sm text-gray-500">
          {step + 1} من {STEPS.length}
        </span>
      </div>
      
      <div className="space-y-4">
        {currentStep.fields.map(field => {
          const isCheckbox = field === 'canShareData';
          const isNumber = field === 'age' || field === 'yearsOfExperience';
          const isUrl = field.endsWith('Url');
          const isOptional = field === 'telegram' || field === 'linkedinUrl' || field === 'cvUrl' || field === 'websiteUrl';
          const hasError = errors[field];

          return (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-1">
                {getFieldLabel(field)}
                {!isOptional && !isCheckbox && <span className="text-red-500 mr-1">*</span>}
              </label>
              {isCheckbox ? (
                <div className="flex items-center">
                  <input
                    id={field}
                    name={field}
                    type="checkbox"
                    checked={!!formData[field]}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-600">نعم، أوافق على مشاركة بياناتي</span>
                </div>
              ) : (
                <input
                  id={field}
                  name={field}
                  type={isNumber ? 'number' : isUrl ? 'url' : 'text'}
                  value={formData[field] ?? ''}
                  onChange={handleChange}
                  min={isNumber ? 0 : undefined}
                  max={field === 'age' ? 150 : field === 'yearsOfExperience' ? 30 : undefined}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    hasError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={getFieldPlaceholder(field)}
                />
              )}
              {hasError && (
                <p className="text-red-500 text-sm mt-1">{hasError}</p>
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
        <div className="flex gap-2">
          {step < STEPS.length - 1 ? (
            <Button 
              type="button" 
              onClick={handleNext}
              disabled={!isStepValid}
            >
              التالي
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isSubmitting || !isStepValid}
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
      </div>
    </form>
  );
}

// Helper functions
function getFieldLabel(field: keyof FormData): string {
  const labels: Record<keyof FormData, string> = {
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    telegram: 'حساب تيليجرام (اختياري)',
    age: 'العمر',
    university: 'الجامعة',
    faculty: 'الكلية',
    academicYear: 'السنة الدراسية',
    specialization: 'التخصص',
    yearsOfExperience: 'عدد سنوات الخبرة',
    linkedinUrl: 'LinkedIn (اختياري)',
    cvUrl: 'رابط السيرة الذاتية (اختياري)',
    websiteUrl: 'رابط الموقع الشخصي (اختياري)',
    canShareData: 'مشاركة البيانات',
  };
  return labels[field];
}

function getFieldPlaceholder(field: keyof FormData): string {
  const placeholders: Partial<Record<keyof FormData, string>> = {
    fullName: 'أدخل اسمك الكامل',
    phone: 'أدخل رقم هاتفك',
    telegram: 'https://t.me/username',
    age: 'أدخل عمرك',
    university: 'أدخل اسم الجامعة',
    faculty: 'أدخل اسم الكلية',
    academicYear: 'مثال: السنة الثالثة',
    specialization: 'أدخل تخصصك',
    yearsOfExperience: 'أدخل عدد سنوات الخبرة',
    linkedinUrl: 'https://linkedin.com/in/username',
    cvUrl: 'https://example.com/cv.pdf',
    websiteUrl: 'https://example.com',
  };
  return placeholders[field] || '';
}