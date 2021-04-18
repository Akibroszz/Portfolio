---
title: 'Making my portfolio'
abstract: 'How I created my portfolio site'
created: '2020-01-18'
tags:
- Webdev
- Career
---

# Introduction
I want to start the blogpost off by saying that I am not a web developer.
I don't know how to make a clean website, I don't know how to decide between one of the 500 Javascript frameworks, and I have never written a line of Typescript before.
Yet here we are, a few months later with a semi good-looking website and a mostly functioning blog system.
All of this hosted on Github for the world to see my god awful code (I'm serious).
Yet I'm proud of this project, and I hope people can learn from my mistakes and maybe even from my source code (although you probably shouldn't, it's pretty messy).

# How not to start a project
So let's start by going over the tools I used for this project, when I started I was super motivated and decided to create my website using Vue.js.
A friend of mine had been singing the praises of this framework, I got started with learning Vue that same day.
I also stopped using Vue that same day, I just didn't see the point in using a framework when I needed a super simple site.
Let's be honest here, this site is a static html page that loads in my articles and blogposts, those blogposts are then written in Markdown and parsed to html.

None of this sounded hard to me, except for the Markdown parsing which honestly sounded extremely difficult.
I had restarted development, this time I went in with a plan.
I would use this tool I found online called gray-matter to parse my Markdown files, then I'd use remark-html to turn it into html code.
Development started that same day and ended about 4 hours later, I gave up on the project, used an online site-builder and hosted that online.

# How you should start a project
You see, the reason why I abandoned the project twice was a lack of focus, cool I knew how to parse Markdown but I didn't even know what I wanted on my site.
Hell, I didn't even know how my site would look yet, I was only writing Javascript code trying to get some core functions working.
I absolutely hated the site I had online using the tool but at least it worked, looked okay and didn't require much effort.

After all of this I went in to give it one more shot, but this time I planned everything out.
I started sketching the layout of my website and looking into color palettes, I had been messing around with the Nord colorscheme in my terminal and IDE and decided to use that as a base for my website.
Next up I looked at other people their portfolio, what features did they have, what features did they not have, how did they design their site, etc.
Eventually I had mocked my entire site using Adobe XD, now it's time to figure out my toolset.

I knew I wanted to minimise the amount of code I had to write, I also knew I wanted to write blogposts is Markdown.
Finally, I knew that this site had to contain at least one innovative technology I believe in, I went searching for cool web technologies and stumbled on Next.js.
Next.js was this awesome project that would allow the server to render webpages for you, this technology sounded incredible, I knew this would be the framework I would use.
I started following Next.js tutorials and I made sure to split my tutorial project from my portfolio project.

# Developing the site
My motivation was at an all-time high, I went through the entire Next.js documentation in about a weekend and starting turning my sketches into actual html and css.
I still didn't fully understand how Next worked but every time I ran into an issue I would learn more and more about the framework.
When I was finally happy with the home page I started to work on converting my Markdown to html, Next had a wonderful tutorial on this which made this pretty effortless.

TODO

# SEO
Oh, you thought I was done after the site was (mostly) finished?
Nah, we still have some work to do, you see my site didn't pop up when you googled my name and I wanted to change that.
I had heard of SEO before, but I never took the time to learn about it.

TODO

# Conclusion
This was a short blogpost, but I genuinely don't know what else to say, the site is mostly finished (I still have some stuff I want to do) and I went over the entire development process.
You can check the entire project [on my github](https://github.com/Akibroszz/Portfolio), I didn't really use git right for this project, but I do hope you can learn something from the code.
Finally, I want to leave you with the most important lesson I learned from this project; don't rush into a project, take it slow, plan things out and don't get frustrated when something doesn't work.