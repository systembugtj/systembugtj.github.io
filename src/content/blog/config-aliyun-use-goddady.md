---
title: 配置阿里云 SLB 使用 Godday 证书
date: 2016-05-02
img: aliyun.png
tags:
  - Android
  - Kotlin
---

从Godaddy买了证书，然后添加到阿里云的SLB。

网站访问一切正常，但是使用android访问报如下错误
```java
javax.net.ssl.SSLHandshakeException: java.security.cert.CertPathValidatorException: 
```
Trust anchor for certification path not found.

原来浏览器还是比较强大，包含了很多2级证书，但是android却没有。

怎么办？方法其实很简单。阿里云上传证书的时候，需要把你的crt和godday的intermediate certificate 合并为一个文件。都是TXT文件，复制粘贴到一个文件即可

一般godaddy的证书下载时除了包含了你的crt还有两个文件，这两个就是intermediate certificate，和你的crt合并后，加到阿里云负载均衡的证书管理即可。

gd_bundle-g2-g1.crt

gdig2.crt
