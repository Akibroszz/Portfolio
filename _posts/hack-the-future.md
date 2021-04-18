---
title: 'Hack the Future'
abstract: 'My experience during Hack the Future 2020'
created: '2020-01-18'
tags:
- Security
- CTF
---

# Preparation
Hack the Future is a Belgian hackathon containing a lot of different categories such as SAP, Javascript and the one I participated in Cybersecurity.
This event had been hyped up by my school at the time, so me and Zandro Wallaert decided to team up and take on the challenge.
Every year the Hack The Future team creates challenges around a theme, this year the theme was "Fellowship of the Code".

When the day came me and Zandro got together in a call and prepared our tools, this is when we were told only one of us would be allowed to use the VPN (even though we received 2 logins).
This was pretty annoying because this meant Zandro had to share his screen which would sometimes randomly disable itself, next to this I had a technical issue going on which meant I had to join the call on my desktop and do everything else on my laptop.
We clearly didn't have the strongest start, but we eventually got everything set up in a mostly functioning way.

# Enumerating the network
After finally getting set up we fired an nmap scan on the network, however this took forever as the subnet was huge, and the vpn connection was slow.
We had no hints at all, so this was a huge waiting game, luckily for us the IP was eventually told to us because the network kept going down, and the nmap scan would have taken over a full day to finish.
You see we weren't supposed to use nmap, instead the goal was for us to use an IP scanner and then run nmap on that port, however the immense size of the network combined with the slow vpn and the many players caused the network to be extremely slow.
As previously mentioned we were given the IP, it felt cheap, but it's better than waiting a full day.

We started an nmap scan on this IP, which obviously took a while because everybody was scanning that same device at the same time.
However after a few minutes we got back two open ports, port 445 (SMB) and port 26420 (RDP).
SMB is always interesting to see open, so we took a look there first, we could find a disabled guest user and some shares but nothing of note.
We had no other info about this device, so we decided to give Eternalblue a try, this was not the solution, but it's always fun to give it a try.

![smbmap output showing the shares](/static/images/posts/hack-the-future/smbmap.jpg)
![eternalblue failing](/static/images/posts/hack-the-future/eternalblue.jpg)

# To RDP we go
We decided to stop researching SMB for a bit and went forward to RDP where we got stuck for an hour.
You see we didn't have any leads here, we couldn't exploit the SMB and RDP required a full login, we were completely stumped as the only credentials we had received were our vpn credentials.
It took about an hour of being stuck before somebody joined our call to give another hint, well actually he just gave us the solution as nobody could figure it out.
We had to use our vpn credentials to log in on the Windows machine, Zandro and I were pissed at this point, this had been about 2 hours of our time wasted on a slow network, and on a challenge which didn't make sense (why would we even try the vpn credentials here).
Eventually after some bickering we logged in on the machine and continued to the next step.

On the desktop of the machine we could find a notepad file, the only thing of importance in it seemed to be the following line "To know your enemy you need to know yourself. With this clue you can find the (n)ext file to go to battle.".
Our attention went to "(n)ext", ext immediately made us think about extensions, we tried to look for extra content in the text file and renamed some files but nothing ended up happening here.
So we started thinking about the "know yourself" part, the easiest place to learn about ourselves would be the Users folder, we could see other users here, and we tried to move to their accounts (which didn't work).
After this we thought about knowing yourself in a different way, maybe we don't need to know the user, but we need to know the machine.
Bingo, that gets us some juicy information about the network, 3 ethernet adapters are used.

![ipconfig screen showing multiple adapters](/static/images/posts/hack-the-future/adapters.jpg)

# The final straw
We connected to this PC using the first adapter, the second adapter is on a different network segment than us, so we should be able to access more of the network now.
We realised pretty quickly that we just had to move to the default gateway (which was a pfSense), but we also tried some other IPs but none of those gave us any results.
Now this is where I will honestly admit that I have no idea what we were supposed to do, you see we couldn't log in on the pfSense page, and we spent some time digging around for a login or an exploit but to no avail.
Eventually we were told to set the third adapter to an IP in range of yet another network segment and then go to a new IP. I have no idea how we were supposed to figure this out.

Anyways the next part were some crypto challenges, nothing special and nothing challenging, we got a password and then we ran out of time.
We presented our findings, got second place in the competition and won the cybersecurity crowd favorite challenge.

# Conclusions
I'll be honest and say that I hated my time participating in this event. 
The challenges didn't make a lot of sense, the network was slow and it felt strange to only allow one user on the network when you can only sign up in pairs.
I especially hate how we randomly had to enter a new IP into the third adapter, you see we had realised we would need to find an IP, but we just didn't know what segment to go to.

The final thing that I disliked was that we got no explanations after the event, I genuinely wanted to know how we were supposed to find the IP to the adapter but we were never told.
We never received hints for how to figure this out either, I remember a hint popped up about DHCP (this popped up around the time we were on the pfSense), suddenly 20 minutes later an IP is dropped and we get told how to get to the new segment.

To end things off I don't want to demotivate people looking to participate in the event, I had friends who participated in different categories and had a lot of fun.
On top of that I truly believe the challenge would have been better had we been allowed to participate in person instead of online, not only would it have been more fun for us, but it would have been easier for the creators of the challenge to manage.