---
title: Use rbenv to install cocoapods
date: 2018-02-08
img: cocoapods.jpg
tags:
  - cocoapods
  - Ruby
---

Reference: 
<https://telliott.io/2015/10/14/using-rbenv-for-cocoapods-post-el-capitan.html>

# Xcode
```shell
xcode-select --install
```

# rbenv
```shell
brew update
brew install rbenv ruby-build
```

# Config rbenv to bash_profile
```shell
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

# Update Ruby
```shell
rbenv install 2.5.0
rbenv global 2.5.0
```
# Refresh Env

```shell
rbenv rehash
source ~/.bash_profile
```

# Install cocoapods

```shell
gem install cocoapods
```

# Update env

```shell
rbenv rehash
```


