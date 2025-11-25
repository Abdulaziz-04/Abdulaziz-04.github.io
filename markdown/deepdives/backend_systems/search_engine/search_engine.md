---
source: deepdives/backend_systems/search_engine/search_engine.html
title: Full-Stack Search Engine: Crawl, Index, Rank, and Rerank
type: page
---

deepdives/backend_systems/search_engine/search_engine.html

# Full-Stack Search Engine: Crawl, Index, Rank, and Rerank
Full-Stack Search Engine: Crawl, Index, Rank, and Rerank
← Back to Projects
Backend & Distributed Logic
Full-Stack Search Engine: Crawl, Index, Rank, and Rerank
Built an end-to-end search engine over a nuclear-safety corpus: custom
crawler, compressed inverted indexes, classic IR ranking
(TF-IDF/BM25/LM), graph algorithms (PageRank/HITS), vertical search UI
with manual assessments, learning-to-rank, and ML-powered spam
filtering.
Part of CS 6200 Information Retrieval course at Northeastern: starting
with baseline ranking, adding compression and proximity search, building
a focused crawler, applying link analysis, running a vertical search
assessment interface, experimenting with learning-to-rank, and closing
with ML-based spam classification.

### Tech Stack
Tech Stack:
Python, Flask, ElasticSearch, NumPy, scikit-learn, pandas,
BeautifulSoup, multi-threading, custom inverted index storage
High-level System Architecture

## Quick insights
Quick insights

### Goal
Goal:
Build a demonstrable, end-to-end search stack covering crawling,
indexing, ranking, evaluation, and ML reranking.

### A1 – Baseline Ranking
A1 – Baseline Ranking:
Implemented TF-IDF,
Okapi-TF, BM25, and two Language Models (Laplace, Jelinek-Mercer) on
a stemmed corpus from scratch.

### Key metric
Key metric:
BM25 Mean Average Precision ≈
0.31
based
on trec_eval.

### A2 – Index Compression & Proximity
A2 – Index Compression & Proximity:
Built
compressed inverted indexes and positional lists to enable
phrase/proximity search.

### Key metric
Key metric:
Compressed index size
67.4 MB
(down
from 187 MB).

### A3 – Focused Crawler
A3 – Focused Crawler:
Multi-threaded Priority-queue
frontier expanding based on BFS algorithm, keyword hits, and inlink
counts with full canonicalization and politeness.

### Key metric
Key metric:
The topic of crawling was Nuclear accidents covering different
incidents such as Hiroshima-Nagasaki, Three-mile island, Kshytm
disaster.
Collected over 160,000 documents with robots.txt compliance and a
1-second inter-request delay.

### A4 – Link Analysis
A4 – Link Analysis:
Computed PageRank and HITS over
the custom crawled dataset to add authority/hub signals for
reranking and getting better search results.

### Key metric
Key metric:
Convergence verified via
Shannon-entropy
stabilization across iterations.

### A5 – Vertical Search UI & Labels
A5 – Vertical Search UI & Labels:
Built an
assessment interface for nuclear event queries with 3-point
relevance judgments (0/1/2).

### Key metric
Key metric:
Collected
graded labels
enabling
trec_eval-style scoring and LTR training.

### A6 – Learning-to-Rank
A6 – Learning-to-Rank:
Trained on features from
five IR models plus document length; evaluated on held-out queries.

### Key metric
Key metric:
Best test precision
0.414
.

### A7 – Spam Classification
A7 – Spam Classification:
Compared manual lexicon
features vs full unigrams using Logistic Regression, Decision Tree,
and Multinomial NB.

### Key metric
Key metric:
Highest
ROC-AUC
with Logistic Regression
on
unigrams
.

## System overview
System overview
The system is a full retrieval pipeline built across seven assignments
starting with traditional ranking models, adding indexing and
proximity search, introducing a focused crawler with link analysis,
finishing with a vertical search interface, learning-to-rank, and spam
filtering. This section consolidates both the system architecture and
the design choices behind each stage, structured cleanly across its
five major components.

