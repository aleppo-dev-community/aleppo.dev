"use client";

import { rpc } from "@/lib/rpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function EventRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = useParams().id as string;
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
    if (autoSubmit && eventQuery.data?.isProfileComplete && !eventQuery.data?.isRegistered) {
      registerMutation.mutate();
    }
  }, [
    autoSubmit,
    eventQuery.data?.isProfileComplete,
    eventQuery.data?.isRegistered,
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
