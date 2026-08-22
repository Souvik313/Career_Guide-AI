import { useMemo, useState } from "react";

import { BriefcaseBusiness, Sparkles, RefreshCw } from "lucide-react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar.jsx";

import { Button } from "../../components/ui/button.jsx";

import JobFiltersSidebar from "../../components/jobs/JobFiltersSidebar.jsx";
import JobCard from "../../components/jobs/JobCard.jsx";

const mockJobs = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "TechNova",
    location: "Bengaluru, India",
    jobType: "Internship",
    experience: "Entry Level",
    skills: ["Python", "React", "SQL", "Git"],
    postedAt: "2 hours ago",
    matchScore: 94,
    description:
      "Work with a software engineering team to build scalable web applications and contribute to real-world product development.",
  },

  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "Innovate Labs",
    location: "Remote",
    jobType: "Internship",
    experience: "Entry Level",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    postedAt: "5 hours ago",
    matchScore: 89,
    description:
      "Join our frontend engineering team and help develop modern, responsive web applications using React and modern JavaScript.",
  },

  {
    id: 3,
    title: "Backend Developer",
    company: "CloudWorks",
    location: "Hyderabad, India",
    jobType: "Full-time",
    experience: "0-1 years",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    postedAt: "1 day ago",
    matchScore: 84,
    description:
      "Build backend services and APIs while working with a modern JavaScript backend stack and cloud infrastructure.",
  },

  {
    id: 4,
    title: "Machine Learning Intern",
    company: "AI Systems",
    location: "Pune, India",
    jobType: "Internship",
    experience: "Entry Level",
    skills: ["Python", "Machine Learning", "PyTorch"],
    postedAt: "1 day ago",
    matchScore: 92,
    description:
      "Assist the machine learning team in developing and evaluating models for real-world AI applications.",
  },

  {
    id: 5,
    title: "Full Stack Developer",
    company: "DigitalSphere",
    location: "Kolkata, India",
    jobType: "Full-time",
    experience: "1-3 years",
    skills: ["React", "Node.js", "PostgreSQL", "Docker"],
    postedAt: "2 days ago",
    matchScore: 81,
    description:
      "Develop full-stack applications and collaborate with product and engineering teams to deliver production-ready features.",
  },
];

const initialFilters = {
  mode: "recommended",
  role: "",
  location: "",
  experience: "",
  jobType: "",
  resumeId: "",
};

