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