const QUIZ_DB = [
    {
      "id": "L3-Q13",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "Under-predict delivery (say 5 days, takes 8):",
      "options": {
        "A": "Customer pleasantly surprised",
        "B": "Customer angry, bad review — under-prediction costlier",
        "C": "No impact",
        "D": "Model is unbiased"
      },
      "correct": "B",
      "explainCorrect": "Under-predict (late) costs more than over-predict (early).",
      "explainOptions": {
        "A": "Pleasantly surprised is when you over-predict (say 8 days, delivers in 5); under-predicting (5 vs 8) means late delivery and angry customer.",
        "B": "Under-predict (late) costs more than over-predict (early).",
        "C": "Under-prediction has impact: delivery is late, so customer experience and reviews suffer.",
        "D": "Under-prediction is a bias (systematically late); the point is that this asymmetry makes under-prediction costlier."
      }
    },
    {
      "id": "L3-Q14",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "ROC-AUC = 0.5 means:",
      "options": {
        "A": "Perfect classifier",
        "B": "Random guessing",
        "C": "Worst possible",
        "D": "Good model"
      },
      "correct": "B",
      "explainCorrect": "AUC 0.5 = diagonal = random. 0.8-0.9 good, >0.9 excellent or leakage.",
      "explainOptions": {
        "A": "Perfect classifier would have AUC 1; AUC 0.5 is the diagonal (no discrimination).",
        "B": "AUC 0.5 = diagonal = random. 0.8-0.9 good, >0.9 excellent or leakage.",
        "C": "Worst would be below 0.5 (inverted); 0.5 is exactly random, not worst.",
        "D": "0.5 is not good; it means the model does no better than random guessing."
      }
    },
    {
      "id": "L3-Q15",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "When temporal drift exists, advanced models (RF, stacking):",
      "options": {
        "A": "Always help",
        "B": "Often don't help — root cause is drift, not model",
        "C": "Replace need for time split",
        "D": "Fix drift automatically"
      },
      "correct": "B",
      "explainCorrect": "Olist: all models ~0.43-0.48 AUC. Using last 3 months → 0.73. Drift was root cause.",
      "explainOptions": {
        "A": "Advanced models don't always help when the issue is data drift; Olist showed similar AUC across models until recency was fixed.",
        "B": "Olist: all models ~0.43-0.48 AUC. Using last 3 months → 0.73. Drift was root cause.",
        "C": "Time split is still needed; fancier models don't replace using recent data when there's temporal drift.",
        "D": "Models don't fix drift automatically; you have to address it (e.g. train on recent window)."
      }
    },
    {
      "id": "L3-Q16",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "A model has training AUC 0.93 and test AUC 0.62. Which diagnosis is most plausible?",
      "options": {
        "A": "Strong underfitting; add regularization",
        "B": "Likely overfitting; simplify model or improve validation strategy",
        "C": "Perfect calibration; keep unchanged",
        "D": "No issue because training AUC is high"
      },
      "correct": "B",
      "explainCorrect": "Large train-test gap with high train performance and weak test performance indicates overfitting or leakage/validation issues.",
      "explainOptions": {
        "A": "Underfitting usually shows weak performance on both train and test, not high train + low test.",
        "B": "Large train-test gap with high train performance and weak test performance indicates overfitting or leakage/validation issues.",
        "C": "Calibration is different from discrimination; this pattern does not imply good calibration.",
        "D": "High training AUC alone is not sufficient; generalization is judged on validation/test."
      }
    },
    {
      "id": "L3-Q17",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "A coefficient has p-value 0.004 in a large sample. Which interpretation is statistically correct?",
      "options": {
        "A": "There is a 99.6% probability the alternative hypothesis is true",
        "B": "If the true effect were zero, observing an effect this extreme is very unlikely",
        "C": "The model has 99.6% predictive accuracy",
        "D": "The variable has a large practical effect size"
      },
      "correct": "B",
      "explainCorrect": "A p-value quantifies data extremeness under the null, not the probability the hypothesis is true or the practical magnitude.",
      "explainOptions": {
        "A": "p-values are not posterior probabilities of hypotheses.",
        "B": "A p-value quantifies data extremeness under the null, not the probability the hypothesis is true or the practical magnitude.",
        "C": "Predictive accuracy is unrelated to coefficient p-value.",
        "D": "Statistical significance does not guarantee large practical significance."
      }
    },
    {
      "id": "L3-Q18",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "A delivery model has RMSE = 5.2 days. Which practical interpretation is most accurate?",
      "options": {
        "A": "Predictions are always wrong by exactly 5.2 days",
        "B": "Typical error magnitude is around 5 days, with larger errors penalized more heavily",
        "C": "Model is useless because RMSE is non-zero",
        "D": "At least 95% of predictions are within 5.2 days"
      },
      "correct": "B",
      "explainCorrect": "RMSE reflects average squared-error magnitude, so larger misses are weighted more; it indicates a typical scale of error, not a hard bound.",
      "explainOptions": {
        "A": "RMSE is an average metric, not a constant error per prediction.",
        "B": "RMSE reflects average squared-error magnitude, so larger misses are weighted more; it indicates a typical scale of error, not a hard bound.",
        "C": "Non-zero RMSE is normal in real prediction tasks.",
        "D": "RMSE does not directly imply a percentile coverage guarantee."
      }
    },
    {
      "id": "L3-Q19",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "You add 4 weak predictors and R² rises slightly, but adjusted R² falls. Best conclusion?",
      "options": {
        "A": "Model definitely improved because R² increased",
        "B": "New variables likely add noise; complexity increase is not justified",
        "C": "Adjusted R² is invalid when sample size is large",
        "D": "This proves multicollinearity is solved"
      },
      "correct": "B",
      "explainCorrect": "Adjusted R² penalizes unnecessary complexity; a drop suggests added predictors are not contributing enough explanatory value.",
      "explainOptions": {
        "A": "R² alone always rises (or stays) as predictors are added, even if they are weak.",
        "B": "Adjusted R² penalizes unnecessary complexity; a drop suggests added predictors are not contributing enough explanatory value.",
        "C": "Adjusted R² remains valid and useful for model comparison.",
        "D": "This pattern does not imply multicollinearity is resolved."
      }
    },
    {
      "id": "L3-Q20",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "A binary classifier has high ROC-AUC but very low precision at the chosen threshold. Most direct fix?",
      "options": {
        "A": "Discard the model; AUC must be low",
        "B": "Tune decision threshold based on business trade-offs",
        "C": "Only increase training epochs",
        "D": "Convert the task to regression"
      },
      "correct": "B",
      "explainCorrect": "AUC evaluates ranking quality over thresholds; low precision at one threshold often calls for threshold calibration to align with costs.",
      "explainOptions": {
        "A": "High AUC can coexist with poor precision at a suboptimal cutoff.",
        "B": "AUC evaluates ranking quality over thresholds; low precision at one threshold often calls for threshold calibration to align with costs.",
        "C": "More epochs do not directly address threshold mismatch.",
        "D": "Task type should follow business objective, not threshold tuning issues."
      }
    },
    {
      "id": "L3-Q21",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "For churn prediction where contacting a non-churn customer is cheap but missing a true churn is costly, which metric should get higher priority?",
      "options": {
        "A": "Overall accuracy",
        "B": "Recall for churn class",
        "C": "R²",
        "D": "MAE"
      },
      "correct": "B",
      "explainCorrect": "When false negatives are costly, prioritize recall for the positive/churn class to capture more true churners.",
      "explainOptions": {
        "A": "Accuracy can hide poor minority-class capture in imbalanced tasks.",
        "B": "When false negatives are costly, prioritize recall for the positive/churn class to capture more true churners.",
        "C": "R² is a regression metric, not for binary churn classification.",
        "D": "MAE is a regression error metric."
      }
    },
    {
      "id": "L3-Q22",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "A predictor has VIF = 12 but the team only cares about prediction, not coefficient interpretation. Best stance?",
      "options": {
        "A": "Immediately drop the variable in all cases",
        "B": "High VIF mainly harms interpretability; predictive performance may still be acceptable",
        "C": "VIF above 10 guarantees bad test accuracy",
        "D": "VIF is only relevant for tree models"
      },
      "correct": "B",
      "explainCorrect": "Severe multicollinearity destabilizes coefficient interpretation more than pure predictive use-cases.",
      "explainOptions": {
        "A": "Dropping may help but is not always mandatory if prediction remains strong.",
        "B": "Severe multicollinearity destabilizes coefficient interpretation more than pure predictive use-cases.",
        "C": "High VIF does not automatically imply poor out-of-sample accuracy.",
        "D": "VIF is a linear-model collinearity diagnostic, not a tree-model concept."
      }
    },
    {
      "id": "L3-Q23",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "A model predicts delivery is late with probability 0.72. At threshold 0.50, what class is predicted?",
      "options": {
        "A": "Not late",
        "B": "Late",
        "C": "Cannot decide without AUC",
        "D": "Depends on RMSE"
      },
      "correct": "B",
      "explainCorrect": "With a 0.50 decision threshold, any predicted probability above 0.50 maps to the positive class.",
      "explainOptions": {
        "A": "0.72 exceeds the 0.50 cutoff, so negative class is not selected.",
        "B": "With a 0.50 decision threshold, any predicted probability above 0.50 maps to the positive class.",
        "C": "AUC assesses ranking over thresholds, not single-threshold label assignment.",
        "D": "RMSE is a regression metric, unrelated to binary threshold labeling."
      }
    },
    {
      "id": "L3-Q24",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "You evaluate a time-dependent dataset using random split and get unexpectedly high performance. Most likely issue?",
      "options": {
        "A": "Label smoothing",
        "B": "Temporal leakage from future observations into training",
        "C": "Insufficient regularization only",
        "D": "Class labels are missing"
      },
      "correct": "B",
      "explainCorrect": "Random split in temporal data can leak future patterns into training, inflating reported metrics.",
      "explainOptions": {
        "A": "Label smoothing is a training technique, not the key risk in random-split temporal leakage.",
        "B": "Random split in temporal data can leak future patterns into training, inflating reported metrics.",
        "C": "Regularization may matter, but leakage is the main reason for unrealistically high scores here.",
        "D": "Missing labels would prevent supervised evaluation, not inflate it this way."
      }
    }
];