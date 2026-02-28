---
title: asp.net core dbContext isn't for share.
date: 2019-02-14
img: mac.jpg
tags:
  - Ninject
  - dotNet Core
  - Asp.net
---

# Entity Framework and DbContext


In short, if inject the DbContext into service and then inject service into controller.

DbContext isn't designed to support sharing crossing thread.


```csharp
// Define Local Scope
private readonly AsyncLocal<Scope> scopeProvider = new AsyncLocal<Scope>();
private object RequestScope(IContext context) => scopeProvider.Value;

// Define injection scope with Ninject
kernel.Bind<DbContext>().To<SqlDbContext>().InScope(RequestScope);
kernel.Bind<ISomeDao>().To<SomeDao>().InScope(RequestScope);
kernel.Bind<SomeServiceUseDao>().ToSelf().InScope(RequestScope);
```
