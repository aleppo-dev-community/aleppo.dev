"use client";

import { useEffect, useRef, useState } from "react";

interface UseCarouselAutoPlayProps {
  totalSlides: number;
  onIndexChange: (index: number) => void;
  autoPlayInterval?: number;
}

function useCarouselAutoPlay({
  totalSlides,
  onIndexChange,
  autoPlayInterval = 5000,
}: UseCarouselAutoPlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance effect
  useEffect(() => {
    if (isPaused || totalSlides === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, totalSlides, autoPlayInterval]);

  // Notify parent when index changes
  useEffect(() => {
    onIndexChange(currentIndex);
  }, [currentIndex, onIndexChange]);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    // Reset timer by pausing and resuming
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 100);
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    // Reset timer
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 100);
  };

  return {
    currentIndex,
    pause,
    resume,
    goToPrevious,
    goToNext,
  };
}

import {
  roleColors,
  roleLabels,
  volunteers,
  type Volunteer,
  type VolunteerRole,
} from "@/lib/volunteers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
export function VolunteerCarousel() {
  const [mounted, setMounted] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  const { pause, resume, goToPrevious, goToNext } = useCarouselAutoPlay({
    totalSlides: volunteers.length,
    onIndexChange: (index) => {
      if (mounted) setDisplayIndex(index);
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (volunteers.length === 0) {
    return <div>No volunteers to display</div>;
  }

  const volunteer = volunteers[displayIndex];

  return (
    <div
      className="w-full mb-16 px-4 py-8"
      onMouseEnter={pause}
      onMouseLeave={resume}
      suppressHydrationWarning
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center justify-center gap-4">
          <button
            onClick={goToPrevious}
            className="p-3 rounded-full transition-all hover:shadow-lg flex-shrink-0"
            style={{
              backgroundColor: `${volunteer.roles[0] ? roleColors[volunteer.roles[0]].text.replace("text-", "bg-").replace("-400", "") : "bg-blue"}-500/20`,
              color: roleColors[volunteer.roles[0]]?.text || "text-blue-400",
            }}
            aria-label="Previous volunteer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <CarouselVolunteerCard volunteer={volunteer} />

          <button
            onClick={goToNext}
            className="p-3 rounded-full transition-all hover:shadow-lg flex-shrink-0"
            style={{
              backgroundColor: `${volunteer.roles[0] ? roleColors[volunteer.roles[0]].text.replace("text-", "bg-").replace("-400", "") : "bg-blue"}-500/20`,
              color: roleColors[volunteer.roles[0]]?.text || "text-blue-400",
            }}
            aria-label="Next volunteer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CarouselVolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  const firstRole = volunteer.roles[0];
  const roleColor = firstRole ? roleColors[firstRole] : null;

  const colorMap: Record<string, { from: string; to: string }> = {
    "text-blue-400": { from: "#3b82f6", to: "#1e40af" },
    "text-purple-400": { from: "#a855f7", to: "#6d28d9" },
    "text-green-400": { from: "#22c55e", to: "#15803d" },
    "text-pink-400": { from: "#ec4899", to: "#be185d" },
    "text-cyan-400": { from: "#06b6d4", to: "#0e7490" },
  };

  const gradientColors = roleColor ? colorMap[roleColor.text] : colorMap["text-blue-400"];

  const cardContent = (
    <div
      suppressHydrationWarning
      className="relative carousel-card"
      style={
        {
          "--color-from": gradientColors.from,
          "--color-to": gradientColors.to,
        } as React.CSSProperties
      }
    >
      <div className="gradient-border-animate rounded-xl p-[3px]">
        <div className="bg-[#1a1a1a] rounded-[10px] p-8 text-center">
          <h3
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: '"Amiri", serif' }}
          >
            {volunteer.name}
          </h3>

          <div className="h-8 mb-6">
            {volunteer.professionalRole && (
              <p className="text-lg text-gray-400">{volunteer.professionalRole}</p>
            )}
          </div>

          <div className="text-sm text-gray-500 mb-6">{volunteer.eventsCount} فعالية</div>

          <div className="flex flex-wrap gap-2 justify-center">
            {volunteer.roles.map((role) => {
              const colors = roleColors[role];
              return (
                <span
                  key={role}
                  className={`px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.text} border border-current/30`}
                >
                  {roleLabels[role as VolunteerRole]}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  if (volunteer.linkedinUrl) {
    return (
      <Link
        href={volunteer.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        {cardContent}
      </Link>
    );
  }

  return <div className="w-full max-w-2xl cursor-default">{cardContent}</div>;
}
