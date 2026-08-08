import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ProfileAvatar({ name = "User", imageUrl = "", size = "default" }) {
  const sizeClasses = {
    small: "h-9 w-9",

    default: "h-12 w-12",

    large: "h-20 w-20",

    xl: "h-28 w-28",
  };

  const getInitials = (fullName) => {
    if (!fullName?.trim()) {
      return "U";
    }

    const words = fullName.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <Avatar
      className={`
            ${sizeClasses[size] || sizeClasses.default}
            ring-2
            ring-fuchsia-100
            ring-offset-2
            ring-offset-white
        `}
    >
      {/* Uploaded profile image */}

      {imageUrl && (
        <AvatarImage
          src={imageUrl}
          alt={`${name}'s profile picture`}
          className="
                    object-cover
                "
        />
      )}

      {/* Initials fallback */}

      <AvatarFallback
        className="
                bg-gradient-to-br
                from-violet-500
                via-fuchsia-500
                to-orange-400
                font-bold
                text-white
            "
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

export default ProfileAvatar;
