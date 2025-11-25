---
source: deepdives/interactive_apps/flash_chat/flash_chat.html
title: FlashChat – Student Chat Application for Campus
type: page
---

deepdives/interactive_apps/flash_chat/flash_chat.html

# FlashChat – Student Chat Application for Campus
FlashChat – Student Chat Application for Campus
← Back to Projects
Interactive Applications

# FlashChat – Student chat application for Campus
FlashChat – Student chat application for Campus
Cross-platform mobile app built with Flutter and Firebase for students
to swap quick updates, ask questions, and hang out in topic-based
rooms, without the clutter of public social media.

### Tech Stack
Tech Stack:
Flutter SDK, Dart, Firebase Core, Cloud Firestore, Cross-platform
Secure login screen with subtle background visuals.
Conversation view highlighting quick replies and friendly avatars.

## Quick insights
Quick insights

### Goal
Goal:
A 2-week quick sprint to give university students a lightweight
place to chat in focused rooms, share campus updates, and ask
questions without needing to trade phone numbers or social media
handles.

### Approach
Approach:
Built a real-time group messaging app using Flutter and Firebase
where users register and login with email and join pre-defined rooms
like Campus Updates, Career Discussion, Unpopular Opinions and
Programming Help.

### Result
Result:
Delivered a responsive Android app with real-time Firestore-backed
chat, handling multiple clients, consistent performance across
devices, and a UI simple enough for first-time smartphone users.

## System overview
System overview
FlashChat is structured as a thin Flutter front end on top of Firebase
backend services. All messaging is live, with Firestore handling
persistence and real-time streams, which keeps the client code small
and focused on UI and state management.

### Authentication and privacy
Authentication and privacy:
Uses Firebase Authentication email and password sign in. Only the
user email is stored as an identifier in chat messages, which keeps
the profile surface minimal while still allowing basic identity in
rooms.

### Real-time messaging
Real-time messaging:
Messages are added to a room collection in Cloud Firestore and
streamed back to all subscribed clients using real-time listeners.
This keeps chats synchronized across devices without manual polling.

### Room model
Room model:
Each chat room is a Firestore document with its own messages
subcollection. Rooms are currently curated to keep content focused.
Students can quickly hop between rooms.

### Client deployment
Client deployment:
The Flutter app is compiled to an Android APK and uploaded to google
drive, so that testers and classmates can download and install
builds during development.

## Student-centered features
Student-centered features

### Topic rooms for campus life
Topic rooms for campus life:
Separate rooms for programming help, physics questions, career
advice, sci-fi discussions, and general hangouts. This reduces noise
and lets students pick the social context they want.

### Simple, friendly UI
Simple, friendly UI:
Chat bubbles, clear timestamps, and large buttons make the app
approachable. Animations and subtle colors highlight which messages
are yours versus others.

### Real-time delivery
Real-time delivery:
Messages appear instantly across clients using Firestore streams,
creating the feel of a live group chat rather than delayed forum
posts.

### Low-friction onboarding
Low-friction onboarding:
New users only need an email and password to start chatting. There
is no complex profile form or friend-request flow to get in the way.

### Lightweight and portable
Lightweight and portable:
The app is small enough to install quickly and runs smoothly on
lower-end Android devices and on iOS platforms as well, which was
important for a mixed hardware student population.

## Screen tour
Screen tour
Registration flow for new students.
List of chat rooms for different topics like career, physics, and
casual chats.
Career Discussions room - students ask about future prospects in
computer science.

## Development process
Development process
The project was scoped as a two week build, split into learning,
implementation, and testing phases.

### Days 1 - 4
Days 1 - 4:
Learned Dart, the Flutter widget model, and the project file
structure. Set up the Flutter SDK, Android tooling, and Firebase
project.

### Days 5 - 8
Days 5 - 8:
Built the initial UI, wired up navigation between login, room list,
and chat screens, and connected Firebase Authentication plus Cloud
Firestore reads and writes.

### Days 9 - 14
Days 9 - 14:
Tested on multiple screen sizes and phones, improved performance,
refined animations, and adjusted layouts so that chat bubbles and
input fields behave correctly on different devices.

## Impact and learnings
Impact and learnings

### Real-time mobile experience
Real-time mobile experience:
Built a production-style real-time chat using Firebase Firestore
listeners, which later informed how I structure data and indexes for
other mobile projects.

### Student community focus
Student community focus:
Learned how topic-based rooms and a simple, low-friction UI can
encourage more shy students to participate and ask questions that
might not show up on public social media.

### Future improvements
Future improvements:
Planned enhancements include one-to-one DMs, media sharing, custom
room creation, usernames instead of raw emails and stronger
end-to-end privacy controls.
