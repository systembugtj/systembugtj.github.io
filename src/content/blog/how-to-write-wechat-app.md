---
title: 小程序的后端支持
date: 2017-10-25
description: 小程序是纯粹的前端，自身没有后端。需要开发对应的服务器端api支持。
img: how-to-start.jpg
tags:
  - Programming
  - Learn
  - 微信
  - wechat
---

# 小程序是纯粹的前端，自身没有后端。需要开发对应的服务器端api支持。

后端服务域名需要在小程序的开发管理中进行设置后，才可以访问。

小程序本身不允许访问获取access_token和ticket的URL，必须通过后端服务。使用 wx.addCard wx.openCard 

- access_token 需要使用小程序关联的公众号的appid和appsecret获取 
- api_ticket 使用上面获取的access_token 
- 7200 秒的限制，需要在服务器端缓存 （redis，memory都可以）。

# 二维码链接打开小程序 

# 需要在配置小程序的跳转链接