### Crawler
Crawler
Multi-threaded Priority-queue frontier combining BFS waves, keyword
hits, and inlink counts to balance topical breadth with
authoritative seeds.
HTML parsing and canonicalization (lowercasing, fragment/port
stripping, path cleanup) to unify duplicate URLs.
Politeness handling via robots.txt, 1-second delays, and per-host
guards.
Outputs include raw documents, outgoing links, and link graph
signals used later by PageRank and HITS.

### Indexer
Indexer
Two indexing strategies: a standard inverted index for
BM25/TF-IDF/LM and a positional index for phrase and proximity
search. I tried stemmed indices and unstemmed indices as well.
Preprocessing pipeline: tokenization, stopword removal, stemming,
and term statistics for scoring models.
Compression via delta-encoding + variable-byte reduced stemmed index
size to about 67.4 MB (from 187 MB).
Positional data enabled proximity-based ranking boosts used in the
second-stage retrieval experiments.

### Ranker
Ranker
First-pass retrieval using BM25, TF-IDF, Okapi TF, and two language
models (Laplace and Jelinek–Mercer).
BM25 produced the strongest classical baseline (MAP around 0.31 on
the stemmed corpus).
Link analysis (PageRank and HITS) computed on the crawl graph;
authority/hub signals improved diversity on topical queries.
Output: top-k candidates enriched with IR scores, link signals,
document lengths, and optional proximity features.

### Reranker
Reranker
Learning-to-rank experiments used combined IR features (BM25,
TF-IDF, LM scores), link features (PageRank/HITS), and document
length.
Best precision reached ≈0.414 on held-out queries after tuning and
evaluation through the vertical search judgments.
Spam filtering with unigrams and heuristics compared Logistic
Regression, Decision Trees, and Multinomial NB. Logistic Regression
with full unigrams achieved the strongest ROC-AUC.

### Search engine UI
Search engine UI
Vertical search interface allowed labeling results on a 0/1/2
relevance scale where 0 is the most relevant, feeding a
trec_eval-like loop for Mean Average Precision (MAP), Precision@K,
and nDCG (Normalized Discounted Cumulative Gain) analysis.
Snippets displayed BM25 scores, titles, and highlighted query terms
to support manual assessments.
Labeled data powered the learning-to-rank stage, serving as the
bridge between classical retrieval and machine-learning reranking.

## UI example and Precision-Recall Curve
UI example and Precision-Recall Curve
Sample vertical search UI showing ranked results for a
nuclear-related query.
Precision–recall curve averaged across all 20 evaluation queries.

## Scaling and future enhancements
Scaling and future enhancements
Ready to grow from coursework to production-grade demo.

### Sharding & cache
Sharding & cache:
Shard the index by domain/time; add postings and query result cache
(Redis) to reduce P95 latency.

### Reranking depth
Reranking depth:
Introduce XGBoost with expanded features (PageRank, HITS, click
priors) and cross-validation over query folds.

### Quality signals
Quality signals:
Add autocomplete with prefix tries, spell correction via k-grams and
snippet generator with positional windows.

### Deployment
Deployment:
Containerize crawler, indexer, API, and UI; use docker-compose for a
single-node demo; add health checks and telemetry.

### Spam hardening
Spam hardening:
Add character n-grams for obfuscation, URL reputation features, and
threshold tuning for precision/recall trade-offs.

## Impact and learnings
Impact and learnings

### IR depth
IR depth:
Got the opportunity to design ElasticSearch from scratch and
hands-on implementation of classic retrieval models, proximity,
compression, and graph algorithms, understanding when BM25 beats LMs
and how link signals diversify results.

### Evaluation mindset
Evaluation mindset:
Built a full relevance loop: manual labels, trec_eval metrics,
precision tracking, and feature-driven LTR gains.

### ML integration
ML integration:
Combined sparse text features with traditional IR scores; compared
manual heuristics vs. data-driven vocabularies for spam detection.

### Systems thinking
Systems thinking:
From crawling politeness to storage trade-offs, every stage is
modular and independently testable for clearer scaling paths.
