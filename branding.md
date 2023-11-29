---
layout: page.njk
colors:
  - name: A
    value: '#009B9A'
  - name: B
    value: '#2E5153'
  - name: C
    value: '#4A5583'
  - name: D
    value: '#7C87F0'
  - name: E
    value: '#001F44'
  - name: Dark
    value: '#1A1A1A'
  - name: Gray
    value: '#666666'
  - name: Light
    value: '#FFFFFF'
---

# NortHFutures brand guidelines

This is a temporary page containing the NortHFutures brand guidelines.
It is a **work in progress**.

The website style is built on top of [Alembic](https://alembic.openlab.dev), Open Lab's design toolkit.

## Wording

**NortHFutures** is the project name `Nort-H-Futures`, note the capital `H`.

## Logotype

The logotype is the best way to reference the project in documents or on other wesites.

> The logotype contains an alpha background to allow for different background colours but they must be **subtle** and have a good contrast to maintain legibility.

### Dark

The dark variant of the logo, for use on lighter backgrounds.
<a href="/assets/northfutures-dark.svg" download="northfutures-dark.svg">Download</a>.

<div class="pictureBox" style="background: #ffffff">
<img src="/assets/northfutures-dark.svg" alt="NortHFutures dark logotype">
</div>

> **MUST** be displayed on a near-white background

### Light

The light variant of the logo, for use on darker backgrounds.
<a href="/assets/northfutures-light.svg" download="northfutures-light.svg">Download</a>.

<div class="pictureBox" style="background: #1A1A1A">
<img src="/assets/northfutures-light.svg" alt="NortHFutures dark logotype">
</div>

> **MUST** be displayed on a near-black background

### PNG

The main versions of the logotype are SVG, to work best on the web and keep filesize down. There are also PNG variants if you need them:

- <a href="/assets/northfutures-dark.png" download="northfutures-dark.png">northfutures-dark.png</a>
- <a href="/assets/northfutures-light.png" download="northfutures-light.png">northfutures-light.png</a>

## Fonts

These are the fonts for NortHFutures, they are available from [Open Lab Fonts](https://fonts.openlab.dev).

- **Montserrat** is the title font for NortHFutures, use it for headings and big text.
- **Inter** is the body font for NortHFutures, use it for the main text and buttons.

## Colours

These are the NortHFutures' colours:

<grid-layout min="220px">
{% for color in colors %}
<cluster-layout class="colorBox" space="var(--s-1)" align="center">
  <span class="colorCircle" style="--color: {{ color.value }}"></span>
  <code>{{ color.value }}</code>
  <span>{{ color.name }}</span>
</cluster-layout>
{% endfor %}
</grid-layout>

> TODO: come up with better names and then CSS variables

<!-- --- -->

<style>
  .pictureBox {
    padding: 2em;
    border: var(--s-5) dashed #666666;
  }
  .pictureBox > * {
    max-width: 100%;
    height: auto;
  }
  .colorCircle {
    display: inline-block;
    box-shadow: 0 0 0 var(--s-5) #666;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    background-color: var(--color);
  }
  h2 {
    --flow: 3em;
  }
</style>
