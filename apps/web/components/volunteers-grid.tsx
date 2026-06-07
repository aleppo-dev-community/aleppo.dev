"use client";

import { roleColors, roleLabels, volunteers, type Volunteer, type VolunteerRole } from "@/lib/volunteers";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";


const roles: (VolunteerRole | "all")[] = ["all", ...Object.keys(roleLabels).filter((key) => key !== "all")] as (VolunteerRole | "all")[];
export function VolunteersGrid() {
  const [selectedRolesStr, setSelectedRolesStr] = useQueryState(
    "roles",
    parseAsString.withDefault("")
  );

  const selectedRoles = selectedRolesStr ? selectedRolesStr.split(",").filter(Boolean) : [];

  const filteredVolunteers = (
    selectedRoles.length === 0 || selectedRoles.includes("all")
      ? volunteers
      : volunteers.filter((volunteer) =>
          selectedRoles.some((role: string) => volunteer.roles.includes(role as VolunteerRole))
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
                  : "bg-[#232323] text-secondary-foreground border border-[#232323] hover:bg-[#2a2a2a]"
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
    </div>
  );
}

function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  const firstRole = volunteer.roles[0] as VolunteerRole | undefined;
  const firstRoleColors = firstRole ? roleColors[firstRole] : null;

  const getBorderGradient = () => {
    if (!firstRoleColors) return "";
    const colorMap: Record<string, string> = {
      "text-blue-400": "from-blue-500/50 via-blue-400/80 via-blue-300/60 to-blue-500/50",
      "text-purple-400": "from-purple-500/50 via-purple-400/80 via-purple-300/60 to-purple-500/50",
      "text-green-400": "from-green-500/50 via-green-400/80 via-green-300/60 to-green-500/50",
      "text-orange-400": "from-orange-500/50 via-orange-400/80 via-orange-300/60 to-orange-500/50",
      "text-pink-400": "from-pink-500/50 via-pink-400/80 via-pink-300/60 to-pink-500/50",
      "text-cyan-400": "from-cyan-500/50 via-cyan-400/80 via-cyan-300/60 to-cyan-500/50",
    };
    return colorMap[firstRoleColors.text] || "from-primary/50 via-primary/80 via-primary/60 to-primary/50";
  };

  const borderGradient = getBorderGradient();

  const cardContent = (
    <>
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-base font-bold text-white">
            {volunteer.name}
          </h3>
          {volunteer.isAlumni && (
            <Badge variant="outline" >
              {volunteer.gender === "male" ? "متطوّع سابق" : "متطوعة سابقة"}
            </Badge>
          )}
        </div>
        {volunteer.professionalRole && (
          <p className="text-xs text-[#AFAFAF] mb-2">{volunteer.professionalRole}</p>
        )}

        <div className="flex items-center gap-1.5 text-xs text-[#AFAFAF]">
          <CalendarDays className="w-4 h-4 text-primary" />
          <span>{volunteer.eventsCount || 0} فعالية</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {volunteer.roles.map((role) => {
          const colors = roleColors[role as VolunteerRole];
          return (
            <Badge
              key={role}
              className={`${colors.bg} ${colors.text} border-current/30`}
            >
              {roleLabels[role as VolunteerRole]}
            </Badge>
          );
        })}
      </div>
    </>
  );

  const baseClasses = "bg-[#232323] rounded-xl p-[1px]";
  const innerClasses = "bg-gradient-to-br from-[#232323] to-[#181818] rounded-xl p-4 h-full flex flex-col justify-between";

  if (volunteer.linkedinUrl) {
    return (
      <Link
        href={volunteer.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group ${baseClasses} hover:bg-gradient-to-r ${borderGradient} hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shimmer-border`}
      >
        <div className={innerClasses}>
          {cardContent}
        </div>
      </Link>
    );
  }

  return (
    <div className={`${baseClasses} shadow-lg`}>
      <div className={innerClasses}>
        {cardContent}
      </div>
    </div>
  );
}
