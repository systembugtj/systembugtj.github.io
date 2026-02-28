---
title: Install jekyll and troubleshooting
date: 2018-02-07
img: jekyll.png
tags:
  - Blog
  - jekyll
  - Ruby
---

Quick guidence to install jekyll

1. Ruby > 2.5.0
2. install rbenv and ruby-build to install ruby 2.5.0
3. Mac add below script to ~/.bash_profile
```shell
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```
4. gem install jekyll bundle
5. If failed to install ffi
```shell
brew install libtool automake
```

