---
title: Android set padding for cardview
date: 2016-05-14
img: android.jpg
tags:
  - Android
---

Refer to 
<http://stackoverflow.com/questions/24896166/how-to-set-the-padding-for-cardview-widget-in-android-l>

CardView prior to L-preview uses RoundRectDrawableWithShadow to draw its background, which overrides Drawable.getPadding() to add shadow padding. The view background gets set via code after inflation, which overrides any padding specified in XML. 
You have two options: set padding at run time using View.setPadding() and be careful to adjust for the shadows (but only prior to L-preview!), or place everything inside a layout that specifies padding. The latter option is safest.

```xml
<CardView 
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:id="@+id/card_view"
    android:layout_gravity="center"
    android:layout_width="match_parent"
    android:layout_height="200dp"
    card_view:cardCornerRadius="2dp"
    android:paddingLeft="20dp"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="20dp"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:id="@+id/info_text"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Hello World!"/>

```
