---
title: 'Bacharu'
abstract: 'A fantasy machine written in .NET Core.'
tags:
- .NET
- LLC
---

Bacharu is a virtual machine written in .NET Core 5, it's a personal project made to increase my knowledge in low level computing.
At this point a functional CPU exists and can run some basic machine code, an example program can be found in the Bacharu class.
There are a lot of instructions planned (see the CpuInstructions enum in the Cpu.cs file) but most aren't implemented yet.

NOTE:
This project is currently on hold until YaRust8 is completed, while I am proud of Bacharu I have decided that a rewrite will be required.
I have not yet decided if the rewrite will be done in Rust or if I will keep the program in C#.

TODO:
- Finish the instruction set
- Implement a stack
- Create a memory mapper
- Easier way to write assembly code for the machine (parse asm files)
- Add interrupts
- Draw graphics to the screen (no idea how to do this yet)
- Clean up code
