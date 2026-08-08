import { Skeleton } from "../ui/skeleton";

function ProfileLoading({
type = "cards",
count = 3,
}) {
/* =====================================================
   Profile Loading
===================================================== */

if (type === "profile") {

    return (

        <div className="space-y-8">

            {/* Profile identity skeleton */}

            <div
                className="
                    flex
                    items-center
                    gap-5
                    rounded-3xl
                    border
                    border-violet-100
                    bg-white
                    p-6
                    shadow-sm
                "
            >

                <Skeleton
                    className="
                        h-20
                        w-20
                        shrink-0
                        rounded-full
                    "
                />


                <div className="flex-1 space-y-3">

                    <Skeleton
                        className="h-6 w-48"
                    />

                    <Skeleton
                        className="h-4 w-64 max-w-full"
                    />

                    <Skeleton
                        className="h-4 w-40"
                    />

                </div>

            </div>


            {/* Information cards */}

            <div className="space-y-5">

                <Skeleton
                    className="h-7 w-48"
                />

                <div
                    className="
                        grid
                        gap-5
                        md:grid-cols-2
                    "
                >

                    {Array.from({ length: 4 }).map(
                        (_, index) => (

                            <div
                                key={index}
                                className="
                                    rounded-3xl
                                    border
                                    border-zinc-200
                                    bg-white
                                    p-6
                                    shadow-sm
                                "
                            >

                                <Skeleton
                                    className="
                                        mb-3
                                        h-4
                                        w-24
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-5
                                        w-40
                                    "
                                />

                            </div>

                        )
                    )}

                </div>

            </div>

        </div>

    );

}


/* =====================================================
   Card Loading
===================================================== */

if (type === "cards") {

    return (

        <div className="space-y-5">

            {Array.from({ length: count }).map(
                (_, index) => (

                    <div
                        key={index}
                        className="
                            rounded-3xl
                            border
                            border-zinc-200
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >

                        <div
                            className="
                                flex
                                items-start
                                gap-4
                            "
                        >

                            {/* Icon */}

                            <Skeleton
                                className="
                                    h-12
                                    w-12
                                    shrink-0
                                    rounded-xl
                                "
                            />


                            {/* Main content */}

                            <div
                                className="
                                    min-w-0
                                    flex-1
                                    space-y-3
                                "
                            >

                                <Skeleton
                                    className="
                                        h-5
                                        w-48
                                        max-w-full
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-4
                                        w-72
                                        max-w-full
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-4
                                        w-56
                                        max-w-full
                                    "
                                />

                            </div>


                            {/* Action */}

                            <Skeleton
                                className="
                                    h-9
                                    w-20
                                    shrink-0
                                    rounded-xl
                                "
                            />

                        </div>

                    </div>

                )
            )}

        </div>

    );

}


/* =====================================================
   List Loading
===================================================== */

if (type === "list") {

    return (

        <div
            className="
                overflow-hidden
                rounded-3xl
                border
                border-zinc-200
                bg-white
                shadow-sm
            "
        >

            {Array.from({ length: count }).map(
                (_, index) => (

                    <div
                        key={index}
                        className="
                            flex
                            items-center
                            gap-4
                            border-b
                            border-zinc-100
                            px-6
                            py-5
                            last:border-b-0
                        "
                    >

                        {/* Conversation icon */}

                        <Skeleton
                            className="
                                h-11
                                w-11
                                shrink-0
                                rounded-xl
                            "
                        />


                        {/* Conversation content */}

                        <div
                            className="
                                min-w-0
                                flex-1
                                space-y-2
                            "
                        >

                            <Skeleton
                                className="
                                    h-5
                                    w-64
                                    max-w-full
                                "
                            />

                            <Skeleton
                                className="
                                    h-4
                                    w-96
                                    max-w-full
                                "
                            />

                        </div>


                        {/* Timestamp */}

                        <Skeleton
                            className="
                                hidden
                                h-4
                                w-20
                                shrink-0
                                sm:block
                            "
                        />

                    </div>

                )
            )}

        </div>

    );

}


/* =====================================================
   Settings Loading
===================================================== */

if (type === "settings") {

    return (

        <div className="space-y-6">

            {Array.from({ length: count }).map(
                (_, index) => (

                    <div
                        key={index}
                        className="
                            rounded-3xl
                            border
                            border-zinc-200
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >

                        <div
                            className="
                                mb-6
                                space-y-3
                            "
                        >

                            <Skeleton
                                className="
                                    h-5
                                    w-48
                                "
                            />

                            <Skeleton
                                className="
                                    h-4
                                    w-80
                                    max-w-full
                                "
                            />

                        </div>


                        <div
                            className="
                                space-y-5
                            "
                        >

                            <div className="space-y-2">

                                <Skeleton
                                    className="
                                        h-4
                                        w-28
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                    "
                                />

                            </div>


                            <div className="space-y-2">

                                <Skeleton
                                    className="
                                        h-4
                                        w-32
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                    "
                                />

                            </div>

                        </div>

                    </div>

                )
            )}

        </div>

    );

}


/* =====================================================
   Fallback
===================================================== */

return (

    <div className="space-y-5">

        {Array.from({ length: count }).map(
            (_, index) => (

                <Skeleton
                    key={index}
                    className="
                        h-24
                        w-full
                        rounded-3xl
                    "
                />

            )
        )}

    </div>

);

}

export default ProfileLoading;
