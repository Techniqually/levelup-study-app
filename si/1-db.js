const QUIZ_DB = [  
    {
      "id": "L1-Q3",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "What are the six data quality dimensions?",
      "options": {
        "A": "Accuracy, Precision, Recall, F1, Completeness, Validity",
        "B": "Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy",
        "C": "Mean, Median, Mode, Variance, Skewness, Kurtosis",
        "D": "Train, Test, Validation, Drift, Leakage, Bias"
      },
      "correct": "B",
      "explainCorrect": "Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy.",
      "explainOptions": {
        "A": "Accuracy, Precision, Recall, and F1 are model/evaluation metrics, not the six data quality dimensions (which are about the data itself).",
        "B": "Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy.",
        "C": "Mean, median, mode, variance, skewness, kurtosis are summary statistics for describing distributions, not data quality dimensions.",
        "D": "Train/test/validation and drift/leakage/bias refer to ML workflow and model issues, not the six dimensions of data quality."
      }
    },
    {
      "id": "L1-Q4",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "For statistical inference with 15% missing data, what imputation is recommended?",
      "options": {
        "A": "Simple imputation (mean/median)",
        "B": "Multiple Imputation (MI)",
        "C": "Drop all rows with missing",
        "D": "Forward fill"
      },
      "correct": "B",
      "explainCorrect": "For 5–20% missing in statistical inference, use Multiple Imputation. Simple imputation underestimates SEs.",
      "explainOptions": {
        "A": "Simple imputation (mean/median) is fine for ML with low missing, but for statistical inference with 5–20% missing it underestimates standard errors; MI is recommended.",
        "B": "For 5–20% missing in statistical inference, use Multiple Imputation. Simple imputation underestimates SEs.",
        "C": "Dropping all rows with missing loses data and can bias inference; with 15% missing, Multiple Imputation is the recommended approach.",
        "D": "Forward fill is a time-series imputation method; for general statistical inference with 15% missing, Multiple Imputation is the right tool."
      }
    },  
    {
      "id": "L1-Q7",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "For ML with &lt;5% missing (e.g., churn prediction), what is acceptable?",
      "options": {
        "A": "Multiple Imputation only",
        "B": "Simple imputation (e.g., median)",
        "C": "Drop all missing rows",
        "D": "Leave as NaN"
      },
      "correct": "B",
      "explainCorrect": "For ML/exploratory with &lt;5% missing, simple imputation OK.",
      "explainOptions": {
        "A": "Multiple Imputation is recommended for statistical inference with 5–20% missing; for ML with &lt;5% missing, simple imputation is acceptable and simpler.",
        "B": "For ML/exploratory with &lt;5% missing, simple imputation OK.",
        "C": "Dropping all missing rows throws away data unnecessarily; with low missing, simple imputation is preferred.",
        "D": "Leaving as NaN usually breaks ML pipelines; with &lt;5% missing, imputing (e.g. median) is the acceptable approach."
      }
    },
    {
      "id": "L1-Q8",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "Applied Analytics = ?",
      "options": {
        "A": "Pure theoretical statistics",
        "B": "Turning data into decisions that drive business value",
        "C": "Software engineering only",
        "D": "Data visualization only"
      },
      "correct": "B",
      "explainCorrect": "Turning data into decisions that drive business value.",
      "explainOptions": {
        "A": "Pure theoretical statistics is the opposite of applied analytics; the course focuses on turning data into business decisions.",
        "B": "Turning data into decisions that drive business value.",
        "C": "Software engineering supports analytics but applied analytics is broader: data → decisions → value.",
        "D": "Visualization is one tool; applied analytics is the full pipeline from data to decisions that drive value."
      }
    },  
    {
      "id": "L1-Q10",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "If review_comment is 59% empty, correct approach for sentiment analysis?",
      "options": {
        "A": "Simple imputation",
        "B": "Label as \"Exploratory — based on 41% of reviews with comments\"",
        "C": "Drop all without comments",
        "D": "Multiple Imputation on text"
      },
      "correct": "B",
      "explainCorrect": "Cannot generalize; label as exploratory based on 41% with comments.",
      "explainOptions": {
        "A": "Simple imputation fills missing text; with 59% missing you cannot generalize to all reviews, so labeling as exploratory is required.",
        "B": "Cannot generalize; label as exploratory based on 41% with comments.",
        "C": "Dropping 59% loses most data and doesn't address the need to be transparent about coverage.",
        "D": "Multiple imputation on free text is not standard; the right approach is to label the analysis as exploratory given 41% coverage."
      }
    },    
    {
      "id": "L1-Q14",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "With >40% missing (e.g. 60% review_comment empty):",
      "options": {
        "A": "Simple imputation OK",
        "B": "Multiple Imputation",
        "C": "Exploratory only — cannot generalize",
        "D": "Drop all"
      },
      "correct": "C",
      "explainCorrect": "Very high missing: exploratory only. Cannot generalize to full population.",
      "explainOptions": {
        "A": "With >40% missing, simple imputation is not enough to claim generalizability; results must be labeled exploratory only.",
        "B": "Multiple imputation helps with moderate missing; with very high missing you still cannot generalize to the full population.",
        "C": "Very high missing: exploratory only. Cannot generalize to full population.",
        "D": "Dropping all would discard most data; the right framing is to treat the analysis as exploratory only."
      }
    },
    {
      "id": "L1-Q16",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "Which of the following are among the six data quality dimensions? (Select all that apply.)",
      "options": {
        "A": "Completeness",
        "B": "Uniqueness",
        "C": "Precision",
        "D": "Timeliness"
      },
      "correct": ["A", "B", "D"],
      "explainCorrect": "The six dimensions are Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy. Precision is an ML metric (TP/(TP+FP)), not a data quality dimension.",
      "explainOptions": {
        "A": "Completeness is one of the six data quality dimensions (data present where expected).",
        "B": "Uniqueness is one of the six (no inappropriate duplicates).",
        "C": "Precision here means the ML metric (TP/(TP+FP)), not a data quality dimension; the six are Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy.",
        "D": "Timeliness is one of the six (data current and available when needed)."
      }
    },
    {
      "id": "L1-Q17",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "A dataset has 12% missing values and your objective is hypothesis testing on treatment effect. Which approach best balances statistical validity and practical feasibility?",
      "options": {
        "A": "Mean imputation because it is quick and preserves sample size",
        "B": "Listwise deletion because any missing data invalidates inference",
        "C": "Multiple Imputation because 5–20% missing in inferential settings requires uncertainty-aware imputation",
        "D": "Forward fill because it keeps temporal continuity"
      },
      "correct": "C",
      "explainCorrect": "For inferential analysis with moderate missingness (5–20%), Multiple Imputation is preferred because it propagates uncertainty; simple imputation tends to underestimate variance.",
      "explainOptions": {
        "A": "Mean imputation is convenient but biased for inference because it understates uncertainty and can distort relationships.",
        "B": "Listwise deletion can introduce bias and unnecessary power loss; missingness does not automatically invalidate inference.",
        "C": "For inferential analysis with moderate missingness (5–20%), Multiple Imputation is preferred because it propagates uncertainty; simple imputation tends to underestimate variance.",
        "D": "Forward fill is a time-sequence heuristic, not a general inferential missing-data solution."
      }
    },
    {
      "id": "L1-Q18",
      "chapter": "l1",
      "chapterTitle": "Lecture 1 — Course Introduction",
      "text": "A teammate says: \"If AI generated most of my write-up but I edited wording, no citation is needed.\" What is the best policy interpretation?",
      "options": {
        "A": "Correct, because final wording is different",
        "B": "Correct, if AI output is under 50%",
        "C": "Incorrect; unacknowledged AI-assisted writing is treated like unattributed paraphrasing",
        "D": "Only code needs acknowledgement, not text"
      },
      "correct": "C",
      "explainCorrect": "Course policy treats unacknowledged AI-assisted content as academic dishonesty equivalent to unattributed lifting/paraphrasing.",
      "explainOptions": {
        "A": "Changing wording does not remove attribution requirements when substantive content came from AI.",
        "B": "There is no safe percentage threshold for unacknowledged AI use in assessed work.",
        "C": "Course policy treats unacknowledged AI-assisted content as academic dishonesty equivalent to unattributed lifting/paraphrasing.",
        "D": "Acknowledgement rules apply to written content as well, not only code."
      }
    }
];