import { useState, useEffect, useMemo, useRef } from "react";

import {
  Bookmark,
  Building2,
  BriefcaseBusiness,
  Trash2,
  CalendarDays,
  Code2,
  Languages,
  Sparkles,
  ChevronDown,
  X,
} from "lucide-react";

import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileSectionCard from "../../components/profile/ProfileSectionCard.jsx";
import ProfileLoading from "../../components/profile/ProfileLoading.jsx";
import ProfileEmptyState from "../../components/profile/ProfileEmptyState.jsx";

import { Button } from "../../components/ui/button.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

import useSavedJobs from "../../hooks/useSavedJobs.js";

const ROLE_CATEGORIES = [
  { label: "Full Stack Developer", keywords: ["full stack", "full-stack"] },
  { label: "Frontend Developer", keywords: ["frontend", "front-end", "front end", "react developer", "ui developer"] },
  { label: "Backend Developer", keywords: ["backend", "back-end", "back end"] },
  { label: "ML Engineer", keywords: ["ml engineer", "machine learning engineer"] },
  { label: "AI Engineer", keywords: ["ai engineer", "artificial intelligence engineer"] },
  { label: "Data Scientist", keywords: ["data scientist"] },
  { label: "Data Analyst", keywords: ["data analyst"] },
  { label: "DevOps Engineer", keywords: ["devops", "dev ops", "site reliability", "sre"] },
];

const matchesRoleCategory = (jobTitle, categoryLabel) => {
  if (!jobTitle) return false;
  const title = jobTitle.toLowerCase();
  const category = ROLE_CATEGORIES.find((c) => c.label === categoryLabel);
  if (!category) return false;
  return category.keywords.some((kw) => title.includes(kw));
};

