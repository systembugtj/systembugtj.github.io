---
layout: post
title: How to align UIView to topLayoutGuide in SnapKit
date:   2018-02-20 08:47:46 +0800
description: 
img: mac.jpg # Add image post (optional)
tags: [iOS, Swift] # add tag
---

Use topLayoutGuide.snp.bottom to align your UIView to the bottom of the navigation bar or the bottom of the status bar in Swift 3 while using the SnapKit pod.
```swift

view.snp.makeContraints { male -> Void in
    make.top.equalTo(topLayoutGuide.snp.bottom)
}

```

Use bottomLayoutGuide.snp.top to align your UIView to the top of the tab bar.