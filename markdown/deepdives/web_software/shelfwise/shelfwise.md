---
source: deepdives/web_software/shelfwise/shelfwise.html
title: Shelfwise – Personal Reading Companion
type: page
---

deepdives/web_software/shelfwise/shelfwise.html

# Shelfwise – Personal Reading Companion
Shelfwise – Personal Reading Companion
← Back to Projects
Web and Software
Shelfwise – Personal Reading Companion
A React and GraphQL powered personal library to track books, capture
notes, auto summarize reflections and surface genre based
recommendations inside a clean reading dashboard.

### Timeline
Timeline:
Aug 2020 - Sep 2020

### Tech Stack
Tech Stack:
React.js, Apollo Client, Node.js, Express, GraphQL (graphql-http),
JavaScript, BERT embeddings
Shelfwise library view showing the collection on the left and a
detailed panel on the right with genre, notes summary and more from
the same author.

### Quick Insights

### ## Quick Insights
## Quick Insights:

### Quick Insights
Quick Insights:

### Problem
Problem:
I wanted a focused place to track what I read, keep short notes and
quickly recall why a book mattered, along with a few smart
suggestions for what to read next.

### Solution
Solution:
Built Shelfwise, a small personal reading companion where each book
has notes, a BERT based notes summary and inline recommendations
driven by cosine similarity over book embeddings.

### Result
Result:
The app turns scattered reading notes into a structured library. A
single GraphQL query powers the main view with book details,
summaries and recommendations, which keeps the React code simple and
avoids multiple REST calls.

## Introduction
Introduction
Shelfwise is a personal library application that helps me track my
reading and capture lightweight reflections. Each entry includes a
title, genre, author and notes. The app highlights a single current
selection and presents the notes summary and suggested next reads side
by side.
The project is built as a small full stack system: a React.js frontend
with Apollo Client talks to a Node and Express backend that exposes a
GraphQL API. Data is stored in memory for easy demo and testing, which
keeps the focus on schema design, resolver logic and UI flow rather
than infrastructure.

## Demonstration
Demonstration
Add book flow with fields for title, genre, author and notes.
Notes are later summarized into a short highlight block for quick
recall.

## Architecture and GraphQL design
Architecture and GraphQL design
Shelfwise uses GraphQL as the main boundary between the React frontend
and the Node backend. The main screen needs a mix of base data and
derived data: raw notes, a BERT based summary and a list of similar
books. GraphQL lets the UI fetch all of that in a single, strongly
typed query.

### Why GraphQL fits this project
Why GraphQL fits this project
The main view can fetch
all data for a selected book in one round trip
: title, genre,
author, notesSummary and recommendations.
Derived fields live behind resolvers.
The backend owns how
summaries and recommendations are computed, while the client only
asks for the fields it needs.
The schema doubles as a contract: adding future fields like rating
or reading status is a small, discoverable change.

### Summarisation and recommendations
Summarisation and recommendations

### Notes summarisation with BERT
Notes summarisation with BERT:
when a user saves notes, the backend encodes the text using a
sentence BERT model and scores sentences by importance. The top
sentences are stitched into a short notesSummary that fits naturally
into the UI.

### Recommendations via cosine similarity
Recommendations via cosine similarity:
for each book, an embedding is computed from its title and a short
description using the same BERT encoder. These embeddings are
compared against a small open dataset of books (a filtered slice of
the Goodbooks-10k dataset), and the closest matches by cosine
similarity are returned as recommendations, excluding the current
title.

## Representative GraphQL schema snippet
Representative GraphQL schema snippet
// backend/schema.js (excerpt)
const BookType = new GraphQLObjectType({
name: "Book",
fields: () => ({
id: { type: new GraphQLNonNull(GraphQLID) },
title: { type: new GraphQLNonNull(GraphQLString) },
genre: { type: new GraphQLNonNull(GraphQLString) },
notes: { type: GraphQLString },
notesSummary: {
type: GraphQLString,
resolve: (book, args, ctx) =>
ctx.services.summarizer.summarizeWithBert(book.notes),
},
recommendations: {
type: new GraphQLList(BookType),
resolve: (book, args, ctx) =>
ctx.services.recommender.similarBooksByCosine(book),
},
}),
});
// Query { books, book(id: ID!) } and Mutation { addBook(...) } sit on top
// of this type and are used by the React UI via Apollo Client.
The Book type exposes both stored fields and derived fields. React
components can request title, genre, notesSummary and recommendations
in one query, while the backend hides the BERT based summarisation and
cosine similarity logic inside services.

## Key outcomes and learnings
Key outcomes and learnings
Shelfwise is a small but well rounded project that combines UI work,
schema design and lightweight ML to improve the reading experience.
Designed a GraphQL schema that keeps the React components simple by
centralising summarisation and recommendation logic on the server.
Built a responsive reading dashboard that makes it easy to add
books, review notes and decide what to read next in one place.
Structured the backend so that the in memory data store can later be
swapped for a persistent database without changing the GraphQL
contract.
Used BERT embeddings and cosine similarity to add ML driven
behaviour without complicating the frontend or the API surface.
