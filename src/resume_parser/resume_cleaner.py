import re

class ResumeCleaner:

    def __init__(self):
        pass

    def clean(self , text):

        text = self._remove_icons(text)
        text = self._remove_non_printable(text)
        text = self._remove_extra_spaces(text)
        text = self._remove_extra_newlines(text)
        text = self._strip_text(text)

        return text
    
    def _remove_icons(self , text):
        return re.sub(r"[^\x20-\x7E\n]", " ", text)
    
    def _remove_non_printable(self , text):
        return text.replace("\t", " ")
    
    def _remove_extra_spaces(self, text):
        return re.sub(r" +", " ", text)
    
    def _remove_extra_newlines(self, text):
        return re.sub(r"\n\s*\n+", "\n\n", text)
    
    def _strip_text(self, text):
        return text.strip()
    
    