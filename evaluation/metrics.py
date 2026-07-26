import re
from typing import Iterable

SENIORITY_TERMS = {
    "senior",
    "jr",
    "junior",
    "lead",
    "principal",
    "middle",
    "strong",
    "staff",
    "trainee",
}

ROLE_SYNONYMS = {
    "ml": "machine learning",
    "ai": "artificial intelligence",
    "golang": "go",
    "nodejs": "node js",
    "reactjs": "react",
    "frontend": "front end",
    "backend": "back end",
    "fullstack": "full stack",
    "full-stack": "full stack",
}

def normalize_title(
    title: str,
) -> str:
    """
    Normalize a job title for semantic comparison.

    The normalization process removes seniority indicators,
    punctuation, extra whitespace, and converts the title
    to lowercase.

    Args:
        title (str):
            Raw job title.

    Returns:
        str:
            Normalized job title.
    """

    if not title:
        return ""

    normalized = title.lower().strip()

    normalized = re.sub(
        r"[()/_\-]",
        " ",
        normalized,
    )

    normalized = re.sub(
        r"[^a-z0-9\s.]",
        "",
        normalized,
    )

    words = normalized.split()

    filtered_words = [
        word
        for word in words
        if word not in SENIORITY_TERMS
    ]

    normalized = " ".join(filtered_words)

    normalized = re.sub(
        r"\s+",
        " ",
        normalized,
    )

    return normalized.strip()

def apply_role_synonyms(
    title: str,
) -> str:
    """
    Replace known role abbreviations and aliases
    with a canonical representation.
    """

    normalized = title

    for source, target in ROLE_SYNONYMS.items():
        normalized = normalized.replace(source, target)

    return normalized

def titles_match(
    predicted_title: str,
    expected_title: str,
) -> bool:
    """
    Determine whether two job titles should be
    considered semantically equivalent.
    """

    predicted = apply_role_synonyms(
        normalize_title(predicted_title)
    )

    expected = apply_role_synonyms(
        normalize_title(expected_title)
    )

    # --------------------------------------------------
    # Exact normalized match
    # --------------------------------------------------

    if predicted == expected:
        return True

    # --------------------------------------------------
    # Token overlap match
    # --------------------------------------------------

    predicted_tokens = set(predicted.split())
    expected_tokens = set(expected.split())

    if expected_tokens.issubset(predicted_tokens):
        return True

    if predicted_tokens.issubset(expected_tokens):
        return True

    return False

def precision_at_k(
    predicted_titles: list[str],
    expected_titles: list[str],
    k: int = 5,
) -> float:
    """
    Compute Precision@K for a single resume.

    Precision@K measures the proportion of the top-K
    recommended job titles that are relevant.

    Args:
        predicted_titles (list[str]):
            Ranked list of predicted job titles.

        expected_titles (list[str]):
            Ground truth job titles.

        k (int):
            Number of top predictions to evaluate.

    Returns:
        float:
            Precision@K score.
    """

    if k <= 0:
        raise ValueError("k must be greater than zero.")

    top_predictions = predicted_titles[:k]

    relevant_predictions = 0

    for prediction in top_predictions:

        for expected in expected_titles:

            if titles_match(
                prediction,
                expected,
            ):
                relevant_predictions += 1
                break

    return relevant_predictions / k

def recall_at_k(
    predicted_titles: list[str],
    expected_titles: list[str],
    k: int = 5,
) -> float:
    """
    Compute Recall@K for a single resume.

    Recall@K measures the proportion of the
    relevant job titles that were successfully
    retrieved within the top-K recommendations.

    Args:
        predicted_titles (list[str]):
            Ranked list of predicted job titles.

        expected_titles (list[str]):
            Ground truth job titles.

        k (int):
            Number of top predictions to evaluate.

    Returns:
        float:
            Recall@K score.
    """

    if not expected_titles:
        return 0.0

    top_predictions = predicted_titles[:k]

    matched_expected = set()

    for expected in expected_titles:

        for prediction in top_predictions:

            if titles_match(
                prediction,
                expected,
            ):
                matched_expected.add(expected)
                break

    return len(matched_expected) / len(expected_titles)

