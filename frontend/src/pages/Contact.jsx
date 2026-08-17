import ContactHeader from "../components/contact/ContactHeader";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import SocialLinks from "../components/contact/SocialLinks";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Contact() {

    return (

        <main className="relative min-h-screen overflow-hidden bg-background">

            {/* Ambient background glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    -top-40
                    -z-10
                    flex
                    justify-center
                    blur-3xl
                "
            >
                <div
                    className="
                        h-[420px]
                        w-[720px]
                        rounded-full
                        bg-gradient-to-tr
                        from-emerald-400/20
                        via-teal-400/10
                        to-transparent
                    "
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Back to Home */}

                <div className="mb-6">

                    <Link
                        to="/"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-primary
                            transition
                            hover:text-primary/80
                            hover:-translate-x-0.5
                        "
                    >

                        <ArrowLeft size={16} />

                        Home

                    </Link>

                </div>

                {/* Header */}

                <ContactHeader />

                {/* Contact Section */}

                <section className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">

                    <ContactInfo />

                    <ContactForm />

                </section>

                {/* Social Links */}

                <section className="mt-10 border-t border-border pt-8">

                    <SocialLinks />

                </section>

            </div>

        </main>

    );

}

export default Contact;