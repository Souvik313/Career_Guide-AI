import { BrainCircuit } from "lucide-react";

function CareerSummaryCard({ summary }) {

    return (

        <section id="career-summary" className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-md">

            <div className="flex items-center gap-3">

                <BrainCircuit
                    className="text-primary"
                    size={30}
                />

                <h2 className="text-2xl font-bold text-foreground">

                    AI Career Summary

                </h2>

            </div>

            <p className="mt-6 leading-8 text-foreground whitespace-pre-line">

                {summary}

            </p>

            <div className="mt-8 border-t border-border pt-5">

                <p className="text-sm text-muted-foreground">

                    📄 Generated using CareerCompass AI

                </p>

            </div>

        </section>

    );

}

export default CareerSummaryCard;