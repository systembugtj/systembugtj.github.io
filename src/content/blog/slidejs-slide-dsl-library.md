---
title: SlideJS - A Slide DSL Library for Any Data Source
date: 2026-02-28 12:45
img: slidejs.jpg
tags:
  - frontend
  - slides
  - TypeScript
  - DSL
---

I’d like to introduce [SlideJS](https://slidejs.io/)—a project I created to generate slide presentations from **any data source** using a **declarative DSL**. Instead of hand-wiring slides in code or locking into a single engine, you define structure in a small language and plug in the renderer you want (Reveal.js, Swiper, Splide, etc.).

## Why I built it

I wanted to drive presentations from quizzes, surveys, forms, or other structured data without writing a lot of imperative “create slide, add content, bind data” code. A **declarative DSL** plus a **rule engine** lets you say “for each question, emit this slide” and keep the rendering concern separate. So I built SlideJS: parse and compile the DSL, then run it with the engine of your choice.

## Features (from [slidejs.io](https://slidejs.io/))

**Multiple render engines** — Use Reveal.js, Swiper, or Splide with the same DSL. Swap runners without rewriting your slide definition.

**Declarative DSL** — Define slides with a concise syntax: rules, nested loops, and dynamic content. No need to manually create DOM or call engine APIs for each slide.

**Type-safe** — Full TypeScript types and validation for the DSL and runners, so you get better DX and fewer runtime surprises.

**Modular design** — Core (`@slidejs/core`), DSL (`@slidejs/dsl`), and runners (`@slidejs/runner-revealjs`, etc.) are separate. Use only what you need; tree-shake the rest.

**Modern UI** — The official site and demos are built with [WSX](https://wsxjs.dev/) components, responsive and easy to customize.

**Responsive** — Generated decks work on desktop, tablet, and mobile.

## Quick start

Install the DSL, core, and a runner (e.g. Reveal.js):

```bash
npm install @slidejs/dsl @slidejs/core @slidejs/runner-revealjs
```

Define a small presentation in the DSL and run it:

```javascript
import { parseSlideDSL, compile } from '@slidejs/dsl';
import { createSlideRunner } from '@slidejs/runner-revealjs';

const dslSource = `
present quiz "my-quiz" {
  rules {
    rule start "intro" {
      slide {
        content text {
          "Welcome!"
        }
      }
    }
  }
}
`;

const runner = await createSlideRunner(dslSource, context, {
  container: '#slides'
});
```

You can drive slides from quiz questions, survey items, or any data by using `for` loops and rules in the DSL.

## Demos and docs

The site has demos for **Vue**, **React**, **Svelte**, and **vanilla TypeScript**, each comparing Reveal.js, Swiper, and Splide with the same DSL. That’s a good way to see how one definition can target multiple engines.

- **Site**: [https://slidejs.io/](https://slidejs.io/)
- **Demos**: [Vue](https://slidejs.io/demos/vue/) · [React](https://slidejs.io/demos/react/) · [Svelte](https://slidejs.io/demos/svelte/) · [Vanilla TS](https://slidejs.io/demos/vanilla/)

SlideJS is MIT-licensed, written in TypeScript, and has zero runtime dependencies. If you’re building slides from data (quizzes, surveys, or anything structured), I’d be happy if you try it and share feedback.
