---
source: deepdives/web_software/home_decor_visualizer/tiltastic.html
title: Tiltastic – Project Detail
type: page
---

deepdives/web_software/home_decor_visualizer/tiltastic.html

# Tiltastic – Project Detail
Tiltastic – Project Detail
← Back to Projects
Web and Software

# Tiltastic – Home Décor Tile Visualizer
Tiltastic – Home Décor Tile Visualizer
A computer vision powered web application that lets users upload a
room photo, pick a tile design and instantly preview how different
floors or walls would look, using monocular depth estimation and floor
segmentation behind a simple interface.

### Timeline
Timeline:
Jan 2022 to Apr 2022

### Tech Stack
Tech Stack:
React, Flask, Tensorflow, Keras, OpenCV, AWS
Tiltastic interface for selecting tile designs, rotating the view
and comparing multiple visualizations side by side.

### Quick Insights

### ## Quick Insights
## Quick Insights:

### Quick Insights
Quick Insights:

### Problem
Problem:
Homeowners and interior clients often rely on catalog photos and
imagination to choose tiles. It is hard to visualize how a pattern
will look in their own room and comparing options usually means
multiple store visits and trial and error.

### Solution
Solution:
Built Tiltastic, a web application that takes a room photo and a
tile design as input, detects floors or walls using a Tensorflow
based segmentation model and MiDaS depth maps, then overlays the new
tiles with realistic perspective, lighting and tile count controls.
The experience feels like trying different tiles directly on the
user’s own space.

### Result
Result:
Achieved around 85 to 90 percent visually accurate floor and wall

### replacements on test images while keeping the workflow simple
replacements on test images while keeping the workflow simple:
upload, choose design, tweak angles and compare variations in a few
seconds. The same pipeline can extend to paint colors, furniture and
other interior elements.

## Introduction
Introduction
Tiltastic was developed during a machine learning internship at
SoftmaxAI. The goal was to turn tile selection into a visual advisory
experience that works on any standard room photo. Instead of asking
users to imagine a final look from catalog images, Tiltastic generates
a realistic composite of the chosen tiles directly on their own floor
or wall.
The system uses a React based front end that talks to Flask APIs
hosting trained Tensorflow and Keras models. A floor detection model
segments the room, MiDaS based monocular depth estimation produces a
depth map, and OpenCV pipelines handle corner detection, masks and
pixel level replacement. Results are served back through AWS hosted
infrastructure so the application can be accessed remotely.
Users upload a room image, choose from preset tile designs or custom
textures and then adjust rotation along X and Z axes plus tile count
for the final visualization.
The backend keeps the segmented floor and depth information cached
per session, reducing repeated visualization time from around
60 seconds to 30 seconds
when trying multiple tile designs on
the same image.
The project followed an incremental model: starting from data
collection and segmentation, then model training, then depth
mapping, then tile replacement functions, and finally an integrated
web experience deployed on AWS.

## Flow Diagram
Flow Diagram
High level flow: user inputs are processed by Flask APIs that call
the floor detection model, MiDaS depth estimation and tile
swapping functions, then return the visualized result.

## Demonstration
Demonstration
Upload dialog where users provide a floor or room image to
visualize. Images are validated and sent to the backend for
segmentation and depth estimation.
Example output where the model has detected the floor and overlaid
the selected tile pattern with realistic perspective and
repetition count.

## Key Outcomes and Learnings
Key Outcomes and Learnings
Tiltastic combined computer vision, depth estimation and web
development into a single, user facing product. It required designing
a pipeline that is accurate enough for visual decision making while
remaining responsive in a browser.
Reduced manual trial and error by letting users experiment with
multiple tile designs from home, replacing the need for repeated
store visits and physical samples for many early decisions.
Learned how to train and integrate segmentation and depth models
with Flask APIs, including handling image preprocessing, model
loading, error cases and response formatting.
Implemented pixel level replacement and corner estimation using
depth gradients, which improved alignment for oblique camera angles
and non rectangular rooms.
Applied an iterative development process: start with floor only,
then add wall support, then optimize for repeated design changes on
the same image.
Demonstrated that a relatively compact model plus efficient
preprocessing can provide visually convincing results at around 85
to 90 percent accuracy on realistic home interior photos.
