import { useMemo, useState } from "react";

import {
  BriefcaseBusiness,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import {
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

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

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

      if (
        filters.mode === "recommended" &&
        job.matchScore < 80
      ) {
        return false;
      }

      /*
       * Role
       */

      if (
        filters.role &&
        !job.title
          .toLowerCase()
          .includes(filters.role.toLowerCase())
      ) {
        return false;
      }

      /*
       * Location
       */

      if (
        filters.location &&
        !job.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      /*
       * Experience
       */

      if (
        filters.experience &&
        job.experience !== filters.experience
      ) {
        return false;
      }

      /*
       * Job Type
       */

      if (
        filters.jobType &&
        job.jobType !== filters.jobType
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  /* =====================================================
     Render
  ===================================================== */

  return (
    <SidebarProvider>

      <div className="flex min-h-screen w-full bg-background">

        {/* =================================================
            Sidebar
        ================================================= */}

        <JobFiltersSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* =================================================
            Main Content
        ================================================= */}

        <main className="min-w-0 flex-1">

          {/* =================================================
              Mobile / Sidebar Trigger
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

              {/* Refresh */}

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

            </div>

            {/* =================================================
                Status Bar
            ================================================= */}

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

                {filters.mode === "recommended" ? (
                  <>
                    <Sparkles
                      className="
                        h-4
                        w-4
                        text-fuchsia-500
                      "
                    />

                    <span className="text-sm font-semibold">
                      Recommended for You
                    </span>
                  </>
                ) : (
                  <>
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
                  </>
                )}

              </div>

              <div className="text-xs text-muted-foreground">
                {filteredJobs.length} opportunities found
                <span className="mx-2">•</span>
                Updated just now
              </div>

            </div>

            {/* =================================================
                Job List
            ================================================= */}

            <section className="mt-6">

              {filteredJobs.length > 0 ? (
                <div className="space-y-4">

                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      recommended={
                        filters.mode === "recommended"
                      }
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
                    to All Jobs to discover more opportunities.
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

          </div>
        </main>

      </div>

    </SidebarProvider>
  );
}

export default JobUpdates;