---
source: deepdives/interactive_apps/unity_games/unity_games.html
title: Unity Gameplay Suite — Glitch Garden, FPS Survivor, Space Defender, Block
type: page
---

deepdives/interactive_apps/unity_games/unity_games.html

# Unity Gameplay Suite — Glitch Garden, FPS Survivor, Space Defender, Block
Unity Gameplay Suite — Glitch Garden, FPS Survivor, Space Defender, Block
Breaker
← Back to Projects
Interactive Applications, Prototypes & Games

# Unity Gameplay Suite
Unity Gameplay Suite
A compact suite of four Unity projects that highlight core gameplay
programming, game loops, and clean scene management. Focus on readable
C#, reusable components, and clear player feedback. Each project ships
with a short gameplay demo.

### Tech Stack
Tech Stack:
Unity, C#, Animator, NavMesh,
ScriptableObjects, UI Toolkit

## Quick insights
Quick insights

### Goal
Goal:
Demonstrate gameplay engineering across tower defense,
First Person Shooter and arcade physics.

### What stands out
What stands out:
Clear scene flows, Object-oriented
programming, modular scripts, and UI feedback loops.

### What you will see
What you will see:
Short videos, concise architecture notes,
and the key systems that drive each game.

## Glitch Garden (Plants vs Zombies style) — Hero
Glitch Garden (Plants vs Zombies style) — Hero
Lane defense with timed waves, resources, and defender placement.

### Core loop
Core loop:
Place defenders on a grid with sun as currency
while different attackers come down the lanes.

### Key systems
Key systems:

### LevelController
LevelController:
tracks win/lose conditions and ends the
level cleanly.

### GameTimer
GameTimer:
stops enemy spawns when the countdown
finishes.

### Spawner (lane-based)
Spawner (lane-based):
emits attackers in the correct row.

### Resource store
Resource store:
manages sun currency and spending.

### DefenderSelector/DefenderSpawner
DefenderSelector/DefenderSpawner:
handles selecting units
and placing them on the grid.

### Combat scripts
Combat scripts:

### Defender detectors
Defender detectors:
sense attackers in-lane and trigger
shots.

### Projectile
Projectile:
moves forward, hits enemies, and applies
damage.

### Attacker/Health handlers
Attacker/Health handlers:
move, animate, and take damage
until defeated.

### UX polish
UX polish:

### SceneManager
SceneManager:
controls splash screen and menu navigation.

### MusicManager (singleton)
MusicManager (singleton):
keeps background audio playing
between scenes.

### GameHealthManager
GameHealthManager:
tracks lives and shows win/lose UI.

### Unity features used
Unity features used:
Animator-driven attacks and deaths.
Prefab spawners and ScriptableObject data where helpful.
Basic audio mixing and lightweight VFX.

## FPS Survivor — three weapons, AI waves
FPS Survivor — three weapons, AI waves
Gameplay with NavMesh AI, weapon switching, hitscan and projectile
combat.

### Note
Note:
Built by following a FreeCodeCamp tutorial to explore
FPS architecture and AI patterns in Unity.

### Player systems
Player systems:

### CharacterController movement
CharacterController movement:
handles walking and physics
grounding.

### LookMovement
LookMovement:
reads mouse input to rotate camera and gun.

### SprintCrouch
SprintCrouch:
toggles speeds and stamina for sprint and
crouch.

### PlayerAttack
PlayerAttack:
fires hitscan rays or projectiles based on
the equipped weapon.

### Weapons
Weapons:

### WeaponManager
WeaponManager:
swaps active WeaponHandler and shared
data.

### WeaponHandler (per gun)
WeaponHandler (per gun):
controls fire mode, aim state,
recoil, and muzzle VFX/SFX.

### Enemies
Enemies:

### FSM (Finite State Machine)
FSM (Finite State Machine):
a structured way to swap
between Patrol, Chase, and Attack states so enemies react
predictably.

### EnemyController
EnemyController:
FSM that patrols, chases, and attacks
using NavMeshAgent.

### EnemyAnimations
EnemyAnimations:
syncs FSM states to animator parameters.

### EnemySounds
EnemySounds:
plays audio cues for footsteps, attacks, and
hits.

### Spawning and lifecycle
Spawning and lifecycle:

### Spawner
Spawner:
keeps enemy counts, spawns waves, and respawns
after deaths.

### HealthManager
HealthManager:
receives damage, plays hit/death feedback,
and cleans up enemy objects.

## Space Defender — wave shooter with pathing
Space Defender — wave shooter with pathing
ScriptableObject waves, waypoint paths, score HUD, scrolling
backdrop.

### Core loop
Core loop:
Player dodges and fires while enemies spawn in
waves along predefined waypoint paths.

### Wave design
Wave design:

### WaveConfig (ScriptableObject)
WaveConfig (ScriptableObject):
stores prefab, count,
spawn rate, and movement path.

### WaveSpawner
WaveSpawner:
reads configs, instantiates enemies, and
marches them along waypoints.

### Combat scripts
Combat scripts:

### Player laser + Damage
Player laser + Damage:
fires projectiles that apply
health reduction on hit.

### Enemy shooters
Enemy shooters:
fire on timers and grant score when
destroyed.

### LaserShredder
LaserShredder:
removes off-screen projectiles to keep the
scene clean.

### UX and flow
UX and flow:

### SceneManager
SceneManager:
controls menu flow and end-game
transitions.

### MusicManager/GameSession (singletons)
MusicManager/GameSession (singletons):
persist music,
score, and difficulty across scenes.

### BackGroundScroll
BackGroundScroll:
scrolls the starfield to imply motion.

## Block Breaker — classic arcade with scene progression
Block Breaker — classic arcade with scene progression
Ball and paddle with damage states, score, and level flow.

### Core loop
Core loop:
Anchor ball to paddle until first click, then
break blocks and advance levels. Missed ball triggers game over
scene.

### Key scripts
Key scripts:

### Initiate
Initiate:
keeps the ball attached to the paddle, then
launches it with slight randomness on click.

### PaddleMovement
PaddleMovement:
reads player input and clamps the paddle
within camera bounds.

### BlockManager
BlockManager:
tracks block hit points, swaps sprites,
spawns sparkles, and updates score and breakable counts.

### Progression
Progression:

### LevelManager
LevelManager:
counts remaining breakables and persists
score across scenes.

### SceneLoader
SceneLoader:
loads the next scene or game-over when
conditions are met.

### ScoreDisplay
ScoreDisplay:
shows totals when the player loses.

### SpeedSlider
SpeedSlider:
adjusts global time scale for slow or fast
play.

### Unity features used
Unity features used:
Collision events, AudioSource SFX, scene
management, DontDestroyOnLoad for persistent state.

## Why it matters
Why it matters

### Breadth
Breadth:
Shows fluency across multiple gameplay patterns
including tower defense, FPS, wave shooter, and arcade physics.

### Engineering habits
Engineering habits:
Consistent scene flow, state management,
and modular components that scale to new mechanics.

### Player experience
Player experience:
Focus on readable feedback through UI,
audio cues, animations, and reliable inputs.
