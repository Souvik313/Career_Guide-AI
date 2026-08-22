import {
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  MapPin,
  Code2,
  BriefcaseBusiness,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  const isRecommended = filters.mode === "recommended";
  const isAllJobs = filters.mode === "all";

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
            <h2
              className="
                text-sm
                font-bold
                text-foreground
              "
            >
              Job Discovery
            </h2>

            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              Find your next opportunity
            </p>
          </div>

        </div>
      </SidebarHeader>

      <SidebarSeparator />


      {/* =================================================
          Sidebar Content
      ================================================= */}

      <SidebarContent>

        {/* =================================================
            Discovery Mode
        ================================================= */}

        <SidebarGroup>

          <SidebarGroupLabel>
            Discovery
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <div className="space-y-2">

              {/* -----------------------------------------
                  Recommended For You
              ----------------------------------------- */}

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
                  transition-all
                  duration-200

                  ${
                    isRecommended
                      ? `
                        bg-violet-500/10
                        text-violet-600
                        shadow-sm
                      `
                      : `
                        text-muted-foreground
                        hover:bg-muted
                        hover:text-foreground
                      `
                  }
                `}
              >

                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg

                    ${
                      isRecommended
                        ? `
                          bg-gradient-to-br
                          from-violet-500
                          to-fuchsia-500
                          text-white
                          shadow-sm
                        `
                        : `
                          bg-muted
                          text-muted-foreground
                        `
                    }
                  `}
                >
                  <Sparkles className="h-4 w-4" />
                </div>


                <div className="min-w-0">

                  <p
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Recommended for You
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      text-muted-foreground
                    "
                  >
                    Match jobs to your resume
                  </p>

                </div>

              </button>


              {/* -----------------------------------------
                  All Jobs
              ----------------------------------------- */}

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
                  transition-all
                  duration-200

                  ${
                    isAllJobs
                      ? `
                        bg-violet-500/10
                        text-violet-600
                        shadow-sm
                      `
                      : `
                        text-muted-foreground
                        hover:bg-muted
                        hover:text-foreground
                      `
                  }
                `}
              >

                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg

                    ${
                      isAllJobs
                        ? `
                          bg-gradient-to-br
                          from-violet-500
                          to-fuchsia-500
                          text-white
                          shadow-sm
                        `
                        : `
                          bg-muted
                          text-muted-foreground
                        `
                    }
                  `}
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                </div>


                <div className="min-w-0">

                  <p
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    All Jobs
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      text-muted-foreground
                    "
                  >
                    Browse all opportunities
                  </p>

                </div>

              </button>

            </div>

          </SidebarGroupContent>

        </SidebarGroup>


        {/* =================================================
            ALL JOBS FILTERS
            Only visible in All Jobs mode
        ================================================= */}

        {isAllJobs && (
          <>
            <SidebarSeparator />

            {/* =================================================
                Preferred Role
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
                Experience Level
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
                        transition-colors
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
                        transition-colors
                        hover:text-foreground
                      "
                    >
                      Clear selection
                    </button>

                  )}

                </div>

              </SidebarGroupContent>

            </SidebarGroup>

          </>
        )}

      </SidebarContent>


      {/* =================================================
          Sidebar Footer
      ================================================= */}

      <SidebarFooter
        className="
          border-t
          border-border
          p-4
        "
      >

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="
            w-full
            rounded-xl
          "
        >

          <RotateCcw
            className="
              mr-2
              h-4
              w-4
            "
          />

          Reset Filters

        </Button>

      </SidebarFooter>

    </Sidebar>
  );
}

export default JobFiltersSidebar;
