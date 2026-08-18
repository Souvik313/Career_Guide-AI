import { useState, useEffect } from "react";

import {
Settings,
Bell,
BrainCircuit,
ShieldCheck,
Save,
Mail,
LockKeyhole,
Sparkles,
Info,
} from "lucide-react";

import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileSectionCard from "../../components/profile/ProfileSectionCard.jsx";
import useProfile from "../../hooks/useProfile.js";

import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog.jsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../components/ui/tooltip.jsx";
import toast from "react-hot-toast";

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


    jobAlerts: true,

    emailNotifications: true,

    careerRecommendations: true,

    aiSuggestions: true,

});

const {
    profile,
    fetchUserProfile,
    changePassword,
} = useProfile();

useEffect(() => {
    fetchUserProfile();
}, [fetchUserProfile]);

const [saving, setSaving] = useState(false);
const [saved, setSaved] = useState(false);
const [passwordDialogOpen , setPasswordDialogOpen] = useState(false);
const [passwordData , setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
})
const [changingPassword, setChangingPassword] = useState(false);
const [passwordError, setPasswordError] = useState("");


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
   Handle Password Input Changes
===================================================== */

const handlePasswordChange = (event) => {

    const {
        name,
        value,
    } = event.target;

    setPasswordData((currentData) => ({

        ...currentData,

        [name]: value,

    }));

    setPasswordError("");

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
   Change Password
===================================================== */

const handleChangePassword = async (event) => {

    event.preventDefault();

    setPasswordError("");


    const {
        current_password,
        new_password,
        confirm_password,
    } = passwordData;


    if (!current_password || !new_password || !confirm_password) {

        setPasswordError(
            "Please fill in all password fields."
        );

        return;

    }

    if (new_password !== confirm_password) {

        setPasswordError(
            "New password and confirmation password do not match."
        );

        return;

    }

    if (new_password === current_password) {

        setPasswordError(
            "New password must be different from your current password."
        );

        return;

    }

    try {

        setChangingPassword(true);
        await changePassword({

            current_password,

            new_password,

        });
        toast.success(
            "Password changed successfully!"
        )

        setPasswordData({

            current_password: "",

            new_password: "",

            confirm_password: "",

        });
        setPasswordDialogOpen(false);

    } catch (error) {

        const message =
            error?.response?.data?.detail ||
            "Failed to change password. Please try again.";
        setPasswordError(message);
        toast.error(passwordError);

    } finally {
        setChangingPassword(false);
    }

};

const changePasswordDisabled = () => {
    profile?.auth_provider !== "local";
}

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
                                {changePasswordDisabled
                                    ? "Password management is handled through Google."
                                    : "Update your account password securely."}
                            </p>

                        </div>

                    </div>


                    <Button
                        type="button"
                        variant="outline"
                        disabled={changePasswordDisabled}
                        className="
                            rounded-xl
                            border-teal-200
                            text-teal-600
                            hover:bg-teal-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                        onClick={() => {
                            setPasswordDialogOpen(true);
                            setPasswordError("");
                        }}
                    >

                        Change Password

                    </Button>

                    {changePasswordDisabled && (
        <TooltipProvider>

            <Tooltip>

                <TooltipTrigger asChild>

                    <button
                        type="button"
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            text-muted-foreground
                            transition-colors
                            hover:bg-muted
                            hover:text-foreground
                        "
                        aria-label="Why can't I change my password?"
                    >
                        <Info className="h-4 w-4" />
                    </button>

                </TooltipTrigger>

                <TooltipContent>
                    <p>
                        Password cannot be changed since
                        this is a Google account.
                    </p>
                </TooltipContent>

            </Tooltip>

        </TooltipProvider>

                    )}

                </div>

            </ProfileSectionCard>

            <Dialog
    open={passwordDialogOpen}
    onOpenChange={setPasswordDialogOpen}
>

    <DialogContent className="sm:max-w-lg">

        <DialogHeader>

            <DialogTitle>
                Change Password
            </DialogTitle>

            <DialogDescription>
                Update your account password securely.
            </DialogDescription>

        </DialogHeader>


        <div className="space-y-6 py-4">

            {/* Current Password */}

            <div className="space-y-2">

                <Label htmlFor="current_password">
                    Current Password
                </Label>

                <Input
                    id="current_password"
                    name="current_password"
                    type="password"
                    value={
                        passwordData.current_password
                    }
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                />

            </div>


            {/* New Password */}

            <div className="space-y-2">

                <Label htmlFor="new_password">
                    New Password
                </Label>

                <Input
                    id="new_password"
                    name="new_password"
                    type="password"
                    value={
                        passwordData.new_password
                    }
                    onChange={handlePasswordChange}
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                />

            </div>


            {/* Confirm Password */}

            <div className="space-y-2">

                <Label htmlFor="confirm_password">
                    Confirm New Password
                </Label>

                <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    value={
                        passwordData.confirm_password
                    }
                    onChange={handlePasswordChange}
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                />

            </div>


            {/* Dialog Footer */}

            <DialogFooter>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {

                        setPasswordDialogOpen(false);

                    }}
                    disabled={changingPassword}
                >
                    Cancel
                </Button>


                <Button
                    type="button"
                    disabled={changingPassword}
                    onClick={handleChangePassword}
                >
                    {changingPassword
                        ? "Updating..."
                        : "Update Password"
                    }
                </Button>

            </DialogFooter>

        </div>

    </DialogContent>

</Dialog>

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
                            Preferences and Notification Settings are saved using this button.
                            Password changes are saved immediately.
                        </p>

                    )}

                </div>

                <Button
                    type="submit"
                    disabled={saving}
                    className="
                        rounded-xl
                        bg-blue-600
                        px-6
                        font-semibold
                        text-white
                        shadow-sm
                        transition-all
                        hover:scale-[1.01]
                        hover:shadow-lg
                        hover:shadow-blue-300
                        dark:bg-blue-500
                        dark:text-white
                        dark:hover:shadow-blue-400
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
                        : "Save Profile Changes"}

                </Button>

            </div>

        </form>

    </div>

);

}

export default ProfileSettings;
