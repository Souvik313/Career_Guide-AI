import re
import unicodedata
import pandas as pd

class TextPreprocessor:
    """
    Cleans job description text before embedding generation.
    """

    def __init__(self , dataframe: pd.DataFrame):
        self.df = dataframe.copy()

    def remove_markdown(self , text: str) -> str:
        """
        Removes markdowns because embeddings dont need markdowns.
        """
        if pd.isna(text):
            return ""
        
        text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
        text = re.sub(r"#+", "", text)
        text = re.sub(r"`", "", text)
        text = re.sub(r"\*", "", text)

        return text
    
    def normalize_newlines(self , text: str) -> str:

        text = text.replace(r"\n" , " ")
        text = text.replace(r"\r" , " ")

        return text
    
    def remove_html(self , text: str) -> str:
        text = re.sub(r"<.*?>", " ", text)

        return text
    
    def normalize_unicode(self , text: str) -> str:
        return unicodedata.normalize("NFKC", text)
    
    def normalize_whitespace(self , text: str) -> str:
        text = re.sub(r"\s+", " ", text)

        return text.strip()
    
    def preprocess_text(self , text: str) -> str:
        """
        Cleans one complete job description and returns it.
        """

        text = self.remove_markdown(text)
        text = self.normalize_newlines(text)
        text = self.remove_html(text)
        text = self.normalize_whitespace(text)
        text = self.normalize_unicode(text)

        return text
    
    def preprocess(self) -> pd.DataFrame:
        """
        Apply the changes to the dataframe.
        """

        self.df["Long Description"] = (
            self.df["Long Description"]
            .astype(str)
            .apply(self.preprocess_text)
         )
        
        return self.df
    
    