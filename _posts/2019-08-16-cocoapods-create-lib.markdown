---
layout: post
title: 情人节的Totoru
date:   2019-02-14 09:30:00 +0800
description: 
img: cocoapods.jpg # Add image post (optional)
tags: [Cocoapods, XCode, Practice] # add tag
---

# Install Cocoapods

https://cocoapods.org/

# Create Lib

```shell
$ pod spec create Peanut
$ edit Peanut.podspec
$ pod spec lint Peanut.podspec
```


# Folder Struture

Example/Demo
    MyLibDemo
        Mylib.xcodeworkspace
        Podfile
MyLib.xcodeproj
MyLib.podspec


1. Demo is designed to test or use the Mylib
2. Demo uses path: "../../" to refer the MyLib project

MyLib.podspec defines all related files