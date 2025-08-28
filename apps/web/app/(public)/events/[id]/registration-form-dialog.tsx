"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerEventSchema } from "@workspace/api/src/routes/events/dto/event-registration";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Form } from "@workspace/ui/components/form";
import { FormRadioGroup } from "@workspace/ui/components/form/form-radio-group";
import { FormSubmit } from "@workspace/ui/components/form/form-submit";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RegistrationFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof registerEventSchema>) => Promise<void>;
}

export function RegistrationFormDialog({ isOpen, onClose, onSubmit }: RegistrationFormDialogProps) {
  const form = useForm<z.infer<typeof registerEventSchema>>({
    resolver: zodResolver(registerEventSchema),
    defaultValues: {
      attendanceCertainty: "SURE",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const attendanceOptions = [
    {
      value: "SURE",
      label: "نعم",
    },
    {
      value: "MAYBE",
      label: "قد أحضر (غير متأكد)",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تأكيد التسجيل</DialogTitle>
          <DialogDescription>
            في حال عدم التأكد من الحضور يرجى تحديد ذلك، في حال تكرر عدم الحضور بعد التأكيد
            <b> قد لا يتم قبولك في الفعاليات القادمة.</b>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormRadioGroup
              name="attendanceCertainty"
              label="هل أنت متأكد من الحضور؟"
              options={attendanceOptions}
            />
            <DialogDescription>
              * في حال طروء أمر ما تستطيع إلغاء التسجيل في أي وقت.
            </DialogDescription>
            <DialogFooter className="flex-row  gap-2">
              <FormSubmit className="flex-1 sm:flex-none">تأكيد التسجيل</FormSubmit>
              <Button
                type="button"
                onClick={handleClose}
                variant="secondary"
                size="lg"
                className="flex-1 sm:flex-none"
              >
                إلغاء
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
