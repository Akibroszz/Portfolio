---
title: 'BSidesBOS2020 Write-up'
abstract: 'Quick showcase of BSidesBOS and explaining my preparation for my first CTF'
created: '2020-01-18'
tags: 
- Security
- CTF
---

BSidesBOS was the first online CTF I took a part in, I had no idea what to expect or even what skill level I should take on.
During the CTF I decided to focus on getting the warmups done and getting a web challenge done if I had time left.
This blog will summarise my experience, what I learned, contain some small write-ups of the challenges I solved and give some tips on how you can prepare for a CTF.


## Pre-planning
Since this was my first CTF I had no idea what to expect, when I do challenges on HackTheBox or TryHackMe I usually use an Arch Linux VM and install the tools I need on it.
Due to the time limit of a CTF I decided to set up a secondary VM with Parrot OS on it in case my VM broke or in case a package would refuse to build on the Arch machine, luckily for me I never even had to boot the Parrot VM as everything went smoothly.

If you're interested the Arch VM I was using used the Dynamic Window Manager (DWM) by Suckless, I'm a big fan of tiling window managers as they allow me to quickly spawn, kill and move between terminals.
This is not a requirement for a CTF, but I would recommend you to either learn how to use a tiling window manager or learn to use a screen multiplexer like Tmux.
I recommend you to create an environment which is comfortable to work in and in which you can quickly navigate.

I wasn't sure what to expect and didn't prepare a lot of tools on the VM, which is fine as you'll figure out what tools you need during the CTF, you can prepare some basics tools (nmap, gobuster, ...) but even that isn't super necessary.


## Warm-ups
I ended up finishing 6 warmups, these were Baseball, EZBakeOven, KiddiePool, PlayTheHarp, ReadTheRules and Y2K, I felt like all of them were pretty easy except for PlayTheHarp which took me a long time to figure out.


### Baseball
This challenge supplies users with a file which contains the following encoded text.

```json
TzRaVUNVMlRNRTRIQTZMSFBGWkdTNVpTSzVZVU1ZSllIQk5ER00zREdKTkhBVTJWSkJHVkNWMllPRlVFSzMyRE9GTUVNMkNaR0Y1RU1VUlpNUlNHS1JSWE9CQ1VVU1pZSk4ySEFWVFVPVTJGQzJDV000WlUyUVNHSlpBVFNNUT0= 
``` 

This is pretty clearly Base64, we can throw this in a tool like Base64decode or the builtin Linux library but I'll use this challenge to introduce CyberChef.
CyberChef is the single easiest way to deal with known crypto ciphers in my opinion, you can set the cipher as input and use the automatic 

You may have noticed that this is Base64 immediately, we can go through the process of manually deciphering the text, or we can use it as the input in CyberChef which will basically solve the challenge for us.
The text is encoded in Base64, Base32 and Base58. Put the recipe in CyberChef and click on the Magic tool, this will automatically analyse the cipher and figure out what cipher it is.
I think it's important to take note of the encoding type that was used, in case it's one you don't recognise you can research it later.

Anyways, after you decode the input you'll get another cipher, you can use the magic tool again and after three cycles you'll get the flag.
I've attached the solution in CyberChef in case you want to see how the website works.

**flag{wow_you_hit_a_homerun_and_really_ran_the_bases_there}**

![Picture of the CyberChef solution](/static/images/posts/bsidesbos2020/baseball/solve.jpg)


### EZBakeOven
This is an easy challenge but a fun one nonetheless.
When you go on the website you see an oven and the option to bake some cookies, they all seem possible to make except for the magic cookie.
The magic cookie takes 7200 minutes to bake which is 120 hours, this event takes 8 hours so we'll need to find a way to speed up production.

The first thing we should do is open the source code of the webpage and look find out how the baking logic works.
I don't have a screenshot of this sadly enough but the baking time is decided by an API call.
This immediately got some bells ringing, I could see three solutions for this challenge.

Send the API request and modify it before our browser accepts it
Find some way to spoof the API
Figure out how the oven knows how long we've been baking

