import {
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  MapPin,
  Code2,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from "../ui/sidebar.jsx";

import { Button } from "../ui/button.jsx";

function JobFiltersSidebar({
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <Sidebar
      variant="sidebar"
      className="border-r border-border"
    >
      {/* =================================================
          Header
      ================================================= */}

      <SidebarHeader className="p-5">
        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-violet-500
              via-fuchsia-500
              to-orange-400
              text-white
              shadow-sm
            "
          >
            <SlidersHorizontal className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-foreground">
              Job Filters
            </h2>

            <p className="text-xs text-muted-foreground">
              Refine your opportunities
            </p>
          </div>

        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>

        {/* =================================================
            Recommendation Mode
        ================================================= */}

        <SidebarGroup>
          <SidebarGroupLabel>
            Discovery
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="space-y-2">

              <button
                type="button"
                onClick={() =>
                  onFilterChange(
                    "mode",
                    "recommended"
                  )
                }
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  transition-colors
                  ${
                    filters.mode === "recommended"
                      ? `
                        bg-violet-500/10
                        text-violet-600
                      `
                      : `
                        text-muted-foreground
                        hover:bg-muted
                        hover:text-foreground
                      `
                  }
                `}
              >
                <Sparkles className="h-4 w-4" />

                <div>
                  <p className="text-sm font-semibold">
                    Recommended for You
                  </p>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Based on your profile
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  onFilterChange(
                    "mode",
                    "all"
                  )
                }
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  transition-colors
                  ${
                    filters.mode === "all"
                      ? `
                        bg-violet-500/10
                        text-violet-600
                      `
                      : `
                        text-muted-foreground
                        hover:bg-muted
                        hover:text-foreground
                      `
                  }
                `}
              >
                <SlidersHorizontal className="h-4 w-4" />

                <div>
                  <p className="text-sm font-semibold">
                    All Jobs
                  </p>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Browse all opportunities
                  </p>
                </div>
              </button>

            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* =================================================
            Role
        ================================================= */}

        <SidebarGroup>
          <SidebarGroupLabel>
            Preferred Role
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="relative">
              <Code2
                className="
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-muted-foreground
                "
              />

              <input
                type="text"
                value={filters.role}
                onChange={(event) =>
                  onFilterChange(
                    "role",
                    event.target.value
                  )
                }
                placeholder="e.g. Software Engineer"
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  pl-10
                  pr-3
                  text-sm
                  outline-none
                  transition
                  focus:border-violet-500/50
                  focus:ring-2
                  focus:ring-violet-500/10
                "
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* =================================================
            Location
        ================================================= */}

        <SidebarGroup>
          <SidebarGroupLabel>
            Location
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="relative">
              <MapPin
                className="
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-muted-foreground
                "
              />

              <input
                type="text"
                value={filters.location}
                onChange={(event) =>
                  onFilterChange(
                    "location",
                    event.target.value
                  )
                }
                placeholder="e.g. Kolkata"
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  pl-10
                  pr-3
                  text-sm
                  outline-none
                  transition
                  focus:border-violet-500/50
                  focus:ring-2
                  focus:ring-violet-500/10
                "
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* =================================================
            Experience
        ================================================= */}

        <SidebarGroup>
          <SidebarGroupLabel>
            Experience Level
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <select
              value={filters.experience}
              onChange={(event) =>
                onFilterChange(
                  "experience",
                  event.target.value
                )
              }
              className="
                h-10
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-3
                text-sm
                outline-none
                focus:border-violet-500/50
                focus:ring-2
                focus:ring-violet-500/10
              "
            >
              <option value="">
                Any experience level
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Entry Level">
                Entry Level
              </option>

              <option value="0-1 years">
                0–1 years
              </option>

              <option value="1-3 years">
                1–3 years
              </option>

              <option value="3-5 years">
                3–5 years
              </option>
            </select>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* =================================================
            Job Type
        ================================================= */}

        <SidebarGroup>
          <SidebarGroupLabel>
            Job Type
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="space-y-2">

              {[
                "Internship",
                "Full-time",
                "Part-time",
                "Contract",
              ].map((type) => (
                <label
                  key={type}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-2
                    py-1.5
                    text-sm
                    text-muted-foreground
                    hover:bg-muted
                    hover:text-foreground
                  "
                >
                  <input
                    type="radio"
                    name="jobType"
                    checked={
                      filters.jobType === type
                    }
                    onChange={() =>
                      onFilterChange(
                        "jobType",
                        type
                      )
                    }
                    className="
                      accent-violet-500
                    "
                  />

                  {type}
                </label>
              ))}

              {filters.jobType && (
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange(
                      "jobType",
                      ""
                    )
                  }
                  className="
                    px-2
                    text-xs
                    text-muted-foreground
                    hover:text-foreground
                  "
                >
                  Clear selection
                </button>
              )}

            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* =================================================
            Resume
        ================================================= */}

        <SidebarGroup>
          <SidebarGroupLabel>
            Resume
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="space-y-2">

              <div className="relative">
                <FileText
                  className="
                    absolute
                    left-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-muted-foreground
                  "
                />

                <select
                  value={filters.resumeId}
                  onChange={(event) =>
                    onFilterChange(
                      "resumeId",
                      event.target.value
                    )
                  }
                  className="
                    h-10
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-border
                    bg-background
                    pl-10
                    pr-3
                    text-sm
                    outline-none
                    focus:border-violet-500/50
                  "
                >
                  <option value="">
                    Select a resume
                  </option>

                  <option value="resume-1">
                    My Resume 2026
                  </option>

                  <option value="resume-2">
                    Software Engineer Resume
                  </option>
                </select>
              </div>

              <p className="text-[11px] leading-5 text-muted-foreground">
                Your selected resume will be used for
                personalized recommendations.
              </p>

            </div>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      {/* =================================================
          Footer
      ================================================= */}

      <div className="border-t border-border p-4">

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="
            w-full
            rounded-xl
          "
        >
          <RotateCcw className="mr-2 h-4 w-4" />

          Reset Filters
        </Button>

      </div>
    </Sidebar>
  );
}

export default JobFiltersSidebar;