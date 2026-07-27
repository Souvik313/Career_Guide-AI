from __future__ import annotations

import json
import logging
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

PROJECT_ROOT = Path(__file__).resolve().parent.parent

EVALUATION_RESULTS_DIR = (
    PROJECT_ROOT
    / "evaluation_results"
)

SUMMARY_PATH = (
    EVALUATION_RESULTS_DIR
    / "evaluation_summary.json"
)

REPORT_PATH = (
    EVALUATION_RESULTS_DIR
    / "evaluation_report.md"
)

FIGURES_DIR = (
    EVALUATION_RESULTS_DIR
    / "figures"
)

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s",
)

def load_summary() -> dict:
    """
    Load the evaluation summary JSON file.

    Returns
    -------
    dict
        Parsed evaluation summary.

    Raises
    ------
    FileNotFoundError
        If evaluation_summary.json is not found.
    """

    if not SUMMARY_PATH.exists():
        logging.error(
            "Evaluation summary not found: %s",
            SUMMARY_PATH,
        )
        raise FileNotFoundError(SUMMARY_PATH)

    with open(
        SUMMARY_PATH,
        "r",
        encoding="utf-8",
    ) as file:
        summary = json.load(file)

    logging.info(
        "Loaded evaluation summary successfully."
    )

    return summary

def generate_overview(
    summary: dict,
) -> str:
    """
    Generate the overview section of the evaluation report.

    Parameters
    ----------
    summary : dict
        Parsed evaluation summary.

    Returns
    -------
    str
        Markdown formatted overview section.
    """

    total_resumes = summary["summary"]["total_resumes"]

    overview = f"""# CareerCompass-AI Evaluation Report

## Overview

This report summarizes the benchmark evaluation of the CareerCompass-AI recommendation engine.

The evaluation pipeline was designed to measure the recommendation quality of the system using a manually curated benchmark dataset consisting of **{total_resumes} resumes** distributed across multiple software engineering domains.

The benchmark evaluates the recommendation engine using standard Information Retrieval (IR) metrics including Precision@5, Recall@5, Mean Reciprocal Rank (MRR), Hit Rate, Top-k Accuracy, and Domain Accuracy.

All benchmark results, figures, and observations presented in this report were generated automatically by the CareerCompass-AI evaluation pipeline.

---

"""

    return overview

def generate_metrics_table(
    summary: dict,
) -> str:
    """
    Generate the evaluation metrics table.

    Parameters
    ----------
    summary : dict
        Parsed evaluation summary.

    Returns
    -------
    str
        Markdown formatted metrics table.
    """

    metrics = summary["summary"]

    table = f"""
## Overall Evaluation Metrics

| Metric | Score |
|--------|------:|
| Total Resumes | {metrics["total_resumes"]} |
| Precision@5 | {metrics["precision_at_5"]:.3f} |
| Recall@5 | {metrics["recall_at_5"]:.3f} |
| Mean Reciprocal Rank (MRR) | {metrics["mean_reciprocal_rank"]:.3f} |
| Hit Rate | {metrics["hit_rate"]:.3f} |
| Top-1 Accuracy | {metrics["top1_accuracy"]:.3f} |
| Top-3 Accuracy | {metrics["top3_accuracy"]:.3f} |
| Domain Accuracy | {metrics["domain_accuracy"]:.3f} |

---

"""

    return table

