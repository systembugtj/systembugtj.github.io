---
layout: post
title: Dagger2/ButterKnife with Kotlin
date: 2016-05-02 11:43:20 +0300
description: 
img: android.jpg # Add image post (optional)
tags: [Android, Kotlin]
---

After enable kotlin in project.

Need to change below to config dagger2 and butterknife

kapt: http://blog.jetbrains.com/kotlin/2015/06/better-annotation-processing-supporting-stubs-in-kapt/

```gradle
//Enable kapt to generate the stubs.

kapt {
    generateStubs = true
}

// Dagger2

apt 'com.google.dagger:dagger-compiler:2.0.2'
kapt 'com.google.dagger:dagger-compiler:2.0.2' 

// allow dagger access when kapt 

compile 'com.google.dagger:dagger:2.0.2'


// ButterKnife View Injection 

compile 'com.jakewharton:butterknife:8.0.1'
apt 'com.jakewharton:butterknife-compiler:8.0.1'

// !IMPORTANT without this line, java side will not injected correctly. Even you don't use 

// butterknife in kotlin (Anko is better here).

kapt 'com.jakewharton:butterknife-compiler:8.0.1' 
```