const QUIZ_DB = [
    {
      "id": "L7-Q1",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Why sklearn Pipeline instead of fitting encoder separately?",
      "options": {
        "A": "Faster",
        "B": "Prevents data leakage — encoder fits only on train",
        "C": "Smaller file",
        "D": "More accurate"
      },
      "correct": "B",
      "explainCorrect": "Without pipeline: encoder sees test data. Pipeline: fit only on train.",
      "explainOptions": {
        "A": "Pipeline isn't primarily about speed; the main benefit is preventing leakage by fitting the encoder only on train.",
        "B": "Without pipeline: encoder sees test data. Pipeline: fit only on train.",
        "C": "File size isn't the reason; the reason is ensuring preprocessor fits only on training data to avoid leakage.",
        "D": "Accuracy can improve indirectly by avoiding leakage; the direct reason for Pipeline is preventing encoder from seeing test data."
      }
    },
    {
      "id": "L7-Q2",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Saving Pipeline vs encoder+model separately:",
      "options": {
        "A": "Same",
        "B": "Pipeline = one file, preprocessor+model together",
        "C": "Separate is better",
        "D": "Pipeline is slower"
      },
      "correct": "B",
      "explainCorrect": "One .pkl has everything. pipeline.predict(raw_data) works.",
      "explainOptions": {
        "A": "Saving pipeline vs separately is not the same; one .pkl bundles preprocessor and model so predict(raw_data) works.",
        "B": "One .pkl has everything. pipeline.predict(raw_data) works.",
        "C": "Separate files require you to run preprocessor and model in sync; pipeline in one file is simpler for deployment.",
        "D": "Pipeline isn't slower; it's one object to load and call, and ensures consistent preprocessing."
      }
    },
    {
      "id": "L7-Q3",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Why clone(preprocessor) for each pipeline?",
      "options": {
        "A": "Speed",
        "B": "Each pipeline gets independent copy — no shared fitted state",
        "C": "Memory",
        "D": "Accuracy"
      },
      "correct": "B",
      "explainCorrect": "clone() copies constructor args, NOT fitted state. Order doesn't matter.",
      "explainOptions": {
        "A": "clone() isn't for speed; it gives each pipeline an independent copy so fitted state isn't shared.",
        "B": "clone() copies constructor args, NOT fitted state. Order doesn't matter.",
        "C": "Memory isn't the main point; the point is independent copies so one pipeline's fit doesn't affect another.",
        "D": "Accuracy isn't what clone() addresses; it's about avoiding shared mutable state between pipelines."
      }
    },
    {
      "id": "L7-Q4",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Soft voting ensemble:",
      "options": {
        "A": "Majority class",
        "B": "Average of predicted probabilities",
        "C": "Max probability",
        "D": "First model"
      },
      "correct": "B",
      "explainCorrect": "Avg of predict_proba, then threshold (e.g. 0.5).",
      "explainOptions": {
        "A": "Majority class is hard voting; soft voting uses the average of predicted probabilities, then a threshold.",
        "B": "Avg of predict_proba, then threshold (e.g. 0.5).",
        "C": "Taking max probability across models isn't soft voting; soft voting averages the probabilities.",
        "D": "Using only the first model isn't voting; soft voting combines all models' probabilities (e.g. average)."
      }
    },
    {
      "id": "L7-Q5",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Why FastAPI + Render instead of loading .pkl in Streamlit?",
      "options": {
        "A": "Cheaper",
        "B": "Model loads once; scale API/UI separately; centralized logging; same API for web/mobile/batch",
        "C": "Simpler",
        "D": "Faster locally"
      },
      "correct": "B",
      "explainCorrect": "Separation of concerns. Loose coupling.",
      "explainOptions": {
        "A": "Cost isn't the main driver; the benefit is model loads once, scale API/UI separately, same API for web/mobile/batch.",
        "B": "Separation of concerns. Loose coupling.",
        "C": "Architecture can be more components but cleaner; the gain is separation of concerns and scaling flexibility.",
        "D": "Locally loading .pkl in Streamlit can be simpler; FastAPI+Render is about production: one model load, scale, logging."
      }
    },
    {
      "id": "L7-Q6",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Pydantic Field(ge=0.01, le=50000) does:",
      "options": {
        "A": "Scales values",
        "B": "Input validation — reject out-of-range before model",
        "C": "Encodes categories",
        "D": "Logs requests"
      },
      "correct": "B",
      "explainCorrect": "Validation: ge=min, le=max. Clear errors for invalid input.",
      "explainOptions": {
        "A": "Field(ge=, le=) doesn't scale values; it validates that the value is within range and rejects otherwise.",
        "B": "Validation: ge=min, le=max. Clear errors for invalid input.",
        "C": "Encoding categories is separate (e.g. OrdinalEncoder); Pydantic Field(ge=, le=) is numeric range validation.",
        "D": "Logging is separate; Field(ge=, le=) validates input and returns clear errors when out of range."
      }
    },
    {
      "id": "L7-Q7",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Procfile contains:",
      "options": {
        "A": "Python version",
        "B": "Start command: web: uvicorn main:app --host 0.0.0.0 --port $PORT",
        "C": "Dependencies",
        "D": "Model path"
      },
      "correct": "B",
      "explainCorrect": "Tells Render how to start the app.",
      "explainOptions": {
        "A": "Python version is usually in .python-version or runtime.txt; Procfile specifies the start command.",
        "B": "Tells Render how to start the app.",
        "C": "Dependencies are in requirements.txt; Procfile contains the command to run the web process.",
        "D": "Model path is in code or env; Procfile defines the start command (e.g. uvicorn main:app)."
      }
    },
    {
      "id": "L7-Q8",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": ".python-version with 3.11.7:",
      "options": {
        "A": "Speeds up",
        "B": "Avoids Python 3.13 compatibility issues (pandas etc)",
        "C": "Required for Render",
        "D": "Enables async"
      },
      "correct": "B",
      "explainCorrect": "Render might use 3.13 otherwise; 3.11.7 is stable.",
      "explainOptions": {
        "A": "Pinning 3.11.7 isn't mainly for speed; it's to avoid newer Python (e.g. 3.13) compatibility issues.",
        "B": "Render might use 3.13 otherwise; 3.11.7 is stable.",
        "C": "Render supports multiple versions; .python-version pins the version you want (e.g. to avoid 3.13 issues).",
        "D": "Async is supported in several Python versions; .python-version is about avoiding compatibility problems, not enabling async."
      }
    },
    {
      "id": "L7-Q9",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Render free tier cold start:",
      "options": {
        "A": "Never happens",
        "B": "First request after 15 min inactivity takes 30-60s to wake",
        "C": "Only affects paid",
        "D": "Only at deploy"
      },
      "correct": "B",
      "explainCorrect": "Services sleep after 15 min. First request wakes server.",
      "explainOptions": {
        "A": "Cold start does happen on free tier: after ~15 min idle the service sleeps and the first request is slow (30–60s).",
        "B": "Services sleep after 15 min. First request wakes server.",
        "C": "Cold start affects free tier (services sleep); paid tiers often keep instances always on.",
        "D": "Cold start happens after inactivity, not only at deploy; first request after sleep triggers the delay."
      }
    },
    {
      "id": "L7-Q10",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "To analyze misclassifications later:",
      "options": {
        "A": "Don't log",
        "B": "Log every prediction (input, output, timestamp) to JSONL",
        "C": "Log only errors",
        "D": "Log only drift"
      },
      "correct": "B",
      "explainCorrect": "JSONL: one JSON per line. Join with ground truth later.",
      "explainOptions": {
        "A": "Not logging prevents analyzing misclassifications later; you need to log predictions to join with ground truth.",
        "B": "JSONL: one JSON per line. Join with ground truth later.",
        "C": "Logging only errors misses correct predictions; to analyze misclassifications you need input, output, timestamp for all.",
        "D": "Drift logging is separate; for misclassification analysis log every prediction (input, output, timestamp) to JSONL."
      }
    },
    {
      "id": "L7-Q11",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Bulk scoring (50 transactions):",
      "options": {
        "A": "Click 50 times in Streamlit",
        "B": "Call API in a loop from Python script",
        "C": "Not possible",
        "D": "Use Excel"
      },
      "correct": "B",
      "explainCorrect": "requests.post in loop. Export to CSV. Same API.",
      "explainOptions": {
        "A": "Clicking 50 times in Streamlit is manual; bulk scoring is done by calling the API in a loop from a script.",
        "B": "requests.post in loop. Export to CSV. Same API.",
        "C": "Bulk scoring is possible: call the same API in a loop (e.g. requests.post), then export results to CSV.",
        "D": "Excel could hold data, but scoring is done by calling the API (e.g. Python loop); Excel doesn't replace the API."
      }
    },
    {
      "id": "L7-Q12",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Streamlit app makes predictions by:",
      "options": {
        "A": "Loading .pkl locally",
        "B": "Calling FastAPI (HTTP POST)",
        "C": "Using sklearn directly",
        "D": "Batch only"
      },
      "correct": "B",
      "explainCorrect": "Streamlit = UI. Sends POST to Render API. Loose coupling.",
      "explainOptions": {
        "A": "In the FastAPI+Streamlit setup, the app doesn't load .pkl locally; it calls the FastAPI backend via HTTP POST.",
        "B": "Streamlit = UI. Sends POST to Render API. Loose coupling.",
        "C": "Streamlit doesn't use sklearn directly for prediction; it sends requests to the FastAPI service.",
        "D": "Streamlit can do single or batch; in either case predictions are made by calling the FastAPI API (POST), not batch-only."
      }
    },
    {
      "id": "L7-Q13",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Drift detection warns about:",
      "options": {
        "A": "Model accuracy",
        "B": "Input values >3 std from training mean",
        "C": "API latency",
        "D": "Log size"
      },
      "correct": "B",
      "explainCorrect": "Compares incoming features to training stats. Flags anomalies.",
      "explainOptions": {
        "A": "Drift detection is about input/feature distribution vs training, not model accuracy (which needs labels).",
        "B": "Compares incoming features to training stats. Flags anomalies.",
        "C": "API latency is operational; drift detection warns when input values are far from training (e.g. >3 std from mean).",
        "D": "Log size isn't what drift detection warns about; it flags when feature values deviate from training distribution."
      }
    },
    {
      "id": "L7-Q14",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "feature_stats.json is used for?",
      "options": {
        "A": "Model weights",
        "B": "Drift detection — compare inputs to training mean/std",
        "C": "API docs",
        "D": "Logging only"
      },
      "correct": "B",
      "explainCorrect": "Stores training distribution (mean, std). API checks if input >3 std from mean.",
      "explainOptions": {
        "A": "Model weights are in the model file; feature_stats.json holds training stats (mean, std) for drift checks.",
        "B": "Stores training distribution (mean, std). API checks if input >3 std from mean.",
        "C": "API docs are separate (e.g. OpenAPI); feature_stats.json is for comparing inputs to training mean/std.",
        "D": "It's used for drift detection (compare inputs to training stats), not only for logging."
      }
    },
    {
      "id": "L7-Q15",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "Render free tier: when service sleeps, logs (predictions.jsonl)?",
      "options": {
        "A": "Persist",
        "B": "Reset to empty (ephemeral)",
        "C": "Backed up",
        "D": "In DB"
      },
      "correct": "B",
      "explainCorrect": "Ephemeral storage: when service sleeps, local files deleted. No persistent logging on free tier.",
      "explainOptions": {
        "A": "On free tier, local files don't persist; when the service sleeps, storage is reset (ephemeral).",
        "B": "Ephemeral storage: when service sleeps, local files deleted. No persistent logging on free tier.",
        "C": "Predictions.jsonl isn't backed up on free tier; when the service sleeps, local files are lost.",
        "D": "Logs are in local files by default, not in a DB; on free tier that storage is ephemeral (reset when service sleeps)."
      }
    },
    {
      "id": "L7-Q16",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "A deployed API starts returning many validation errors after a mobile app update. What is the most likely first root-cause check?",
      "options": {
        "A": "Retrain the model immediately with more data",
        "B": "Check request payload/schema compatibility between client and API (Pydantic contract)",
        "C": "Increase dropout and redeploy",
        "D": "Disable validation to restore throughput"
      },
      "correct": "B",
      "explainCorrect": "Sudden validation failures after client changes usually indicate contract mismatch (field names/types/ranges) rather than model quality drift.",
      "explainOptions": {
        "A": "Training data volume does not directly fix schema/contract mismatches.",
        "B": "Sudden validation failures after client changes usually indicate contract mismatch (field names/types/ranges) rather than model quality drift.",
        "C": "Dropout is a training-time model regularizer, unrelated to request validation failures.",
        "D": "Disabling validation hides data-quality issues and can corrupt downstream predictions."
      }
    },
    {
      "id": "L7-Q17",
      "chapter": "l7",
      "chapterTitle": "Lecture 7 — Model Deployment",
      "text": "A team serves a model directly inside UI code and duplicates preprocessing logic in two places. Main architecture risk?",
      "options": {
        "A": "Higher GPU utilization only",
        "B": "Training-serving skew and inconsistent predictions across clients",
        "C": "The model cannot be versioned",
        "D": "REST APIs stop working with preprocessing"
      },
      "correct": "B",
      "explainCorrect": "Duplicated preprocessing creates divergence risk; a centralized API/pipeline keeps transformation logic consistent and auditable.",
      "explainOptions": {
        "A": "Resource utilization is not the core architectural failure here.",
        "B": "Duplicated preprocessing creates divergence risk; a centralized API/pipeline keeps transformation logic consistent and auditable.",
        "C": "Versioning is still possible, though consistency and skew are the bigger immediate risks.",
        "D": "REST APIs can serve preprocessed predictions; the issue is consistency, not API capability."
      }
    }
];