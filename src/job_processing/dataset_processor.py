from src.config import RAW_DATA_PATH, PROCESSED_DATA_PATH

from src.job_processing.dataset_loader import DatasetLoader
from src.job_processing.data_cleaner import DataCleaner
from src.job_processing.text_preprocessor import TextPreprocessor

class DatasetProcessor:
    """
    Executes the complete preprocessing pipeline.
    """

    def process(self):
        
        loader = DatasetLoader(RAW_DATA_PATH)
        df = loader.load()

        cleaner = DataCleaner(df)
        cleaned_df = cleaner.clean()

        preprocessor = TextPreprocessor(cleaned_df)
        processed_df = preprocessor.preprocess()

        processed_df.to_csv(
            PROCESSED_DATA_PATH,
            index=False
        )

        return processed_df
    