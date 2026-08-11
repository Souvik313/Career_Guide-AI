import cloudinary.uploader

class CloudinaryService:
    """
    Handles Cloudinary operations for resume files.
    """

    @staticmethod
    def upload_resume(
        file_bytes: bytes,
        filename: str,
        user_id: int,
    ) -> dict:
        """
        Upload a resume PDF to Cloudinary.

        Returns the Cloudinary metadata required
        to store the file reference in Neon.
        """

        result = cloudinary.uploader.upload(
            file_bytes,
            resource_type="image",
            folder=f"careercompass/resumes/user_{user_id}",
            use_filename=True,
            unique_filename=True,
            overwrite=False,
            format="pdf"
        )

        return {
            "public_id": result["public_id"],
            "secure_url": result["secure_url"],
            "resource_type": result["resource_type"],
            "format": result.get("format"),
        }

    @staticmethod
    def delete_resume(
        public_id: str,
    ) -> dict:
        """
        Delete a resume PDF from Cloudinary.
        """

        result = cloudinary.uploader.destroy(
            public_id,
            resource_type="image",
            type="upload",
            invalidate=True,
        )

        return result