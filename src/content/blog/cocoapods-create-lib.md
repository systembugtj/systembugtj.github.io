---
title: Create library with Cocopads
date: 2019-02-14
img: cocoapods.jpg
tags:
  - Cocoapods
  - XCode
  - Practice
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

```html
Example/Demo
    MyLibDemo
        Mylib.xcodeworkspace
        Podfile
MyLib.xcodeproj
MyLib.podspec
```


1. Demo is designed to test or use the Mylib
2. Demo uses path: "../../" to refer the MyLib project

MyLib.podspec defines all related files
