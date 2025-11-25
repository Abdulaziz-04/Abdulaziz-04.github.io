---
source: deepdives/web_software/portfolio_analyzer/portfolio_analyzer.html
title: Portfolio Analyzer – Project Detail
type: page
---

deepdives/web_software/portfolio_analyzer/portfolio_analyzer.html

# Portfolio Analyzer – Project Detail
Portfolio Analyzer – Project Detail
← Back to Projects
Web and Software

# Portfolio Analyzer
Portfolio Analyzer
A modular Java portfolio management system built with MVC and MVVM,
supporting flexible portfolios, automated investment plans, portfolio
rebalancing, performance visualization and multi-layered testing.

### Timeline
Timeline:
Nov 2022 to Dec 2022

### Tech Stack
Tech Stack:
Java, Swing, MVC + MVVM, Factory & Command patterns, AlphaVantage
API, ElasticSearch
Portfolio performance visualization generated through the GUI using
live and cached market data.

### Quick Insights

### ## Quick Insights
## Quick Insights:

### Quick Insights
Quick Insights:

### Problem
Problem:
Build a portfolio management system that can expand over multiple
iterations without breaking earlier functionality, while supporting
both console and GUI interfaces and live API-driven data.

### Solution
Solution:
Designed a modular Java application using MVC and MVVM patterns,
introduced helper models, factories, command objects and mock
components for testability, and extended the system with flexible
portfolios, investment plans, rebalancing and visualization.

### Result
Result:
Fully functioning analyzer supporting creation, modification,
visualization, cost basis, investment plans, rebalancing and
persistence across users, backed by extensive unit testing and mock
testing layers.

## Introduction
Introduction
Portfolio Analyzer was built as a multi-iteration project focused on
applying SOLID principles and evolving a basic console application
into a robust GUI driven financial tool. MVC formed the foundation,
later extended with MVVM-style separation for Swing views to reduce
UI-logic coupling.
To keep the code extensible, I introduced factories for portfolio
types, helper models for validation and caching, command pattern for
user operations and modular interfaces for adding new features
incrementally. Market data retrieval used the AlphaVantage API with
caching and date validation.
Testing was a major focus: mock models, mock views and mock
controllers enabled isolated testing of all layers. Contract tests
ensured feature additions never broke earlier assignments.
10+ major features added across iterative assignments without
modifying core contracts.
Rebalancing functionality introduced to redistribute portfolio
weights automatically.
Integrated ElasticSearch to index portfolio snapshots and allow
faster search and analysis.
Reduced API usage by ~45% after adding caching and transaction
date preprocessing.

## Demonstration
Demonstration
Class diagram illustrating helper models, controllers, factories
and views organized under MVC + MVVM.

## Key Outcomes and Learnings
Key Outcomes and Learnings
The project emphasized extensibility, testability and design-driven
development. It combined architectural patterns with API integration,
caching, visualization and portfolio analytics.
Applied SOLID principles by introducing new features through helper
interfaces, factories and strategy components without editing stable
logic.
Strengthened understanding of MVC and MVVM by separating domain
logic from views and wiring multiple interfaces to the same core
models and controllers.
Gained experience collaborating on and extending another team’s
codebase while respecting previously defined contracts and behavior.
Used ElasticSearch to index portfolio data and perform trend
analysis.
