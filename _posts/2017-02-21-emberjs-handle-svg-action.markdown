---
layout: post
title: Emberjs handle svg action
date: 2017-04-17 13:10:20 +0300
description: 
img: ember-js.jpg # Add image post (optional)
tags: [javascript, Tips, emberjs]
---

Sample code: <http://jsbin.com/pebohe/edit?html,js,output>

Simply, add {% raw %}{{action “doSomething”}}{% endraw %}  to SVG g item.
{% raw %}
```html

...
<svg version="1.1" 
     xmlns="http://www.w3.org/2000/svg"     
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewbox="0 0 200 200"
     >
    <g>
       <text style="cursor:pointer" {{action "go"}}
               x="0" y="20" width="200" height="30">
           works on both
       </text>
       <a xlink:href="#" {{action "go"}}>
           <text x="0" y="40" width="200" height="30">
               works on both
           </text>
       </a>
       <a xlink:href="#" {{action "go"}} >                                                   
           <g>
               <use x="0" y="50" width="15" height="15"
                   xlink:href="#test"/>
               <text x="20" y="60">click dot</text>
           </g>
       </a>
   </g>            
</svg>   
```
{% endraw %}