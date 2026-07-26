import json
import logging
from pathlib import Path
from evaluation.ground_truth_loader import load_ground_truth

import matplotlib.pyplot as plt
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent.parent

EVALUATION_RESULTS_DIR = PROJECT_ROOT / "evaluation_results"

FIGURES_DIR = EVALUATION_RESULTS_DIR / "figures"

SUMMARY_FILE = (
    EVALUATION_RESULTS_DIR
    / "evaluation_summary.json"
)

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s",
)

def load_results() -> dict:
    """
    Load the evaluation summary JSON file.

    Returns
    -------
    dict
        Evaluation results dictionary.

    Raises
    ------
    FileNotFoundError
        If evaluation_summary.json does not exist.
    """

    if not SUMMARY_FILE.exists():

        logging.error(
            "Evaluation summary not found: %s",
            SUMMARY_FILE,
        )

        raise FileNotFoundError(SUMMARY_FILE)

    with open(
        SUMMARY_FILE,
        "r",
        encoding="utf-8",
    ) as file:

        results = json.load(file)

    logging.info(
        "Loaded evaluation summary successfully.",
    )

    return results

def extract_metric_dataframe(
    results: dict,
) -> pd.DataFrame:
    """
    Convert evaluation summary metrics into a dataframe.

    Parameters
    ----------
    results : dict
        Loaded evaluation summary dictionary.

    Returns
    -------
    pd.DataFrame
        DataFrame containing metric names and scores.
    """

    summary = results["summary"]

    metric_data = {
        "Metric": [
            "Precision@5",
            "Recall@5",
            "MRR",
            "Hit Rate",
            "Top-1 Accuracy",
            "Top-3 Accuracy",
            "Domain Accuracy",
        ],
        "Score": [
            summary["precision_at_5"],
            summary["recall_at_5"],
            summary["mean_reciprocal_rank"],
            summary["hit_rate"],
            summary["top1_accuracy"],
            summary["top3_accuracy"],
            summary["domain_accuracy"],
        ],
    }

    metrics_df = pd.DataFrame(metric_data)

    logging.info(
        "Prepared metrics dataframe with %d metrics.",
        len(metrics_df),
    )

    return metrics_df

