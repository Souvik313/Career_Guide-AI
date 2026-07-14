import { Rocket } from "lucide-react";

function MotivationCard({ motivation }) {

    return (

        <section
            id="motivation"
            className="mt-8 mb-10 rounded-3xl bg-white p-8 shadow-md"
        >

            {/* Header */}

            <div className="flex items-center gap-3">

                <Rocket
                    size={30}
                    className="text-blue-600"
                />

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        Stay Motivated

                    </h2>

                    <p className="mt-1 text-slate-600">

                        A final message from your AI career mentor.

                    </p>

                </div>

            </div>

            {/* Motivation Box */}

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-8">

                <p className="text-lg leading-9 text-slate-700 whitespace-pre-line">

                    {motivation}

                </p>

            </div>

        </section>

    );

}

export default MotivationCard;