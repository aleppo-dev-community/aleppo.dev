"use client";

import { rpc } from "@/lib/rpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userDetailsSchema } from "@workspace/api/src/routes/profile/dto/user-details";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Form } from "@workspace/ui/components/form";
import { FormCheckbox } from "@workspace/ui/components/form/form-checkbox";
import { FormInput } from "@workspace/ui/components/form/form-input";
import { FormSelect } from "@workspace/ui/components/form/form-select";
import { FormSubmit } from "@workspace/ui/components/form/form-submit";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { VALID_FACULTIES, VALID_SPECIALIZATIONS } from "./constants";

const frontendValidationSchema = userDetailsSchema
  .extend({
    acceptsDataSharing: z.boolean().refine((v) => v, {
      message: "يجب أن توافق على مشاركة البيانات",
    }),
    customSpecialization: z.string().optional(),
    customFaculty: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.specialization === "Other" &&
        (!data.customSpecialization || data.customSpecialization === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "يرجى إدخال التخصص",
      path: ["customSpecialization"],
    },
  )
  .refine(
    (data) => {
      if (data.faculty === "أخرى" && (!data.customFaculty || data.customFaculty === "")) {
        return false;
      }
      return true;
    },
    {
      message: "يرجى إدخال الدراسة الجامعية الآخر",
      path: ["customFaculty"],
    },
  );

type UserDetailsFormData = z.infer<typeof frontendValidationSchema>;

export function ProfileForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const form = useForm<UserDetailsFormData>({
    resolver: zodResolver(frontendValidationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      telegramId: "",
      yearOfBirth: new Date().getFullYear() - 25,
      specialization: "",
      faculty: "",
      customSpecialization: "",
      customFaculty: "",
      yearsOfExperience: 0,
      linkedinUrl: "",
      githubUrl: "",
      websiteUrl: "",
      acceptsDataSharing: false,
    },
  });
  const watchedSpecialization = form.watch("specialization");
  const watchedFaculty = form.watch("faculty");

  const mutation = useMutation({
    mutationFn: async (data: UserDetailsFormData) => {
      const processedData = {
        ...data,
        specialization:
          (data.specialization === "Other" ? data.customSpecialization : data.specialization) ?? "",
        faculty: (data.faculty === "أخرى" ? data.customFaculty : data.faculty) ?? "",
      };

      const { customSpecialization, customFaculty, acceptsDataSharing, ...finalData } =
        processedData;

      return rpc.profile.$post({ json: finalData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["event", "status"] });
      router.push(redirect ?? "/");
    },
  });

  const onSubmit = async (data: UserDetailsFormData) => {
    await mutation.mutateAsync(data);
  };

  const specializationOptions = VALID_SPECIALIZATIONS.map((spec) => ({
    value: spec,
    label: spec,
  }));

  const facultyOptions = VALID_FACULTIES.map((faculty) => ({
    value: faculty,
    label: faculty,
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-foreground">إكمال الملف الشخصي</h1>
        <p className="text-muted-foreground">يرجى تعبئة المعلومات التالية لإكمال ملفك الشخصي</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">المعلومات الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="fullName"
                  label="الاسم الكامل"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
                <FormInput name="phone" label="رقم الهاتف" placeholder="أدخل رقم هاتفك" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput name="telegramId" label="معرف التليجرام" placeholder="@username" />
                <FormInput
                  name="yearOfBirth"
                  label="سنة الميلاد"
                  type="tel"
                  required
                  placeholder="1995"
                  InputProps={{
                    dir: "rtl",
                    inputMode: "numeric",
                  }}
                  description="أدخل سنة الميلاد"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">المعلومات الأكاديمية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormSelect
                SelectProps={{ dir: "rtl" }}
                name="faculty"
                label="الدراسة الجامعية"
                placeholder="اختر كليتك"
                options={facultyOptions}
              />
              {watchedFaculty === "أخرى" && (
                <FormInput
                  name="customFaculty"
                  label="الكلية الأخرى"
                  placeholder="أدخل اسم كليتك"
                  description="يرجى إدخال اسم كليتك"
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">المعلومات المهنية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <FormSelect
                    name="specialization"
                    label="التخصص"
                    placeholder="اختر تخصصك"
                    options={specializationOptions}
                    description="اختر تخصصك المهني"
                  />
                  {watchedSpecialization === "Other" && (
                    <FormInput
                      name="customSpecialization"
                      label="التخصص الآخر"
                      placeholder="أدخل تخصصك"
                      description="يرجى إدخال تخصصك"
                    />
                  )}
                </div>
                <FormInput
                  name="yearsOfExperience"
                  label="سنوات الخبرة"
                  type="tel"
                  InputProps={{
                    dir: "rtl",
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  placeholder="0"
                  description="عدد سنوات الخبرة في المجال"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">الروابط الاجتماعية والمهنية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="linkedinUrl"
                label="رابط LinkedIn"
                placeholder="https://linkedin.com/in/username"
                description="رابط ملفك الشخصي على LinkedIn"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="githubUrl"
                  label="رابط GitHub"
                  placeholder="https://github.com/username"
                  description="رابط ملفك الشخصي على GitHub"
                />
                <FormInput
                  name="websiteUrl"
                  label="رابط الموقع الشخصي"
                  placeholder="https://yourwebsite.com"
                  description="رابط موقعك الشخصي أو portfolio"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">موافقة على مشاركة البيانات</CardTitle>
            </CardHeader>
            <CardContent>
              <FormCheckbox
                name="acceptsDataSharing"
                label="أوافق على مشاركة معلوماتي مع منظمي الفعاليات"
                description="سيتم استخدام هذه المعلومات لتحسين تجربتك في الفعاليات وللتواصل معك"
              />
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <FormSubmit
              className="w-full max-w-md px-8 py-3 text-lg font-semibold"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "جاري الحفظ..." : "حفظ الملف الشخصي"}
            </FormSubmit>
          </div>
        </form>
      </Form>
    </div>
  );
}
