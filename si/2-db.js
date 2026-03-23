const QUIZ_DB = [    
    {
      "id": "L2-Q1",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "GMV for Olist = ?",
      "options": {
        "A": "SUM(price) only",
        "B": "SUM(price+freight) for delivered orders",
        "C": "AOV * num_orders",
        "D": "COUNT(orders)"
      },
      "correct": "B",
      "explainCorrect": "GMV = SUM(price + freight) for status='delivered'. Tables: orders + order_items.",
      "explainOptions": {
        "A": "SUM(price) only undercounts GMV because freight is part of order value; GMV includes price + freight.",
        "B": "GMV = SUM(price + freight) for status='delivered'. Tables: orders + order_items.",
        "C": "AOV × num_orders gives GMV only if AOV is defined as GMV/orders; the definition of GMV itself is sum of price+freight for delivered orders.",
        "D": "COUNT(orders) is number of orders, not revenue; GMV is a monetary sum (price + freight for delivered)."
      }
    },
    {
      "id": "L2-Q2",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "AOV = ?",
      "options": {
        "A": "GMV / total_items",
        "B": "total_items / num_orders",
        "C": "GMV / num_orders (aggregate at order level first)",
        "D": "SUM(price)/COUNT(*)"
      },
      "correct": "C",
      "explainCorrect": "AOV = GMV / Number of Orders. Critical: aggregate at order level FIRST, then average.",
      "explainOptions": {
        "A": "GMV / total_items gives revenue per item, not per order; AOV is average per order, so denominator must be num_orders.",
        "B": "total_items / num_orders is items per order (basket size), not average order value in money.",
        "C": "AOV = GMV / Number of Orders. Critical: aggregate at order level FIRST, then average.",
        "D": "SUM(price)/COUNT(*) over rows can double-count if one order has multiple rows; AOV requires aggregating to order level first."
      }
    },
    {
      "id": "L2-Q4",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "SQL execution order (memory trick)?",
      "options": {
        "A": "SELECT first",
        "B": "FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
        "C": "WHERE before FROM",
        "D": "GROUP BY before WHERE"
      },
      "correct": "B",
      "explainCorrect": "FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. 'Frantic Warriors Gathered Here Seeking Order & Loot'.",
      "explainOptions": {
        "A": "SELECT is evaluated late (after WHERE, GROUP BY, HAVING); the logical order starts with FROM.",
        "B": "FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. 'Frantic Warriors Gathered Here Seeking Order & Loot'.",
        "C": "WHERE runs after FROM and JOIN; you cannot filter before the tables are identified.",
        "D": "GROUP BY runs after WHERE; filtering by aggregate (e.g. count) must use HAVING, not WHERE."
      }
    },
    {
      "id": "L2-Q5",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "SELECT state, COUNT(*) as cnt FROM orders WHERE cnt > 10 GROUP BY state — works?",
      "options": {
        "A": "Yes",
        "B": "No — use HAVING COUNT(*) > 10",
        "C": "Yes if you add ORDER BY",
        "D": "No — use WHERE COUNT(*)"
      },
      "correct": "B",
      "explainCorrect": "WHERE filters before grouping; cannot use aggregate in WHERE. Use HAVING COUNT(*) > 10.",
      "explainOptions": {
        "A": "The query fails: WHERE cannot reference the aggregate cnt; aggregates are applied after grouping.",
        "B": "WHERE filters before grouping; cannot use aggregate in WHERE. Use HAVING COUNT(*) > 10.",
        "C": "ORDER BY doesn't fix it; the error is using cnt (an aggregate) in WHERE; use HAVING instead.",
        "D": "WHERE COUNT(*) is invalid; aggregate conditions on grouped rows belong in HAVING, not WHERE."
      }
    },
    {
      "id": "L2-Q6",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "Index on order_status most useful when:",
      "options": {
        "A": "Most rows have same status",
        "B": "Table is very small",
        "C": "Small fraction of rows match filter",
        "D": "No WHERE clause"
      },
      "correct": "C",
      "explainCorrect": "Index gives O(log n) lookup when few rows match. Full scan O(n) when many match.",
      "explainOptions": {
        "A": "When most rows have the same status, a filter on status matches many rows; index helps less than a full scan in that case.",
        "B": "On very small tables the cost difference between index and full scan is negligible; index helps when the table is large.",
        "C": "Index gives O(log n) lookup when few rows match. Full scan O(n) when many match.",
        "D": "With no WHERE clause there is no filter to use an index for; the whole table is scanned."
      }
    },
    {
      "id": "L2-Q7",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "Second SQL run much faster on same large table. Reason?",
      "options": {
        "A": "DB added index",
        "B": "Result in CPU cache",
        "C": "Data loaded into RAM",
        "D": "Query planner skipped"
      },
      "correct": "C",
      "explainCorrect": "Data was already loaded into memory (RAM) — caching.",
      "explainOptions": {
        "A": "An index would help lookup but doesn't explain the second run being much faster on the same query; data already in RAM does.",
        "B": "CPU cache is for instructions/small data; the big win on a large table is the data being in RAM (buffer cache).",
        "C": "Data was already loaded into memory (RAM) — caching.",
        "D": "The query planner still runs; the speedup comes from data already being cached in memory."
      }
    },
    {
      "id": "L2-Q8",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "Relational model best for:",
      "options": {
        "A": "Complex relationships, reporting, ACID",
        "B": "Self-contained docs",
        "C": "Graph traversals",
        "D": "Flexible schema"
      },
      "correct": "A",
      "explainCorrect": "Relational: Orders, Items, Products. Document: reviews. Graph: customer-product-category.",
      "explainOptions": {
        "A": "Relational: Orders, Items, Products. Document: reviews. Graph: customer-product-category.",
        "B": "Self-contained docs are the strength of the document model, not the relational model.",
        "C": "Graph traversals are best handled by the graph model (e.g. customer–product–category), not relational.",
        "D": "Flexible schema is a feature of document stores; relational model has a fixed schema and ACID."
      }
    },
    {
      "id": "L2-Q9",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "Document model advantages:",
      "options": {
        "A": "ACID, JOINs",
        "B": "Locality, flexible schema, no JOINs for single-doc",
        "C": "Graph queries",
        "D": "Index speed"
      },
      "correct": "B",
      "explainCorrect": "Locality (all in one place), flexible schema, no JOINs for single-doc reads.",
      "explainOptions": {
        "A": "ACID and JOINs are strengths of relational DBs; document model trades these for locality and flexible schema.",
        "B": "Locality (all in one place), flexible schema, no JOINs for single-doc reads.",
        "C": "Graph queries are for the graph model; document model is about storing self-contained documents.",
        "D": "Index speed is not the defining advantage; document model is about locality, flexible schema, and single-doc reads without JOINs."
      }
    },
    {
      "id": "L2-Q10",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "Graph model best for:",
      "options": {
        "A": "Monthly sales reports",
        "B": "Product catalog",
        "C": "Customers who bought what similar customers bought",
        "D": "Order history"
      },
      "correct": "C",
      "explainCorrect": "Graph: traverse edges for 'similar customers', 'friends of friends'.",
      "explainOptions": {
        "A": "Monthly sales reports are typically tabular/relational (aggregations over orders); not graph traversal.",
        "B": "Product catalog is usually document or relational; graph excels at 'who bought what' and similar-customer traversal.",
        "C": "Graph: traverse edges for 'similar customers', 'friends of friends'.",
        "D": "Order history is often relational or document; graph is best when you need multi-hop relationships (e.g. similar customers)."
      }
    },
    {
      "id": "L2-Q11",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "CSV vs Database — use Database when:",
      "options": {
        "A": "Prototyping only",
        "B": "Offline analysis",
        "C": "Single user",
        "D": "Concurrent access, integrity, JOINs, repeated querying"
      },
      "correct": "D",
      "explainCorrect": "Database for concurrent access, integrity (FKs, ACID), JOINs, repeated querying. CSV for prototyping.",
      "explainOptions": {
        "A": "Prototyping is when CSV is often enough; use a database when you need concurrency, integrity, JOINs, repeated queries.",
        "B": "Offline analysis can be done on CSV; database is preferred when you need concurrent access and integrity.",
        "C": "Single-user is a case where CSV might suffice; database shines with concurrent access, integrity, JOINs.",
        "D": "Database for concurrent access, integrity (FKs, ACID), JOINs, repeated querying. CSV for prototyping."
      }
    },
    {
      "id": "L2-Q12",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "After JOINs, avoid double counting by:",
      "options": {
        "A": "Using COUNT(*)",
        "B": "Using SUM",
        "C": "Using AVG",
        "D": "Using COUNT(DISTINCT entity_id)"
      },
      "correct": "D",
      "explainCorrect": "COUNT(DISTINCT order_id) when counting orders after joining to order_items.",
      "explainOptions": {
        "A": "COUNT(*) after a JOIN counts rows (one order can appear multiple times); you get double counting unless you use COUNT(DISTINCT order_id).",
        "B": "SUM is for aggregating a numeric column; to avoid double counting entities after JOIN you need COUNT(DISTINCT entity_id).",
        "C": "AVG doesn't fix double counting; to count distinct orders after joining to order_items use COUNT(DISTINCT order_id).",
        "D": "COUNT(DISTINCT order_id) when counting orders after joining to order_items."
      }
    },
    {
      "id": "L2-Q13",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "Index lookup complexity vs full scan?",
      "options": {
        "A": "O(n) vs O(log n)",
        "B": "O(log n) vs O(n) for index vs full scan",
        "C": "Same",
        "D": "O(1) vs O(n)"
      },
      "correct": "B",
      "explainCorrect": "Index: O(log n) B-tree lookup. Full scan: O(n) checks every row.",
      "explainOptions": {
        "A": "You reversed them: index lookup is O(log n), full scan is O(n), not the other way around.",
        "B": "Index: O(log n) B-tree lookup. Full scan: O(n) checks every row.",
        "C": "They are not the same; index is O(log n) and full scan is O(n).",
        "D": "Index is O(log n), not O(1); hash index can be O(1) but B-tree (typical) is O(log n). Full scan is O(n)."
      }
    },
    {
      "id": "L2-Q14",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "Repeat purchase rate: simple definition?",
      "options": {
        "A": "GMV / customers",
        "B": "% customers with ≥2 orders",
        "C": "AOV",
        "D": "On-time rate"
      },
      "correct": "B",
      "explainCorrect": "Simple: % of customers with ≥2 orders. Olist: 97% never returned.",
      "explainOptions": {
        "A": "GMV / customers is revenue per customer, not the share of customers who made repeat purchases.",
        "B": "Simple: % of customers with ≥2 orders. Olist: 97% never returned.",
        "C": "AOV is average order value; repeat purchase rate is the percentage of customers with two or more orders.",
        "D": "On-time rate is about delivery performance; repeat purchase rate is % of customers with ≥2 orders."
      }
    },
    {
      "id": "L2-Q15",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "Message broker (event-driven) helps with?",
      "options": {
        "A": "Faster queries",
        "B": "Decoupling — services don't know each other; broker stores if receiver down",
        "C": "Indexing",
        "D": "JOINs"
      },
      "correct": "B",
      "explainCorrect": "Event-driven: broker decouples. No tight coupling = no cascading failures.",
      "explainOptions": {
        "A": "Faster queries come from indexing or caching; the message broker's main benefit is decoupling services.",
        "B": "Event-driven: broker decouples. No tight coupling = no cascading failures.",
        "C": "Indexing is a data-layer concern; the broker helps with decoupling and storing messages when the receiver is down.",
        "D": "JOINs are for relational queries; the broker is for async event flow and decoupling, not JOINs."
      }
    },
    {
      "id": "L3-Q1",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "In Y = b0 + b1*X1 + b2*X2 + e, 'ceteris paribus' means:",
      "options": {
        "A": "Holding others constant",
        "B": "All variables change",
        "C": "Only X1 matters",
        "D": "Residual is zero"
      },
      "correct": "A",
      "explainCorrect": "Each coefficient shows effect when all other variables stay the same.",
      "explainOptions": {
        "A": "Each coefficient shows effect when all other variables stay the same.",
        "B": "If all variables change, you can't isolate one coefficient's effect; ceteris paribus means holding others constant.",
        "C": "All predictors can matter; ceteris paribus means when interpreting one coefficient we hold the others fixed.",
        "D": "Residual being zero is about fit, not the interpretation of coefficients; ceteris paribus is about holding other Xs constant."
      }
    },
    {
      "id": "L3-Q2",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "Residual = ?",
      "options": {
        "A": "Predicted - Actual",
        "B": "Actual - Predicted",
        "C": "Mean - Actual",
        "D": "Actual / Predicted"
      },
      "correct": "B",
      "explainCorrect": "Residual = Y - Y_hat = Actual - Predicted.",
      "explainOptions": {
        "A": "Predicted − Actual is the negative of the residual; by convention residual = Actual − Predicted (Y − Y_hat).",
        "B": "Residual = Y - Y_hat = Actual - Predicted.",
        "C": "Mean − Actual is deviation from mean, not from predicted value; residual is error in prediction.",
        "D": "Actual / Predicted is a ratio, not the prediction error; residual is the difference Actual − Predicted."
      }
    },
    {
      "id": "L3-Q3",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "MSE penalizes large errors how?",
      "options": {
        "A": "Linearly",
        "B": "Same as small",
        "C": "Squared — error of 4 is 16x worse than 1",
        "D": "Logarithmically"
      },
      "correct": "C",
      "explainCorrect": "MSE = (1/n)*sum((y - y_hat)^2). Squared errors.",
      "explainOptions": {
        "A": "MSE uses squared errors, not linear; doubling the error quadruples its contribution to MSE.",
        "B": "Large and small errors are not penalized the same; MSE squares errors so large ones dominate.",
        "C": "MSE = (1/n)*sum((y - y_hat)^2). Squared errors.",
        "D": "MSE uses squares, not log; the penalty is quadratic (error²), so error 4 is 16× worse than error 1."
      }
    },
    {
      "id": "L3-Q4",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "R² always increases when you add a variable. Solution?",
      "options": {
        "A": "Use R² anyway",
        "B": "Use Adjusted R² for model comparison",
        "C": "Use MSE",
        "D": "Use p-value"
      },
      "correct": "B",
      "explainCorrect": "Adjusted R² only increases when variable genuinely helps, not by chance.",
      "explainOptions": {
        "A": "Using R² anyway is misleading because R² always goes up when you add a variable; use Adjusted R² for comparison.",
        "B": "Adjusted R² only increases when variable genuinely helps, not by chance.",
        "C": "MSE is for absolute fit; for comparing models with different numbers of predictors, Adjusted R² is the right tool.",
        "D": "p-value tests one coefficient; for overall model comparison (with more/fewer variables) use Adjusted R²."
      }
    },
    {
      "id": "L3-Q5",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "VIF >= 10 indicates:",
      "options": {
        "A": "No problem",
        "B": "Moderate concern",
        "C": "Serious multicollinearity",
        "D": "Perfect fit"
      },
      "correct": "C",
      "explainCorrect": "VIF = 10 serious.",
      "explainOptions": {
        "A": "VIF ≥ 10 is a problem — it indicates serious multicollinearity, not 'no problem'.",
        "B": "VIF ≥ 10 is beyond moderate; the usual rule is VIF ≥ 10 = serious multicollinearity.",
        "C": "VIF = 10 serious.",
        "D": "Perfect fit is unrelated; VIF measures collinearity among predictors, and ≥10 means serious multicollinearity."
      }
    },
    {
      "id": "L3-Q6",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "Ridge (L2) regularization:",
      "options": {
        "A": "Some coefficients → 0",
        "B": "Shrinks all coefficients toward zero",
        "C": "Drops features",
        "D": "Increases coefficients"
      },
      "correct": "B",
      "explainCorrect": "Ridge shrinks all. Lasso (L1) drives some to 0.",
      "explainOptions": {
        "A": "Some coefficients → 0 is Lasso (L1); Ridge (L2) shrinks all toward zero but typically keeps all non-zero.",
        "B": "Ridge shrinks all. Lasso (L1) drives some to 0.",
        "C": "Dropping features (exact zero) is Lasso; Ridge shrinks coefficients but doesn't remove them.",
        "D": "Ridge shrinks coefficients toward zero; it doesn't increase them."
      }
    },
    {
      "id": "L3-Q7",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "Lasso (L1) regularization:",
      "options": {
        "A": "Shrinks all equally",
        "B": "Some coefficients become exactly 0",
        "C": "Adds features",
        "D": "No effect"
      },
      "correct": "B",
      "explainCorrect": "Lasso does feature selection; some coeffs → 0.",
      "explainOptions": {
        "A": "Shrinking all equally is Ridge; Lasso shrinks but can drive some coefficients exactly to zero (feature selection).",
        "B": "Lasso does feature selection; some coeffs → 0.",
        "C": "Lasso doesn't add features; it can zero out some (deselect), not add.",
        "D": "Lasso has a clear effect: L1 penalty drives some coefficients to exactly zero."
      }
    },
    {
      "id": "L3-Q8",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "Multicollinearity breaks:",
      "options": {
        "A": "Prediction",
        "B": "Explanation (cause & effect)",
        "C": "Training speed",
        "D": "Memory"
      },
      "correct": "B",
      "explainCorrect": "Breaks explanation, not prediction. If forecasting, less concern.",
      "explainOptions": {
        "A": "Prediction (forecasting Y) can still work with multicollinearity; it's the interpretation of individual coefficients that breaks.",
        "B": "Breaks explanation, not prediction. If forecasting, less concern.",
        "C": "Training speed and memory are not what multicollinearity breaks; it breaks cause-and-effect interpretation.",
        "D": "Memory use is unrelated; multicollinearity makes it hard to say 'this variable's effect is X' (explanation)."
      }
    },
    {
      "id": "L3-Q9",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "p-value = 0.002 for a coefficient means:",
      "options": {
        "A": "99.8% certain effect is real",
        "B": "0.2% chance null is true",
        "C": "If true effect were zero, prob of seeing this extreme = 0.2%",
        "D": "Model explains 99.8%"
      },
      "correct": "C",
      "explainCorrect": "p-value = P(observing this or more extreme | H0 true).",
      "explainOptions": {
        "A": "p-value is not 'probability the effect is real'; it's the probability of the data (or more extreme) if H0 were true.",
        "B": "p-value is not the probability that the null is true; it assumes H0 is true and asks how likely the observed result is.",
        "C": "p-value = P(observing this or more extreme | H0 true).",
        "D": "99.8% sounds like R²; p=0.002 means if the true effect were zero, you'd see this extreme a result only 0.2% of the time."
      }
    },
    {
      "id": "L3-Q10",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "Odds ratio OR=1.5 for 'is_late' means:",
      "options": {
        "A": "50% lower odds of late",
        "B": "50% higher odds of late",
        "C": "No effect",
        "D": "1.5x lower"
      },
      "correct": "B",
      "explainCorrect": "OR > 1 increases odds. OR=1.5 → 50% higher odds of late.",
      "explainOptions": {
        "A": "OR=1.5 means higher odds of late, not lower; 50% lower would be OR < 1.",
        "B": "OR > 1 increases odds. OR=1.5 → 50% higher odds of late.",
        "C": "OR=1.5 is not no effect; OR=1 would be no effect. 1.5 means 50% higher odds.",
        "D": "1.5x lower would be OR < 1; OR=1.5 means 1.5× higher odds (50% higher)."
      }
    },
    {
      "id": "L3-Q11",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "Training-serving skew occurs when:",
      "options": {
        "A": "Model is too complex",
        "B": "Same transformation done differently in train vs inference",
        "C": "Data is imbalanced",
        "D": "Features are correlated"
      },
      "correct": "B",
      "explainCorrect": "Skew = transformation differs between training and inference.",
      "explainOptions": {
        "A": "Model complexity is a separate issue; training-serving skew is when preprocessing or feature logic differs between train and serve.",
        "B": "Skew = transformation differs between training and inference.",
        "C": "Imbalanced data is about class distribution; skew here means the same transformation applied differently (or only in one place) in train vs inference.",
        "D": "Correlated features are multicollinearity; training-serving skew is about transform/feature consistency between train and inference."
      }
    },
    {
      "id": "L3-Q12",
      "chapter": "l3",
      "chapterTitle": "Lecture 3 — Regression and Classification I",
      "text": "For time-series/delivery prediction, use:",
      "options": {
        "A": "Random split",
        "B": "Stratified split",
        "C": "Time-based split",
        "D": "Group-based split"
      },
      "correct": "C",
      "explainCorrect": "Time-based: train on past, test on future. Random fails for business data.",
      "explainOptions": {
        "A": "Random split mixes past and future; for time/delivery you must train on past and test on future to avoid leakage.",
        "B": "Stratified split preserves class balance but doesn't respect time; for time-series you need time-based split.",
        "C": "Time-based: train on past, test on future. Random fails for business data.",
        "D": "Group-based (e.g. by user) avoids leakage across groups but for time-series the critical rule is past vs future."
      }
    },
    {
      "id": "L2-Q16",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "A table has 2 million rows. A WHERE filter matches about 1.2 million rows. Which statement about indexing is most accurate?",
      "options": {
        "A": "An index is always faster than a full scan regardless of selectivity",
        "B": "A full scan may be competitive or faster because the filter matches a large fraction of rows",
        "C": "Indexing cannot be used on tables above 1 million rows",
        "D": "Indexing only helps when ORDER BY is used"
      },
      "correct": "B",
      "explainCorrect": "Indexes help most when selectivity is high (small match fraction). When most rows match, scan costs can rival or beat indexed lookup plus row fetch.",
      "explainOptions": {
        "A": "Index benefit depends on selectivity; for broad filters, index overhead can reduce gains.",
        "B": "Indexes help most when selectivity is high (small match fraction). When most rows match, scan costs can rival or beat indexed lookup plus row fetch.",
        "C": "Large tables can absolutely use indexes; size alone does not disable indexing.",
        "D": "Indexes help for filtering and joins too, not just ORDER BY."
      }
    },
    {
      "id": "L2-Q17",
      "chapter": "l2",
      "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
      "text": "After joining `orders` to `order_items`, an analyst reports total orders using `COUNT(*)` and gets a value much larger than expected. Best fix?",
      "options": {
        "A": "Use `SUM(order_id)` instead of `COUNT(*)`",
        "B": "Use `COUNT(DISTINCT order_id)` to avoid one-to-many row duplication effects",
        "C": "Add `ORDER BY order_id` before counting",
        "D": "Use `AVG(order_id)` to normalize duplicates"
      },
      "correct": "B",
      "explainCorrect": "One-to-many joins replicate parent rows; distinct counting at the business-entity level avoids inflation.",
      "explainOptions": {
        "A": "Summing IDs is not meaningful for entity counting and does not solve duplication.",
        "B": "One-to-many joins replicate parent rows; distinct counting at the business-entity level avoids inflation.",
        "C": "Sorting does not change row cardinality; duplicates remain duplicates.",
        "D": "Averaging IDs does not represent order counts and does not correct duplication."
      }
    }
];