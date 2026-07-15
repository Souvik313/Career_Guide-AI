import ContactHeader from "../components/Contact/ContactHeader";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactForm from "../components/Contact/ContactForm";
import SocialLinks from "../components/Contact/SocialLinks";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Contact() {

    return (

        <main className="min-h-screen bg-slate-100">

            <div className="mx-auto max-w-7xl px-6 py-12">

                {/* Back to Home */}

                <div className="mb-8">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-blue-600 transition hover:text-blue-700"
                    >

                        <ArrowLeft size={18} />

                        Home

                    </Link>

                </div>

                {/* Header */}

                <ContactHeader />

                {/* Contact Section */}

                <section className="mt-12 grid gap-8 lg:grid-cols-2">

                    <ContactInfo />

                    <ContactForm />

                </section>

                {/* Social Links */}

                <section className="mt-12">

                    <SocialLinks />

                </section>

            </div>

        </main>

    );

}

export default Contact;