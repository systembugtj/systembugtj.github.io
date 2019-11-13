---
layout: post
title: MvvmCross: hwo to switch tab
date:   2019-11-13 10:18:00 +0800
description: 
img: xamarin.png # Add image post (optional)
tags: [Xamarin Forms] # add tag
---


# Switch Tab when use MvxTabbedPage

RootPage => RootPageViewModel
Tab1 => Tab1ViewModel
Tab2 => Tab2ViewModel


In Tab1
```C#
    await NavigationService.ChangePresentation(new MvxPagePresentationHint(typeof(Tab1ViewModel)));
```
