---
title: 'How to install Arch on a Raspberry Pi'
abstract: 'A guide on installing Arch Linux on a Raspberry Pi'
created: '2020-01-01'
tags:
- Linux
- Tutorial
---

## Introduction
This is a tutorial on how you should install Arch Linux on your Raspberry Pi system. 
It's important to know that this is not the core Arch Linux you may be used to, instead this is an ARM variant of Arch, this means that not all packages will be available and you will be locked out of a few repositories.
We'll be going from a clean Raspberry Pi to one that has Arch installed and we'll also install some required packages and do some basic hardening.

## Requirements
To follow this guide,you’ll need to have the following available:

&nbsp;
* Raspberry Pi (I used a 3B+)•Keyboard (for initial configuration) 
* Monitor (for initial configuration)
* A Linux machine (all steps possible on Windows but this tutorial only explains how to do it in Linux)
* A way to power the system (USB-A) 
* An SD card with about 16GB of data (less is possible but not recommended)
* An SD card writer

## Preparing the Pi
To install Arch on ARM devices you’ll first need to download the correct filesystem, this will be different depending on the device you use.
First you’ll need to take a look at the [ArchLinuxARM platform page](https://archlinuxarm.org/platforms) here you’ll need to find your device which will give you detailed installation instructions.
The page for the Raspberry Pi 3 can be found [here](https://archlinuxarm.org/platforms/armv8/broadcom/raspberry-pi-3).
I’ll be referencing this installation guide a lot during installation.

Make sure to boot up your Linux machine/VM because we'll need it now.
We're going to be using fdisk to partition this device, all of these steps are also possible using Windows Disk Management and diskpart but I'd recommend just creating a Linux VM and using fdisk.

Some notes during the installation process:

&nbsp;
* If you’re using a built in SD card reader the card might appear as /dev/mmcblkX.
* There seems to be an issue in the official installation guide, when it wants you to make a boot partition make it +250M.

Before you continue reading please note that this guide will eventually be outdated, always use the official installation guide and use my guide as a reference if you get stuck, don't know what to do or messed something up.
Also remember that my installation notes are for a Raspberry Pi 3B+ system, they might be slightly different for a different installation.

## Partitioning
Alright with all of that done we can start the partitioning process, if you follow the official guide (or want to be risky and follow mine) exactly this will be a painless process.
Before you put in your SD card use **lsblk** and take note of all devices, now put in your SD card and run **lsblk** again.
You should see a new device has popped up, it will probably be either /dev/sdX or /dev/mmcblkX, take note of this device as this is your SD card.

&nbsp;
  
* Start fdisk and partition the SD card ``fdisk /dev/sdX``.
* Wipe the partition on the drive, to do this press **o**.
* List the partitions, you should see no partitions remaining, do this by pressing **p**.
* Type **n** followed by **p** to start creating a primary partition (our boot partition), press **1** to select the first partition, now press ENTER and type **+250M** for the last sector.
* Type **t**, then **c** and set the first partition to a type of W95 FAT32 (LBA).
* Type **n**, then **p** to start creating a primary partition (our root partition), press **2** to select the second partition, press ENTER twice to accept the defaults.
* Type **p**, compare your output to the output in my screenshot, if it's the same you can continue.
* Type **w** to write the partition table.

![Correct partition table](/static/images/posts/tut-rpi-arch-install/partition_table.jpg)

Congratulations, you have created a boot and root partition for your Raspberry Pi, now we'll put the filesystem on it.

## Installing the filesystem
Time to do steps 3 to 7 in the official installation guide, we're going to be putting the Arch Linux filesystem on the partitions we created.

```shell
# Set up the filesystem
mkfs.vfat /dev/sdX1 
mkfs.ext4 /dev/sdX2

# Create some folders on your computer/VM, and mount them to the SD card
mkdir boot root
mount /dev/sdX1 boot
mount /dev/sdX2 root

# Download and extract the root filesystem (do this as root), use the installation guide for your device to get the correct URL
wget http://os.archlinuxarm.org/os/ArchLinuxARM-rpi-2-latest.tar.gz
bsdtar -xpf ArchLinuxARM-rpi-2-latest.tar.gz -C root
sync

# Move the boot files to the boot partition we created
mv root/boot/* boot

# Unmount the partitions
umount boot root
```

You might not understand what you just did so let me explain it real quick, we downloaded the full filesystem using wget and extracted it into the root folder.
Because we created a boot partition we need to move the boot files from the filesystem to our boot partition.


## Configuring the OS
We're at the final stretch now, you can put your SD card into your Raspberry Pi and connect it to a monitor and keyboard.
When you give it power it should boot to a login screen, you should login as root for the next step, the password is *root*.

If you're planning on using Wi-Fi you need to run the **wifi-menu** tool first.
First we'll initialize the pacman keyring and we'll populate it with the archlinuxarm package signing keys.

```shell
pacman-key --init
pacman-key --populate archlinuxarm
```

You may have noticed some audit messages are popping up and messing with your prompt, if this happens you can solve it by either:
* Adding audit=0 to **/boot/cmdline.txt**
* Masking the service by running **sudo systemctl mask system-journald-audit.socket**

Next up let's update our packages, you can do this by running **pacman -Syu**.
With our repositories setup and our packages updated we can install some extra packages, there will be a lot of them so feel free to copy and paste this.

```shell
pacman -S --needed nfs-utils htop openssh autofs alsa-utils alsa-firmware alsa-lib alsa-plugins git wget base-devel binutils diffutils libnewt dialog wpa_supplicant wireless_tools iw crda lshw blueman pulseaudio-alsa pulseaudio-bluetooth pavucontrol bluez bluez-libs bluez-utils bluez-firmware vim sudo
```

Now we have audio and bluetooth support and we installed some packages that will be required (sudo) or are nice to have (htop).
Now the installation process is complete but please don't stop here, your device is not secure and when you put it on the internet it will be hacked into, so let's avoid that by hardening it.

## Hardening the OS
The goal here is to protect the core of your OS, we'll be making authentication more secure by swapping to public key authentication for SSH and we're going to set up our own user.
First let's create our own user so we can get off the root account, make sure to change the root password while you're doing this to a secure password.

```shell
passwd # Change root password
hostnamectl set-hostname <YOURHOSTNAME> # Give the device a hostname
useradd -m <YOURUSERNAME> 
passwd <YOURUSERNAME>
usermod -aG wheel, audio, video, optical, storage <YOURUSERNAME> # Add our own user to these groups so we can use audio, sudo, ...
visudo # You're in VIM here, press / and type "wheel ALL=(ALL) ALL", go to the start of the line and press x (to delete the comment), then press ESC and :wq to write and quit
userdel alarm 
```

Okay now you can log out of the root user account and log into your own account, we're going to disable remote root logins using SSH.
To do this open the **/etc/ssh/sshd_config** file and add the **PermitRootLogin no** line, if you're planning on service users you can add **AllowUsers** or **DenyUsers**

Finally let's make it so we can only login using key-based authentication. 
To do this you need to run the following command on your own machine (the one you will SSH from) **ssh-keygen -t ed25519**, you can also use -C to add a comment.

![ssh-keygen output](/static/images/posts/tut-rpi-arch-install/ssh_keygen.jpg)

If your host is a Linux distribution you're in luck because you can just use ssh-copy-id to add your public key to the authorized_keys file on your Pi.
To do this run **ssh-copy-id -i <LOCATION_TO_SSH_KEY>.pub <YOURUSERNAME>@<YOUR_IP>**

![ssh-copy-id output](/static/images/posts/tut-rpi-arch-install/ssh_copy_id.jpg)

If you're on a Windows machine you'll need to do this manually.
First you're going to need to get your public key, if you didn't change the location it should be at **C:\Users\<YOURUSERNAME>\.ssh\id_ed25519.pub** or whatever you named it.
Open that file and copy the text, it should start with **ssh-ed25519** and if you added a comment it will end on that comment.
Now SSH into your Raspberry Pi and open the **.ssh/authorized_keys** file, and paste your own public key in it.

Finally we can add **ChallengeResponseAuthentication no**, **PasswordAuthentication no** and **UsePAM no** to our **/etc/ssh/sshd_config** file.
When you're done you can restart SSH **sudo systemctl restart sshd** and you should be unable to login using a username/password combo.

And there you go, you now have a Raspberry Pi running Arch Linux and having some extra security added to it.