function SkillsMultiSelect({ options, selected, onToggle, onRemove }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close the popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
                    flex
                    min-w-[160px]
                    items-center
                    justify-between
                    gap-2
                    rounded-xl
                    border
                    border-border
                    bg-background
                    px-3
                    py-2
                    text-sm
                "
      >
        <span className="truncate">
          {selected.length === 0
            ? "All Skills"
            : `${selected.length} skill${selected.length > 1 ? "s" : ""} selected`}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {open && (
        <div
          className="
                        absolute
                        z-20
                        mt-2
                        w-56
                        rounded-xl
                        border
                        border-border
                        bg-card
                        shadow-lg
                    "
        >
          {/* This is the height cap — the popup scrolls instead of growing */}
          <div className="max-h-56 overflow-y-auto p-2">
            {options.length === 0 && (
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                No skills available
              </div>
            )}

            {options.map((skill) => (
              <label
                key={skill}
                className="
                                    flex
                                    cursor-pointer
                                    items-center
                                    gap-2
                                    rounded-lg
                                    px-2
                                    py-1.5
                                    text-sm
                                    hover:bg-muted
                                "
              >
                <input
                  type="checkbox"
                  checked={selected.includes(skill)}
                  onChange={() => onToggle(skill)}
                  className="h-3.5 w-3.5"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Selected skills as removable chips, shown under the trigger */}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((skill) => (
            <span
              key={skill}
              className="
                                inline-flex
                                items-center
                                gap-1
                                rounded-full
                                bg-muted
                                px-2.5
                                py-1
                                text-xs
                                font-medium
                                text-foreground/80
                            "
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(skill)}
                aria-label={`Remove ${skill} filter`}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileSavedJobs() {
  const { savedJobs, loading, error, fetchSavedJobs, removeSavedJob } =
    useSavedJobs();

    const [filters , setFilters] = useState({
        'job_role': "all",
        'primary_keyword': "all",
        "english_level": "all",
        "skills": [],
    })

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }

    const resetFilters = () => {
        setFilters({ 
            job_role: "all",
            primary_keyword: "all", 
            english_level: "all", 
            skills: [],
        });
    }

    const toggleSkillFilter = (skill) => {
        setFilters((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
            ? prev.skills.filter((s) => s !== skill)
            : [...prev.skills, skill],
        }));
    };
    const removeSkillFilter = (skill) => {
        setFilters((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    const filterOptions = useMemo(() => {
        const keywords = new Set();
        const levels = new Set();
        const skills = new Set();

        (savedJobs || []).forEach((job) => {
            if(job.primary_keyword) keywords.add(job.primary_keyword);
            if (job.english_level) levels.add(job.english_level);
            if (Array.isArray(job.skills)) {
                job.skills.forEach((s) => skills.add(s));
            }
        })

        const jobRoles = ROLE_CATEGORIES.filter((category) =>
            (savedJobs || []).some((job) =>
            matchesRoleCategory(job.job_title, category.label),
            ),
        ).map((c) => c.label);

        return {
            job_role: jobRoles,
            primary_keyword: Array.from(keywords),
            english_level: Array.from(levels),
            skill: Array.from(skills),
            };
        }, [savedJobs]);

        const filteredJobs = useMemo(() => {
        return (savedJobs || []).filter((job) => {
        const matchesRole =
            filters.job_role === "all" || matchesRoleCategory(job.job_title, filters.job_role);
        const matchesKeyword =
            filters.primary_keyword === "all" ||
            job.primary_keyword === filters.primary_keyword;

        const matchesLevel =
            filters.english_level === "all" ||
            job.english_level === filters.english_level;

        const matchesSkills =
            filters.skills.length === 0 ||
            (Array.isArray(job.skills) &&
                job.skills.some((s) => filters.skills.includes(s)));

        return matchesRole && matchesKeyword && matchesLevel && matchesSkills;
        });
    }, [savedJobs , filters]);

    const isFiltering =
        filters.job_role !== "all" ||
        filters.primary_keyword !== "all" ||
        filters.english_level !== "all" ||
        filters.skills.length > 0;

  /* =====================================================
   Fetch Saved Jobs
===================================================== */

  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        await fetchSavedJobs();
      } catch (err) {
        console.error("Failed to load saved jobs:", err);
      }
    };

    loadSavedJobs();
  }, []);

  /* =====================================================
   Helpers
===================================================== */

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return null;
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  /* =====================================================
   Delete Saved Job
===================================================== */

  const handleDelete = async (savedJobId) => {
    try {
      await removeSavedJob(savedJobId);

      toast.success("Saved job removed successfully.");
    } catch (err) {
      console.error("Failed to delete saved job:", err);

      toast.error(err?.response?.data?.detail || "Failed to remove saved job.");
    }
  };

  /* =====================================================
   Render
===================================================== */

  return (
    <div className="space-y-8">
      {/* =================================================
            Page Header
        ================================================= */}

      <ProfileHeader
        title="Saved Jobs"
        description="
                Keep track of interesting opportunities
                you've saved while exploring your career options.
            "
        icon={Bookmark}
      />

      {/* =================================================
            Error
        ================================================= */}

      {error && !loading && (
        <div
          className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-4
                    text-sm
                    text-red-600
                "
        >
          {error}
        </div>
      )}

      {/* =================================================
            Loading
        ================================================= */}

      {loading && <ProfileLoading type="cards" count={3} />}

      {/* =================================================
            Filter Bar
        ================================================= */}

      {!loading && !error && savedJobs?.length > 0 && (
        <div
          className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    p-4
                "
        >

        <select
            value={filters.job_role}
            onChange={(e) => handleFilterChange("job_role", e.target.value)}
            className="
                        rounded-xl
                        border
                        border-border
                        bg-background
                        px-3
                        py-2
                        text-sm
                    "
            >
            <option value="all">All Job Roles</option>
            {filterOptions.job_role.map((role) => (
                <option key={role} value={role}>
                {role}
                </option>
            ))}
            </select>
          <select
            value={filters.primary_keyword}
            onChange={(e) =>
              handleFilterChange("primary_keyword", e.target.value)
            }
            className="
                        rounded-xl
                        border
                        border-border
                        bg-background
                        px-3
                        py-2
                        text-sm
                    "
          >
            <option value="all">All keywords</option>
            {filterOptions.primary_keyword.map((kw) => (
              <option key={kw} value={kw}>
                {kw}
              </option>
            ))}
          </select>

          <select
            value={filters.english_level}
            onChange={(e) =>
              handleFilterChange("english_level", e.target.value)
            }
            className="
                        rounded-xl
                        border
                        border-border
                        bg-background
                        px-3
                        py-2
                        text-sm
                    "
          >
            <option value="all">All English Levels</option>
            {filterOptions.english_level.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <SkillsMultiSelect
            options={filterOptions.skill}
            selected={filters.skills}
            onToggle={toggleSkillFilter}
            onRemove={removeSkillFilter}
        />

          {isFiltering && (
            <Button
              type="button"
              variant="ghost"
              className="text-xs text-muted-foreground"
              onClick={resetFilters}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* =================================================
            Empty State
        ================================================= */}

      {!loading && !error && savedJobs?.length === 0 && (
        <ProfileEmptyState
          icon={Bookmark}
          title="No saved jobs yet"
          description="
                        Save interesting opportunities from your
                        job recommendations and they'll appear here.
                    "
          actionLabel="Explore Recommendations"
          onAction={() => {
            window.location.href = "/dashboard";
          }}
          variant="orange"
        />
      )}

      {/* =================================================
            No Results After Filtering
        ================================================= */}

      {!loading &&
        !error &&
        savedJobs?.length > 0 &&
        filteredJobs.length === 0 && (
          <div
            className="
                        rounded-2xl
                        border
                        border-border
                        bg-card
                        p-8
                        text-center
                        text-sm
                        text-muted-foreground
                    "
          >
            No saved jobs match your current filters.
          </div>
        )}

      {/* =================================================
            Saved Jobs
        ================================================= */}

      {!loading && !error && filteredJobs.length > 0 && (
        <ProfileSectionCard
          title="Your Saved Opportunities"
          description={`
                        ${filteredJobs.length}
                        ${
                          filteredJobs.length === 1
                            ? " opportunity"
                            : " opportunities"
                        }
                        ${isFiltering ? "matching your filters" : "saved to your career collection"}.
                    `}
          icon={Bookmark}
          variant="orange"
        >
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="
                                    group
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-card
                                    p-5
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-orange-500/30
                                    hover:shadow-md
                                    hover:shadow-orange-500/10
                                "
              >
                {/* =================================================
                                    Main Job Information
                                ================================================= */}

                <div
                  className="
                                        flex
                                        flex-col
                                        gap-5
                                        lg:flex-row
                                        lg:items-start
                                        lg:justify-between
                                    "
                >
                  {/* Job Details */}

                  <div
                    className="
                                            min-w-0
                                            flex-1
                                        "
                  >
                    {/* Title */}

                    <div
                      className="
                                                flex
                                                items-start
                                                gap-3
                                            "
                    >
                      <div
                        className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-gradient-to-br
                                                    from-orange-400
                                                    via-amber-400
                                                    to-yellow-300
                                                    text-white
                                                    shadow-sm
                                                "
                      >
                        <BriefcaseBusiness
                          className="
                                                        h-5
                                                        w-5
                                                    "
                        />
                      </div>

                      <div className="min-w-0">
                        <h3
                          className="
                                                        text-lg
                                                        font-bold
                                                        tracking-tight
                                                        text-foreground
                                                    "
                        >
                          {job.job_title || "Untitled Position"}
                        </h3>

                        {job.company_name && (
                          <div
                            className="
                                                            mt-1.5
                                                            flex
                                                            items-center
                                                            gap-1.5
                                                            text-sm
                                                            font-medium
                                                            text-muted-foreground
                                                        "
                          >
                            <Building2
                              className="
                                                                h-4
                                                                w-4
                                                            "
                            />

                            {job.company_name}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* =================================================
                                            Job Metadata
                                        ================================================= */}

                    <div
                      className="
                                                mt-5
                                                flex
                                                flex-wrap
                                                gap-2
                                            "
                    >
                      {job.exp_years !== null &&
                        job.exp_years !== undefined && (
                          <span
                            className="
                                                            inline-flex
                                                            items-center
                                                            gap-1.5
                                                            rounded-full
                                                            bg-violet-50
                                                            px-3
                                                            py-1.5
                                                            text-xs
                                                            font-semibold
                                                            text-violet-600
                                                        "
                          >
                            <BriefcaseBusiness
                              className="
                                                                h-3.5
                                                                w-3.5
                                                            "
                            />
                            {job.exp_years}{" "}
                            {Number(job.exp_years) === 1 ? "year" : "years"}
                          </span>
                        )}

                      {job.primary_keyword && (
                        <span
                          className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        rounded-full
                                                        bg-fuchsia-50
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        font-semibold
                                                        text-fuchsia-600
                                                    "
                        >
                          <Code2
                            className="
                                                            h-3.5
                                                            w-3.5
                                                        "
                          />

                          {job.primary_keyword}
                        </span>
                      )}

                      {job.english_level && (
                        <span
                          className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        rounded-full
                                                        bg-teal-50
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        font-semibold
                                                        text-teal-600
                                                    "
                        >
                          <Languages
                            className="
                                                            h-3.5
                                                            w-3.5
                                                        "
                          />

                          {job.english_level}
                        </span>
                      )}
                    </div>

                    {/* =================================================
                                            Skills
                                        ================================================= */}

                    {Array.isArray(job.skills) && job.skills.length > 0 && (
                      <div className="mt-5">
                        <div
                          className="
                                                            mb-2
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-xs
                                                            font-semibold
                                                            uppercase
                                                            tracking-wide
                                                            text-muted-foreground
                                                        "
                        >
                          <Sparkles
                            className="
                                                                h-3.5
                                                                w-3.5
                                                            "
                          />
                          Skills
                        </div>

                        <div
                          className="
                                                            flex
                                                            flex-wrap
                                                            gap-2
                                                        "
                        >
                          {job.skills.map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="
                                                                        rounded-lg
                                                                        bg-muted
                                                                        px-2.5
                                                                        py-1
                                                                        text-xs
                                                                        font-medium
                                                                        text-foreground/80
                                                                    "
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* =================================================
                                        Delete Action
                                    ================================================= */}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="
                                                    rounded-xl
                                                    border
                                                    border-red-100
                                                    px-3
                                                    py-2
                                                    text-red-500
                                                    transition
                                                    hover:border-red-200
                                                    hover:bg-red-50
                                                    hover:text-red-600
                                                "
                        aria-label="Remove saved job"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove saved job?</AlertDialogTitle>

                        <AlertDialogDescription>
                          Are you sure you want to remove this job from your
                          saved jobs? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => handleDelete(job.id)}
                          className="
                                                        bg-red-600
                                                        text-white
                                                        hover:bg-red-700
                                                    "
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* =================================================
                                    Saved Date
                                ================================================= */}

                {formatDate(job.created_at || job.saved_at) && (
                  <div
                    className="
                                            mt-5
                                            flex
                                            items-center
                                            gap-2
                                            border-t
                                            border-border
                                            pt-4
                                            text-xs
                                            text-muted-foreground
                                        "
                  >
                    <CalendarDays
                      className="
                                                h-3.5
                                                w-3.5
                                            "
                    />
                    Saved on{" "}
                    <span
                      className="
                                                font-medium
                                                text-foreground/80
                                            "
                    >
                      {formatDate(job.created_at || job.saved_at)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ProfileSectionCard>
      )}
    </div>
  );
}

export default ProfileSavedJobs;
