const QUIZ_DB = [
    {
      "id": "L5-Q1",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "PCA is:",
      "options": {
        "A": "Non-linear",
        "B": "Linear — finds orthogonal axes of max variance",
        "C": "For clustering only",
        "D": "Same as UMAP"
      },
      "correct": "B",
      "explainCorrect": "PCA: linear, interpretable loadings, preserves global variance.",
      "explainOptions": {
        "A": "PCA is linear: it finds linear combinations (orthogonal axes of max variance); UMAP/t-SNE are non-linear.",
        "B": "PCA: linear, interpretable loadings, preserves global variance.",
        "C": "PCA is for dimensionality reduction and can feed into clustering; it's not 'for clustering only' — it's linear projection.",
        "D": "UMAP is non-linear and neighbor-based; PCA is linear and variance-based — they are different."
      }
    },
    {
      "id": "L5-Q2",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "UMAP preserves:",
      "options": {
        "A": "Global variance",
        "B": "Local neighborhoods (similar points stay close)",
        "C": "Loadings",
        "D": "Orthogonality"
      },
      "correct": "B",
      "explainCorrect": "UMAP: non-linear, neighbor-based, good for clustering + viz.",
      "explainOptions": {
        "A": "Global variance is what PCA preserves; UMAP preserves local structure (neighbors stay close).",
        "B": "UMAP: non-linear, neighbor-based, good for clustering + viz.",
        "C": "Loadings are from PCA; UMAP doesn't have loadings — it preserves local neighborhoods.",
        "D": "Orthogonality is a PCA property; UMAP is about local neighborhood preservation, not orthogonal axes."
      }
    },
    {
      "id": "L5-Q3",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "K-Means requires:",
      "options": {
        "A": "No k",
        "B": "Specifying k in advance",
        "C": "Density",
        "D": "Labels"
      },
      "correct": "B",
      "explainCorrect": "K-Means needs k. HDBSCAN/DBSCAN don't.",
      "explainOptions": {
        "A": "K-Means does require k; methods like HDBSCAN don't, but K-Means needs the number of clusters set in advance.",
        "B": "K-Means needs k. HDBSCAN/DBSCAN don't.",
        "C": "Density is the basis of DBSCAN/HDBSCAN; K-Means requires specifying k, not density.",
        "D": "K-Means is unsupervised — it doesn't use labels; it does require you to choose k."
      }
    },
    {
      "id": "L5-Q4",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "Silhouette score s ≈ -1 means:",
      "options": {
        "A": "Well clustered",
        "B": "On boundary",
        "C": "Probably wrong cluster",
        "D": "Perfect"
      },
      "correct": "C",
      "explainCorrect": "s ≈ +1 well clustered, 0 boundary, -1 wrong cluster.",
      "explainOptions": {
        "A": "Well clustered is s ≈ +1; s ≈ -1 means the point is probably in the wrong cluster.",
        "B": "On boundary is s ≈ 0; s ≈ -1 means wrong cluster (closer to another cluster).",
        "C": "s ≈ +1 well clustered, 0 boundary, -1 wrong cluster.",
        "D": "Perfect would be s ≈ +1; s ≈ -1 is the opposite — point is likely assigned to the wrong cluster."
      }
    },
    {
      "id": "L5-Q5",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "HDBSCAN labels outliers as:",
      "options": {
        "A": "0",
        "B": "-1 (noise)",
        "C": "1",
        "D": "NaN"
      },
      "correct": "B",
      "explainCorrect": "HDBSCAN: -1 = noise/outlier. No need to set k.",
      "explainOptions": {
        "A": "0 is a valid cluster label in HDBSCAN; outliers are labeled -1, not 0.",
        "B": "HDBSCAN: -1 = noise/outlier. No need to set k.",
        "C": "1 is a cluster index; noise/outliers get the special label -1.",
        "D": "HDBSCAN uses -1 for noise, not NaN; -1 is the convention for unassigned/outlier points."
      }
    },
    {
      "id": "L5-Q6",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "BERTopic pipeline: Embeddings → ?",
      "options": {
        "A": "K-Means only",
        "B": "UMAP → HDBSCAN → c-TF-IDF",
        "C": "PCA → K-Means",
        "D": "LDA"
      },
      "correct": "B",
      "explainCorrect": "Embeddings → UMAP (dim reduction) → HDBSCAN (cluster) → c-TF-IDF (topic labels).",
      "explainOptions": {
        "A": "BERTopic uses UMAP then HDBSCAN then c-TF-IDF, not K-Means only.",
        "B": "Embeddings → UMAP (dim reduction) → HDBSCAN (cluster) → c-TF-IDF (topic labels).",
        "C": "BERTopic pipeline is UMAP → HDBSCAN → c-TF-IDF, not PCA → K-Means.",
        "D": "LDA is a different topic model (bag-of-words); BERTopic uses embeddings → UMAP → HDBSCAN → c-TF-IDF."
      }
    },
    {
      "id": "L5-Q7",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "HDBSCAN over K-Means for topic modeling because:",
      "options": {
        "A": "Faster",
        "B": "Handles varying densities, no k, labels noise as -1",
        "C": "More interpretable",
        "D": "Linear"
      },
      "correct": "B",
      "explainCorrect": "Varying topic sizes, no k to set, outlier detection.",
      "explainOptions": {
        "A": "HDBSCAN isn't necessarily faster; its advantage is varying densities, no k, and noise as -1.",
        "B": "Varying topic sizes, no k to set, outlier detection.",
        "C": "Interpretability isn't the main reason; HDBSCAN is chosen for density-based clustering, no k, and noise handling.",
        "D": "HDBSCAN is not linear; it's density-based. The advantage is handling varying cluster sizes and labeling noise."
      }
    },
    {
      "id": "L5-Q8",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "RFM = ?",
      "options": {
        "A": "Random Forest Model",
        "B": "Recency, Frequency, Monetary",
        "C": "Root Mean square",
        "D": "Regression Fit Metric"
      },
      "correct": "B",
      "explainCorrect": "RFM: Recency (days since last), Frequency (count), Monetary (total spend).",
      "explainOptions": {
        "A": "Random Forest Model is a different RF; in segmentation RFM = Recency, Frequency, Monetary.",
        "B": "RFM: Recency (days since last), Frequency (count), Monetary (total spend).",
        "C": "Root mean square is RMSE; RFM in customer segmentation is Recency, Frequency, Monetary.",
        "D": "Regression Fit Metric is not RFM; in marketing/segmentation RFM stands for Recency, Frequency, Monetary."
      }
    },
    {
      "id": "L5-Q9",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "Adjusted Rand Index is for:",
      "options": {
        "A": "Internal validation (no labels)",
        "B": "External validation (with ground truth)",
        "C": "Clustering only",
        "D": "Regression"
      },
      "correct": "B",
      "explainCorrect": "ARI: external, needs labels. Silhouette: internal, no labels.",
      "explainOptions": {
        "A": "Internal validation (no labels) is Silhouette; ARI needs ground-truth labels, so it's external validation.",
        "B": "ARI: external, needs labels. Silhouette: internal, no labels.",
        "C": "ARI is for clustering but the key is it's external (needs labels); 'clustering only' doesn't distinguish internal vs external.",
        "D": "ARI is for comparing clusterings (classification/clustering), not for regression."
      }
    },
    {
      "id": "L5-Q10",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "Elbow method for K-Means:",
      "options": {
        "A": "Plot inertia vs k, look for elbow",
        "B": "Plot silhouette vs k",
        "C": "Use ARI",
        "D": "Use RFM"
      },
      "correct": "A",
      "explainCorrect": "Inertia decreases with k; elbow = diminishing returns.",
      "explainOptions": {
        "A": "Inertia decreases with k; elbow = diminishing returns.",
        "B": "Silhouette vs k is valid but the classic elbow method uses inertia (within-cluster sum of squares) vs k.",
        "C": "ARI needs ground-truth labels; elbow method for K-Means uses unlabeled data and inertia.",
        "D": "RFM is customer segmentation; elbow method is plotting inertia vs k for choosing number of clusters."
      }
    },
    {
      "id": "L5-Q11",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "Class-based TF-IDF in BERTopic?",
      "options": {
        "A": "Per-document",
        "B": "Treats all docs in cluster as one giant doc; finds words unique to cluster",
        "C": "Same as standard TF-IDF",
        "D": "For embeddings"
      },
      "correct": "B",
      "explainCorrect": "All docs in cluster → one doc. Find words most unique to that cluster vs others → topic labels.",
      "explainOptions": {
        "A": "Per-document TF-IDF is standard; class-based (c-TF-IDF) treats all docs in a cluster as one 'doc' for that class.",
        "B": "All docs in cluster → one doc. Find words most unique to that cluster vs others → topic labels.",
        "C": "Standard TF-IDF is per-document; c-TF-IDF aggregates by cluster/class and finds words distinctive to that cluster.",
        "D": "Embeddings are used earlier in BERTopic; c-TF-IDF is for labeling clusters (topic words), not for producing embeddings."
      }
    },
    {
      "id": "L5-Q12",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "K-Means assumes?",
      "options": {
        "A": "Arbitrary shapes",
        "B": "Spherical clusters",
        "C": "Density-based",
        "D": "No k"
      },
      "correct": "B",
      "explainCorrect": "K-Means: spherical. DBSCAN/HDBSCAN: arbitrary shapes, density-based.",
      "explainOptions": {
        "A": "Arbitrary shapes are handled by density-based methods (DBSCAN/HDBSCAN); K-Means assumes roughly spherical clusters.",
        "B": "K-Means: spherical. DBSCAN/HDBSCAN: arbitrary shapes, density-based.",
        "C": "Density-based is DBSCAN/HDBSCAN; K-Means assumes spherical (or convex) clusters via centroids.",
        "D": "K-Means does require k; the assumption asked here is about cluster shape (spherical), not whether k is needed."
      }
    },
    {
      "id": "L5-Q13",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "BERTopic uses embeddings for?",
      "options": {
        "A": "Clustering only",
        "B": "Semantic meaning — context-aware",
        "C": "Speed",
        "D": "Compression"
      },
      "correct": "B",
      "explainCorrect": "Embeddings = context-aware. LDA = bag of words. BERTopic understands 'Windows' OS vs window glass.",
      "explainOptions": {
        "A": "Embeddings are used for semantic similarity and then clustering; the key is they capture semantic (context-aware) meaning.",
        "B": "Embeddings = context-aware. LDA = bag of words. BERTopic understands 'Windows' OS vs window glass.",
        "C": "Speed is not the main point; BERTopic uses embeddings for their semantic, context-aware representation.",
        "D": "Compression can be a side effect; the reason for embeddings in BERTopic is semantic/context-aware meaning."
      }
    },
    {
      "id": "L5-Q14",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "Cluster profiling: Recency Index 54 (avg=100) means?",
      "options": {
        "A": "54% more recent",
        "B": "46% more recent (lower recency = better)",
        "C": "54% older",
        "D": "Same as avg"
      },
      "correct": "B",
      "explainCorrect": "Recency = days since last order. Lower = more recent = better. Index 100 = population avg.",
      "explainOptions": {
        "A": "54% more recent would imply a lower index; index 54 means 54% of population avg (100), so this cluster is more recent (lower recency = better).",
        "B": "Recency = days since last order. Lower = more recent = better. Index 100 = population avg.",
        "C": "54% older would be index > 100; index 54 means less days since last order, so more recent (better).",
        "D": "Same as average would be index 100; 54 is below average, so this segment is more recent than avg."
      }
    },
    {
      "id": "L5-Q15",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "UMAP n_neighbors controls?",
      "options": {
        "A": "Speed only",
        "B": "Local vs global (default 15)",
        "C": "Number of clusters",
        "D": "Embedding dim"
      },
      "correct": "B",
      "explainCorrect": "n_neighbors: local vs global. min_dist: cluster tightness. Good for micro-topics.",
      "explainOptions": {
        "A": "n_neighbors affects the local vs global tradeoff, not just speed; small = more local structure.",
        "B": "n_neighbors: local vs global. min_dist: cluster tightness. Good for micro-topics.",
        "C": "Number of clusters is determined by HDBSCAN (or similar) after UMAP; n_neighbors controls how local the embedding is.",
        "D": "Embedding dimension is set separately (n_components); n_neighbors controls the local vs global balance (default 15)."
      }
    },
    {
      "id": "L5-Q16",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "You increase K-Means from k=4 to k=10 and inertia drops sharply, but silhouette score drops from 0.42 to 0.18. Best interpretation?",
      "options": {
        "A": "k=10 is clearly better because inertia always matters more than silhouette",
        "B": "k=10 likely over-segments; lower silhouette suggests weaker cluster separation despite lower inertia",
        "C": "Silhouette should always increase with k, so 0.18 means calculation error",
        "D": "Inertia rising would be expected when k increases"
      },
      "correct": "B",
      "explainCorrect": "Inertia always decreases as k grows, so use complementary criteria. Falling silhouette indicates poorer cohesion/separation trade-off.",
      "explainOptions": {
        "A": "Inertia monotonically decreases with k and cannot alone select k.",
        "B": "Inertia always decreases as k grows, so use complementary criteria. Falling silhouette indicates poorer cohesion/separation trade-off.",
        "C": "Silhouette is not monotonic in k; it can decrease when clusters become less meaningful.",
        "D": "Inertia does not rise with larger k in K-Means; it typically decreases."
      }
    },
    {
      "id": "L5-Q17",
      "chapter": "l5",
      "chapterTitle": "Lecture 5 — Unsupervised Learning",
      "text": "A point has silhouette score near 0. What does this most likely indicate?",
      "options": {
        "A": "It is clearly misclassified into a wrong cluster",
        "B": "It is very well embedded inside its own cluster",
        "C": "It lies near a decision boundary between clusters",
        "D": "It has been removed as noise by K-Means"
      },
      "correct": "C",
      "explainCorrect": "Silhouette around 0 implies similar distance to own cluster and nearest neighboring cluster, indicating boundary ambiguity.",
      "explainOptions": {
        "A": "Strongly negative scores suggest likely misassignment; near 0 is more ambiguous boundary behavior.",
        "B": "Well-clustered points typically have silhouette closer to +1.",
        "C": "Silhouette around 0 implies similar distance to own cluster and nearest neighboring cluster, indicating boundary ambiguity.",
        "D": "K-Means does not automatically remove noise points."
      }
    }
];