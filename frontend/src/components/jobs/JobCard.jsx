import {
    MapPin, 
    BriefcaseBusiness,
    Clock3,
    Building2,
    ExternalLink,
    Bookmark,
    Sparkles, 
} from "lucide-react";
import { Button } from "../ui/button.jsx";

function JobCard({ job, recommended = false }) {
  const {
    title,
    company,
    location,
    jobType,
    experience,
    skills = [],
    postedAt,
    matchScore,
    description,
  } = job;

  return (
    <article
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
        hover:border-violet-500/30
        hover:shadow-md
        hover:shadow-violet-500/10
      "
    >
      {/* =================================================
          Header
      ================================================= */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">

          {/* Company Icon */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
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
            <Building2 className="h-5 w-5" />
          </div>

          {/* Job Information */}

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-base
                font-bold
                text-foreground
                transition-colors
                group-hover:text-violet-500
              "
            >
              {title}
            </h3>

            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {company}
            </p>
          </div>
        </div>

        {/* Match Score */}

        {recommended && matchScore != null && (
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-3
              py-1.5
              text-xs
              font-semibold
              text-emerald-600
            "
          >
            <Sparkles className="h-3.5 w-3.5" />

            {matchScore}% Match
          </div>
        )}
      </div>

      {/* =================================================
          Job Metadata
      ================================================= */}

      <div
        className="
          mt-5
          flex
          flex-wrap
          items-center
          gap-x-5
          gap-y-2
          text-xs
          text-muted-foreground
        "
      >
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />

          {location}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <BriefcaseBusiness className="h-3.5 w-3.5" />

          {jobType}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" />

          {experience}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" />

          {postedAt}
        </span>
      </div>

      {/* =================================================
          Description
      ================================================= */}

      {description && (
        <p
          className="
            mt-4
            line-clamp-2
            text-sm
            leading-6
            text-muted-foreground
          "
        >
          {description}
        </p>
      )}

      {/* =================================================
          Skills
      ================================================= */}

      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="
                rounded-full
                border
                border-border
                bg-muted
                px-2.5
                py-1
                text-[11px]
                font-medium
                text-muted-foreground
              "
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* =================================================
          Footer Actions
      ================================================= */}

      <div
        className="
          mt-5
          flex
          flex-col
          gap-3
          border-t
          border-border
          pt-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {recommended ? (
          <p className="text-xs text-muted-foreground">
            Recommended based on your profile
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            View this opportunity
          </p>
        )}

        <div className="flex items-center gap-2">
          {/* Save Job */}

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="
              h-9
              w-9
              rounded-xl
              border-border
              text-muted-foreground
              hover:border-violet-500/30
              hover:bg-violet-500/10
              hover:text-violet-500
            "
          >
            <Bookmark className="h-4 w-4" />
          </Button>

          {/* View Job */}

          <Button
            type="button"
            className="
              rounded-xl
              bg-gradient-to-r
              from-violet-500
              via-fuchsia-500
              to-orange-400
              text-white
              shadow-sm
              hover:opacity-90
            "
          >
            View Job

            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}

export default JobCard;