---
source: deepdives/research projects/humanoid_agents/humanoid_agents.html
title: LLM-based Agents in Social VR – Research Project
type: page
---

deepdives/research projects/humanoid_agents/humanoid_agents.html

# LLM-based Agents in Social VR – Research Project
LLM-based Agents in Social VR – Research Project
← Back to Projects
Research Projects

# LLM-driven Humanoid Agents in Social Virtual Reality
LLM-driven Humanoid Agents in Social Virtual Reality
Research apprenticeship project that built memory-aware non playable
characters in VRChat using GPT-4 API. These agents remember prior
conversations, pass information between players, and respond with
appropriate dialogue, facial expressions, and body gestures in real
time.

### Note
Note:
Non-Playable Characters (NPCs) are the supporting
characters that make games and social worlds feel alive by providing
quests, continuity, and context. In this work I refer to them simply as
Agents and focus on how memory-aware behavior makes those Agents
credible collaborators.

### Publication
Publication:
CHI 2024 – Building LLM-based AI Agents in Social Virtual
Reality

### Role
Role:
Research apprentice and Project Lead

### Timeline
Timeline:
Fall 2023 – Dec 2023

### Tech Stack
Tech Stack:
OpenAI API, GPT-4, VRChat, Python,
MongoDB, Unity, Whisper API, Vosk, OCR, Custom RAG pipeline
Demo of the LLM driven agent in VRChat holding a multi turn
conversation, recalling previous details, and reacting with gestures
and expressions.

## Quick insights
Quick insights

### Goal
Goal:
Explore how large language models can power
believable social Agents in VR that remember the player, share facts
across sessions, and react with both voice and body language.

### Approach
Approach:
Built a modular AI agent on top of VRChat
(a social VR platform) with a memory database, retrieval function,
and GPT-4 prompting. Agents support both text and voice input, plus
animated facial expressions and actions driven by the conversation
state.

### Key result
Key result:
Through LLM judge and human evaluation
we found that using
3 base observations
plus
5 contextual observations
produced a 94.6% plausibility score
while keeping prompts compact enough for real-time dialogue.

## System overview
System overview
I led the full design of the system architecture. The system runs as a
long-lived agent. Every interaction creates observations that persist
beyond the current session so players can return and continue
conversations. Instead of a single chat history, the agent maintains
structured memories about people, relationships, and events.

### GPT module
GPT module:
GPT-4 API turns raw chat logs into structured
observations, generates agent responses, and infers player mood and
intent.

### Agent formation module
Agent formation module:
Each agent gets a base description
(name, backstory, preferences) stored as active observations that
define personality.

### Observation database
Observation database:
MongoDB stores base and contextual
observations. Each agent keeps up to 50 recent observations
in-memory for fast retrieval without losing continuity.

### Custom RAG Retrieval function
Custom RAG Retrieval function:
Recency is modeled using
exponential decay and relevance via cosine similarity between
embeddings of the player message and each observation. Scores are
combined into an importance value that ranks memories for the
current prompt.

### VR integration
VR integration:
Unity plus Python OSC control the VRChat
avatar so the agent speaks, animates facial expressions, and
triggers body gestures aligned with the generated text reply.

### Integration of Voice detection and text-to-speech
Integration of Voice detection and text-to-speech:
Integrated
Whisper APIs and Vosk Model for voice detection and allowing the
avatar to speak with expressions and actions.

## Poster snapshot
Poster snapshot
Poster summarizing motivation, retrieval function, MongoDB memory
store, dual text and voice modes, and timing metrics.

## Memory and retrieval design
Memory and retrieval design
I designed the retrieval and memory subsystem that feeds context to
GPT-4. The design keeps the agent responsive yet capable of sharing
information across players.

### Running memory queue
Running memory queue:
Each agent maintains a deque of up to
50 context observations. Old entries drop off automatically and
create a summarized observation once the deque hits the limit, this
keeps the retrieval fast.

### Scoring observations
Scoring observations:
Recency decay and semantic similarity
are combined to rank observations. The top
m
base observations and top
n
contextual observations are fed
into the GPT-4 response prompt alongside the latest player message.

### Cross-player memory
Cross-player memory:
Observations include who said what and
when, letting the agent pass messages between players (for example
reminding Player B about plans mentioned by Player A).

## Data analysis and evaluation pipeline
Data analysis and evaluation pipeline
Every interaction records the user message, retrieved observations,
scores, generated response, and timing for speech to text, retrieval,
and LLM generation. These logs feed the analysis scripts that compare
design settings using LLM judges and human raters, making it faster to
tune the agent for believable behavior.
Evaluation pipeline: tests log metrics in CSV during NPC
conversations, then analysis compares retrieval settings and
response quality using both LLM judges and human raters.

## Evaluation and findings
Evaluation and findings
To tune how much memory context the agent should use, we combined LLM

### based judging with human evaluation
based judging with human evaluation:

### LLM judge evaluation
LLM judge evaluation:
GPT-4, Llama 2 13B, and Mistral 7B
acted as independent judges. For various combinations of base and
context observations they scored how much each observation improved
the agent response, aggregated using mean average precision.

### Human plausibility study
Human plausibility study:
Human raters marked responses as
plausible based on coherence and relevance. The best configuration
(
m = 3
,
n = 5
) achieved roughly
94.6%
plausible responses based on Mean Average Precision.

### Scenario coverage
Scenario coverage:
Tests included base fact questions,
limited-memory retrieval, edited memories, emotional understanding,
and keeping avatar actions aligned with dialogue.

### Insights
Insights:
A small set of base facts plus richer conversation
context outperformed both minimal context and overly long prompts.

## Impact and learnings
Impact and learnings

### Practical agent design
Practical agent design:
Created a reusable pattern for
memory-aware LLM agents that can extend to other social VR or game
environments.

### Instrumentation for agents
Instrumentation for agents:
CSV-based logging of timing and
quality metrics made it easier to debug speech-to-text latency and
long model response times.

### Human-centered evaluation
Human-centered evaluation:
Learned how to combine automatic
judging by LLMs with human ratings to tune parameters for believable
agents.

### Collaboration in research teams
Collaboration in research teams:
Partnered with faculty and a
multi-campus team, contributing retrieval design, evaluation code,
and figures for the CHI extended abstract and poster.
