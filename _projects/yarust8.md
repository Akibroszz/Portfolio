---
title: 'YaRust8'
abstract: 'Yet another Chip8 emulator written in Rust.'
created: '2021-05-10'
tags:
- Rust 
- LLC
---

Yet another Chip8 interpreter written in Rust.

![Screenshot of the IBM test rom](/static/images/projects/yarust8/ibm_rom.jpg)

This project is what I'm currently working on and spending most of my programming time on.

YaRust8 is my first attempt at writing a real emulator/interpreter and is my first time writing a full Rust project.
On top of this YaRust8 is using SDL2 which is a framework I have never worked with before.

# Progress

## Short term goals
* Create a nice debug screen using ImGui.
* Add an implementation for all opcodes.
* Allow users to choose ROMs instead of requiring a code edit.
* Force the interpreter to run at 60hz.
* Code cleanup.

## Long term goals
* Sound support.
* Super Chip support.

## Stretch goals
* Fully modular system (since certain alternate versions use slightly different opcodes)
* Figure out how to export this to WebAssembly.

# Resources
* [Cowgod's Chip8 Technical Reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)
* [Tobias V. Langhoff's guide to making a CHIP-8 emulator](https://tobiasvl.github.io/blog/write-a-chip-8-emulator/)
* [Emulating a Computer by River Gillis, helped me to get started](https://river.codes/emulating-a-computer-part-1/)
