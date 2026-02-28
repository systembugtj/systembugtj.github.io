---
title: Xamarin Forms Binding Tips
date: 2019-10-14
img: xamarin.png
tags:
  - Xamarin Forms
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

