# CareerCompass-AI Dataset Analysis

## Dataset Overview

Source:

Hugging Face Recruitment Dataset (English)
https://huggingface.co/datasets/lang-uk/recruitment-dataset-job-descriptions-english

Total Records:
141,897

Total Features:
10

## Dataset Features

- Position
- Long Description
- Company Name
- Exp Years
- Primary Keyword
- English Level
- Published
- Long Description_lang
- id
- __index_level_0__

## Missing Values

Only the English Level column contains missing values.

Missing Values:

English Level:
7,539 missing values (~5.3%)

Decision:
Missing values will be replaced with "Not Specified" during preprocessing.
No rows will be removed because the missing feature is not essential for semantic job matching.

## Duplicate Analysis

Total Duplicate Rows:
0

Observation:

No duplicate records were found in the dataset.

## Job position analysis

The dataset contains a wide variety of software engineering and IT-related roles including:

- DevOps Engineer
- Java Developer
- Senior Java Developer
- Python Developer
- PHP Developer
- WordPress Developer
- Data Scientist
- Machine Learning Engineer
- Backend Developer
- Frontend Developer

Observation:

The dataset is diverse enough to support semantic job matching.

## Company Analysis

The dataset contains job postings from numerous software and technology companies, including:

- GlobalLogic
- Luxoft           
- Ciklum           
- Intellias        
- DataArt          
- SoftServe        
- Grid Dynamics    
- N-iX              
- EPAM             
- SD Solutions

Observation:

The dataset is not dominated by a single company and therefore provides good diversity.

## Experience Analysis

Job postings cover multiple experience levels ranging from entry-level to senior roles.

Observation:

The dataset covers entry-level, mid-level, and senior-level opportunities, making it suitable for candidates across different career stages.

## Job Description Analysis

Observations:

- Job descriptions are well structured.
- Markdown formatting is present.
- Windows newline characters (\r\n) are present.
- Most technical skills are embedded within the job descriptions rather than stored in separate columns.
- Most descriptions are written in English.

Decision:

Text cleaning will be required before embedding generation.

## Visualizations

Generated:

- Job Position Distribution
- Company Distribution
- Primary Keyword Distribution
- Experience Distribution
- English Level Distribution
- Job Description Length Distribution

## Cleaning Strategy

The preprocessing pipeline will perform the following operations:

- Replace missing English Level values with "Not Specified"
- Remove Markdown formatting
- Replace escaped newline characters (`\r\n`)
- Remove unnecessary whitespace
- Normalize Unicode characters
- Preserve important technical keywords and programming language names
- Prepare cleaned text for embedding generation

## Selected Features

The following columns will be used during model development:

- Position
- Long Description
- Company Name
- Exp Years
- Primary Keyword
- English Level

## Dropped Features

The following columns are not required:

- Published
- Long Description_lang
- id
- __index_level_0__

## Conclusion

The exploratory data analysis indicates that the dataset is well-structured, diverse, and suitable for building an AI-powered resume and job matching system. Only minor preprocessing is required before generating embeddings and developing the recommendation engine.