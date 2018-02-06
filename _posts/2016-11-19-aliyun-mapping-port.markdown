---
layout: post
title: 阿里云容器服务绑定多个域名到同一端口
date: 2016-11-19 10:24:20 +0300
description: 
img: alibaba-cloud-logo.png # Add image post (optional)
tags: [aliyun, 阿里云]
---

部署基于Zuul的Api Gateway，需要把几个域名绑定的Zuul服务上。

可以通过设置 web 路由规则，将多个域名绑定到一个服务的端口

```yml
test:
  image: XXXX
  lables: XXXXX
    aliyub.routing.port_80: http://domain1;http://domain2 #不要加分号 
```