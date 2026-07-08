from src.matching.embedding_search import EmbeddingSearch

def main():

    # Initialize the search_engine object
    search_engine = EmbeddingSearch()

    # Sample resume/query for testing 
    resume_text = """
        Python
        Machine Learning
        Deep Learning
        TensorFlow
        PyTorch
        Data Science
        SQL
        Docker
        AWS
        Git
        REST APIs
        """
    
    # Search similar jobs
    results = search_engine.search(
                resume_text,
                top_k=10
            )

    # Print the results dataframe
    print("\nTop matching jobs\n")

    columns = [
        "Position",
        "Company Name",
        "Exp Years",
        "Primary Keyword",
        "English Level",
        "Similarity Score",
    ]

    print(results[columns])

if __name__ == "__main__":
    main()