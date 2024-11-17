# vbix-js

![vbix](<./logo.png>)

This repository is a **work in progress** port of my primary project "[vbix](https://github.com/benp32x/vbix)", from BASH to Javascript. (Please view the primary [vbix](https://github.com/benp32x/vbix) project for complete in-depth documentation on vbix, a text based interface for managing virtualbox based virtual machines on headless Linux.)

Application written by Ben Pekarek  
License: GPLv3  
Latest Version: v0.0.1  
Initial Public Release: v0.0.1 November 2024  
First Version: v0.0.1 November 2024

# Early Notes

* Runs on NodeJS v18.20.4 or later
* branch main = merges from develop after thorough testing, code should run as intended
* branch develop = in progress development
* vbix is over 2,400 lines of code. It's going to take me a bit of time to fully port this over, so please be patient :)
* Code Structure: This is an atypical nodejs project starting off as a port from BASH. The file/folder structure will initially mimic how the code is organized in the shell code. Over time, it may evolve to encompass more traditional nodejs mvc constructs with regards to an API layer, etc. As such, the directory structure and file naming conventions will evolve over time.

# Initial Release Status

The `-i` information view is working in vbix-js. It is functioning exactly as it does in vbix. This is a *great* starting off point for the code-base.

Clone the repo or download the code via .zip and extract.

Run:

```
node ./vbix-js/app.js -i
```

This will return a list of vm's on the system. The code parses the output from `vboxmanage list vms -s` and renders it in a nicer 80 col display in the terminal.

# Why port this to Javascript?

1.) Code Modularity - By using Javascript / NodeJS, the code can be broken up and organized better.

Shell Scripts (BASH) tend to contain all of the code in 1 script. Using a modular file structure in BASH runs the risk of parent scripts moving forward in their executions before child processes have had a chance to finish. Also, preserving path accuracy becomes more problematic, and since "portability" is number one with shell scripts, they just tend to be all in 1 file. If you are a Javascript developer, and have zero BASH experience, please see the [nvm project](https://github.com/nvm-sh/nvm) as proof that this is a thing. It's over 4,600+ lines of code in a single file.

2.) Porting large projects from one language to another, are great learning exercises.

3.) It would be neat to layer on a front-end to this, possibly in ReactJS.

4.) Cross platform support

"vbix" by its very name, originates from Virtualbox and Unix. Its designed to run on nix based platforms like Linux. It might run on Cygwin via Windows? or WSL? I have not tried to run vbix in these environments against a native Windows install of Virtualbox. However, vbix-js running in Node, could make it easier to run vbix functionality on a Windows system. After all vbix is just interacting with the virtualbox command line, which is going to be the same on any system that runs Virtualbox.
