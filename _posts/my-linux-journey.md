---
title: 'My journey trough Linux'
abstract: 'My path trough Linux coming from somebody who was scared of the command line to somebody who lives in it'
created: '2020-01-18'
tags:
- Linux
- Career
---

At this point I have about two and a half years of experience in Linux, I have gone from being scared of the command line and not even knowing how to change directory to comfortably using the terminal and even preferring it over a user interface.
In this blogpost I'll explain my journey trough Linux, what I learned and what I would change.


## Humble beginnings
My first true Linux experience was in my first year at Howest, we had a module entirely for Windows and Linux, the point here was to learn us how to use Powershell and Bash.
From the start I preferred using Bash, although it was mostly because of the shorter commands.

I don't have a lot to say about this period as this was me learning the absolute basics.
As I had to learn more about Linux for my studies I started to appreciate it a lot, I still couldn't exclusively use a command line, but I was getting much better at using it.
Near the end of the module I felt comfortable enough to start dualbooting.
I decided to dualboot my Windows 10 installation with Ubuntu, the goal was for me to speed up my learning by forcing myself to use Linux as much as possible.
This approach really helped me and I'm glad I did this.

Eventually I started to boot into Linux less as I had two main issues with it:

I wanted the latest builds of software \
I was getting sick of using GNOME 

Looking back on it the second issue really wasn't that bad, I could always install a new window manager, I just didn't know I could yet.
The first issue however is very valid, you see I was missing out on a lot of new features in some software I was using at the time, on top of that I really didn't like setting up extra repositories for software that wasn't in the base repo.


## A big leap
After some research I found this really cool distro called Manjaro, you've probably heard of it but if you haven't it's based on Arch Linux.
The reasons I picked it were simple:

Up to date software \
I wanted to use KDE instead of GNOME \
The existence of the AUR

I don't think I need to explain the first two reasons, but I will explain why the AUR almost single-handedly convinced me to swap to Manjaro.
You see AUR is short for Arch User Repository, it's basically a huge repo made by the community, meaning that a lot of software that you would normally have to build and configure yourself already exists in the AUR.
It comes with some downsides though, mostly the fact that a user can technically write a malicious PKGBUILD file which installs some malicious software, I knew the risk at the time but mostly ignored it (but you shouldn't).

This is where things really started to pick up as I started watching many Linux YouTubers.
I started watching Luke Smith and Distrotube, both of which used Arch (or in the case of Luke it's actually Artix).
My next goal had been decided, I wanted to install Arch and learn to use and customise a tiling window manager.
This goal was out of reach for now, but after another 3 months I would do my first installation of Arch Linux on real hardware.

## Arch Linux
I don't think I need to say this but I messed up my first installation, I didn't properly set up my Wi-Fi and didn't have enough knowledge yet to repair it, this lead to my first reinstall.
That same day I tried it again, this time I had a working Arch Linux installation.
But there was still a problem, I had no idea how to decide on my window manager, all I knew was that I wanted a tiling window manager.

So like anybody looking to try something new I visited r/unixporn and I saw a really nice setup by elenapan, she made this incredible setup in AwesomeWM.
Again, without doing much research I installed awesome and started learning to use it, first I had to figure out the keybinds.
After figuring out the keybinds I started learning how to use the LUA programming language as this is what you use to write your AwesomeWM config.
Eventually I would start writing my own config, most of which were modified versions of things I saw on unixporn.
After four months I finally had a setup that I was proud of, it felt comfortable to use and I was looking for a new challenge.

## VIM
Technically we're going out of order here as I started learing VIM around the same time I started using Manjaro but let's be honest, you're never done learning VIM.
I had decided to learn VIM because I saw many videos of people proficient in it and I was looking for a good terminal based text editor to use during installations.

It took me a good two weeks to finally get used to the modal design of VIM and to start using hjkl instead of the arrow keys.
Over a long period of time I would learn more keybinds and ways to speed up my development, however I can't say much about this process as it happened over such a long period of time.

## BSPWM
We're almost done with my distro/WM hopping shenanigans now, you see after configuring AwesomeWM I started running into some issues.
First off my config files were an absolute mess and since so much of it was actually coded by somebody else I barely understood how it worked.
On top of all of this the config files were so bloated and poorly written that AwesomeWM was starting to become slow.
Now, I want to note that this was all because of my idiocy, not because of AwesomeWM itself, if it looks interesting to you please give it a try.

Anyways, the combination of all of these issues got me demotivated and made me want to swap to something else entirely.
This new Window Manager would be BSPWM combined with Polybar for my bar.
I really liked how easy it was to create rules in BSPWM and I actually didn't modify that much when I started using it.
This is the point when I have around 6 months of experience using Arch Linux, I had learned to use an Arch USB and chroot into the system to fix critical issues and I had become fully comfortable in it.
I would mess around with other distributions but would always come back to Arch.

Anyways I would slightly modify BSPWM for about half a year and start learning to use Doom Emacs (mostly thanks to Distrotube).
But all good things must come to an end, you see after being so comfortable in this environment for about half a year I was looking for a change.
This change would lead us to the point where I am today.

## Living the Suckless life
Yeah, I use Suckless tools now...
I started working towards creating my perfect environment and during this I started messing around with more Suckless tools.
I had been using dmenu ever since I started using tiling window managers and had starting moving away from my previous terminal (Alacritty) towards the Simple Terminal (ST).
The obvious next step for me was moving further into the wonderful world of Suckless software, I did so by changing over to the Dynamic Window Manager (DWM).

So that's where I'm at today, I'm still working on my DWM setup and while my ST setup is mostly complete I still have some work to do.
If you're interested [this is my DWM setup](https://github.com/Akibroszz/dwm) and [this is my ST setup](https://github.com/Akibroszz/st) I should note that the ST setup currently does not compile, I'll be fixing that issue when I get the time.
