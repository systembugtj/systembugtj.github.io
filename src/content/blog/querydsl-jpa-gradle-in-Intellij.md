---
title: QueryDSL + JPA + Gradle in IntelliJ
date: 2016-11-01
img: spring.png
tags:
  - Java
  - Gradle
---

# build.gradle:
```gradle
apply plugin: 'idea'

idea { 
    module { 
        sourceDirs += file('src/main/generated/')         
        generatedSourceDirs += file('src/main/generated/') 
    } 
} 
querydslVersion = "3.7.4" //most recent, maybe old
dependencies { 
    ... 
    compile("com.mysema.querydsl:querydsl-jpa:$querydslVersion")
    compile("com.mysema.querydsl:querydsl-apt:$querydslVersion:jpa") 
    ... 
} 
```

# Setup IntelliJ:

File -&gt; Settings… ( Preference on Mac)

Compiler &gt; Annotation Processors

Enable annotation processing

Store generated sources relative to:

Module content root
