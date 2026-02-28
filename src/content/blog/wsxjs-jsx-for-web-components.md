---
title: WSXJS - JSX for Native Web Components
date: 2026-02-28
img: wsxjs.jpg
tags:
  - frontend
  - Web Components
  - JSX
  - TypeScript
---

I’d like to introduce [WSXJS](https://wsxjs.dev/)—a project I created so we can write **native Web Components with JSX**, without depending on React or Vue. The goal is to keep the good parts (declarative UI, reactive state, TypeScript) while staying on the platform: standard custom elements that work anywhere.

## Why I built it

I kept running into the same issues when building Web Components or editor plugins (like for EditorJS):

- **Too much DOM boilerplate**—`document.createElement`, `appendChild`, `setAttribute`, and event wiring everywhere. A small UI change meant touching a lot of imperative code.
- **No type safety**—plain JS meant wrong prop names or data shapes only showed up at runtime.
- **State and UI drifting apart**—updating data and then forgetting to update the DOM, or the other way around.
- **Styles fighting each other**—components and plugins stepping on each other’s CSS.

I wanted something that felt like writing a modern component (JSX, types, reactive state) but compiled to **real Web Components**—no framework runtime, no lock-in. So I started WSXJS.

## What I focused on

### Declarative JSX

I wanted to describe the UI the way we’re used to, instead of hand-writing `createElement` trees:

```tsx
render() {
  return (
    <div class="alert">
      <input type="text" value={this.message} onInput={this.handleInput} />
    </div>
  );
}
```

So the core of WSXJS is a small JSX runtime that targets the native DOM and plays well with custom elements.

### Reactive state: `@state`

I didn’t want to manually call `update()` or sync state to the DOM. So I added a `@state` decorator: when you change the value, the component re-renders. No extra library, no virtual DOM—just “change state, UI updates.”

```tsx
@state()
private message = '';

// Change this and the UI updates
this.message = 'New value';
```

It works with primitives, objects, and arrays (including mutations like push/filter), so you can model real UIs without fighting the framework.

### LightComponent and Shadow DOM

Sometimes you want style isolation (e.g. inside EditorJS); sometimes you want the component to inherit the page’s theme. So I split the model:

- **LightComponent**: no Shadow DOM. Styles flow in from the parent. Good for widgets that should look like the rest of the page.
- **Shadow DOM components**: when you need a boundary so your styles don’t clash with the host or other libraries.

You pick the right one for the use case.

### TypeScript all the way

I use TypeScript for everything, so WSXJS is built with full TS and JSX support—props, events, and state can be typed so you get compile-time checks and better tooling.

## What’s on the site

The [wsxjs.dev](https://wsxjs.dev/) site has a few demos that show how I use WSX in practice:

1. **Todo list & User profile (LightComponent)**  
   `@state` with arrays and objects—add, remove, update, filter—and how styling works when there’s no Shadow DOM.

2. **EditorJS + WSX**  
   Building block and inline tools with WSX instead of manual DOM and string concatenation. This is the kind of code I wanted to avoid writing by hand.

3. **Marked + WSX custom renderer**  
   Using `marked.lexer()` and then rendering tokens with WSX components—so Markdown output (lists, blockquotes, code blocks) can be real, interactive components.

4. **SlideJS (Swiper / Splide / Reveal.js)**  
   A small DSL for slides, runners mounted inside WSX components, and `@state` for theme and player switching.

5. **CalendarJS**  
   A calendar library wired into a WSX component, with reactive state for the current month, selected date, and events.

## Who it’s for

I built WSXJS for cases where you want **standard Web Components** but also want **JSX, types, and reactivity**—editor plugins, Markdown renderers, slides, calendars, or any custom element that has to fit into arbitrary pages without a framework.

If that matches what you’re doing, I’d be happy if you give it a try:

- **Site**: [https://wsxjs.dev/](https://wsxjs.dev/)  
- **Repo & examples**: [GitHub - wsxjs/wsxjs](https://github.com/wsxjs/wsxjs)

Feedback and ideas are welcome.
