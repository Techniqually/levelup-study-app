const QUIZ_DB = [
    {
      "id": "L8-Q1",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Without activation, a neural network is:",
      "options": {
        "A": "Non-linear",
        "B": "Just linear regression",
        "C": "Unstable",
        "D": "Faster"
      },
      "correct": "B",
      "explainCorrect": "Activation adds non-linearity. Without it, layers collapse to linear.",
      "explainOptions": {
        "A": "Without activation the stack of layers is equivalent to one linear map; you need activation for non-linearity.",
        "B": "Activation adds non-linearity. Without it, layers collapse to linear.",
        "C": "Stability isn't the issue; without activation the network is equivalent to linear regression.",
        "D": "Speed isn't the point; without activation the model is just linear regression (no extra expressiveness)."
      }
    },
    {
      "id": "L8-Q2",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "ReLU range:",
      "options": {
        "A": "0 to 1",
        "B": "-1 to 1",
        "C": "0 to infinity",
        "D": "-inf to inf"
      },
      "correct": "C",
      "explainCorrect": "ReLU(x)=max(0,x). Passes only positive. Avoids vanishing in positive range.",
      "explainOptions": {
        "A": "0 to 1 is sigmoid; ReLU outputs [0, ∞): zero for negative input, identity for positive.",
        "B": "-1 to 1 is tanh; ReLU range is [0, ∞).",
        "C": "ReLU(x)=max(0,x). Passes only positive. Avoids vanishing in positive range.",
        "D": "ReLU clips negatives to 0, so output is never negative; range is [0, ∞), not all reals."
      }
    },
    {
      "id": "L8-Q3",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Bias in a neuron:",
      "options": {
        "A": "Shifts decision boundary (threshold adjuster)",
        "B": "Is always 0",
        "C": "Same as weight",
        "D": "Not trainable"
      },
      "correct": "A",
      "explainCorrect": "Bias = trainable constant. Allows activation to shift; without it, forced through origin.",
      "explainOptions": {
        "A": "Bias = trainable constant. Allows activation to shift; without it, forced through origin.",
        "B": "Bias is learned (trainable), not fixed at 0; it shifts the decision boundary.",
        "C": "Bias is a scalar per neuron; weights are a vector. Both trainable but different roles (weights = direction, bias = shift).",
        "D": "Bias is trainable (learned); it's a parameter like weights, updated by backprop."
      }
    },
    {
      "id": "L8-Q4",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Backpropagation uses:",
      "options": {
        "A": "Forward pass only",
        "B": "Chain rule to distribute error backward",
        "C": "Random updates",
        "D": "No gradients"
      },
      "correct": "B",
      "explainCorrect": "Chain rule: compute how much each weight contributed to loss.",
      "explainOptions": {
        "A": "Forward pass computes output; backprop uses the chain rule to propagate error backward and compute gradients.",
        "B": "Chain rule: compute how much each weight contributed to loss.",
        "C": "Updates are gradient-based, not random; backprop uses the chain rule to get gradients.",
        "D": "Backpropagation is exactly about computing gradients; without gradients there's no backprop."
      }
    },
    {
      "id": "L8-Q5",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "One epoch =",
      "options": {
        "A": "One weight update",
        "B": "One complete pass through all training data",
        "C": "One batch",
        "D": "One layer"
      },
      "correct": "B",
      "explainCorrect": "Epoch = full pass over training set.",
      "explainOptions": {
        "A": "One weight update is one step (e.g. one batch); an epoch is one full pass through all training data.",
        "B": "Epoch = full pass over training set.",
        "C": "One batch is a subset; one epoch means every training sample is seen once (may be many batches).",
        "D": "Layer is a structural unit; epoch is a training unit: one complete pass over the training set."
      }
    },
    {
      "id": "L8-Q6",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Entity embeddings for categorical (e.g. 73 categories):",
      "options": {
        "A": "One-hot → 73 columns",
        "B": "Learn dense vector per category (e.g. 73×16)",
        "C": "Drop categories",
        "D": "Use label encoding only"
      },
      "correct": "B",
      "explainCorrect": "Embedding: 73 categories → 73×dim dense vectors. Learns semantic similarity.",
      "explainOptions": {
        "A": "One-hot gives 73 sparse columns; entity embedding learns a dense vector per category (e.g. 73×16), which can capture similarity.",
        "B": "Embedding: 73 categories → 73×dim dense vectors. Learns semantic similarity.",
        "C": "Dropping categories loses information; embedding keeps all categories as learned dense vectors.",
        "D": "Label encoding only gives integers (e.g. 0..72); embedding learns a dense vector per category for semantic similarity."
      }
    },
    {
      "id": "L8-Q7",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Entity embedding dimension heuristic (fast.ai):",
      "options": {
        "A": "Same as categories",
        "B": "1.6 × n_categories^0.56",
        "C": "Always 256",
        "D": "n_categories / 2"
      },
      "correct": "B",
      "explainCorrect": "e.g. 73 categories: 1.6×73^0.56 ≈ 18.",
      "explainOptions": {
        "A": "Dimension isn't equal to number of categories; the fast.ai heuristic is 1.6 × n_categories^0.56 (e.g. 73 → ~18).",
        "B": "e.g. 73 categories: 1.6×73^0.56 ≈ 18.",
        "C": "256 is not a general rule; embedding dimension is often set by a heuristic like 1.6×n^0.56.",
        "D": "n_categories/2 is not the formula; the common heuristic is 1.6 × n_categories^0.56."
      }
    },
    {
      "id": "L8-Q8",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "For tabular data, tree-based models often:",
      "options": {
        "A": "Always worse than NNs",
        "B": "Outperform neural networks",
        "C": "Same as NNs",
        "D": "Not used"
      },
      "correct": "B",
      "explainCorrect": "RF, XGBoost often beat NNs on tabular. NNs need representation learning.",
      "explainOptions": {
        "A": "On tabular data, tree-based models (RF, XGBoost) often outperform NNs; NNs shine when representation learning helps.",
        "B": "RF, XGBoost often beat NNs on tabular. NNs need representation learning.",
        "C": "They're not the same; trees often do better on tabular; NNs excel on raw signals (vision, text).",
        "D": "Tree-based models are widely used for tabular data and often outperform NNs."
      }
    },
    {
      "id": "L8-Q9",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Vanishing gradients in deep nets (sigmoid/tanh):",
      "options": {
        "A": "Gradients grow",
        "B": "Gradients shrink toward zero in early layers",
        "C": "No effect",
        "D": "Only in output"
      },
      "correct": "B",
      "explainCorrect": "Sigmoid/tanh saturate; gradients vanish. ReLU, batch norm help.",
      "explainOptions": {
        "A": "Vanishing means gradients shrink toward zero, not grow; in deep nets with sigmoid/tanh they get smaller in early layers.",
        "B": "Sigmoid/tanh saturate; gradients vanish. ReLU, batch norm help.",
        "C": "There is an effect: gradients can become very small in early layers, making learning slow or stuck.",
        "D": "Vanishing affects layers backward through the net, especially early layers, not only the output."
      }
    },
    {
      "id": "L8-Q10",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Dropout:",
      "options": {
        "A": "Increases capacity",
        "B": "Randomly sets some activations to 0 during training",
        "C": "Speeds training",
        "D": "Adds parameters"
      },
      "correct": "B",
      "explainCorrect": "Dropout: randomly zero out. Reduces overfitting.",
      "explainOptions": {
        "A": "Dropout doesn't add capacity; it randomly zeros activations during training to reduce overfitting.",
        "B": "Dropout: randomly zero out. Reduces overfitting.",
        "C": "Training can be slower (more epochs); dropout doesn't speed training — it regularizes.",
        "D": "Dropout doesn't add parameters; it sets some activations to 0 at random during training."
      }
    },
    {
      "id": "L8-Q11",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Sigmoid range and use?",
      "options": {
        "A": "-1 to 1, hidden layers",
        "B": "0 to 1, probability / binary output",
        "C": "0 to inf, regression",
        "D": "-inf to inf, all"
      },
      "correct": "B",
      "explainCorrect": "Sigmoid: 0–1, good for probability. Cons: saturates, vanishing gradients.",
      "explainOptions": {
        "A": "-1 to 1 is tanh; sigmoid outputs (0, 1), used for probability or binary output.",
        "B": "Sigmoid: 0–1, good for probability. Cons: saturates, vanishing gradients.",
        "C": "0 to inf is ReLU-like; sigmoid is bounded (0, 1) and used for probability, not unbounded regression.",
        "D": "Sigmoid is bounded between 0 and 1; it's used for probability/binary output, not all purposes."
      }
    },
    {
      "id": "L8-Q12",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Single-layer NN can only learn?",
      "options": {
        "A": "Non-linear boundaries",
        "B": "Linear (straight-line) boundary",
        "C": "Any function",
        "D": "Circular"
      },
      "correct": "B",
      "explainCorrect": "Single layer = linear. Hidden layers + activation = non-linear.",
      "explainOptions": {
        "A": "Non-linear boundaries need hidden layers and activation; a single layer (no hidden) is just linear.",
        "B": "Single layer = linear. Hidden layers + activation = non-linear.",
        "C": "Single layer can only learn linear boundaries; 'any function' needs depth and non-linearity.",
        "D": "A single linear layer gives a linear boundary; circular or other shapes need multiple layers + activation."
      }
    },
    {
      "id": "L8-Q13",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Batch Normalization helps with?",
      "options": {
        "A": "Speed only",
        "B": "Vanishing gradients — normalizes inner layers",
        "C": "Overfitting only",
        "D": "Input only"
      },
      "correct": "B",
      "explainCorrect": "Batch norm: normalizes activations. Helps gradients flow, reduces vanishing.",
      "explainOptions": {
        "A": "Batch norm can help speed but its main benefit is stabilizing training and helping with vanishing gradients.",
        "B": "Batch norm: normalizes activations. Helps gradients flow, reduces vanishing.",
        "C": "It helps with vanishing gradients and training stability; overfitting is more addressed by dropout/regularization.",
        "D": "Batch norm normalizes activations in inner layers, not only the input layer."
      }
    },
    {
      "id": "L8-Q14",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "BCELoss is for?",
      "options": {
        "A": "Regression",
        "B": "Binary classification",
        "C": "Multi-class",
        "D": "Clustering"
      },
      "correct": "B",
      "explainCorrect": "BCELoss = Binary Cross-Entropy. For binary classification.",
      "explainOptions": {
        "A": "Regression uses MSE or similar; BCELoss is Binary Cross-Entropy for binary classification.",
        "B": "BCELoss = Binary Cross-Entropy. For binary classification.",
        "C": "Multi-class uses CrossEntropyLoss (or NLLLoss); BCELoss is for binary (two classes).",
        "D": "Clustering uses different objectives; BCELoss is for supervised binary classification."
      }
    },
    {
      "id": "L8-Q15",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "Embeddings learn semantic similarity because?",
      "options": {
        "A": "Pre-defined",
        "B": "Learned — similar behavior → similar vectors",
        "C": "Random",
        "D": "One-hot"
      },
      "correct": "B",
      "explainCorrect": "Embedding weights learned. Similar categories for target → similar vectors.",
      "explainOptions": {
        "A": "Embeddings are learned from data, not pre-defined; similar behavior for the target leads to similar vectors.",
        "B": "Embedding weights learned. Similar categories for target → similar vectors.",
        "C": "They start random but are learned; after training, similar categories have similar embedding vectors.",
        "D": "One-hot is fixed (orthogonal); embeddings are learned so that similar categories get similar vectors."
      }
    },
    {
      "id": "L8-Q16",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "A deep network with sigmoid hidden layers shows training loss barely improving after many epochs. Most likely mechanism?",
      "options": {
        "A": "Exploding gradients from sigmoid’s unbounded output",
        "B": "Vanishing gradients due to sigmoid saturation in deep layers",
        "C": "Dropout is disabled during training",
        "D": "Batch size is always too small for sigmoid"
      },
      "correct": "B",
      "explainCorrect": "Sigmoid saturates near 0/1 and yields tiny derivatives, causing gradient attenuation through depth.",
      "explainOptions": {
        "A": "Sigmoid outputs are bounded, and the common issue in deep stacks is vanishing, not exploding from unbounded outputs.",
        "B": "Sigmoid saturates near 0/1 and yields tiny derivatives, causing gradient attenuation through depth.",
        "C": "Dropout mode matters, but the described stagnation with deep sigmoid is classically vanishing gradients.",
        "D": "Batch size influences optimization noise, but does not explain the core saturation/gradient attenuation problem."
      }
    },
    {
      "id": "L8-Q17",
      "chapter": "l8",
      "chapterTitle": "Lecture 8 — Neural Nets I",
      "text": "During inference, what is the correct behavior for Dropout layers after calling `model.eval()`?",
      "options": {
        "A": "Keep dropping units with the same probability as training",
        "B": "Disable random dropping; use full network deterministically",
        "C": "Increase drop rate to stabilize outputs",
        "D": "Drop only negative activations"
      },
      "correct": "B",
      "explainCorrect": "In evaluation mode, dropout is disabled so predictions are deterministic and based on the full learned network.",
      "explainOptions": {
        "A": "Keeping stochastic dropping at inference would make outputs unstable.",
        "B": "In evaluation mode, dropout is disabled so predictions are deterministic and based on the full learned network.",
        "C": "Drop rate is not increased at inference; dropout is turned off.",
        "D": "Dropout does not target activations by sign."
      }
    }
];