def plot_metric_bar_chart(
    metrics_df: pd.DataFrame,
) -> None:
    """
    Generate a bar chart of all evaluation metrics.

    Parameters
    ----------
    metrics_df : pd.DataFrame
        DataFrame containing metric names and scores.
    """

    FIGURES_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    plt.figure(figsize=(10, 6))

    bars = plt.bar(
        metrics_df["Metric"],
        metrics_df["Score"],
    )

    plt.title(
        "CareerCompass-AI Evaluation Metrics",
        fontsize=14,
        fontweight="bold",
    )

    plt.xlabel("Evaluation Metric")

    plt.ylabel("Score")

    plt.ylim(0, 1.05)

    plt.grid(
        axis="y",
        linestyle="--",
        alpha=0.4,
    )

    plt.xticks(
        rotation=20,
        ha="right",
    )

    for bar, score in zip(
        bars,
        metrics_df["Score"],
    ):

        plt.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 0.02,
            f"{score:.2f}",
            ha="center",
            fontsize=9,
        )

    output_path = (
        FIGURES_DIR
        / "metric_bar_chart.png"
    )

    plt.tight_layout()

    plt.savefig(
        output_path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    logging.info(
        "Saved metric bar chart to %s",
        output_path,
    )

def plot_precision_recall(
    metrics_df: pd.DataFrame,
) -> None:
    """
    Generate a comparison chart for Precision@5 and Recall@5.

    Parameters
    ----------
    metrics_df : pd.DataFrame
        DataFrame containing evaluation metrics.
    """

    precision_recall_df = metrics_df[
        metrics_df["Metric"].isin(
            [
                "Precision@5",
                "Recall@5",
            ]
        )
    ]

    plt.figure(figsize=(6, 5))

    bars = plt.bar(
        precision_recall_df["Metric"],
        precision_recall_df["Score"],
    )

    plt.title(
        "Precision vs Recall",
        fontsize=14,
        fontweight="bold",
    )

    plt.ylabel("Score")

    plt.ylim(0, 1.05)

    plt.grid(
        axis="y",
        linestyle="--",
        alpha=0.4,
    )

    for bar, score in zip(
        bars,
        precision_recall_df["Score"],
    ):

        plt.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 0.02,
            f"{score:.2f}",
            ha="center",
            fontsize=10,
        )

    output_path = (
        FIGURES_DIR
        / "precision_recall.png"
    )

    plt.tight_layout()

    plt.savefig(
        output_path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    logging.info(
        "Saved Precision vs Recall chart to %s",
        output_path,
    )

def plot_topk_accuracy(
    metrics_df: pd.DataFrame,
) -> None:
    """
    Generate a comparison chart for Top-1 and Top-3 accuracy.

    Parameters
    ----------
    metrics_df : pd.DataFrame
        DataFrame containing evaluation metrics.
    """

    topk_df = metrics_df[
        metrics_df["Metric"].isin(
            [
                "Top-1 Accuracy",
                "Top-3 Accuracy",
            ]
        )
    ]

    plt.figure(figsize=(6, 5))

    bars = plt.bar(
        topk_df["Metric"],
        topk_df["Score"],
    )

    plt.title(
        "Top-k Recommendation Accuracy",
        fontsize=14,
        fontweight="bold",
    )

    plt.ylabel("Accuracy")

    plt.ylim(0, 1.05)

    plt.grid(
        axis="y",
        linestyle="--",
        alpha=0.4,
    )

    for bar, score in zip(
        bars,
        topk_df["Score"],
    ):

        plt.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 0.02,
            f"{score:.2f}",
            ha="center",
            fontsize=10,
        )

    output_path = (
        FIGURES_DIR
        / "topk_accuracy.png"
    )

    plt.tight_layout()

    plt.savefig(
        output_path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    logging.info(
        "Saved Top-k Accuracy chart to %s",
        output_path,
    )

def plot_domain_distribution(
    ground_truth_df: pd.DataFrame,
) -> None:
    """
    Generate a bar chart showing the number of resumes
    in each benchmark domain.

    Parameters
    ----------
    ground_truth_df : pd.DataFrame
        Ground truth benchmark dataframe.
    """

    domain_counts = (
        ground_truth_df["Primary_Domain"]
        .value_counts()
        .sort_index()
    )

    plt.figure(figsize=(8, 5))

    bars = plt.bar(
        domain_counts.index,
        domain_counts.values,
    )

    plt.title(
        "Benchmark Resume Distribution by Domain",
        fontsize=14,
        fontweight="bold",
    )

    plt.xlabel("Career Domain")

    plt.ylabel("Number of Resumes")

    plt.grid(
        axis="y",
        linestyle="--",
        alpha=0.4,
    )

    plt.xticks(
        rotation=20,
        ha="right",
    )

    for bar, count in zip(
        bars,
        domain_counts.values,
    ):

        plt.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 0.1,
            str(count),
            ha="center",
            fontsize=10,
        )

    output_path = (
        FIGURES_DIR
        / "domain_distribution.png"
    )

    plt.tight_layout()

    plt.savefig(
        output_path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    logging.info(
        "Saved domain distribution chart to %s",
        output_path,
    )

def plot_domain_confusion_matrix(
    evaluation_results: list[dict],
) -> None:
    """
    Generate a domain-level confusion matrix.

    Parameters
    ----------
    evaluation_results : list[dict]
        Evaluation result for every benchmark resume.
    """

    domains = sorted(
        {
            result["expected_domain"]
            for result in evaluation_results
        }
        |
        {
            result["predicted_domain"]
            for result in evaluation_results
        }
    )

    domain_to_index = {
        domain: idx
        for idx, domain in enumerate(domains)
    }

    confusion_matrix = [
        [0 for _ in domains]
        for _ in domains
    ]

    for result in evaluation_results:

        true_idx = domain_to_index[
            result["expected_domain"]
        ]

        pred_idx = domain_to_index[
            result["predicted_domain"]
        ]

        confusion_matrix[
            true_idx
        ][
            pred_idx
        ] += 1

    plt.figure(figsize=(8, 7))

    plt.imshow(
        confusion_matrix,
        interpolation="nearest",
    )

    plt.colorbar()

    plt.title(
        "Domain Confusion Matrix",
        fontsize=14,
        fontweight="bold",
    )

    plt.xticks(
        range(len(domains)),
        domains,
        rotation=30,
        ha="right",
    )

    plt.yticks(
        range(len(domains)),
        domains,
    )

    plt.xlabel("Predicted Domain")

    plt.ylabel("Ground Truth Domain")

    for i in range(len(domains)):

        for j in range(len(domains)):

            plt.text(
                j,
                i,
                str(confusion_matrix[i][j]),
                ha="center",
                va="center",
                fontsize=10,
            )

    output_path = (
        FIGURES_DIR
        / "domain_confusion_matrix.png"
    )

    plt.tight_layout()

    plt.savefig(
        output_path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    logging.info(
        "Saved domain confusion matrix to %s",
        output_path,
    )

def main() -> None:
    """
    Run the complete visualization pipeline.
    """

    logging.info(
        "------------------------------------------------------------"
    )

    logging.info(
        "CareerCompass-AI Evaluation Visualization"
    )

    logging.info(
        "------------------------------------------------------------"
    )

    # --------------------------------------------------------
    # Load evaluation summary
    # --------------------------------------------------------

    results = load_results()

    # --------------------------------------------------------
    # Load ground truth benchmark
    # --------------------------------------------------------

    ground_truth_df = load_ground_truth()

    # --------------------------------------------------------
    # Prepare metric dataframe
    # --------------------------------------------------------

    metrics_df = extract_metric_dataframe(
        results,
    )

    # --------------------------------------------------------
    # Generate visualizations
    # --------------------------------------------------------

    plot_metric_bar_chart(
        metrics_df,
    )

    plot_precision_recall(
        metrics_df,
    )

    plot_topk_accuracy(
        metrics_df,
    )

    plot_domain_distribution(
        ground_truth_df,
    )

    plot_domain_confusion_matrix(
        results["resume_results"],
    )

    # --------------------------------------------------------
    # Finished
    # --------------------------------------------------------

    logging.info(
        "------------------------------------------------------------"
    )

    logging.info(
        "All evaluation figures generated successfully."
    )

    logging.info(
        "Figures saved to %s",
        FIGURES_DIR,
    )

    logging.info(
        "------------------------------------------------------------"
    )


if __name__ == "__main__":
    main()