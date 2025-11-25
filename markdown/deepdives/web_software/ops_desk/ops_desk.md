---
source: deepdives/web_software/ops_desk/ops_desk.html
title: OpsDesk – Project Detail
type: page
---

deepdives/web_software/ops_desk/ops_desk.html

# OpsDesk – Project Detail
OpsDesk – Project Detail
← Back to Projects
Web and Software

# OpsDesk
OpsDesk
A lightweight React and Node based helpdesk dashboard for IT teams to
log, triage and track incidents, with filters, live stats and a
responsive UI designed for day to day operations.

### Timeline
Timeline:
Oct 2019 to Dec 2019

### Tech Stack
Tech Stack:
React.js, Context API, Node.js, MongoDB, Docker, AWS EC2
OpsDesk activity view showing current tickets with status, priority
and quick actions for IT technicians.

### Quick Insights

### ## Quick Insights
## Quick Insights:

### Quick Insights
Quick Insights:

### Problem
Problem:
An internal IT department managed incidents through ad hoc emails
and spreadsheets, making it hard to see current workload, ownership
and which tickets needed urgent attention.

### Solution
Solution:
Built OpsDesk as a single page React application backed by a Node
and MongoDB API, providing a live dashboard with filters, attention
flags, technician assignment, light and dark themes and full CRUD
for system logs.

### Result
Result:
Delivered a production ready tool as part of a freelancing
engagement, containerized with Docker and deployed on an AWS EC2
instance so the client team could log, search and update tickets
from one place instead of juggling multiple tools, saving 5 hours
per week on average.

## Introduction
Introduction
OpsDesk is a custom internal application built for an IT department
client during a freelancing engagement. The goal was to replace email
and spreadsheet based logging with a focused dashboard that gives
technicians a clear view of current incidents and who owns what. The
system supports everyday helpdesk tasks such as password resets,
network issues and hardware problems.
The frontend is implemented in React using a component based
architecture and Context API to manage global state such as filters,
theme and technician data without prop drilling. A Node.js backend
exposes REST endpoints that read and write to MongoDB. MongoDB was
chosen because log entries and technician records are naturally
document shaped, may evolve over time with new fields and are easy to
query by status, category or technician.
The application is packaged into Docker containers and deployed on an
AWS EC2 instance, making it simple for the client to run the system in
their environment and restart or update it with minimal downtime. The
design emphasizes quick scanning for busy technicians with clear
status chips, attention flags and minimal friction for creating or
editing a log.
Replaced manual email and spreadsheet workflows, saving
technicians an average of
5 hours per week
by centralizing
logs, ownership and updates into a single interface.
Context API centralizes filters, theme and technician data so
updates appear immediately across the interface.
MongoDB collections store logs and technicians as flexible JSON
documents, supporting new categories and flags without schema
migrations.
Docker on AWS EC2 provides a simple deployable unit the client can
run and restart in their own infrastructure.

## Demonstration
Demonstration
Edit log modal for updating status, technician, date and attention
flag while keeping all context in a single place.
Dashboard level filters and live counts for open, in progress,
resolved and attention required tickets, with quick actions for
new logs and technician management.

## Key Outcomes and Learnings
Key Outcomes and Learnings
OpsDesk brought together full stack development, deployment and UX
decisions into a single deliverable for a real client. It required
balancing implementation speed with a design that technicians could
understand at a glance and adopt without formal training.
Reduced operational friction by cutting the number of steps needed
to resolve a ticket from an average of
7–8 interactions down to 3
, thanks to unified filters,
streamlined editing and centralized technician data.
Gained experience designing REST endpoints and data models so logs,
technicians and categories remain easy to query and extend.
Containerized the application with Docker and deployed it to AWS
EC2, gaining practical experience with environment configuration and
runtime management.
Focused on operator experience by adding clear status and attention
indicators, quick actions and sortable, newest first activity feeds.
Delivered a production ready tool for an IT department client,
improving visibility into current incidents and technician workload.
