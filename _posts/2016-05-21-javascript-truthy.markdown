---
layout: post
title: Javascript Truthy/Falsy
date: 2015-05-21 17:27:20 +0300
description: 
img: javascript.png # Add image post (optional)
tags: [javascript]
---

# Truthy from different aurgement type

1. Undefined    => false
2. Null     	=> false
3. Boolean	    => The result equals the input argument (no conversion).
4. Number	    => The result is false if the argument is +0, −0, or NaN; otherwise the result is true. 
5. String	    => The result is false if the argument is the empty String (its length is zero); otherwise the result is true.
6. Object	    => true.