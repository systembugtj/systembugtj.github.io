---
layout: post
title: Calling function 'ɵmakeDecorator', function calls are not supported.
date:   2017-4-27 17:33:46 -0800
description: 
img: js-1.png # Add image post (optional)
tags: [Programming, Tips, angular, AOT] # add tag
---

It’s a Angular AOT issue caused by package contains node_modules

Use case is using npm link for local development. Remove the node_modules from local can solve the issue.

Very noisy, but not find a better way to make it work.

https://github.com/angular/angular/issues/15571#issuecomment-291576993