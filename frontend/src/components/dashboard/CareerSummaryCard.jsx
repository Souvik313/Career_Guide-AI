import { BrainCircuit } from "lucide-react";

function CareerSummaryCard({ summary }) {

    return (

        <section id="career-summary" className="mt-8 rounded-3xl bg-white p-8 shadow-md">

            <div className="flex items-center gap-3">

                <BrainCircuit
                    className="text-blue-600"
                    size={30}
                />

                <h2 className="text-2xl font-bold text-slate-900">

                    AI Career Summary

                </h2>

            </div>

            <p className="mt-6 leading-8 text-slate-700 whitespace-pre-line">

                {summary}

            </p>

            <div className="mt-8 border-t pt-5">

                <p className="text-sm text-slate-500">

                    📄 Generated using CareerCompass AI

                </p>

            </div>

        </section>

    );

}

export default CareerSummaryCard;