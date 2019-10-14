---
layout: post
title: Xamarin Forms Binding Tips
date:   2019-010-14 09:59:00 +0800
description: 
img: xamarin.png # Add image post (optional)
tags: [Xamarin Forms] # add tag
---

# XAML Binding

Only can bind Public Property not public Field

# Nested Object

Again, Public Property Only.

# TimeSpan

StartTime is DateTime.

```xml
    <Label
        Text="{Binding StartTime.TimeOfDay, StringFormat='{}{0:hh\\:mm}'}"
        Style="{DynamicResource ListItemDetailTextStyle}"
        VerticalTextAlignment="Center" />
```