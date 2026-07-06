from src.config import PROCESSED_DATA_PATH

from src.job_processing.dataset_processor import DatasetProcessor


def main():

    processor = DatasetProcessor()

    df = processor.process()

    print("=" * 60)
    print("PIPELINE COMPLETED")
    print("=" * 60)

    print()

    print("Processed Shape:")

    print(df.shape)

    print()

    print("Saved To:")

    print(PROCESSED_DATA_PATH)

    print()

    print(df.head())


if __name__ == "__main__":
    main()