---
title: Config aliyun Docker to use SLS
date: 2016-07-07
img: aliyun.png
tags:
  - aliyun
  - Docker
  - Tips
---

# Preparation

1. Make sure SLS is enabled.

#Edit application configuration

1. Add label to enable log. 

```yml
aliyun.log_store_[Log Name]: stdout
```

2. Go to SLS, will see the log be saved.
