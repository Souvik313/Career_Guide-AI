from src.config import RAW_DATA_PATH

from src.job_processing.dataset_loader import DatasetLoader

from src.job_processing.data_cleaner import DataCleaner

from src.job_processing.text_preprocessor import TextPreprocessor


def main():

    loader = DatasetLoader(RAW_DATA_PATH)

    df = loader.load()

    cleaner = DataCleaner(df)

    cleaned_df = cleaner.clean()

    preprocessor = TextPreprocessor(cleaned_df)

    processed_df = preprocessor.preprocess()

    print("=" * 60)
    print("ORIGINAL DESCRIPTION")
    print("=" * 60)

    print(cleaned_df.loc[0, "Long Description"][:600])

    print("\n")

    print("=" * 60)
    print("PROCESSED DESCRIPTION")
    print("=" * 60)

    print(processed_df.loc[0, "Long Description"][:600])


if __name__ == "__main__":
    main()