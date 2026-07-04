from src.config import RAW_DATA_PATH
from src.job_processing.dataset_loader import DatasetLoader
from src.job_processing.data_cleaner import DataCleaner


def main():

    loader = DatasetLoader(RAW_DATA_PATH)

    df = loader.load()

    print("=" * 60)
    print("ORIGINAL DATASET")
    print("=" * 60)

    print("Shape:", df.shape)
    print()

    print("Missing Values")
    print(df.isnull().sum())
    print()

    cleaner = DataCleaner(df)

    cleaned_df = cleaner.clean()

    print("=" * 60)
    print("CLEANED DATASET")
    print("=" * 60)

    print("Shape:", cleaned_df.shape)
    print()

    print("Missing Values")
    print(cleaned_df.isnull().sum())
    print()

    print("Columns")
    print(cleaned_df.columns.tolist())


if __name__ == "__main__":
    main()