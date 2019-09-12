---
layout: post
title: Guava Iterables
date: 2016-07-24 10:27:20 +0300
description: 
img: java.jpg # Add image post (optional)
tags: [Java, Guava, Tips]
---


Guava Iterables

find
```java
List <Integer> numbers = Lists.newArrayList(
            new Integer(1), 
            new Integer(2), 
            new Integer(3));

    Integer value = Iterables.find(numbers, new  Predicate<Integer> () {
        public boolean apply(Integer number) {
            return number == 3 ;
        }
    });
```
indexOf