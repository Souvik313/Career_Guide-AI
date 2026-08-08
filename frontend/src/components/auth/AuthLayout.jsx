import {
  Sparkles,
  FileSearch,
  ChartColumnIncreasing,
  BriefcaseBusiness,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Resume Intelligence",
    description: "Analyze your resume instantly with AI-powered insights.",
  },
  {
    icon: ChartColumnIncreasing,
    title: "Career Evaluation",
    description: "Discover your strengths and identify skill gaps.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Smart Job Matching",
    description: "Receive personalized job recommendations.",
  },
  {
    icon: Bot,
    title: "AI Career Mentor",
    description: "Chat with your intelligent career assistant anytime.",
  },
];

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* Left Branding Section */}
      <div
        className="
          hidden
          lg:flex
          w-[55%]
          flex-col
          justify-between
          px-16
          py-14
          text-white
          bg-gradient-to-br
          from-emerald-700
          via-teal-700
          to-green-600
        "
      >

        {/* Logo */}
        <div className="flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-white/20
              backdrop-blur-md
              p-3
            "
          >
            <Sparkles className="h-8 w-8" />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              CareerCompass AI
            </h1>

            <p className="text-green-100">
              Your Intelligent Career Companion
            </p>

          </div>

        </div>

        {/* Hero */}
        <div className="max-w-xl">

          <h2
            className="
              text-5xl
              font-extrabold
              leading-tight
            "
          >
            Transform your
            <br />
            resume into
            <br />
            opportunities.
          </h2>

          <p
            className="
              mt-8
              text-lg
              leading-relaxed
              text-blue-100
            "
          >
            Get AI-powered resume analysis,
            personalized career insights,
            smart job recommendations,
            and an intelligent mentor
            to accelerate your software
            engineering career.
          </p>

        </div>

        {/* Features */}
        <div className="space-y-4">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>

      {/* Right Section */}
      <div
        className="
          w-full
          lg:w-[45%]
          flex
          items-center
          justify-center
          px-8
          py-12
        "
      >

        <div className="w-full max-w-md">

          {children}

        </div>

      </div>

    </div>
  );
};

function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-4
        rounded-2xl
        bg-white/10
        backdrop-blur-md
        p-5
        border
        border-white/10
      "
    >

      <div
        className="
          rounded-xl
          bg-white/20
          p-3
          shrink-0
        "
      >
        <Icon className="h-6 w-6" />
      </div>

      <div>

        <h3
          className="
            font-semibold
            text-lg
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-blue-100
          "
        >
          {description}
        </p>

      </div>

    </div>
  );
}

export default AuthLayout;