Solution three is the easiest so let's try that first (spoiler: it's also the solution).
When we check the storage tab in the devtools of our browsers we can see a cookie called in_oven containing a Base64 string.
We can throw that in CyberChef and see that this is JSON data, and most importantly the time object contains the time when we started baking.

![Picture of CyberChef showing the cookie](/static/images/posts/bsidesbos2020/ezbake/solve.jpg)

Ok let's modify this JSON data, use the JSON data as input and change the timestamp to be 5 days or more in the past. 
Then encode it back into Base64, we can now replace our old cookie with this newly forged one.
When this is done we can refresh our browser and suddenly our magic cookie is done.

```flag{you_are_the_master_baker}```


### KiddiePool
KiddiePool is a very short and very interesting challenge, it's also very easy as long as you see the challenge.
When you start the challenge you'll get the following image, it looks like a weird spiral, almost like a ripple effect.

![Picture of challenge](/static/images/posts/bsidesbos2020/kiddiepool/challenge.jpg)

It took me a bit to find out what the challenge was, at first I thought this was a crypto challenge but nothing I threw at it gave me any results.
Later I tried to find the image online but that didn't give any results either.
After a bit of messing around I started to take a better look at the image and I figured out that the spiral contained some words.
If you look closely you can see the spiral starts with a thick text that almost says "flag" and the spiral ends with something that looks like a "}".

I had heard before that censoring images using spirals is a bad idea because you can unspiral (is that a word?) the image to restore it to its original form.
Once I noticed this I threw the image in Photoshop and used the twirl tool, I played around with the slider until I could read the text.

```flag{whirlpool_in_a_cinch}```

![Picture of solved challenge](/static/images/posts/bsidesbos2020/kiddiepool/solve.jpg)

### PlayTheHarp
This challenge broke me and I'm still conflicted on how I feel about it.
On one hand I love this challenge because it's a really cool idea, on the other hand I believe there are too little hints to logically come to the correct solution, on top of that I don't believe this challenge teaches you any valuable skills.
You get a picture of a harp, whenever I get an image I immediately jump to stego tools, I spent a while looking for solutions but eventually realised this wasn't a stego challenge.
After some more research I left this challenge and went on to some other challenges, I would do about 30 minutes to an hour of work on this challenge and then move on to another one.

I thought about using strings on the image and started looking for things out of the ordinary, eventually finding a strange block of data.
CyberChef couldn't find any solutions to this and I decided to take a closer look at the data.
My idea was that all of this was encoded in some way, I started researching how harps work and tried to figure out a way of decoding this data.
Yet nothing I did ended up working, and as the CTF came to a close and time was running out I decided to check out the John Hammond Discord server in search for a hint.

Below is the block of data, you can find the flag in here already, the solution will be below but I'd like you to take a look at it before seeing the answer.

```
HDNR6GFf
6LLIJK9l
18NL1HWa
GCU85U5g
RQ9CGTH{
T47Y9SUt
2SKZJOBh
H06K09Ze
3BWV54X_
C1VY4EIh
GO0DK9Ua
ZZLVBMZr
8CK8FTGp
TNDQURH_
CEHGS41i
ONSNNRTn
DYAKGQMs
AX9CNZ7t
CS5R3KQr
U4A6BBVu
F2RULTOm
D2NLIUPe
KYKGKGVn
AN98O3Ht
G9STPVD_
ETGMLPCh
TFUFSALa
PK4CD5Ss
6EDFJ45_
CIOL1S0v
VIJP3WFe
OU3CPSBr
O0F6WTWt
NKIWW0Ri
QPFWGVNc
CJUPZL9a
CEC4YQ8l
YC23ZR6_
DTUT5VJs
113O5FVt
VY2QV4Br
C498PXFi
NO6EMR1n
ND8JBSNg
OQJOHJUs
8IOJ9LD}
```

In the John Hammond Discord server I found a hint "A harp has them, in what direction?".
Let's analyse this hint

* "A harp has them" => Something that a harp has multiple of? I would say strings.
* "In what direction" => The harps go from the top of the harp to the bottom, so they go down?

