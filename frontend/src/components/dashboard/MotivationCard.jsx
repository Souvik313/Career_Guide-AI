import { Rocket } from "lucide-react";

function MotivationCard({ motivation }) {

    return (

        <section
  id="motivation"
  className="mt-8 mb-10 rounded-3xl border border-border bg-card p-8 shadow-md"
>
  {/* Header */}
  <div className="flex items-center gap-3">
    <Rocket size={30} className="text-amber-600" />
    <div>
      <h2 className="text-2xl font-bold text-foreground">
        Stay Motivated
      </h2>
      <p className="mt-1 text-muted-foreground">
        A final message from your AI career mentor.
      </p>
    </div>
  </div>

  {/* Motivation Box */}
  <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
    <p className="text-lg leading-9 text-foreground whitespace-pre-line">
      {motivation}
    </p>
  </div>
</section>


    );

}

export default MotivationCard;