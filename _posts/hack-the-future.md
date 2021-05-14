---
title: 'Hack the Future'
abstract: 'My experience during Hack the Future 2020'
created: '2020-01-18'
tags:
- Security
- CTF
---

## Preparation
Hack the Future is a Belgian hackathon containing a lot of different categories such as SAP, Javascript and the one I participated in Cybersecurity.
This event had been hyped up by my school at the time, so  [Zandro Wallaert](https://www.linkedin.com/in/zandro-wallaert/) and I decided to team up and take on the challenge.
Every year the Hack The Future team creates challenges around a theme, this year the theme was "Fellowship of the Code".

When the day came me and Zandro got together in a call and prepared our tools, both of us had set up a VM to hack in.
However when the event started we were told that only one of us was allowed to use the VPN at a time due to issues with network traffic.
It's understandable that this would happen but definitely a bummer as we couldn't look for solutions individually and lost a lot of time as we were forced to be on the same wavelength.
On top of this there were some technical issues on my end which meant that I had to join the call on my desktop and do any Cybersecurity work on my laptop.

So yeah, we had a very messy start, let's hope the rest of the event would work out better for us.


## Enumerating the network
After some issues with getting on the network and setting up a screenshare session we could finally start the challenge.
We weren't given an IP so we fired up an nmap scan on the network, however due to the size of the subnet, the slow VPN connection and the amount of people firing up a scan at the same time this took forever.
With no hints we decided to wait out the scan, eventually having to stop it after noticing it would take more than a day to finish the scan, on top of this the VPN connection would occasionally go down causing us to lose a lot of progress on the scan.

After around 30 minutes to an hour one of the organisers of the event joined our call and told us that the network was struggling hard, he told us to stop the nmap scan and use Angry IP Scanner instead in hopes of reducing the amount of stress on the network.
We happily obliged but even with this new scanner that only checked if an was live the scan took forever, after another 20ish minutes the organisers dropped the IP in the chat.

I understand that they couldn't predict the incredible stress the network would be under but I do find it mildly annoying that we lost so much time and still had to be given the answer.

Anyways, after all of this we started an nmap scan on the IP, which took a while as everybody was scanning the device at this point.
After a few minutes nmap finally gave us our results, port 445 was open which is used for SMB and port 26420 was open which is used for RDP.

## "SMB seems promising"
The header is what I told Zandro when we got the results back, if you don't know you can gather a lot of information using SMB if they leave on Anonymous logins or a Guest user.
SMB is also great because there exist a lot of exploits for it, including the very famous Eternalblue exploit.

We messed around here for a bit and figured out that we could log in as the Guest user, but looking at the shares shows nothing of note as they were all disabled.

![smbmap output showing the shares](/static/images/posts/hack-the-future/smbmap.jpg)

After some more messing around and looking for a way to still mount these shares we gave up and decided to try out Eternalblue.
Sadly enough Eternalblue would always fail, after a little more messing around we decided to move on to RDP.

![eternalblue failing](/static/images/posts/hack-the-future/eternalblue.jpg)

## To RDP we go
We got stuck here for quite a bit, we needed a login but we had no credentials.
After some thinking we went back to the SMB drive to see if we had missed something but we couldn't find it.
We did some more thinking until somebody joined our call again to tell us we had to log in using the login details of the VPN.

I hated this, you may say that it makes sense as people reuse credentials all the time but these credentials were made specifically for us, they contained the name of our group and a randomly generated password.
Zandro and I were starting to get frustrated by this event now as more than an hour had passed and we hadn't learned anything yet.

Eventually after some bickering we logged in on the machine and continued to the next step.
On the desktop of the machine we could find a notepad file, the only thing of importance in it seemed to be the following line "To know your enemy you need to know yourself. With this clue you can find the (n)ext file to go to battle.".
Let's break this down to the most interesting bits

"You need to know yourself" => figure out information about the user and the machine
"(n)ext file" => ext could mean the Linux filesystem or more likely extension => file extensions

We started to mess around with the idea of file extensions, we tried to look for extra content in the slack space of some files and renamed all the files we could to some well known extensions. We couldn't download these files and we couldn't really download anything on the machine we were on so it was impossible to do a thorough analysis.
After renaming all files we could find for about 15 minutes we decided to move onto the other clue we found "know yourself", I proposed to look in the Users folder for users we could move to, we found some users but couldn't do anything with them yet.
Zandro got the idea to get some more information on the machine and eventually we figured out that there were multiple network adapters on the system.

![ipconfig screen showing multiple adapters](/static/images/posts/hack-the-future/adapters.jpg)

## The final straw
Ok so we have three adapters, the first one is the IP we were supposed to find so we can't learn anything from this and we can't mess around with it either as that would break our connection.
The second adapter was on a different segment from us, so we should be able to enumerate a whole new subnet.
Well, "enumerate" might be a bit much as we couldn't use any tools on this subnet, we could however navigate to some well known IPs (.1 and .254 come to mind) and we can move to the default gateway.

The default gateway was a pfSense, we tried some other IPs that could potentially be used but couldn't find anything.
So currently we're on a pfSense machine for which we have no login and which we seemingly don't have an exploit for.
I'll be completely honest and say that I have no idea what we were supposed to do here, after some time we were told that the third adapter had to be put in a certain subnet. 
I have no idea how we were supposed to figure this out and I don't know what the point of the pfSense was, I wish we were told about this but sadly enough we were only given the solution not an explanation.

For the next step we were given some crypto challenges but I'll be honest and say that I don't remember anything about them.
I remember solving most of them in no time and then being given the final answer as we were about to solve the challenge.
Anyway you get a password after all of this, which I assume had to be used on the pfSense but I'm not sure as the competition ended before we could try it.

After all of this we made a little Powerpoint presentation and presented our findings to the jury, we didn't get first place from the judges, but we did end up snagging the crowd favorite prize.

![The crowd favorite mug](/static/images/posts/hack-the-future/mug.jpg)


## Conclusions
You may have noticed while reading but this event did not meet my expectations.
The challenges didn't make a lot of sense, the network was slow and would constantly disconnect and the fact that we were just given solutions without an explanation really grinded my gears.

My least favorite part of this whole event was figuring out what to do with the third adapter, I genuinely have no idea how we were supposed to figure out what to set our IP and subnet to.
I usually hate crypto challenges but this time it was one of the most fun experiences of the whole event because it was one of the few things that actually made sense and worked from the start.

To end things off I don't want to demotivate people looking to participate in the event, I had friends who participated in different categories and had a lot of fun.
On top of that I truly believe the challenge would have been better had we been allowed to participate in person instead of online, not only would it have been more fun for us, but it would have been easier for the creators of the challenge to manage.