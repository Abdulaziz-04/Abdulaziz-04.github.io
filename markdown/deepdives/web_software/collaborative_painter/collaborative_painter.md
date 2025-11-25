---
source: deepdives/web_software/collaborative_painter/collaborative_painter.html
title: Collaborative Painter – Project Detail
type: page
---

deepdives/web_software/collaborative_painter/collaborative_painter.html

# Collaborative Painter – Project Detail
Collaborative Painter – Project Detail
← Back to Projects
Web and Software

# Collaborative Painter
Collaborative Painter
A real time collaborative drawing platform built in DLang using SDL
and UDP networking. Multiple users can paint, chat, and share a
dynamic canvas together with synchronized updates across all connected
clients.

### Timeline
Timeline:
Feb 2023 to Apr 2023

### Tech Stack
Tech Stack:
DLang, SDL, gtkD, UDP via WebSockets, unit-threaded testing
Collaborative drawing demonstration showing multiple clients
interacting in real time on a shared canvas.

## Quick Insights
Quick Insights

### Problem
Problem:
The client needed a fast desktop tool that allowed multiple users to
collaboratively paint on a shared canvas while staying synchronized
and communicating in real time.

### Solution
Solution:
A DLang based collaborative painter using SDL and gtkD for rendering
and UI, with UDP networking to broadcast drawing commands and chat
updates efficiently across clients.

### Result
Result:
Fully working prototype supporting 10 concurrent users, real time
synchronization, integrated chat, and unit tested core features for
drawing and networking.

## Introduction
Introduction
This project was developed as part of the Foundations of Software
Engineering course at Northeastern University. Our team of 4 people
designed and implemented a desktop application that enables users to
collaboratively paint on a shared canvas while communicating in real
time through an integrated chat panel.
The client requested a high performance, portable, low latency
collaborative system. DLang was chosen due to its performance and
memory safety benefits, along with its use in large scale systems such
as Facebook infrastructure tools. SDL and gtkD enabled rendering and
UI development, while UDP allowed lightweight real time message
broadcasting. Core features were unit tested using unit threaded
testing to ensure stability.
10/10 milestones completed successfully.
Completed over 6 weeks as part of an agile milestone driven
project.
Supports 10 concurrent users with synchronized real time drawing.
Flood fill with line scanning improved fill speed by 35%.

## Demonstration
Demonstration
Real time chat feature that allows users to communicate without
leaving the canvas.
GitHub Project board used for planning, milestone tracking and
team task distribution.

## Key Outcomes and Learnings
Key Outcomes and Learnings
This project demonstrated distributed system design, low latency
networking and event driven programming. It also required strong team
coordination, sprint based planning and the adoption of new languages
and tools aligned with client constraints.
Learned how to architect a collaborative real time application using
UDP message passing.
Strengthened team collaboration through milestones, shared ownership
and structured agile workflow.
Built experience with DLang, SDL rendering, gtkD UI development and
performance optimization for drawing tools.
Developed unit tested components for networking and rendering to
prevent regressions during feature expansion.
