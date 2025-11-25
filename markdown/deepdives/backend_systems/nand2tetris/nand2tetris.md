---
source: deepdives/backend_systems/nand2tetris/nand2tetris.html
title: From Nand to Tetris: Building a Computer and Compiler from Scratch
type: page
---

deepdives/backend_systems/nand2tetris/nand2tetris.html

# From Nand to Tetris: Building a Computer and Compiler from Scratch
From Nand to Tetris: Building a Computer and Compiler from Scratch
← Back to Projects
Backend & Distributed Logic
From Nand to Tetris: Building a Computer and Compiler from Scratch
Two–part systems project where I built a full 16-bit computer,
assembler, virtual machine, and compiler from primitive NAND gates.
The stack ends in a high-level programming language called Jack that
runs on the hardware I designed using an emulator.
I completed all projects for both Coursera courses
“Build a Modern Computer from First Principles: Part 1 and Part 2”
, submitted every assignment, scored
98%
overall, and earned
both certifications.

### Tech Stack
Tech Stack:
Hardware Description Language (HDL), Hack assembly, Java, shell
tooling, hardware and VM emulators
The full stack I implemented: from a single NAND gate to logic
chips, CPU, assembler, VM, and Jack compiler running user programs.

## Quick insights
Quick insights

### Goal
Goal:
Design a full computer system from the logic-gate level and build a
usable high-level programming language called Jack with it's own
compiler and toolchain that runs games and apps on that hardware.

### Scope
Scope:
Implemented over
30+
hardware chips in HDL, a
16-bit Hack CPU and memory system
, a two-stage software stack
(assembler and VM translator), and a multi-pass Jack compiler.

### Outcome
Outcome:
The final system runs full Jack programs such as Tetris and a simple
operating system (arrays, math library, memory manager), compiled by
my Java tools from Jack to machine language that executes on the
hardware I built (via emulation).

## Hardware platform: from NAND to a 16-bit computer
Hardware platform: from NAND to a 16-bit computer
Part 1 focused on creating the hardware stack using the course HDL.
Starting from a single NAND primitive, I implemented combinational and
sequential chips and composed them into a usable computer.

### Core logic
Core logic:
Built gates such as NOT, AND, OR, MUX, and
adders, then composed them into an
ALU
(Arithmetic Logic
Unit) supporting arithmetic, bitwise operations, and zero/negative
flags.

### Stateful components
Stateful components:
Implemented Register, RAM8/64/4K/16K,
counters, and a screen-mapped memory unit using flip-flops and
clocked logic.

### CPU and computer
CPU and computer:
Wired the ALU (Arithmetic Logic Unit),
registers, and instruction decoder into a Hack CPU supporting
A-instruction and C-instruction i.e. Address and Compute
instructions plus conditional jumps, then added ROM and memory to
form the complete computer chip.

### Example: ALU snippet and behavior
Example: ALU snippet and behavior
The ALU combines configurable input negation, zeroing, and function
selection. Here is a simplified HDL excerpt (names adjusted for

### brevity)
brevity):
// Simplified ALU style HDL
CHIP ALU {
IN  x[16], y[16],
zx, nx, zy, ny, f, no;
OUT out[16], zr, ng;

### PARTS
PARTS:
Mux16(a=x, b=false, sel=zx, out=xz);
Not16(in=xz, out=xn);
Mux16(a=xz, b=xn, sel=nx, out=x1);
Mux16(a=y, b=false, sel=zy, out=yz);
Not16(in=yz, out=yn);
Mux16(a=yz, b=yn, sel=ny, out=y1);
Add16(a=x1, b=y1, out=sum);
And16(a=x1, b=y1, out=andv);
Mux16(a=andv, b=sum, sel=f, out=out0);
Not16(in=out0, out=out1);
Mux16(a=out0, b=out1, sel=no, out=out);
Or16Way(in=out, out=any);
Not(in=any, out=zr);
And(in=out[15], in2=true, out=ng);
}
With these control bits, higher-level instructions like D=D+M or M=!M
are implemented simply by choosing the correct input parameter
combination.

## Assembler: Hack assembly to machine code
Assembler: Hack assembly to machine code
Once the computer chip worked in simulation, I wrote a two-pass
assembler in Java for the Hack assembly language. It resolves labels
and variables, then emits 16-bit binary instructions.

### Two-pass design
Two-pass design:
First pass scans labels (for example,
(LOOP)
) and records their ROM addresses. Second pass
encodes A and C instructions into their binary form.

### Symbol table
Symbol table:
Pre-populated with predefined registers
(R0–R15), pointers (SP, LCL, ARG), screen and keyboard addresses,
then extended with user variables starting at address 16.

### Assembler encoding example
Assembler encoding example

### Input assembly
Input assembly:
// Simple loop
@i
M=1
(LOOP)
@i
M=M+1
@10
D;JLT
@LOOP
0;JMP

### Generated machine code
Generated machine code:
0000000000010000   // @i (allocated at 16)
1110111111001000   // M=1
0000000000010000   // @i
1111110111011000   // M=M+1
0000000000001010   // @10
1110001100000100   // D;JLT
0000000000000010   // @LOOP (ROM address 2)
1110101010000111   // 0;JMP
Running this binary on the hardware simulator shows the register and
RAM state changing as expected, proving the assembler and CPU agree on
the instruction set.

