"use client";

import { events } from "@/lib/events";
import { rpc } from "@/lib/rpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerEventSchema } from "@workspace/api/src/routes/events/dto/event-registration";
import { Button } from "@workspace/ui/components/button";
import { ConfirmDialog } from "@workspace/ui/components/confirm-dialog";
import { Loading } from "@workspace/ui/components/loading";
import dayjs from "dayjs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { z } from "zod";
import { RegistrationFormDialog } from "./registration-form-dialog";

export function EventRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = useParams().id as string;
  const event = events.find((event) => event.id === eventId);
  const [autoSubmit, setAutoSubmit] = useState(searchParams.get("autoSubmit") === "true");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const eventQuery = useQuery({
    queryKey: ["event", "status", eventId],
    queryFn: () => rpc.events[":eventSlug"].status.$get({ param: { eventSlug: eventId } }),
    refetchOnMount: true,
  });

  const registerMutation = useMutation({
    mutationFn: (data: z.infer<typeof registerEventSchema>) => {
      setAutoSubmit(false);
      router.replace(`/events/${eventId}`);
      return rpc.events[":eventSlug"].$post({
        param: { eventSlug: eventId },
        json: data,
      });
    },
    onSuccess: () => {
      setShowRegistrationForm(false);
      toast.success("تم تسجيلك في الفعالية بنجاح!");
      eventQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.error.message);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => {
      return rpc.events[":eventSlug"].$delete({ param: { eventSlug: eventId } });
    },
    onSuccess: () => {
      toast.success("تم إلغاء التسجيل بنجاح!");
      eventQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.error.message);
    },
  });

  useEffect(() => {
    if (autoSubmit && eventQuery.data?.status === "NOT_REGISTERED") {
      setShowRegistrationForm(true);
    }
  }, [autoSubmit, eventQuery.data?.status, registerMutation]);

  const handleRegister = () => {
    if (eventQuery.error?.status === 401) {
      router.push(
        `/auth?redirect=${encodeURIComponent(`/dashboard/profile/edit?redirect=${encodeURIComponent(`/events/${eventId}?autoSubmit=true`)}`)}`,
      );
      return;
    }
    if (eventQuery.data?.status === "PROFILE_INCOMPLETE") {
      router.push(
        `/dashboard/profile/edit?redirect=${encodeURIComponent(`/events/${eventId}?autoSubmit=true`)}`,
      );
      return;
    }

    setShowRegistrationForm(true);
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    cancelMutation.mutate();
  };

  const handleSubmitRegistration = async (data: z.infer<typeof registerEventSchema>) => {
    await registerMutation.mutateAsync(data);
  };

  const handleCloseForm = () => {
    setShowRegistrationForm(false);
  };

  if (eventQuery.isLoading) {
    return <Loading size="sm" className="my-3 mx-14" />;
  }
  if (eventQuery.error) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">حدث خطأ</h3>
        </div>
      </div>
    );
  }
  const status = eventQuery.data?.status;
  if (event?.date && dayjs().isAfter(dayjs(event.date), "date")) {
    return null;
  }
  if (status === "ACCEPTED") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 mx-auto">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-600 mb-2">تم قبولك في الفعالية!</h3>
          <p className="text-sm text-muted-foreground mb-4">يرجى عرض هذا الرمز عند الوصول </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <QRCode
            value={eventQuery.data?.eventRegistrationId || ""}
            size={200}
            className="mx-auto"
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          رمز التسجيل: {eventQuery.data?.eventRegistrationId || ""}
        </p>
      </div>
    );
  }
  if (status === "NOT_ACCEPTED") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-orange-600 mb-2">
            نعتذر منك، تم استيفاء عدد الحضور
          </h3>
        </div>
      </div>
    );
  }

  if (status === "CANCELLED") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-orange-600 mb-2">تم إلغاء التسجيل</h3>
        </div>
      </div>
    );
  }
  if (status === "PENDING_ACCEPTANCE") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
            يرجى إنتظار إيميل القبول.
          </h3>
        </div>
      </div>
    );
  }

  if (status === "REGISTRATION_CLOSED") {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm">انتهى التسجيل لهذه الفعالية</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={handleRegister}
          disabled={status === "REGISTERED"}
          isLoading={cancelMutation.isPending}
          size="lg"
          className="w-full sm:w-auto"
        >
          {status === "REGISTERED" ? "أنت مسجل في الفعالية!" : "أحجز مقعدك"}
        </Button>
        {status === "REGISTERED" && (
          <>
            <Button onClick={handleCancel} variant="destructive" size="lg">
              إلغاء التسجيل
            </Button>
            <ConfirmDialog
              open={showCancelDialog}
              onOpenChange={setShowCancelDialog}
              title="تأكيد إلغاء التسجيل"
              description="هل أنت متأكد من أنك تريد إلغاء تسجيلك في هذه الفعالية؟ لا يمكن التراجع عن هذا الإجراء."
              confirmText="نعم، ألغ التسجيل"
              cancelText="إبقاء التسجيل"
              onConfirm={confirmCancel}
              variant="destructive"
            />
          </>
        )}
      </div>

      <RegistrationFormDialog
        isOpen={showRegistrationForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmitRegistration}
      />
    </>
  );
}
