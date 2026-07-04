from pathlib import Path
import pandas as pd

class DatasetLoader:
    """
    Loads the recruitment dataset into a pandas dataframe
    """

    def __init__(self , file_path: Path):
        self.file_path = Path(file_path)

    def load(self) -> pd.DataFrame:
        """
        Loads dataset from disk

        Returns: pd.DataFrame
        (Loaded recruitment dataset)
        """

        if not self.file_path.exists():
            raise FileNotFoundError(
                f"Dataset not found:\n{self.file_path}"
            )
        
        df = pd.read_csv(self.file_path)

        return df