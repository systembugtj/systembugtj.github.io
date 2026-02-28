---
title: Spring boot config @componentscan for nonsubpackage.
date: 2016-06-25
img: spring.png
tags:
  - aliyun
  - Docker
  - Tips
---

1. @ComponentScan default only scan current package. if not in current package, must add.

2. Add @Component to allow injection.

3. @ImportResource should happen before @ComponentScan if refer the object from it.


