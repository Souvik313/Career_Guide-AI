import pandas as pd
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

input_file = PROJECT_ROOT / "data" / "processed" / "processed_jobs_with_skills.csv"

output_file = PROJECT_ROOT / "data" / "processed" / "jobs_metadata.csv"

df = pd.read_csv(input_file)

metadata_df = df[
    [
        "Position",
        "Company Name",
        "Exp Years",
        "Primary Keyword",
        "English Level",
        "Skills"
    ]
]

metadata_df.to_csv(output_file, index=False)

print("Saved:", output_file)
print("Shape:", metadata_df.shape)