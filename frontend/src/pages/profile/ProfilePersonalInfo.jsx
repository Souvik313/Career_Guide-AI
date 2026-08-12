import {
Mail,
Phone,
MapPin,
UserRound,
Pencil,
ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileAvatar from "../../components/profile/ProfileAvatar.jsx";
import ProfileSectionCard from "../../components/profile/ProfileSectionCard.jsx";

import { Button } from "../../components/ui/button.jsx";

function ProfilePersonalInfo() {

const { user } = useAuth();


/*
 * -----------------------------------------------------
 * User information
 * -----------------------------------------------------
 *
 * At the moment, your backend primarily provides
 * username and email.
 *
 * Additional fields such as phone and address can
 * be connected later through:
 *
 * PUT /auth/update
 *
 */

const username =
    user?.username ||
    user?.name ||
    user?.full_name ||
    "CareerCompass User";

const email =
    user?.email ||
    "Email not available";

const phone =
    user?.phone ||
    "Not added yet";

const address =
    user?.address ||
    "Not added yet";


return (

    <div className="space-y-8">

        {/* =================================================
            Page Header
        ================================================= */}

        <ProfileHeader
            title="Personal Information"
            description="
                Manage your personal details and the information
                associated with your CareerCompass AI account.
            "
            icon={UserRound}
        />


        {/* =================================================
            Profile Identity
        ================================================= */}

        <ProfileSectionCard
            title="Profile"
            description="
                Your basic CareerCompass AI identity.
            "
            icon={UserRound}
            variant="colorful"
            action={

                <Button
                    type="button"
                    variant="outline"
                    disabled
                    className="
                        rounded-xl
                        border-border
                        bg-card/80
                        text-muted-foreground
                    "
                >

                    <Pencil className="mr-2 h-4 w-4" />

                    Edit Profile

                </Button>

            }
        >

            <div
                className="
                    flex
                    flex-col
                    gap-6
                    sm:flex-row
                    sm:items-center
                "
            >

                {/* Avatar */}

                <ProfileAvatar
                    name={username}
                    imageUrl={user?.profile_image_url || ""}
                    size="large"
                />


                {/* Identity */}

                <div className="min-w-0">

                    <h2
                        className="
                            text-2xl
                            font-bold
                            tracking-tight
                            text-foreground
                        "
                    >
                        {username}
                    </h2>


                    <p
                        className="
                            mt-1
                            break-all
                            text-sm
                            text-muted-foreground
                        "
                    >
                        {email}
                    </p>


                    <div
                        className="
                            mt-3
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-muted
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-foreground
                            ring-1
                            ring-border
                        "
                    >

                        <ShieldCheck
                            className="
                                h-3.5
                                w-3.5
                                text-fuchsia-500
                            "
                        />

                        Account verified

                    </div>

                </div>

            </div>

        </ProfileSectionCard>


        {/* =================================================
            Contact Information
        ================================================= */}

        <ProfileSectionCard
            title="Contact Information"
            description="
                Your account contact details.
            "
            icon={Mail}
            variant="violet"
        >

            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                "
            >

                {/* Email */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-muted/60
                        p-5
                    "
                >

                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Mail
                            className="
                                h-4
                                w-4
                                text-violet-500
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                                text-muted-foreground
                            "
                        >
                            Email
                        </span>

                    </div>


                    <p
                        className="
                            break-all
                            text-sm
                            font-semibold
                            text-foreground
                        "
                    >
                        {email}
                    </p>

                </div>


                {/* Phone */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-muted/60
                        p-5
                    "
                >

                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Phone
                            className="
                                h-4
                                w-4
                                text-fuchsia-500
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                                text-muted-foreground
                            "
                        >
                            Phone
                        </span>

                    </div>


                    <p
                        className="
                            text-sm
                            font-semibold
                            text-foreground
                        "
                    >
                        {phone}
                    </p>

                </div>


                {/* Address */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-muted/60
                        p-5
                        sm:col-span-2
                    "
                >

                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <MapPin
                            className="
                                h-4
                                w-4
                                text-orange-500
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                                text-muted-foreground
                            "
                        >
                            Address
                        </span>

                    </div>


                    <p
                        className="
                            text-sm
                            font-semibold
                            text-foreground
                        "
                    >
                        {address}
                    </p>

                </div>

            </div>

        </ProfileSectionCard>


        {/* =================================================
            Account Information
        ================================================= */}

        <ProfileSectionCard
            title="Account Information"
            description="
                Basic information about your CareerCompass AI account.
            "
            icon={ShieldCheck}
            variant="teal"
        >

            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                "
            >

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-card
                        p-5
                    "
                >

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        "
                    >
                        Username
                    </p>


                    <p
                        className="
                            mt-2
                            text-sm
                            font-semibold
                            text-foreground
                        "
                    >
                        {username}
                    </p>

                </div>


                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-card
                        p-5
                    "
                >

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        "
                    >
                        Account Status
                    </p>


                    <div
                        className="
                            mt-2
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-emerald-600
                        "
                    >

                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-emerald-500
                            "
                        />

                        Active

                    </div>

                </div>

            </div>

        </ProfileSectionCard>

    </div>

);

}

export default ProfilePersonalInfo;
