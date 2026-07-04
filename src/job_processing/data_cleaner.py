import pandas as pd

class DataCleaner:

    """
    Cleans the recruitment dataset.

    Responsibilities:
    1. Fill missing values
    2. Remove duplicate rows
    3. Drop unnecessary columns
    4. Reset dataframe index
    """

    MISSING_VALUE_STRATEGY = {
        "English Level": "Not Specified"
    }

    COLUMNS_TO_DROP = [
        "Published",
        "Long Description_lang",
        "id",
        "__index_level_0__"
    ]

    def __init__(self , dataframe: pd.DataFrame):
        self.df = dataframe.copy()

    def fill_missing_values(self):
        """
        Fill missing values
        """

        for column , replacement in self.MISSING_VALUE_STRATEGY.items():
            if column in self.df.columns:
                self.df[column] = self.df[column].fillna(replacement)

    def remove_duplicates(self):
        """
        Remove dupliacate rows.
        """

        self.df.drop_duplicates(inplace=True)

    def drop_unused_columns(self):
        """
        Drop unused columns.
        """

        columns = [
            col for col in self.COLUMNS_TO_DROP
            if col in self.df.columns
        ]

        self.df.drop(columns=columns, inplace=True)

    def reset_index(self):
        """
        Reset dataframe index.
        """

        self.df.reset_index(drop=True , inplace=True)

    def clean(self) -> pd.DataFrame:
        """
        Execute the complete cleaning pipeline
        """

        self.fill_missing_values()
        self.remove_duplicates()
        self.drop_unused_columns()
        self.reset_index()

        return self.df