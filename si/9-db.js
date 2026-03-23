const QUIZ_DB = [
    {
      "id": "L9-Q1",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "RNN processes 18 words, one word per timestep. How many timesteps?",
      "options": {
        "A": "1",
        "B": "9",
        "C": "18",
        "D": "Depends on hidden size"
      },
      "correct": "C",
      "explainCorrect": "One input per timestep. 18 words → 18 timesteps.",
      "explainOptions": {
        "A": "1 timestep would mean one input total; with 18 words you have 18 timesteps (one word per step).",
        "B": "9 would be half; timesteps = number of inputs in the sequence = 18.",
        "C": "One input per timestep. 18 words → 18 timesteps.",
        "D": "Timesteps are determined by the sequence length (18 words), not by hidden size."
      }
    },
    {
      "id": "L9-Q2",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "RNN on 7 days of stock prices, one day per step. Timestep = ?",
      "options": {
        "A": "Neurons in hidden layer",
        "B": "One step where single input (one day) is processed",
        "C": "Training iterations",
        "D": "Layers"
      },
      "correct": "B",
      "explainCorrect": "Timestep = one position in sequence; one day's price = one timestep.",
      "explainOptions": {
        "A": "Neurons are the hidden size; a timestep is one position in the sequence (e.g. one day's input).",
        "B": "Timestep = one position in sequence; one day's price = one timestep.",
        "C": "Training iterations are epochs/steps; a timestep is one slot in the input sequence (e.g. one day).",
        "D": "Layers are depth of the network; timestep is the index in the sequence (e.g. day 1, 2, …)."
      }
    },
    {
      "id": "L9-Q3",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "RNN hidden state h_t:",
      "options": {
        "A": "Independent each step",
        "B": "Passed from t-1 to t; acts as memory",
        "C": "Same as input",
        "D": "Not used"
      },
      "correct": "B",
      "explainCorrect": "h_t passed to next step. Same weights shared across time.",
      "explainOptions": {
        "A": "h_t is not independent; it depends on h_{t-1} and current input — it's passed along as memory.",
        "B": "h_t passed to next step. Same weights shared across time.",
        "C": "Hidden state is computed from input and previous h; it's not the same as the raw input.",
        "D": "h_t is central: it's passed to the next timestep and carries information across time (memory)."
      }
    },
    {
      "id": "L9-Q4",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "Vanishing gradient in RNN:",
      "options": {
        "A": "Gradients explode",
        "B": "BPTT: gradients multiply over steps, shrink to zero",
        "C": "Only in LSTM",
        "D": "No issue"
      },
      "correct": "B",
      "explainCorrect": "BPTT: gradients multiplied each step. Long sequences → vanish.",
      "explainOptions": {
        "A": "Exploding gradients are the opposite; vanishing means gradients shrink toward zero over many steps.",
        "B": "BPTT: gradients multiplied each step. Long sequences → vanish.",
        "C": "LSTM is designed to reduce vanishing; vanilla RNN has the vanishing gradient problem.",
        "D": "Vanishing is a real issue in RNNs: gradients get smaller as they propagate back through time."
      }
    },
    {
      "id": "L9-Q5",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "LSTM addresses:",
      "options": {
        "A": "Speed",
        "B": "Vanishing gradients — gates control memory",
        "C": "Input size",
        "D": "Output format"
      },
      "correct": "B",
      "explainCorrect": "LSTM: separate cell state, gates (forget, input, output). Long-term memory.",
      "explainOptions": {
        "A": "LSTM isn't mainly about speed; it addresses vanishing gradients and long-term memory via gates.",
        "B": "LSTM: separate cell state, gates (forget, input, output). Long-term memory.",
        "C": "Input size is not what LSTM addresses; it addresses gradient vanishing and long-range dependency via gates.",
        "D": "Output format isn't the point; LSTM adds cell state and gates to control memory and reduce vanishing gradients."
      }
    },
    {
      "id": "L9-Q6",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "Forget gate (sigmoid) output 0 means:",
      "options": {
        "A": "Keep all old memory",
        "B": "Discard all old memory",
        "C": "Half of memory",
        "D": "Output nothing"
      },
      "correct": "B",
      "explainCorrect": "0 = forget everything. 1 = keep all. 0.5 = partial.",
      "explainOptions": {
        "A": "Keep all would be forget gate ≈ 1; output 0 means 'forget everything' (discard all old cell content).",
        "B": "0 = forget everything. 1 = keep all. 0.5 = partial.",
        "C": "Half would be 0.5; forget gate output 0 means discard 100% of old memory.",
        "D": "Output nothing describes the gate output; the meaning is 'discard all old memory' for the cell state."
      }
    },
    {
      "id": "L9-Q7",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "LSTM cell state C_t vs hidden state h_t:",
      "options": {
        "A": "Same",
        "B": "C_t = long-term memory; h_t = short-term/output",
        "C": "C_t is output",
        "D": "h_t is long-term"
      },
      "correct": "B",
      "explainCorrect": "C_t = conveyor belt (long-term). h_t = current output (short-term).",
      "explainOptions": {
        "A": "They're different: C_t is the cell state (long-term memory); h_t is the hidden/output state (short-term).",
        "B": "C_t = conveyor belt (long-term). h_t = current output (short-term).",
        "C": "The main output to next layer/step is h_t; C_t is internal state (long-term memory), not the direct output.",
        "D": "Long-term memory is C_t (cell state); h_t is the hidden state / short-term output at this step."
      }
    },
    {
      "id": "L9-Q8",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "Time series: use _____ split. Never _____ randomly.",
      "options": {
        "A": "Random; split",
        "B": "Time-based; shuffle",
        "C": "Stratified; group",
        "D": "Group; time"
      },
      "correct": "B",
      "explainCorrect": "Time-based split only. Shuffling leaks future into past.",
      "explainOptions": {
        "A": "Random split is wrong for time series (leaks future); you must use time-based split.",
        "B": "Time-based split only. Shuffling leaks future into past.",
        "C": "Stratified/group don't fix the main issue; for time series use time-based split and never shuffle the sequence.",
        "D": "Never shuffle time series; use time-based split. 'Group; time' reverses the right idea (time-based; don't shuffle)."
      }
    },
    {
      "id": "L9-Q9",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "Sliding window: past 14 days (X) → predict:",
      "options": {
        "A": "Past 7 days",
        "B": "Next day (y)",
        "C": "Same day",
        "D": "Next 14 days"
      },
      "correct": "B",
      "explainCorrect": "X = past N values. y = next value (or next K).",
      "explainOptions": {
        "A": "Past 7 days are inputs (X), not the prediction target; you predict the next value (y) after the window.",
        "B": "X = past N values. y = next value (or next K).",
        "C": "Same day is already in X; the target y is typically the next time step (next day).",
        "D": "You can predict next K steps, but the standard setup is X = past 14 days → y = next day (or next K); not necessarily next 14."
      }
    },
    {
      "id": "L9-Q10",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "Scale time series:",
      "options": {
        "A": "On full data before split",
        "B": "Fit scaler on train only; transform train, val, test",
        "C": "On test only",
        "D": "Don't scale"
      },
      "correct": "B",
      "explainCorrect": "Fit MinMaxScaler on train. Transform val and test with same scaler.",
      "explainOptions": {
        "A": "Scaling on full data before split leaks future info into the scaler; fit scaler on train only, then transform train/val/test.",
        "B": "Fit MinMaxScaler on train. Transform val and test with same scaler.",
        "C": "Fitting on test only is wrong; scaler must be fit on train, then used to transform train, val, and test.",
        "D": "Scaling is usually needed for RNNs; when you do it, fit on train only and transform all splits with that scaler."
      }
    },
    {
      "id": "L9-Q11",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "Input gate in LSTM controls?",
      "options": {
        "A": "What to forget",
        "B": "How much new memory to add",
        "C": "Output only",
        "D": "Nothing"
      },
      "correct": "B",
      "explainCorrect": "Input gate: how much of newly generated memory to add to cell state.",
      "explainOptions": {
        "A": "What to forget is the forget gate; the input gate controls how much new information to add to the cell state.",
        "B": "Input gate: how much of newly generated memory to add to cell state.",
        "C": "Output gate controls what goes to h_t; input gate controls how much new memory is added to C_t.",
        "D": "Input gate does something important: it gates how much of the new candidate memory is added to the cell."
      }
    },
    {
      "id": "L9-Q12",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "Output gate in LSTM?",
      "options": {
        "A": "What to forget",
        "B": "Which parts of cell state to output as hidden state",
        "C": "Input only",
        "D": "Memory only"
      },
      "correct": "B",
      "explainCorrect": "Output gate: which parts of C_t are relevant now → h_t.",
      "explainOptions": {
        "A": "What to forget is the forget gate; the output gate decides which parts of the cell state become the hidden output h_t.",
        "B": "Output gate: which parts of C_t are relevant now → h_t.",
        "C": "Input gate controls what's added to C_t; output gate controls what of C_t is exposed as h_t.",
        "D": "Output gate selects which parts of cell state to output (h_t); it's not 'memory only' — it shapes the visible output."
      }
    },
    {
      "id": "L9-Q13",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "BPTT = ?",
      "options": {
        "A": "Backpropagation through time",
        "B": "Batch processing",
        "C": "Binary pass",
        "D": "Bias propagation"
      },
      "correct": "A",
      "explainCorrect": "BPTT: backprop through time. Gradients flow backward across sequence.",
      "explainOptions": {
        "A": "BPTT: backprop through time. Gradients flow backward across sequence.",
        "B": "Batch processing is separate; BPTT = backpropagation through time (gradients backward over the sequence).",
        "C": "Binary pass isn't the acronym; BPTT stands for backpropagation through time.",
        "D": "Bias propagation isn't correct; BPTT is backpropagation through time (computing gradients across timesteps)."
      }
    },
    {
      "id": "L9-Q14",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "RNN applications in finance include?",
      "options": {
        "A": "Image classification",
        "B": "Stock prediction, fraud, speech",
        "C": "Clustering only",
        "D": "Regression only"
      },
      "correct": "B",
      "explainCorrect": "RNN/LSTM: time series, fraud detection, speech translation, etc.",
      "explainOptions": {
        "A": "Image classification is typically CNN; RNN/LSTM are for sequences (time series, text, speech).",
        "B": "RNN/LSTM: time series, fraud detection, speech translation, etc.",
        "C": "RNNs are used for sequence prediction/classification (e.g. stock, fraud, speech), not only clustering.",
        "D": "RNNs do regression and classification on sequences; applications include stock prediction, fraud, speech — not regression only."
      }
    },
    {
      "id": "L9-Q15",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "Feedforward NN limitation for sequences?",
      "options": {
        "A": "Too fast",
        "B": "Fixed size; no memory; order ignored",
        "C": "Too many params",
        "D": "No hidden layers"
      },
      "correct": "B",
      "explainCorrect": "Feedforward: fixed input, no memory, permuting past gives same output.",
      "explainOptions": {
        "A": "Speed isn't the limitation; feedforward nets have fixed input size, no memory across steps, and ignore order.",
        "B": "Feedforward: fixed input, no memory, permuting past gives same output.",
        "C": "Parameter count isn't the key limitation; the issue is fixed size, no recurrence, and order not mattering.",
        "D": "Feedforward nets can have hidden layers; the limitation for sequences is fixed input size and no temporal memory."
      }
    },
    {
      "id": "L9-Q16",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "A sequence model performs well during training with teacher forcing but degrades at inference. What best explains this gap?",
      "options": {
        "A": "The optimizer forgot weights after training",
        "B": "Exposure bias: training used true previous tokens/values, inference uses model’s own predictions",
        "C": "Teacher forcing changes hidden size at inference",
        "D": "Teacher forcing is equivalent to dropout and must be disabled"
      },
      "correct": "B",
      "explainCorrect": "Teacher forcing can create train–inference mismatch; at inference, errors can accumulate because prior inputs are model-generated.",
      "explainOptions": {
        "A": "Weights are retained; the problem is usually distribution shift in autoregressive inputs.",
        "B": "Teacher forcing can create train–inference mismatch; at inference, errors can accumulate because prior inputs are model-generated.",
        "C": "Teacher forcing does not alter hidden-state dimensionality.",
        "D": "Teacher forcing and dropout are different techniques with different purposes."
      }
    },
    {
      "id": "L9-Q17",
      "chapter": "l9",
      "chapterTitle": "Lecture 9 — RNN & LSTM",
      "text": "An ADF test on a time series returns p-value = 0.27 before ARIMA modeling. Best next step?",
      "options": {
        "A": "Assume stationarity and set differencing d=0",
        "B": "Difference the series and re-test stationarity before final ARIMA order",
        "C": "Skip stationarity checks and increase AR order only",
        "D": "Use random train/test split to average out non-stationarity"
      },
      "correct": "B",
      "explainCorrect": "A high ADF p-value fails to reject non-stationarity; differencing (d>=1) and retesting is the standard workflow.",
      "explainOptions": {
        "A": "High p-value does not support stationarity.",
        "B": "A high ADF p-value fails to reject non-stationarity; differencing (d>=1) and retesting is the standard workflow.",
        "C": "AR order tuning alone does not solve non-stationarity.",
        "D": "Random splitting causes leakage in time series and does not fix non-stationarity."
      }
    }
  ];