## VM translator: stack machine to Hack assembly
VM translator: stack machine to Hack assembly
Part 2 starts the software hierarchy. I implemented a VM translator in
Java that converts a high-level stack-based VM language into Hack
assembly. This layer decouples Jack from the hardware and introduces
function calls and static segments.

### Arithmetic and logic
Arithmetic and logic:
Commands such as
add
,
sub
,
eq
,
lt
, and
gt
pop values from the stack, compute, and push results
using small assembly templates.

### Memory segments
Memory segments:
Implemented pointer logic for
local
,
argument
,
this
,
that
,
temp
,
pointer
, and
static
segments.

### Functions and calls
Functions and calls:
Implemented call frames following the
Hack VM spec: save caller state, set ARG and LCL, jump to callee,
and restore on return.

### VM to assembly example
VM to assembly example

### Input VM snippet
Input VM snippet:
function Simple.addTwo 0
push argument 0
push constant 2
add
return

### Generated Hack assembly (excerpt)
Generated Hack assembly (excerpt):
// function Simple.addTwo 0
(Simple.addTwo)
// full generation for "push argument 0"
@ARG
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// similar generation for push constant 2 command
// similar generation for add command
These templates are reused across all Jack programs, making the VM
translator a key abstraction boundary between language and hardware.

## Jack compiler: high-level language on custom hardware
Jack compiler: high-level language on custom hardware
The final stage was a full compiler pipeline for the Jack language,
written in Java. Jack is a Java-like language with classes, methods,
fields, arrays, and basic control flow. The compiler targets the stack
VM, which my translator then lowers to Hack assembly.

### Front-end
Front-end:
A tokenizer converts characters into tokens
(keywords, identifiers, symbols, integers, strings). A recursive
descent parser (CompilationEngine) walks the grammar and emits VM
commands while constructing and consulting symbol tables.

### Symbol tables
Symbol tables:
Separate tables for class-level and subroutine
scope track identifiers, their kind (field, static, local,
argument), and index. This allows fields of each instance to map
cleanly to memory segments.

### Code generation
Code generation:
Control structures such as if/while use
generated labels, while expressions and terms emit stack operations
that match the VM semantics.

### Example: compiling a Jack method
Example: compiling a Jack method

### Input Jack code
Input Jack code:
class Counter {
field int value;
method void inc(int delta) {
let value = value + delta;
return;
}
}

### Generated VM code
Generated VM code:
// Declare method inc with 1 local variable
function Counter.inc 1
// push this.value
push argument 0
// Set pointer 0 → 'this'
pop pointer 0
// Push current this.value
push this 0
// Push the increment amount (delta)
push argument 1
// Compute this.value + delta
add
// Store result back into this.value
pop this 0
push constant 0
return
// Return 0 (dummy return value for void-like method)
Running this through the VM translator and assembler produces Hack
machine code that manipulates the
value
field stored in
the heap area controlled by the OS memory manager.

### Example: parsing expressions in Java
Example: parsing expressions in Java
The recursive descent compiler uses small focused methods that mirror
the grammar. For example, expression compilation handles operator
precedence and emits VM operations as it walks the parse tree.
// Simplified Java-style excerpt
private void compileExpression() {
compileTerm();
while (tokenIsOneOf("+", "-", "*", "/", "&", "|", "<", ">", "=")) {
String op = currentToken();
advance();
compileTerm();
writeArithmetic(op);  // maps '+' to 'add', '<' to 'lt', etc.
}
}
This design keeps the compiler readable and makes it easy to trace
from Jack source through VM and assembly when debugging.

## End-to-end pipeline
End-to-end pipeline
With the full pipeline in place, I compiled and ran several Jack
applications, including the supplied Tetris, a simple OS API, and my
own small programs that manipulate memory, draw graphics, and handle
keyboard input.

### End-to-end flow
End-to-end flow:
Jack source (User Input Programming
Language) → Java Compiler → VM code → Java VM translator → Hack
assembly → Java assembler → 16-bit machine code → executed on the
computer emulated from NAND gates. The Compiler, VM translator and
assembler were built from scratch in Java.

### Debugging
Debugging:
Used the hardware and VM simulators to step
through instructions, inspect RAM and stack, and validate that
higher-level bugs were not caused by lower-level hardware mistakes.

## Impact and learnings
Impact and learnings

### Systems thinking
Systems thinking:
Gained a concrete understanding of how
compilers, virtual machines, and hardware interact, instead of
treating them as black boxes.

### Compiler and language design
Compiler and language design:
Implemented a real compiler
front-end and back-end, including lexical analysis, parsing, symbol
tables, and code generation for a custom language.

### Hardware intuition
Hardware intuition:
Designing the ALU, CPU, and memory from
primitive gates sharpened my intuition for performance, instruction
set design, and the cost of different operations.

### Reliability through abstraction
Reliability through abstraction:
Each layer (HDL chips,
assembler, VM, compiler) had a clear contract and test suite, which
made debugging manageable despite how much was built from scratch.