With that hint analysed you should be able to see the flag immediately.
If not, read the final letter of each line downwards, it spells out the flag.
Yeah, this challenge broke me...

```flag{the_harp_instrument_has_vertical_string}```


### Y2K
This was my favorite challenge of the CTF, you get an address and a port which you can connect to, upon doing so you get a message.

**What year do YOU think the world will end?**

You can enter any number here and it will process, when you enter a letter it causes the application to hang and eventually crash.
Whe you get a crash you learn that the application is actually a Python script, that's some good information for us as we can try to run Python code onw.
Most of the Python code you run in here either crashes or gives you an error, I spent some time trying to escape here but I couldn't get anything working because os wasn't imported in the script and we can't import anything ourselves.

I got stuck here for some time, eventually I decided to check for variables hoping that I would find a variable **flag**.
In base Python we can use locals() and dir() to get variables

![Picture of the script parsing dir()](/static/images/posts/bsidesbos2020/y2k/dir_output.jpg)

No variables sadly enough, but the fact that we got output gave me a big confidence boost. 
We must be getting close now.

I did some research into the variabels I had access to according to dir() and stumbled onto [this article](https://book.hacktricks.xyz/misc/basic-python/bypass-python-sandboxes) which showcased a way of exploiting the builtins variable in Python2.
Apparantly we can use this exploit to run shell code, we can try to create a shell but let's first figure out where we are, who we are and what we have access to.
I didn't document all of this sadly enough, I do however have a screenshot of the output of **ls**, which shows us a flag.txt.

![Picture of the script parsing the exploit](/static/images/posts/bsidesbos2020/y2k/ls_output.jpg)

Now we can modify the exploit to cat out the flag and we should be done with the challenge.

```python
__builtins__.__dict__['__import__']("os").system("cat flag.txt")
```

> flag{we_are_saved_from_py2_k}

### Skid
I wasn't able to finish this one (but I came back to it later). 
First I'll show you my original thought process.

We can find the following session:

>eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6InNraWQifQ.eyJ1c2VybmFtZSI6InNraWQifQ.sacXoUrQCXpaylE4a4RGrCawHqBJJVGfOozOaPxQqOo

We can enter this in a JWT decoder and decode the following header:

```json
{
  "typ" : "JWT",
  "alg" : "HS256",
  "kid" : "skid"
}
```

Along with the following body
```json
{
  "username" : "skid"
}
```

I had assumed that the username had to be changed to **Congon4tor** (the name of the user posting) and do another challenge to reach admin.
Changing the username field crashes the site, and I never read the error as I was running out of time, changing the username was my only lead, so I gave up there assuming I wouldn't be able to figure out the solution in time.

Now for the solution, the **kid** field is actually what's called a key identifier, this is used to let the server know which key was used to sign the token.
Changing this field will cause an sqlite3 error, we can now abuse this sql injection to sign our own token.

```json

{
  "typ" : "JWT",
  "alg" : "HS256",
  "kid" : "qwerty' UNION SELECT 'a', 'b', 'c'"
}
```

```json
{
  "username" : "admin"
}
```

Replace our session by the one we generated and signed, refresh your page and you'll get the flag.

> flag{sqli_jwt_neq_skid_stuff}


## Conclusion
And that's the end of the CTF, these 8 hours flew by and I had a tonne of fun.
I learned a few new things (such as the skid challenge which I came back to) but I mostly used knowledge I already had in this CTF.
During the CTF I had also attempted some other challenges but I gave up on most of those due to a lack of knowledge and the desire to solve at least a few challenges.

Something I learned from this CTF is that I overcomplicate a lot of solutions, the Harp challenge for example should have been obvious to me because I had looked at the block so much.
Another thing I learned is that I tend to place focus on a single potential solution for too long, kind of like a form of tunnel vision.
Since this CTF I've been working on both of these issues and have learned to make more thorough notes, this way I can more comfortably leave something I've investigated behind as I can always recall my notes when I need to figure out what I was thinking at that moment.

If you're thinking about jumping into a CTF but you're unsure, please just do it.
Even if you can't solve a challenge you'll learn a lot of new things.