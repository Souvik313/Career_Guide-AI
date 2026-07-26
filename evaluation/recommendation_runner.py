import logging
import os
from pathlib import Path

import requests
from dotenv import load_dotenv
from evaluation.batch_loader import load_all_resumes
import json

load_dotenv()

BACKEND_URL = os.getenv("CAREERCOMPASS_LOCAL_BACKEND_URL")

UPLOAD_ENDPOINT = "/upload-resume"
REQUEST_TIMEOUT = 120

def send_resume_to_backend(
    resume_path: Path,
    backend_url: str,
) -> dict:
    """
    Send a resume PDF to the CareerCompass-AI backend.

    Args:
        resume_path (Path):
            Path to the resume PDF.

        backend_url (str):
            Base URL of the CareerCompass-AI backend.

    Returns:
        dict:
            JSON response returned by the backend.

    Raises:
        FileNotFoundError:
            If the resume file does not exist.

        requests.RequestException:
            If the backend request fails.

        ValueError:
            If the backend response is not valid JSON.
    """

    if not resume_path.exists():
        raise FileNotFoundError(
            f"Resume file not found: {resume_path}"
        )

    endpoint = (
        f"{backend_url.rstrip('/')}"
        f"{UPLOAD_ENDPOINT}"
    )

    logging.info(
        "Sending resume '%s' to backend.",
        resume_path.name,
    )

    try:
        with resume_path.open("rb") as resume_file:

            files = {
                "file": (
                    resume_path.name,
                    resume_file,
                    "application/pdf",
                )
            }

            response = requests.post(
                endpoint,
                files=files,
                timeout=REQUEST_TIMEOUT,
            )

        response.raise_for_status()

    except requests.RequestException as exc:

        logging.error(
            "Backend request failed for '%s': %s",
            resume_path.name,
            exc,
        )

        raise

    try:
        result = response.json()

    except ValueError as exc:

        logging.error(
            "Backend returned invalid JSON for '%s'.",
            resume_path.name,
        )

        raise ValueError(
            "Backend response is not valid JSON."
        ) from exc

    logging.info(
        "Successfully received backend response for '%s'.",
        resume_path.name,
    )

    return result

def extract_top5_positions(
    backend_response: dict,
) -> list[str]:
    """
    Extract the Top-5 recommended job titles from the backend response.

    Args:
        backend_response (dict):
            JSON response returned by the CareerCompass-AI backend.

    Returns:
        list[str]:
            List containing up to five recommended job titles.

    Raises:
        KeyError:
            If the backend response does not contain
            the 'recommended_jobs' field.
    """

    if "recommended_jobs" not in backend_response:

        raise KeyError(
            "Backend response does not contain "
            "'recommended_jobs'."
        )

    recommended_jobs = backend_response["recommended_jobs"]

    top5_positions = []

    for job in recommended_jobs[:5]:

        position = job.get("Position")

        if position:

            top5_positions.append(position.strip())

    logging.info(
        "Extracted %d recommended positions.",
        len(top5_positions),
    )

    return top5_positions

def run_recommendation_pipeline() -> list[dict]:
    """
    Run the recommendation pipeline on all evaluation resumes.

    Returns:
        list[dict]:
            List containing prediction results for every resume.
    """

    resumes = load_all_resumes()

    predictions = []

    logging.info("-" * 60)
    logging.info("Starting recommendation pipeline...")
    logging.info("Total resumes to evaluate: %d", len(resumes))

    for index, resume in enumerate(resumes, start=1):

        resume_id = resume["resume_id"]
        domain = resume["domain"]
        resume_path = resume["file_path"]

        logging.info(
            "[%d/%d] Processing %s...",
            index,
            len(resumes),
            resume_id,
        )

        try:

            backend_response = send_resume_to_backend(
                resume_path=resume_path,
                backend_url=BACKEND_URL,
            )

            top5_positions = extract_top5_positions(
                backend_response
            )

            predictions.append(
                {
                    "resume_id": resume_id,
                    "domain": domain,
                    "status": "success",
                    "recommendations": top5_positions,
                }
            )

            logging.info(
                "%s completed successfully.",
                resume_id,
            )

        except Exception as exc:

            logging.error(
                "%s failed: %s",
                resume_id,
                exc,
            )

            predictions.append(
                {
                    "resume_id": resume_id,
                    "domain": domain,
                    "status": "failed",
                    "recommendations": [],
                    "error": str(exc),
                }
            )

    successful = sum(
        prediction["status"] == "success"
        for prediction in predictions
    )

    failed = len(predictions) - successful

    logging.info("-" * 60)
    logging.info("Recommendation pipeline completed.")
    logging.info("Successful: %d", successful)
    logging.info("Failed: %d", failed)

    return predictions

def save_predictions(
    predictions: list[dict],
) -> Path:
    """
    Save evaluation predictions to a JSON file.

    Args:
        predictions (list[dict]):
            Prediction results generated by the recommendation pipeline.

    Returns:
        Path:
            Path to the saved predictions JSON file.
    """

    output_dir = Path("evaluation_results")
    output_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    output_file = output_dir / "predictions.json"

    with output_file.open(
        mode="w",
        encoding="utf-8",
    ) as file:

        json.dump(
            predictions,
            file,
            indent=4,
            ensure_ascii=False,
        )

    logging.info(
        "Saved %d prediction results to '%s'.",
        len(predictions),
        output_file,
    )

    return output_file

def main() -> None:
    """
    Entry point for the recommendation evaluation pipeline.
    """

    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s | %(message)s",
    )

    logging.info("-" * 60)
    logging.info("CareerCompass-AI Recommendation Evaluation Pipeline")
    logging.info("-" * 60)

    if not BACKEND_URL:
        raise EnvironmentError(
            "CAREERCOMPASS_LOCAL_BACKEND_URL is not defined "
            "in the .env file."
        )

    logging.info("Backend URL: %s", BACKEND_URL)

    predictions = run_recommendation_pipeline()

    output_file = save_predictions(predictions)

    successful = sum(
        prediction["status"] == "success"
        for prediction in predictions
    )

    failed = len(predictions) - successful

    logging.info("-" * 60)
    logging.info("Recommendation Pipeline Summary")
    logging.info("-" * 60)
    logging.info("Total resumes processed : %d", len(predictions))
    logging.info("Successful predictions : %d", successful)
    logging.info("Failed predictions     : %d", failed)
    logging.info("Predictions saved to   : %s", output_file)
    logging.info("Recommendation runner completed successfully.")

if __name__ == "__main__":
    main()