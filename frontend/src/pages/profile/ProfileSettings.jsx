import { useState } from "react";

import {
Settings,
Bell,
BrainCircuit,
ShieldCheck,
UserRound,
Save,
Mail,
LockKeyhole,
Sparkles,
} from "lucide-react";

import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileSectionCard from "../../components/profile/ProfileSectionCard.jsx";

import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";

const ToggleRow = ({
    icon: Icon,
    title,
    description,
    enabled,
    onToggle,
}) => {

    return (
        <div
            className="
                flex
                items-center
                justify-between
                gap-5
                rounded-2xl
                border
                border-border
                bg-muted/70
                p-4
                transition-colors
                hover:bg-muted
            "
        >

            <div
                className="
                    flex
                    min-w-0
                    items-start
                    gap-3
                "
            >

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-violet-500
                        to-fuchsia-500
                        text-white
                    "
                >

                    <Icon className="h-4 w-4" />

                </div>

                <div>

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-foreground
                        "
                    >
                        {title}
                    </p>

                    <p
                        className="
                            mt-1
                            text-xs
                            leading-5
                            text-muted-foreground
                        "
                    >
                        {description}
                    </p>

                </div>

            </div>


            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={onToggle}
                className={`
                    relative
                    h-6
                    w-11
                    shrink-0
                    rounded-full
                    transition-colors
                    duration-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-fuchsia-300
                    focus:ring-offset-2
                    ${
                        enabled
                            ? "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            : "bg-zinc-300"
                    }
                `}
            >

                <span
                    className={`
                        absolute
                        top-1
                        h-4
                        w-4
                        rounded-full
                        bg-white
                        shadow-sm
                        transition-transform
                        duration-200
                        ${
                            enabled
                                ? "translate-x-6"
                                : "translate-x-1"
                        }
                    `}
                />

            </button>

        </div>
    );

};

function ProfileSettings() {

/* =====================================================
   Settings State
===================================================== */

const [settings, setSettings] = useState({

    phone: "",

    address: "",

    jobAlerts: true,

    emailNotifications: true,

    careerRecommendations: true,

    aiSuggestions: true,

});


const [saving, setSaving] = useState(false);

const [saved, setSaved] = useState(false);


/* =====================================================
   Handle Input Changes
===================================================== */

const handleChange = (event) => {

    const {
        name,
        value,
    } = event.target;


    setSettings((currentSettings) => ({

        ...currentSettings,

        [name]: value,

    }));


    setSaved(false);

};


/* =====================================================
   Handle Toggle Changes
===================================================== */

const handleToggle = (name) => {

    setSettings((currentSettings) => ({

        ...currentSettings,

        [name]: !currentSettings[name],

    }));


    setSaved(false);

};


/* =====================================================
   Save Settings
===================================================== */

const handleSave = async (event) => {

    event.preventDefault();

    try {

        setSaving(true);

        setSaved(false);


        await new Promise(
            (resolve) =>
                setTimeout(resolve, 600)
        );


        setSaved(true);

    } finally {

        setSaving(false);

    }

};

/* =====================================================
   Render
===================================================== */

return (

    <div className="space-y-8">

        {/* =================================================
            Header
        ================================================= */}

        <ProfileHeader
            title="Settings"
            description="
                Manage your account, CareerCompass AI preferences,
                and notification settings.
            "
            icon={Settings}
        />


        <form
            onSubmit={handleSave}
            className="space-y-6"
        >

            {/* =================================================
                AI Preferences
            ================================================= */}

            <ProfileSectionCard
                title="AI Preferences"
                description="
                    Control how CareerCompass AI interacts with
                    you and your career data.
                "
                icon={BrainCircuit}
                variant="fuchsia"
            >

                <div className="space-y-3">

                    <ToggleRow
                        icon={Sparkles}
                        title="AI Career Suggestions"
                        description="
                            Receive personalized suggestions based
                            on your resume and career profile.
                        "
                        enabled={settings.careerRecommendations}
                        onToggle={() =>
                            handleToggle("careerRecommendations")
                        }
                    />


                    <ToggleRow
                        icon={BrainCircuit}
                        title="AI Assistance"
                        description="
                            Allow CareerCompass AI to provide
                            contextual suggestions during your
                            career exploration.
                        "
                        enabled={settings.aiSuggestions}
                        onToggle={() =>
                            handleToggle("aiSuggestions")
                        }
                    />

                </div>

            </ProfileSectionCard>


            {/* =================================================
                Notifications
            ================================================= */}

            <ProfileSectionCard
                title="Notifications"
                description="
                    Decide which updates you'd like to receive.
                "
                icon={Bell}
                variant="orange"
            >

                <div className="space-y-3">

                    <ToggleRow
                        icon={Bell}
                        title="Job Market Updates"
                        description="
                            Receive updates about relevant job
                            opportunities and market activity.
                        "
                        enabled={settings.jobAlerts}
                        onToggle={() =>
                            handleToggle("jobAlerts")
                        }
                    />

                    <ToggleRow
                        icon={Mail}
                        title="Email Notifications"
                        description="
                            Receive important CareerCompass AI
                            notifications through email.
                        "
                        enabled={settings.emailNotifications}
                        onToggle={() =>
                            handleToggle("emailNotifications")
                        }
                    />

                </div>

            </ProfileSectionCard>


            {/* =================================================
                Security
            ================================================= */}

            <ProfileSectionCard
                title="Security"
                description="
                    Manage your account security and authentication.
                "
                icon={ShieldCheck}
                variant="teal"
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        rounded-2xl
                        border
                        border-border
                        bg-muted/70
                        p-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            gap-3
                        "
                    >

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-teal-400
                                to-emerald-500
                                text-white
                            "
                        >

                            <LockKeyhole
                                className="
                                    h-4
                                    w-4
                                "
                            />

                        </div>


                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-foreground
                                "
                            >
                                Password
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                Update your account password
                                securely.
                            </p>

                        </div>

                    </div>


                    <Button
                        type="button"
                        variant="outline"
                        className="
                            rounded-xl
                            border-teal-200
                            text-teal-600
                            hover:bg-teal-50
                        "
                        onClick={() => {

                            /*
                             * Password update functionality
                             * can be connected here later.
                             */

                            console.log(
                                "Password update requested."
                            );

                        }}
                    >

                        Change Password

                    </Button>

                </div>

            </ProfileSectionCard>


            {/* =================================================
                Save
            ================================================= */}

            <div
                className="
                    flex
                    flex-col
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    p-5
                    shadow-sm
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    {saved ? (

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-emerald-600
                            "
                        >
                            Settings saved successfully.
                        </p>

                    ) : (

                        <p
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Changes are currently stored only
                            for this session.
                        </p>

                    )}

                </div>


                <Button
                    type="submit"
                    disabled={saving}
                    className="
                        rounded-xl
                        bg-gradient-to-r
                        from-violet-600
                        via-fuchsia-600
                        to-orange-500
                        px-6
                        font-semibold
                        text-white
                        shadow-sm
                        transition-all
                        hover:scale-[1.01]
                        hover:shadow-lg
                        hover:shadow-fuchsia-200
                    "
                >

                    <Save
                        className="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    {saving
                        ? "Saving..."
                        : "Save Changes"}

                </Button>

            </div>

        </form>

    </div>

);

}

export default ProfileSettings;