function JobUpdates() {
  const [filters, setFilters] = useState(initialFilters);

  const [refreshing, setRefreshing] = useState(false);

  const [selectedResume, setSelectedResume] = useState(null);
  const [jobDescription , setJobDescription] = useState("");
  const [recommendationLoading , setRecommendationLoading] = useState(false);

  /* =====================================================
     Filter Change
  ===================================================== */

  const handleFilterChange = (key, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  /* =====================================================
     Reset Filters
  ===================================================== */

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  /* =====================================================
     Refresh
  ===================================================== */

  const handleRefresh = async () => {
    setRefreshing(true);

    /*
     * Later this will call the backend / Jooble API.
     */

    await new Promise((resolve) => setTimeout(resolve, 700));

    setRefreshing(false);
  };

  /* =====================================================
     Filter Jobs
  ===================================================== */

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      /*
       * Recommended mode
       */

      if (filters.mode === "recommended" && job.matchScore < 80) {
        return false;
      }

      /*
       * Role
       */

      if (
        filters.role &&
        !job.title.toLowerCase().includes(filters.role.toLowerCase())
      ) {
        return false;
      }

      /*
       * Location
       */

      if (
        filters.location &&
        !job.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      /*
       * Experience
       */

      if (filters.experience && job.experience !== filters.experience) {
        return false;
      }

      /*
       * Job Type
       */

      if (filters.jobType && job.jobType !== filters.jobType) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleResumeSelect = (resumeId) => {
  setSelectedResume(resumeId);
};

const handleResumeUpload = (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  // Upload handling will come here.
};

const handleFindRecommendations = async () => {
  if (!selectedResume && !jobDescription.trim()) {
    return;
  }

  try {
    setRecommendationLoading(true);

    // Your API call will go here.

  } catch (error) {
    console.error("Failed to generate recommendations:", error);
  } finally {
    setRecommendationLoading(false);
  }
};

  /* =====================================================
     Render
  ===================================================== */

  return (
  <SidebarProvider>

    {/* =====================================================
        Job Filters Sidebar
    ===================================================== */}

    <JobFiltersSidebar
      filters={filters}
      onFilterChange={handleFilterChange}
      onReset={handleResetFilters}
    />

    {/* =====================================================
        Main Layout
    ===================================================== */}

    <SidebarInset>

      <main className="min-h-svh bg-background">

        {/* =================================================
            Mobile Sidebar Trigger
        ================================================= */}

        <div
          className="
            flex
            items-center
            border-b
            border-border
            px-5
            py-3
            lg:hidden
          "
        >
          <SidebarTrigger />
        </div>

        <div
          className="
            mx-auto
            w-full
            max-w-6xl
            px-5
            py-8
            lg:px-8
          "
        >

          {/* =================================================
              Header
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <div className="flex items-center gap-2">

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
                  "
                >
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>

                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-foreground
                  "
                >
                  Job Updates
                </h1>

              </div>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-muted-foreground
                "
              >
                Discover current opportunities tailored
                to your career profile and preferences.
              </p>

            </div>

            {/* Refresh only makes sense for All Jobs */}

            {filters.mode === "all" && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
                className="rounded-xl"
              >
                <RefreshCw
                  className={`
                    mr-2
                    h-4
                    w-4
                    ${refreshing ? "animate-spin" : ""}
                  `}
                />

                Refresh Jobs
              </Button>
            )}

          </div>


          {/* =================================================
              ALL JOBS MODE
          ================================================= */}

          {filters.mode === "all" && (
            <>

              {/* Status Bar */}

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-3
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  p-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div className="flex items-center gap-2">

                  <BriefcaseBusiness
                    className="
                      h-4
                      w-4
                      text-violet-500
                    "
                  />

                  <span className="text-sm font-semibold">
                    All Jobs
                  </span>

                </div>

                <div className="text-xs text-muted-foreground">
                  {filteredJobs.length} opportunities found
                  <span className="mx-2">•</span>
                  Updated just now
                </div>

              </div>


              {/* Job List */}

              <section className="mt-6">

                {filteredJobs.length > 0 ? (

                  <div className="space-y-4">

                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        recommended={false}
                      />
                    ))}

                  </div>

                ) : (

                  <div
                    className="
                      flex
                      min-h-[400px]
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-dashed
                      border-border
                      bg-card
                      px-6
                      text-center
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-muted
                      "
                    >
                      <BriefcaseBusiness
                        className="
                          h-6
                          w-6
                          text-muted-foreground
                        "
                      />
                    </div>

                    <h2
                      className="
                        mt-4
                        text-base
                        font-semibold
                        text-foreground
                      "
                    >
                      No jobs found
                    </h2>

                    <p
                      className="
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-muted-foreground
                      "
                    >
                      Try adjusting your filters or switching
                      to different job preferences.
                    </p>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResetFilters}
                      className="mt-5 rounded-xl"
                    >
                      Reset Filters
                    </Button>

                  </div>

                )}

              </section>

            </>
          )}


          {/* =================================================
              RECOMMENDED FOR YOU MODE
          ================================================= */}

          {filters.mode === "recommended" && (
            <section className="mt-7">

              {/* =================================================
                  Recommendation Header
              ================================================= */}

              <div
                className="
                  rounded-3xl
                  border
                  border-fuchsia-500/20
                  bg-gradient-to-br
                  from-violet-500/10
                  via-card
                  to-orange-500/5
                  p-6
                  shadow-sm
                "
              >

                <div className="flex items-start gap-4">

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
                      from-violet-500
                      via-fuchsia-500
                      to-orange-400
                      text-white
                      shadow-md
                    "
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>

                    <h2
                      className="
                        text-lg
                        font-bold
                        text-foreground
                      "
                    >
                      Get Personalized Job Recommendations
                    </h2>

                    <p
                      className="
                        mt-1
                        max-w-2xl
                        text-sm
                        leading-6
                        text-muted-foreground
                      "
                    >
                      Select one of your resumes or upload a new
                      one, then provide the job description you're
                      interested in. CareerCompass AI will find
                      opportunities that best match your profile.
                    </p>

                  </div>

                </div>


                {/* =================================================
                    Select Existing Resume
                ================================================= */}

                <div className="mt-7">

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    Select a Resume
                  </label>

                  <select
                    value={selectedResume ?? ""}
                    onChange={(event) =>
                      handleResumeSelect(
                        event.target.value || null
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-border
                      bg-background
                      px-4
                      py-3
                      text-sm
                      text-foreground
                      outline-none
                      transition
                      focus:border-fuchsia-500
                      focus:ring-2
                      focus:ring-fuchsia-500/20
                    "
                  >

                    <option value="">
                      Choose a resume from your profile
                    </option>

                    {resumes?.map((resume) => (
                      <option
                        key={resume.id}
                        value={resume.id}
                      >
                        {resume.filename || "Untitled Resume"}
                      </option>
                    ))}

                  </select>

                  <p
                    className="
                      mt-2
                      text-xs
                      text-muted-foreground
                    "
                  >
                    We'll use the selected resume to understand
                    your skills and experience.
                  </p>

                </div>


                {/* =================================================
                    OR Separator
                ================================================= */}

                <div
                  className="
                    my-7
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div className="h-px flex-1 bg-border" />

                  <span
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    OR
                  </span>

                  <div className="h-px flex-1 bg-border" />

                </div>


                {/* =================================================
                    Upload New Resume
                ================================================= */}

                <label
                  className="
                    group
                    flex
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-fuchsia-500/30
                    bg-fuchsia-500/5
                    px-6
                    py-8
                    text-center
                    transition-all
                    hover:border-fuchsia-500/60
                    hover:bg-fuchsia-500/10
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-violet-500
                      via-fuchsia-500
                      to-orange-400
                      text-white
                      shadow-md
                      transition-transform
                      group-hover:scale-105
                    "
                  >
                    <Upload className="h-5 w-5" />
                  </div>

                  <p
                    className="
                      mt-4
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    Upload a new resume
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-muted-foreground
                    "
                  >
                    PDF files only
                  </p>

                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleResumeUpload}
                  />

                </label>


                {/* =================================================
                    Job Description
                ================================================= */}

                <div className="mt-7">

                  <label
                    htmlFor="job-description"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    Job Description
                  </label>

                  <textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(event) =>
                      setJobDescription(event.target.value)
                    }
                    placeholder="
Paste the real-world job description you're interested in...
For example: We are looking for a Software Engineer with experience in React, Node.js, PostgreSQL...
                    "
                    rows={9}
                    className="
                      w-full
                      resize-y
                      rounded-2xl
                      border
                      border-border
                      bg-background
                      px-4
                      py-4
                      text-sm
                      leading-6
                      text-foreground
                      outline-none
                      placeholder:text-muted-foreground
                      transition
                      focus:border-fuchsia-500
                      focus:ring-2
                      focus:ring-fuchsia-500/20
                    "
                  />

                  <p
                    className="
                      mt-2
                      text-xs
                      text-muted-foreground
                    "
                  >
                    Paste the complete job description for the
                    position you're interested in.
                  </p>

                </div>


                {/* =================================================
                    Generate Recommendations
                ================================================= */}

                <div className="mt-6 flex justify-end">

                  <Button
                    type="button"
                    disabled={
                      recommendationLoading ||
                      (!selectedResume &&
                        !jobDescription.trim())
                    }
                    onClick={handleFindRecommendations}
                    className="
                      rounded-xl
                      bg-gradient-to-r
                      from-violet-500
                      via-fuchsia-500
                      to-orange-400
                      text-white
                      shadow-md
                      shadow-fuchsia-500/20
                      hover:opacity-90
                    "
                  >

                    {recommendationLoading ? (
                      <>
                        <Loader2
                          className="
                            mr-2
                            h-4
                            w-4
                            animate-spin
                          "
                        />

                        Finding Jobs...
                      </>
                    ) : (
                      <>
                        <Sparkles
                          className="
                            mr-2
                            h-4
                            w-4
                          "
                        />

                        Find Recommended Jobs
                      </>
                    )}

                  </Button>

                </div>

              </div>

            </section>
          )}

        </div>

      </main>

    </SidebarInset>

  </SidebarProvider>
);
}

export default JobUpdates;
