"use client";

import { events } from "@/lib/events";
import { rpc } from "@/lib/rpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import dayjs from "dayjs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

export function EventRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = useParams().id as string;
  const event = events.find((event) => event.id === eventId);
  const [autoSubmit, setAutoSubmit] = useState(searchParams.get("autoSubmit") === "true");

  const eventQuery = useQuery({
    queryKey: ["event", "status", eventId],
    queryFn: () => rpc.events[":eventSlug"].status.$get({ param: { eventSlug: eventId } }),
  });

  const registerMutation = useMutation({
    mutationFn: () => {
      setAutoSubmit(false);
      router.replace(`/events/${eventId}`);
      return rpc.events[":eventSlug"].$post({ param: { eventSlug: eventId } });
    },
    onSuccess: () => {
      toast.success("تم تسجيلك في الفعالية بنجاح!");
      eventQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.error.message);
    },
  });

  useEffect(() => {
    if (
      autoSubmit &&
      eventQuery.data?.isProfileComplete &&
      !eventQuery.data?.isRegistered &&
      !eventQuery.data?.isRegistrationClosed
    ) {
      registerMutation.mutate();
    }
  }, [
    autoSubmit,
    eventQuery.data?.isProfileComplete,
    eventQuery.data?.isRegistered,
    eventQuery.data?.isRegistrationClosed,
    registerMutation,
  ]);

  const handleRegister = () => {
    if (eventQuery.error?.status === 401) {
      router.push(
        `/auth?redirect=${encodeURIComponent(`/dashboard/profile/edit?redirect=${encodeURIComponent(`/events/${eventId}?autoSubmit=true`)}`)}`,
      );
      return;
    }
    if (!eventQuery.data?.isProfileComplete) {
      router.push(
        `/dashboard/profile/edit?redirect=${encodeURIComponent(`/events/${eventId}?autoSubmit=true`)}`,
      );
      return;
    }

    registerMutation.mutate();
  };

  const isLoading = eventQuery.isLoading || registerMutation.isPending;

  if (event?.date && dayjs(event.date).isBefore(dayjs(), "date")) {
    return null;
  }

  if (eventQuery.data?.eventRegistrationId) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 mx-auto">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-600 mb-2">تم تسجيلك في الفعالية!</h3>
          <p className="text-sm text-muted-foreground mb-4">يرجى عرض هذا الرمز عند الوصول </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <QRCode value={eventQuery.data.eventRegistrationId} size={200} className="mx-auto" />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          رمز التسجيل: {eventQuery.data.eventRegistrationId}
        </p>
      </div>
    );
  }

  if (eventQuery.data?.isRegistrationClosed) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm">انتهى التسجيل لهذه الفعالية</p>
      </div>
    );
  }
  return (
    <Button
      onClick={handleRegister}
      disabled={eventQuery.data?.isRegistered}
      isLoading={isLoading}
      size="lg"
      className="w-full sm:w-auto"
    >
      {eventQuery.data?.isRegistered ? "أنت مسجل في الفعالية!" : "أحجز مقعدك"}
    </Button>
  );
}
