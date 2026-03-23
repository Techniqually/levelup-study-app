const QUIZ_DB = [
    {
      "id": "L4-Q1",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Decision tree learns:",
      "options": {
        "A": "Linear combinations",
        "B": "If-then rules from data",
        "C": "Neural weights",
        "D": "Principal components"
      },
      "correct": "B",
      "explainCorrect": "Series of if-then rules. E.g. if days_since_last_order > 60 and total_orders",
      "explainOptions": {
        "A": "Linear combinations are what linear/logistic regression learns; trees learn axis-aligned if-then rules.",
        "B": "Series of if-then rules. E.g. if days_since_last_order > 60 and total_orders",
        "C": "Neural weights are from neural networks; decision trees split on features with thresholds (rules).",
        "D": "Principal components are from PCA; trees don't use PCs, they use raw features in splits."
      }
    },
    {
      "id": "L4-Q2",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Splitting criterion uses:",
      "options": {
        "A": "MSE only",
        "B": "Information Gain or Gini",
        "C": "R²",
        "D": "AUC"
      },
      "correct": "B",
      "explainCorrect": "Information Gain = entropy(parent) - avg entropy(children). Or Gini (sklearn default).",
      "explainOptions": {
        "A": "MSE is used for regression trees; for classification trees the split criterion is Information Gain or Gini.",
        "B": "Information Gain = entropy(parent) - avg entropy(children). Or Gini (sklearn default).",
        "C": "R² is for regression fit; tree splits for classification use impurity (Gini or entropy).",
        "D": "AUC is an evaluation metric; the splitting criterion when growing a tree is Gini or Information Gain."
      }
    },
    {
      "id": "L4-Q3",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Gini = 0 means:",
      "options": {
        "A": "Max impurity (50/50)",
        "B": "Pure node (all same class)",
        "C": "No split possible",
        "D": "Perfect accuracy"
      },
      "correct": "B",
      "explainCorrect": "Gini = 0 → pure. Gini = 0.5 → max impurity.",
      "explainOptions": {
        "A": "Max impurity (50/50) is Gini = 0.5, not 0; Gini = 0 means the node is pure.",
        "B": "Gini = 0 → pure. Gini = 0.5 → max impurity.",
        "C": "No split possible is a consequence of purity, not the definition of Gini = 0; Gini = 0 means all same class.",
        "D": "Perfect accuracy is a model-level metric; Gini = 0 at a node means that node has only one class (pure)."
      }
    },
    {
      "id": "L4-Q4",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Random Forest: each split considers:",
      "options": {
        "A": "All features",
        "B": "Random subset of features (e.g. sqrt(p))",
        "C": "Only target",
        "D": "No features"
      },
      "correct": "B",
      "explainCorrect": "RF uses random feature subset per split. sqrt(p) for classification, p/3 for regression.",
      "explainOptions": {
        "A": "A single tree might use all features over its splits, but each split in RF considers only a random subset (e.g. sqrt(p)).",
        "B": "RF uses random feature subset per split. sqrt(p) for classification, p/3 for regression.",
        "C": "Target is not a feature; each split considers a random subset of input features, not the target.",
        "D": "RF does use features; at each split it draws a random subset of features (e.g. sqrt(p)) to choose from."
      }
    },
    {
      "id": "L4-Q5",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Bootstrap in RF: ~what fraction of data is OOB (out-of-bag)?",
      "options": {
        "A": "0%",
        "B": "37%",
        "C": "63%",
        "D": "100%"
      },
      "correct": "B",
      "explainCorrect": "(1-1/N)^N → 1/e ≈ 37% never selected.",
      "explainOptions": {
        "A": "0% OOB would mean every sample is in every bootstrap sample; in reality ~37% are left out (OOB).",
        "B": "(1-1/N)^N → 1/e ≈ 37% never selected.",
        "C": "63% is the fraction that appears in each bootstrap sample on average; OOB is the complement, ~37%.",
        "D": "100% OOB would mean no sample is ever used; actually ~63% are used per bag, so ~37% are OOB."
      }
    },
    {
      "id": "L4-Q6",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "OOB estimate is:",
      "options": {
        "A": "Biased",
        "B": "Unbiased — each sample predicted by trees that didn't see it",
        "C": "Same as train accuracy",
        "D": "Not used"
      },
      "correct": "B",
      "explainCorrect": "OOB = out-of-bag. Unbiased internal validation.",
      "explainOptions": {
        "A": "OOB is unbiased because each sample is predicted only by trees that didn't see it in the bootstrap sample.",
        "B": "OOB = out-of-bag. Unbiased internal validation.",
        "C": "Train accuracy is optimistic; OOB is an internal validation estimate and is not the same as train accuracy.",
        "D": "OOB is used in RF as an internal validation estimate without needing a separate holdout."
      }
    },
    {
      "id": "L4-Q7",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Class imbalance (97% no churn, 3% churn): naive 'predict no churn' gives:",
      "options": {
        "A": "3% accuracy",
        "B": "50% accuracy",
        "C": "97% accuracy but F1=0",
        "D": "100% accuracy"
      },
      "correct": "C",
      "explainCorrect": "Accuracy misleading. F1=0. Use class_weight, SMOTE, or threshold tuning.",
      "explainOptions": {
        "A": "Predicting all majority (no churn) gives ~97% accuracy when 97% don't churn, not 3%.",
        "B": "50% would be random guessing; naive 'predict no churn' gives high accuracy because the majority is no churn.",
        "C": "Accuracy misleading. F1=0. Use class_weight, SMOTE, or threshold tuning.",
        "D": "100% would mean every prediction correct; naive predictor gets ~97% accuracy but 0 positives, so F1=0."
      }
    },
    {
      "id": "L4-Q8",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Target leakage example:",
      "options": {
        "A": "Using delivery_date to predict is_late",
        "B": "Using age to predict churn",
        "C": "Using price to predict sales",
        "D": "Using category"
      },
      "correct": "A",
      "explainCorrect": "delivery_date contains the answer! Target leakage = info from outside training.",
      "explainOptions": {
        "A": "delivery_date contains the answer! Target leakage = info from outside training.",
        "B": "Age is a legitimate feature for churn; it's available at prediction time and doesn't encode the target.",
        "C": "Price to predict sales is a valid input; leakage would be using something that directly reveals the target.",
        "D": "Category is a normal feature; leakage is when a feature implicitly contains the target (e.g. delivery_date for is_late)."
      }
    },
    {
      "id": "L4-Q9",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Normalize before or after train_test_split?",
      "options": {
        "A": "Before",
        "B": "After — fit scaler on train only, transform both",
        "C": "Either",
        "D": "Never normalize"
      },
      "correct": "B",
      "explainCorrect": "Way 2 correct: split first, fit scaler on train, transform train and test. Prevents leakage.",
      "explainOptions": {
        "A": "Normalizing before split lets test data influence the scaler (e.g. mean/std); that's leakage. Split first, then fit scaler on train.",
        "B": "Way 2 correct: split first, fit scaler on train, transform train and test. Prevents leakage.",
        "C": "Order matters: normalizing after split (fit on train, transform both) is correct; before split leaks test info.",
        "D": "Normalizing is often needed for models like logistic regression; the rule is do it after split, on train only for fit."
      }
    },
    {
      "id": "L4-Q10",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Feature Store provides:",
      "options": {
        "A": "Model training only",
        "B": "Point-in-time correctness via event_time (as-of joins)",
        "C": "Real-time only",
        "D": "No versioning"
      },
      "correct": "B",
      "explainCorrect": "event_time prevents leakage — only features available at observation time.",
      "explainOptions": {
        "A": "Feature store supports training and serving; its key for correctness is point-in-time (event_time), not 'training only'.",
        "B": "event_time prevents leakage — only features available at observation time.",
        "C": "Feature store can serve batch and real-time; the defining capability for leakage prevention is point-in-time (as-of) joins.",
        "D": "Feature stores typically do versioning; the answer is about point-in-time correctness via event_time."
      }
    },
    {
      "id": "L4-Q11",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Model Registry is for:",
      "options": {
        "A": "Storing raw data",
        "B": "Versioning and managing ML models with metadata",
        "C": "Feature computation",
        "D": "API deployment"
      },
      "correct": "B",
      "explainCorrect": "Model Registry: which model in prod, hyperparams, rollback, feature expectations.",
      "explainOptions": {
        "A": "Raw data is stored in data lakes/warehouses; Model Registry stores model artifacts and metadata, not raw data.",
        "B": "Model Registry: which model in prod, hyperparams, rollback, feature expectations.",
        "C": "Feature computation is the job of feature store or pipelines; Model Registry is for model versioning and deployment metadata.",
        "D": "API deployment uses the model; Model Registry is where you version and select which model to deploy (metadata, rollback)."
      }
    },
    {
      "id": "L4-Q12",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Pipeline prevents leakage by:",
      "options": {
        "A": "Using more data",
        "B": "Ensuring fit() only sees training data",
        "C": "Dropping features",
        "D": "Using regularization"
      },
      "correct": "B",
      "explainCorrect": "Pipeline bundles preprocessor + model; fit() only on X_train.",
      "explainOptions": {
        "A": "Using more data doesn't by itself prevent leakage; the pipeline prevents it by ensuring fit() sees only training data.",
        "B": "Pipeline bundles preprocessor + model; fit() only on X_train.",
        "C": "Dropping features can reduce leakage if you drop leaky ones, but the pipeline's role is to restrict fit() to train data.",
        "D": "Regularization reduces overfitting; leakage prevention is about ensuring preprocessor and model are fit only on train."
      }
    },
    {
      "id": "L4-Q13",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Single deep decision tree tends to?",
      "options": {
        "A": "Underfit",
        "B": "Overfit",
        "C": "Be optimal",
        "D": "Need more data"
      },
      "correct": "B",
      "explainCorrect": "Single deep tree overfits. RF: many trees, average → reduce variance.",
      "explainOptions": {
        "A": "Underfitting is from too simple a model; a single deep tree is complex and tends to overfit, not underfit.",
        "B": "Single deep tree overfits. RF: many trees, average → reduce variance.",
        "C": "A single deep tree is rarely optimal; it memorizes training data and typically overfits.",
        "D": "More data can help, but the direct answer is that a single deep tree tends to overfit; RF combats this by averaging."
      }
    },
    {
      "id": "L4-Q14",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Temporal leakage example?",
      "options": {
        "A": "Using age",
        "B": "Random split on time-series — future predicts past",
        "C": "Using category",
        "D": "Train/test split"
      },
      "correct": "B",
      "explainCorrect": "Temporal leakage: random split on time-series lets future data predict past.",
      "explainOptions": {
        "A": "Using age is a feature choice, not temporal leakage; leakage is when future information leaks into training.",
        "B": "Temporal leakage: random split on time-series lets future data predict past.",
        "C": "Using category is not temporal leakage; temporal leakage is mixing past and future (e.g. random split on time-series).",
        "D": "A proper train/test split on time-series (train=past, test=future) avoids leakage; the leak is random split that mixes times."
      }
    },
    {
      "id": "L4-Q15",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "Logistic vs RF: which needs feature scaling?",
      "options": {
        "A": "Both",
        "B": "Neither",
        "C": "Logistic only",
        "D": "RF only"
      },
      "correct": "C",
      "explainCorrect": "Logistic requires scaling. RF does not (tree splits are scale-invariant).",
      "explainOptions": {
        "A": "RF doesn't need scaling; only logistic (and other linear/iterative models) typically need feature scaling.",
        "B": "Logistic does need scaling; 'neither' is wrong because logistic regression is sensitive to feature scale.",
        "C": "Logistic requires scaling. RF does not (tree splits are scale-invariant).",
        "D": "RF is scale-invariant; it's logistic regression that needs scaling, not RF."
      }
    },
    {
      "id": "L4-Q16",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "A churn dataset has 96% non-churn and 4% churn. A classifier predicts all customers as non-churn. Which evaluation conclusion is best?",
      "options": {
        "A": "Model is strong because accuracy is about 96%",
        "B": "Model is weak for churn detection; recall/F1 for churn are near zero despite high accuracy",
        "C": "Model is unbiased because class distribution is respected",
        "D": "Model is acceptable if AUC is not reported"
      },
      "correct": "B",
      "explainCorrect": "In imbalanced data, accuracy can be misleading; minority-class metrics (recall, precision, F1, PR-AUC) are needed.",
      "explainOptions": {
        "A": "High accuracy from majority-class guessing does not mean useful minority-class detection.",
        "B": "In imbalanced data, accuracy can be misleading; minority-class metrics (recall, precision, F1, PR-AUC) are needed.",
        "C": "Predicting only the majority class is typically highly biased against the minority class.",
        "D": "Acceptability cannot be inferred from missing metrics; churn use-cases require minority-focused evaluation."
      }
    },
    {
      "id": "L4-Q17",
      "chapter": "l4",
      "chapterTitle": "Lecture 4 — Regression and Classification II",
      "text": "You normalize features before train/test split and see unusually strong test results. Most plausible concern?",
      "options": {
        "A": "No issue; normalization timing never affects leakage",
        "B": "Data leakage: test distribution information influenced scaling parameters",
        "C": "Underfitting due to low-variance features",
        "D": "Class imbalance introduced by scaling"
      },
      "correct": "B",
      "explainCorrect": "Scaling before split lets test-set statistics influence transformation, leaking future/unseen information into training.",
      "explainOptions": {
        "A": "Normalization timing matters; doing it before split can leak test information.",
        "B": "Scaling before split lets test-set statistics influence transformation, leaking future/unseen information into training.",
        "C": "Underfitting is not the primary issue implied by pre-split normalization.",
        "D": "Scaling does not create class imbalance; leakage is the main risk here."
      }
    }
];