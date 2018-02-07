---
layout: post
title: Use gradle plugin from local jar
date: 2016-11-02 16:11:20 +0300
description: 
img: alibaba-cloud-logo.png # Add image post (optional)
tags: [Java, Gradle]
---

```gradle
build.gradle

buildscript {
    repositories {
    flatDir {
            dirs '[where you plugin build/libs]'
        }
    }
    dependencies {
        classpath ':[artifactId]:[version]' // do not include group name for local.
    }
}
```