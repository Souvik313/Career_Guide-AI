from pathlib import Path

import fitz
from docx import Document

class ResumeParser:

    def __init__(self):
        pass

    # Extract text from pdf or docx file
    def extract_text(self , file_path):
        file_path = Path(file_path)

        suffix = file_path.suffix.lower()

        if suffix == ".pdf":
            return self._extract_pdf(file_path)
        
        elif suffix == ".docx":
            return self._extract_docx(file_path)
        
        else:
            raise ValueError(
                "Unsupported file format. Only PDF and DOCX are supported."
            )
        
    def _extract_pdf(self, file_path):
        """
        Extract text from a PDF resume using PyMuPDF.
        """

        pages = []

        with fitz.open(file_path) as document:
            for page in document:
                pages.append(page.get_text())

        return "\n".join(pages)
    
    def _extract_docx(self , file_path):
        document = Document(file_path)

        paragraphs = []
        for paragraph in document.paragraphs:
            paragraphs.append(paragraph.text)

        return "\n".join(paragraphs)
    