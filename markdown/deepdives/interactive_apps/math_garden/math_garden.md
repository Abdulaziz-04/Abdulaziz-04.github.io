---
source: deepdives/interactive_apps/math_garden/math_garden.html
title: Math Garden – Handwritten digits and growing garden feedback
type: page
---

deepdives/interactive_apps/math_garden/math_garden.html

# Math Garden – Handwritten digits and growing garden feedback
Math Garden – Handwritten digits and growing garden feedback
← Back to Projects
Interactive Applications

# Math Garden – Interactive Toddler App
Math Garden – Interactive Toddler App
A browser-based addition game for toddlers and early learners where
they write the answer by hand, a small MLP neural network recognizes
the digit in real time, and a colorful garden grows or shrinks based
on their answers.

### Tech Stack
Tech Stack:
Python, TensorFlow, MLP neural network,TensorFlow.js, JavaScript, HTML
/CSS
Math Garden’s main screen: kids solve tiny addition problems and
draw the answer in the black square to help the garden flourish.

## Quick insights
Quick insights

### Goal
Goal:
Turn early math practice into a playful, low-pressure activity where
toddlers feel like they are nurturing a garden instead of taking a
test.

### Gameplay loop
Gameplay loop:
The page shows random addition problems, Children write the answer
using a finger, stylus, or mouse on a canvas and tap “Check Answer”
to see if the garden grows.

### ML in the browser
ML in the browser:
A pre-trained 3-layer dense MNIST classifier is converted to a
TensorFlow.js model and runs entirely in the browser. OpenCV.js
preprocesses the canvas and the MLP (Multi-Layer Perceptron) neural
network predicts the digit with no backend calls.

### Feedback
Feedback:
Correct answers stack new SVG background layers and grow the garden
through six stages. Mistakes gently shrink one step, keeping
feedback clear but not discouraging for young kids.

## Experience and game flow
Experience and game flow
The interface is intentionally minimal so pre-readers can play with
almost no instructions from adults.

### Single page play
Single page play:
The entire game lives on one HTML page with no menus. A new addition
problem appears immediately after each attempt to keep the rhythm
simple and predictable for toddlers.

### Handwriting canvas
Handwriting canvas:
An HTML5 canvas captures strokes from both mouse and touch events.
Kids literally “write” the answer inside the black tile, which feels
more like drawing than typing numbers.

### Garden growth mechanic
Garden growth mechanic:
Each correct answer increments a score and swaps in the next SVG
background to represent a fuller garden. After six correct answers
the garden is “fully blossomed” and the scene resets for another
short session.

### Gentle mistakes
Gentle mistakes:
An incorrect prediction shrinks the garden by one layer instead of
resetting everything, encouraging experimentation without harsh
penalties.
Gameplay snippet: the child writes the answer, the MLP recognizes
the digit, and the garden grows as a visual reward.

## Architecture at a glance
Architecture at a glance
Math Garden is designed as a self contained browser experience with a
Python based training pipeline that lives alongside the front end
code.

### Front end
Front end:
Vanilla JavaScript manages state and math problem generation. An
HTML5 canvas captures strokes along with CSS styling.

### Processing pipeline
Processing pipeline:
When “Check Answer” is pressed, OpenCV.js converts the canvas to
grayscale, thresholds, finds the main contour, crops, resizes, pads
to 28×28, recenters the digit, and normalizes pixel values before
turning it into a tensor.

### On device inference
On device inference:
TensorFlow.js loads the model and runs a single forward pass of the
MLP to predict the digit. Everything runs locally in the browser, so
the game works offline once assets are cached.

### No backend dependency
No backend dependency:
There is no live server side API in the gameplay loop. Python
scripts exist only for offline training and evaluation.

## MLP model and training pipeline
MLP model and training pipeline
The core of the game is a simple but effective multilayer perceptron
trained on handwritten digits. It is light enough to run in real time
in JavaScript while still robust to kids’ messy handwriting.

### Model architecture
Model architecture:
A 3 layer dense network built in TensorFlow with ReLU activations
and a 10 way softmax output for digits 0–9.

### Training
Training:
A Python script trains a handwritten-digit-classifier on MNIST, logs
to TensorBoard, and exports a model once validation accuracy
converges which is saved for quick inference.

### JS conversion
JS conversion:
The saved model is loaded using TensorFlow.js so that the front end
can load the model directly in the browser.

## Impact and Learnings
Impact and Learnings

### Kid friendly ML demo
Kid friendly ML demo:
The project doubles as a playful toddler math game and a concrete
example of how on device ML can be used in education with no setup
beyond opening a web page.

### End to end pipeline experience
End to end pipeline experience:
Implementing both the Python training scripts and the TensorFlow.js
inference path reinforced best practices for exporting, converting,
and validating models across environments.

### Browser UX for toddlers
Browser UX for toddlers:
Handling both mouse and touch events, preventing accidental scrolls,
and keeping the UI minimal were key to making the experience work
for very young users.
