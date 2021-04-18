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

# Pre-planning
Since this was my first CTF I had no idea what to expect, when I do challenges on HackTheBox or TryHackMe I usually use an Arch Linux VM and install the tools I need on it.
Since I wanted to be extra safe I also prepared a ParrotOS VM in case something went wrong during the challenge (which luckily enough didn't happen).
The Arch VM ran DWM as a window manager because I love quickly spawning, killing and moving between terminals, if you aren't used to a tiling window manager I would recommend learning to use a terminal multiplexer like tmux.

# Warm-ups
I ended up finishing 6 warmups, these were Baseball, EZBakeOven, KiddiePool, PlayTheHarp, ReadTheRules and Y2K, I felt like all of them were pretty easy except for PlayTheHarp which took me a long time to figure out.

## Baseball
This challenge supplies users with a file which contains the following encoded text.

> TzRaVUNVMlRNRTRIQTZMSFBGWkdTNVpTSzVZVU1ZSllIQk5ER00zREdKTkhBVTJWSkJHVkNWMllPRlVFSzMyRE9GTUVNMkNaR0Y1RU1VUlpNUlNHS1JSWE9CQ1VVU1pZSk4ySEFWVFVPVTJGQzJDV000WlUyUVNHSlpBVFNNUT0= 

You may have noticed that this is Base64 immediately, we can go through the process of manually deciphering the text, or we can use it as the input in CyberChef which will basically solve the challenge for us.
The text is encoded in Base64, Base32 and Base58. Put the recipe in CyberChef and you'll have a quick solve.

>flag{wow_you_hit_a_homerun_and_really_ran_the_bases_there}

![Picture of the CyberChef solution](/static/images/posts/bsidesbos2020/baseball/solve.jpg)

## EZBakeOven
Just looking at the home page immediately shows us our target, the magic cookie. The cookie takes 7200 minutes to bake, but we want to get our hands on it sooner.
Let's start baking the cookie and see what happens.

After you start the baking process you can see a new cookie appeared in your browser, the cookie is encoded in Base64, so we'll need to decrypt it first.

![Picture of CyberChef showing the cookie](/static/images/posts/bsidesbos2020/ezbake/solve.jpg)

Interesting, we can see the time when we started cooking, lets change the value to be 5 days in the past (as 7200 minutes is 5 days) and encode it back to Base64.
Now we replace our old cookie with our new cookie and refresh the page.

And done, you have baked cookies through time travel.

> flag{you_are_the_master_baker}

## KiddiePool
This one is very short and very easy once you see it. You get the following image which looks like a weird spiral.

![Picture of challenge](/static/images/posts/bsidesbos2020/kiddiepool/challenge.jpg)

It took me a while to find out what the goal was of the challenge, I tried all sorts of stego tools going from steghide to stegcrack but nothing seemed to work.
Eventually I came up with the idea of using pngcheck to check for bad clusters, but I couldn't get any results using that tool either.
After a little more looking I noticed that the spiral contained letters "flag" can be seen clearly, and you can see a "}" at the end.
Once I noticed this I immediately threw the image in Photoshop and used the Twirl tool on the image to untwirl it.

> flag{whirlpool_in_a_cinch}

![Picture of solved challenge](/static/images/posts/bsidesbos2020/kiddiepool/solve.jpg)

## PlayTheHarp
I have a love/hate relation with this challenge. On one side I love it because it's cool, on the other side I hate how long I got stuck on this.
You get a picture of a harp, seeing a picture I immediately went looking for a solution using some stego tool but that's not what you're supposed to do.
After being stuck on this challenge for hours I decided to take a look in the John Hammond Discord server and found a clue "what does a harp have and how does it have it".

I realised that "what does a harp have" meant strings, but I had gone through the file at least twice at this point, I had found some weird blocks of data, but I had no idea what to do with it.
Eventually I realised what the second part of the clue meant "how does it have it", the strings are vertical on a harp, that's when I noticed the flag was in the block vertically.

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

> flag{the_harp_instrument_has_vertical_strings}

## Y2K
This was probably my favorite challenge I finished, you get an address to connect to using netcat, when you do it will ask you a question.

> What year do YOU think the world will end?

Entering any numerical input works fine here, entering letters however causes the application to hang and eventually crash. 
No reason to worry because this reveals to us that this is actually a Python script running in the background.
That means it's time to try some Python code in here, some of it will give you errors, and some of it will give you actual output but there doesn't seem to be a way to escape the script.

I got stuck here for some time, eventually I decided to check for variables hoping that I would find a variable **flag**. This can be done using locals() and dir().

![Picture of the script parsing dir()](/static/images/posts/bsidesbos2020/y2k/dir_output.jpg)

No variable but I did gain a confidence boost, there had to be some way of getting a shell or at least command execution using this script but how?
Getting a shell would be easy if we could import anything but that doesn't work.
Eventually I found [this source](https://book.hacktricks.xyz/misc/basic-python/bypass-python-sandboxes) which showcased a way of exploiting the builtins variable in Python2.

![Picture of the script parsing the exploit](/static/images/posts/bsidesbos2020/y2k/ls_output.jpg)

There we go, flag.txt can be found, and we can even read it using the same exploit.

```python
__builtins__.__dict__['__import__']("os").system("cat flag.txt")
```

> flag{we_are_saved_from_py2_k}

## Skid
I wasn't able to finish this one (but I came back to it later). First I'll show you my original thought process.

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

And also the following body
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


# Conclusion
That's the end of the day, I really enjoyed my time and learned a lot during it. I had attempted some other challenges, but a lack of knowledge meant I couldn't get very far in most of them.
There were a few challenges were I realised what I had to do but just couldn't figure out a way to do it, and there were some where I had no idea where to even begin.

I also realised that I spend a lot of time overcomplicating solutions, for example during the harp challenge I had started trying to decrypt the block of data I found.
Another thing I learned is that I tend to get distracted once I find a potential solution, for example I could have easily solved Skid had I not focussed so hard on the username field.
