import { BadgeCheck } from "lucide-react";

function StrengthAnalysisCard({ strengths, analysis }) {

    return (

        <section
  id="strength-analysis"
  className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-md"
>
  {/* Header */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <BadgeCheck size={30} className="text-indigo-600" />
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Strength Analysis
        </h2>
        <p className="mt-1 text-muted-foreground">
          Your strongest areas identified by our AI.
        </p>
      </div>
    </div>
    <p className="text-sm font-semibold text-indigo-600">
      {strengths.length} Strengths
    </p>
  </div>

  {/* Strength Tags */}
  <div className="mt-8 flex flex-wrap gap-4">
    {strengths.map((strength, index) => (
      <span
        key={index}
        className="rounded-full bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-400"
      >
        {strength}
      </span>
    ))}
  </div>

  {/* Divider */}
  <div className="my-8 h-px bg-border"></div>

  {/* AI Explanation */}
  <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
    <h3 className="text-lg font-semibold text-foreground">
      AI Insight
    </h3>
    <p className="mt-4 leading-8 text-foreground whitespace-pre-line">
      {analysis}
    </p>
  </div>
</section>


    );

}

export default StrengthAnalysisCard;