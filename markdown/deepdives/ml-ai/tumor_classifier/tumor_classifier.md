---
source: deepdives/ml-ai/tumor_classifier/tumor_classifier.html
title: Brain Tumor Detection with Augmentation and Transfer Learning
type: page
---

deepdives/ml-ai/tumor_classifier/tumor_classifier.html

# Brain Tumor Detection with Augmentation and Transfer Learning
Brain Tumor Detection with Augmentation and Transfer Learning
← Back to Projects
ML/AI Projects
Brain Tumor Detection with Augmentation and Transfer Learning
Built a deep learning system that classifies MRI brain scans and
highlights tumor regions using a combination of CNNs, data
augmentation pipelines, and transfer learning methods. Designed for
reliability across multiple datasets and MRI formats, achieving strong
F1-scores and stable learning dynamics.
View project report

### Timeline
Timeline:
Feb 2023 – Apr 2023

### Tech Stack
Tech Stack:
PyTorch, Keras/TensorFlow, EfficientNetB4, YOLOv5, OpenCV, NumPy,
Matplotlib
Sample tumor detection output using transfer learning + detection
head.

### Quick Insights

### ## Quick Insights
## Quick Insights:

### Quick Insights
Quick Insights:

### Problem
Problem:
MRI scans vary significantly in contrast,
noise, and orientation, making consistent tumor classification
challenging across datasets.

### Solution
Solution:
Implemented a multi-stage pipeline using
augmentation → baseline CNN → transfer learning (EfficientNetB4) →
tumor-region visualization. This ensured robustness while keeping
the model lightweight and stable.

### Result
Result:
Achieved
~0.97 validation F1-score
and smooth loss convergence.
Transfer learning significantly outperformed models trained from
scratch.

## Introduction
Introduction
This project focused on building a reliable MRI-based brain tumor
classifier using supervised deep learning. Instead of relying on a
single dataset, we combined
four MRI datasets
to improve model
diversity and reduce overfitting. Augmentation played a key role in
simulating clinical variations such as rotation, zoom shifts,
brightness changes, and spatial distortions.
After evaluating a custom CNN built from scratch, we transitioned to
transfer learning
(EfficientNetB4) which delivered significantly better generalization
on unseen MRI scans.

## Dataset Preparation & Augmentation
Dataset Preparation & Augmentation
Augmentation compensated for limited data and high MRI variability.
Below are examples of synthetic samples generated from healthy

### (non-tumor) scans
(non-tumor) scans:
Generated augmentations: rotation, flip, zoom, and pipeline
transformations.

## Baseline Model: Custom CNN
Baseline Model: Custom CNN
The baseline CNN served as a controlled experiment to understand the
dataset’s complexity. It was intentionally simple, using two
convolution layers and dense classifiers. The architecture below

### summarizes the layer progression
summarizes the layer progression:
Baseline CNN architecture (trained from scratch).
While effective for initial exploration, the model plateaued in
performance when exposed to more diverse MRI scans, motivating the use
of transfer learning.

## Transfer Learning Approach
Transfer Learning Approach
To achieve higher performance and generalization, we adopted
EfficientNetB4
pre-trained on ImageNet and fine-tuned it for
binary tumor classification. Transfer learning helped retain low-level
features like gradients and textures while adapting high-level layers
to MRI patterns.
Why transfer learning helps — reuse proven vision features.
This approach reduced training time, stabilized gradients, and
consistently outperformed custom CNN results. Below are the updated
final results using Transfer Learning.
Binary cross-entropy loss and F1-score dynamics (Training vs
Validation).

## Key Outcomes & Learnings
Key Outcomes & Learnings
Transfer learning (EfficientNetB4) achieved
~0.97 F1
,
outperforming CNN-from-scratch by a significant margin.
MRI augmentation was crucial for robustness, especially rotation and
zoom variations.
Learned how MRI modalities differ and how to design augmentations
that preserve diagnostic signals.
The pipeline generalizes well across datasets due to layered
approach: augmentation → CNN baseline → transfer learning.
