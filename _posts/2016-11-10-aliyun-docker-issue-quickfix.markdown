---
layout: post
title: Aliyun Docker issue quickfix
date: 2016-11-10 14:03:20 +0300
description: 
img: alibaba-cloud-logo.png # Add image post (optional)
tags: [aliyun, 阿里云]
---

# Can’t start docker due to: 500 Internal Server Error: 500 Internal Server Error: service endpoint with name XXXX already exists

## ssh to an ECS which not host the docker.
```shell
docker network disconnect -f multi-host-network XXX
```

## ssh to the ECS which host the docker
```shell
docker start XXXX 
```

# 500 Internal Server Error: 500 Internal Server Error: subnet sandbox join failed for “172.19.0.0/16”: error creating vxlan interface: file exists

## ssh to the ECS
```shell
'service docker restart'
```
