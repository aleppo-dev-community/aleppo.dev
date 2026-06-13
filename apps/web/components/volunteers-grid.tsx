"use client";

import {
  roleColors,
  roleLabels,
  volunteers,
  type Volunteer,
  type VolunteerRole,
} from "@/lib/volunteers";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";

const roles: (VolunteerRole | "all")[] = [
  "all",
  ...Object.keys(roleLabels).filter((key) => key !== "all"),
] as (VolunteerRole | "all")[];
export function VolunteersGrid() {
  const [selectedRolesStr, setSelectedRolesStr] = useQueryState(
    "roles",
    parseAsString.withDefault(""),
  );

  const selectedRoles = selectedRolesStr ? selectedRolesStr.split(",").filter(Boolean) : [];

  const filteredVolunteers = (
    selectedRoles.length === 0 || selectedRoles.includes("all")
      ? volunteers
      : volunteers.filter((volunteer) =>
          selectedRoles.some((role: string) => volunteer.roles.includes(role as VolunteerRole)),
        )
  ).sort((a, b) => {
    if (a.isAlumni !== b.isAlumni) {
      return a.isAlumni ? 1 : -1;
    }
    return a.name.localeCompare(b.name, "ar");
  });

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-8">
        {roles.map((role) => {
          const isSelected = selectedRoles.includes(role);
          return (
            <button
              key={role}
              onClick={() => {
                let newRoles: string[];
                if (role === "all") {
                  newRoles = selectedRoles.includes("all") ? [] : ["all"];
                } else {
                  newRoles = isSelected
                    ? selectedRoles.filter((r) => r !== role && r !== "all")
                    : [...selectedRoles.filter((r) => r !== "all"), role];
                }
                setSelectedRolesStr(newRoles.length === 0 ? null : newRoles.join(","));
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                isSelected
                  ? "bg-primary text-primary-foreground border border-primary"
                  : "bg-[#232323] text-secondary-foreground border border-[#232323] hover:bg-[#2a2a2a]",
              )}
            >
              {roleLabels[role as VolunteerRole]}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredVolunteers.map((volunteer) => (
          <VolunteerCard key={volunteer.id} volunteer={volunteer} />
        ))}
      </div>

      <div className="mt-16 text-center pt-8 border-t border-[#2d3748]">
        <p className="text-[#afafaf] mb-6 text-sm">هل تريد الانضمام إلى فريقنا؟</p>
        <Link
          href="/participate/volunteer"
          className="inline-block px-7 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#c4a747] to-[#d4af37] text-[#1a1a1a] hover:scale-105 hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all duration-200"
        >
          انضم إلينا
        </Link>
      </div>
    </div>
  );
}

function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  const [isHovering, setIsHovering] = React.useState(false);
  const firstRole = volunteer.roles[0] as VolunteerRole | undefined;
  const firstRoleColors = firstRole ? roleColors[firstRole] : null;

  const getAccentColors = () => {
    if (!firstRoleColors) return { from: "#8b5cf6", to: "#6366f1" };
    const colorMap: Record<string, { from: string; to: string }> = {
      "text-blue-400": { from: "#3b82f6", to: "#1e40af" },
      "text-purple-400": { from: "#a855f7", to: "#6d28d9" },
      "text-green-400": { from: "#22c55e", to: "#15803d" },
      "text-orange-400": { from: "#f97316", to: "#c2410c" },
      "text-pink-400": { from: "#ec4899", to: "#be185d" },
      "text-cyan-400": { from: "#06b6d4", to: "#0e7490" },
    };
    return colorMap[firstRoleColors.text] || { from: "#8b5cf6", to: "#6366f1" };
  };

  const accentColors = getAccentColors();

  const cardContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4 text-right">{volunteer.name}</h3>
        <p className="text-xs text-[#afafaf] mb-3 text-right">{volunteer.professionalRole}</p>

        <div className="border-t border-[#2d3748] pt-3">
          <div className="flex items-center justify-end gap-1.5 text-xs text-[#afafaf] mb-3">
            <span>{volunteer.eventsCount || 0} فعالية</span>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {volunteer.roles.map((role) => {
              const colors = roleColors[role as VolunteerRole];
              return (
                <Badge key={role} className={`${colors.bg} ${colors.text} border-current/30`}>
                  {roleLabels[role as VolunteerRole]}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const baseClasses =
    "rounded-xl relative overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group";
  const innerClasses =
    "bg-gradient-to-br from-[#232323] to-[#181818] rounded-[11px] p-4 h-full flex flex-col justify-between relative";

  const innerContent = <div className={`${innerClasses}`}>{cardContent}</div>;

  const borderWrapper = (content: React.ReactNode) => (
    <div
      className="rounded-xl p-[1.5px] transition-all duration-500"
      style={{
        background: isHovering
          ? `linear-gradient(90deg, ${accentColors.from}, ${accentColors.to}, ${accentColors.from})`
          : `linear-gradient(135deg, #2d3748, #2d3748)`,
        backgroundSize: isHovering ? "200% 100%" : "100% 100%",
        animation: isHovering ? "gradient-flow 2s linear infinite" : "none",
      }}
    >
      {content}
    </div>
  );

  const cardProps = {
    className: `${baseClasses} cursor-pointer`,
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
  };

  if (volunteer.linkedinUrl) {
    return (
      <Link href={volunteer.linkedinUrl} target="_blank" rel="noopener noreferrer" {...cardProps}>
        {borderWrapper(innerContent)}
      </Link>
    );
  }

  return <div {...cardProps}>{borderWrapper(innerContent)}</div>;
}
