import { Sparkles } from "lucide-react";

function ProfileHeader({ title, description, icon: Icon = Sparkles }) {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        {/* Section Icon */}

        <div
          className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-500
                    via-fuchsia-500
                    to-orange-400
                    text-white
                    shadow-lg
                    shadow-fuchsia-200/60
                "
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* Header Content */}

        <div className="min-w-0">
          <h1
            className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-zinc-900
                        sm:text-4xl
                    "
          >
            {title}
          </h1>

          <p
            className="
                        mt-2
                        max-w-2xl
                        text-sm
                        leading-6
                        text-zinc-500
                        sm:text-base
                    "
          >
            {description}
          </p>
        </div>
      </div>

      {/* Decorative Gradient Divider */}

      <div
        className="
                mt-6
                h-px
                w-full
                bg-gradient-to-r
                from-violet-200
                via-fuchsia-200
                to-orange-200
            "
      />
    </div>
  );
}

export default ProfileHeader;
