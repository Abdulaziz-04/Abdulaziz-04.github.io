---
source: deepdives/ml-ai/ar_visualizer/ar_visualizer.html
title: Camera Calibration & Augmented Reality
type: page
---

deepdives/ml-ai/ar_visualizer/ar_visualizer.html

# Camera Calibration & Augmented Reality
Camera Calibration & Augmented Reality
← Back to Projects
ML/AI & Computer Vision

# Camera Calibration & Marker-Based Augmented Reality
Camera Calibration & Marker-Based Augmented Reality
Built a complete camera calibration and marker-based AR pipeline using
OpenCV. Estimated full camera pose from a checkerboard pattern and
overlaid a virtual 3D prism anchored to the physical marker in real
time.
View project report

### Timeline
Timeline:
Mar 2023 – Apr 2023

### Tech Stack
Tech Stack:
C++, OpenCV, solvePnP, projectPoints, Linear Algebra, 3D
Geometry
AR overlay result: A 3D prism rendered using pose estimated from the
checkerboard marker.

### Quick Insights

### ## Quick Insights
## Quick Insights:

### Quick Insights
Quick Insights:

### Problem
Problem:
Rendering virtual 3D content in real scenes requires accurate camera
intrinsics, distortion removal and pose estimation from real-world
markers.

### Solution
Solution:
Calibrated the camera with multiple checkerboard images, estimated
rotation and translation vectors using
solvePnP
, and
projected the vertices of a virtual prism with
projectPoints
.

### Result
Result:
A stable augmented reality effect where the virtual object tracks
the checkerboard marker’s position, orientation and perspective in
real time.

## Introduction
Introduction
This project implements a classical computer vision AR system without
deep learning. Using a printed checkerboard, the camera’s intrinsic
matrix and distortion parameters were estimated. With these, the pose
relative to the marker was recovered frame-by-frame and a virtual 3D
prism was rendered at the correct physical location on the board.
Computed intrinsics + distortion from multiple checkerboard views
Used
solvePnP
to obtain rotation + translation vectors
Projected a 3D object model using
projectPoints
Maintained alignment even under changes in angle and distance

## Demonstration
Demonstration

### The pipeline below shows the two key stages
The pipeline below shows the two key stages:
pose estimation via checkerboard detection
and
virtual object rendering
.

### Camera Calibration
Camera Calibration:
Detected checkerboard corners used to
compute intrinsic matrix and distortion coefficients.

### AR Rendering Stage
AR Rendering Stage:
Prism rendered using projected 3D
points from the estimated camera pose.
Another view of the AR overlay showing correct perspective
alignment.

## Representative Code Snippet
Representative Code Snippet
// Estimate pose from checkerboard points
solvePnP(objectPoints, imagePoints,
cameraMatrix, distCoeffs,
rvec, tvec);
// Project 3D prism vertices into image space
projectPoints(prismVertices, rvec, tvec,
cameraMatrix, distCoeffs,
projected2D);
// Draw edges between projected points
for (auto &edge : prismEdges) {
line(frame, projected2D[edge.first],
projected2D[edge.second],
Scalar(0, 255, 255), 2);
}

## Why It Matters
Why It Matters
This project recreates the core of ARKit/ARCore-style tracking using
only geometry and OpenCV. It demonstrates practical understanding of
camera projection, pose estimation and real-time rendering—all
foundational skills for AR, robotics, SLAM and computer vision work.
Strengthened understanding of intrinsic/extrinsic calibration
Implemented real-time AR without ML or heavy frameworks
Built end-to-end geometric intuition for projection pipelines
Created a clean demonstration of classical CV-based AR