def generate_observations(
    summary: dict,
) -> str:
    """
    Generate automatic observations from evaluation metrics.

    Parameters
    ----------
    summary : dict
        Parsed evaluation summary.

    Returns
    -------
    str
        Markdown formatted observations section.
    """

    metrics = summary["summary"]

    precision = metrics["precision_at_5"]
    recall = metrics["recall_at_5"]
    mrr = metrics["mean_reciprocal_rank"]
    hit_rate = metrics["hit_rate"]
    domain_accuracy = metrics["domain_accuracy"]

    observations = []

    # --------------------------------------------------------
    # Precision
    # --------------------------------------------------------

    if precision >= 0.80:
        observations.append(
            "- Recommendation precision is excellent."
        )

    elif precision >= 0.60:
        observations.append(
            "- Recommendation precision is strong and demonstrates relevant job retrieval."
        )

    elif precision >= 0.40:
        observations.append(
            "- Recommendation precision is moderate and can be improved with better ranking."
        )

    else:
        observations.append(
            "- Recommendation precision requires significant improvement."
        )

    # --------------------------------------------------------
    # Recall
    # --------------------------------------------------------

    if recall >= 0.60:
        observations.append(
            "- The system retrieves a large portion of the relevant benchmark jobs."
        )

    elif recall >= 0.30:
        observations.append(
            "- Recall is moderate, indicating that some relevant jobs are still being missed."
        )

    else:
        observations.append(
            "- Recall remains relatively low and retrieval coverage should be improved."
        )

    # --------------------------------------------------------
    # MRR
    # --------------------------------------------------------

    if mrr >= 0.80:
        observations.append(
            "- Relevant recommendations usually appear near the top of the ranking."
        )

    elif mrr >= 0.60:
        observations.append(
            "- Ranking quality is good, with relevant jobs generally appearing within the first few recommendations."
        )

    else:
        observations.append(
            "- Recommendation ranking can be improved further."
        )

    # --------------------------------------------------------
    # Hit Rate
    # --------------------------------------------------------

    if hit_rate >= 0.90:
        observations.append(
            "- The system successfully recommends at least one relevant job for almost every resume."
        )

    elif hit_rate >= 0.70:
        observations.append(
            "- Hit rate is satisfactory but still leaves room for improvement."
        )

    else:
        observations.append(
            "- Hit rate indicates inconsistent recommendation quality."
        )

    # --------------------------------------------------------
    # Domain Accuracy
    # --------------------------------------------------------

    if domain_accuracy >= 0.90:
        observations.append(
            "- Domain prediction is highly reliable."
        )

    elif domain_accuracy >= 0.75:
        observations.append(
            "- Domain prediction is generally accurate with occasional cross-domain confusion."
        )

    else:
        observations.append(
            "- Domain classification should be improved."
        )

    markdown = "## Benchmark Observations\n\n"

    for observation in observations:
        markdown += observation + "\n"

    markdown += "\n---\n\n"

    return markdown

def generate_future_work() -> str:
    """
    Generate the future work section of the evaluation report.

    Returns
    -------
    str
        Markdown formatted future work section.
    """

    future_work = """
## Future Improvements

The current benchmark represents **Evaluation Pipeline V1** for CareerCompass-AI.

Planned improvements include:

- Improve semantic retrieval using stronger embedding models.
- Enhance ranking quality through better similarity scoring.
- Introduce advanced evaluation metrics such as MAP@K and nDCG@K.
- Expand the benchmark dataset with additional resume domains and larger sample sizes.
- Improve domain inference to reduce cross-domain prediction errors.
- Perform comparative evaluation against baseline recommendation approaches.
- Conduct ablation studies to measure the contribution of individual system components.

These enhancements will further improve both the recommendation quality and the robustness of the evaluation framework.

---

"""

    return future_work

def write_markdown_report(
    overview: str,
    metrics_table: str,
    observations: str,
    future_work: str,
) -> None:
    """
    Write the complete Markdown evaluation report.

    Parameters
    ----------
    overview : str
        Overview section.

    metrics_table : str
        Metrics table section.

    observations : str
        Benchmark observations section.

    future_work : str
        Future work section.
    """

    figures = """
## Figures

The following visualizations were automatically generated by the evaluation pipeline.

### Metric Bar Chart

![](figures/metric_bar_chart.png)

### Precision vs Recall

![](figures/precision_recall.png)

### Top-k Accuracy

![](figures/topk_accuracy.png)

### Domain Distribution

![](figures/domain_distribution.png)

### Domain Confusion Matrix

![](figures/domain_confusion_matrix.png)

---

"""

    report = (
        overview
        + metrics_table
        + observations
        + future_work
        + figures
    )

    REPORT_PATH.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    with open(
        REPORT_PATH,
        "w",
        encoding="utf-8",
    ) as file:
        file.write(report)

    logging.info(
        "Evaluation report saved to %s",
        REPORT_PATH,
    )

def main() -> None:
    """
    Generate the complete CareerCompass-AI evaluation report.
    """

    logging.info(
        "------------------------------------------------------------"
    )
    logging.info(
        "CareerCompass-AI Evaluation Report Generator"
    )
    logging.info(
        "------------------------------------------------------------"
    )

    # --------------------------------------------------------
    # Load evaluation summary
    # --------------------------------------------------------

    summary = load_summary()

    # --------------------------------------------------------
    # Generate report sections
    # --------------------------------------------------------

    overview = generate_overview(summary)

    metrics_table = generate_metrics_table(summary)

    observations = generate_observations(summary)

    future_work = generate_future_work()

    # --------------------------------------------------------
    # Write report
    # --------------------------------------------------------

    write_markdown_report(
        overview,
        metrics_table,
        observations,
        future_work,
    )

    logging.info(
        "------------------------------------------------------------"
    )
    logging.info(
        "Evaluation report generated successfully."
    )
    logging.info(
        "Report Location : %s",
        REPORT_PATH,
    )
    logging.info(
        "------------------------------------------------------------")


if __name__ == "__main__":
    main()