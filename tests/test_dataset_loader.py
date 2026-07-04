from src.config import RAW_DATA_PATH
from src.job_processing.dataset_loader import DatasetLoader

def main():
    loader = DatasetLoader(RAW_DATA_PATH)

    df = loader.load()

    print(df.head())
    print(f"Shape: {df.shape}")

if __name__ == '__main__':
    main()


