---
layout: post
title: 吐槽微信支付，OMG还有这样定义XML的。
date: 2016-11-24 13:06:20 +0300
description: 
img: mac.jpg # Add image post (optional)
tags: [微信]
---

最近准备加微信支付的应答网关（处理支付确认通知）

通知参数里看到了神奇的说明，需要看counpon_count 有多少，推断下面的字段。这是多么无语的设计，你让我如何优雅 annotation？ 友谊的小船说翻就翻。

代金券或立减优惠使用数量    coupon_count    否   Int 1   代金券或立减优惠使用数量
代金券或立减优惠ID  coupon_id_$n	否	String(20)	10000	代金券或立减优惠ID,$n为下标，从0开始编号
好吧，不知道这个XML设计如何过的Review

期待是这样的

```xml
<coupons count="1" > <!-- count没什么必要 --> 
    <coupon id="1" fee="1112" />
    ....
</coupons>
```