def reciprocal_rank(
    predicted_titles: list[str],
    expected_titles: list[str],
    k: int = 5,
) -> float:
    """
    Compute the Reciprocal Rank (RR) for a single resume.

    The reciprocal rank is the inverse of the rank
    position of the first relevant recommendation.

    Args:
        predicted_titles (list[str]):
            Ranked list of predicted job titles.

        expected_titles (list[str]):
            Ground truth job titles.

        k (int):
            Number of top predictions to evaluate.

    Returns:
        float:
            Reciprocal Rank (RR).
    """

    top_predictions = predicted_titles[:k]

    for rank, prediction in enumerate(top_predictions, start=1):

        for expected in expected_titles:

            if titles_match(
                prediction,
                expected,
            ):
                return 1.0 / rank

    return 0.0

def hit_rate(predicted_titles: list[str] , expected_titles: list[str] , k: int = 5):
    return top_k_accuracy(predicted_titles , expected_titles , k)

def top_k_accuracy(
    predicted_titles: list[str],
    expected_titles: list[str],
    k: int = 5,
) -> float:
    """
    Compute Top-K Accuracy for a single resume.

    Top-K Accuracy is 1 if at least one relevant
    recommendation appears within the top-K results,
    otherwise 0.

    Args:
        predicted_titles (list[str]):
            Ranked list of predicted job titles.

        expected_titles (list[str]):
            Ground truth job titles.

        k (int):
            Number of top predictions to evaluate.

    Returns:
        float:
            1.0 if a relevant recommendation exists
            within the top-K predictions, else 0.0.
    """

    top_predictions = predicted_titles[:k]

    for prediction in top_predictions:

        for expected in expected_titles:

            if titles_match(
                prediction,
                expected,
            ):
                return 1.0

    return 0.0

def domain_accuracy(
    predicted_domain: str,
    expected_domain: str,
) -> float:
    """
    Compute domain classification accuracy.

    Args:
        predicted_domain (str):
            Domain inferred from the recommendation.

        expected_domain (str):
            Ground truth domain.

    Returns:
        float:
            1.0 if domains match,
            otherwise 0.0.
    """

    if not predicted_domain or not expected_domain:
        return 0.0

    if predicted_domain.strip().lower() == expected_domain.strip().lower():
        return 1.0

    return 0.0

def calculate_all_metrics(
    predicted_titles: list[str],
    expected_titles: list[str],
    predicted_domain: str,
    expected_domain: str,
) -> dict:
    """
    Compute all evaluation metrics for a single resume.

    Args:
        predicted_titles (list[str]):
            Ranked job recommendations produced by CareerCompass-AI.

        expected_titles (list[str]):
            Ground truth job titles.

        predicted_domain (str):
            Domain inferred from the recommendations.

        expected_domain (str):
            Ground truth domain.

    Returns:
        dict:
            Dictionary containing all evaluation metrics.
    """

    reciprocal_rank_score = reciprocal_rank(
        predicted_titles,
        expected_titles,
        k=5,
    )

    return {
        "precision_at_5": precision_at_k(
            predicted_titles,
            expected_titles,
            k=5,
        ),

        "recall_at_5": recall_at_k(
            predicted_titles,
            expected_titles,
            k=5,
        ),

        "reciprocal_rank": reciprocal_rank_score,

        "hit_rate": hit_rate(
            predicted_titles,
            expected_titles,
            k=5,
        ),

        "top1_accuracy": top_k_accuracy(
            predicted_titles,
            expected_titles,
            k=1,
        ),

        "top3_accuracy": top_k_accuracy(
            predicted_titles,
            expected_titles,
            k=3,
        ),

        "domain_accuracy": domain_accuracy(
            predicted_domain,
            expected_domain,
        ),
    }