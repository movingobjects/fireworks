# Fireworks

Animation exercise for Visual Electric

![Fireworks demo](https://github.com/movingobjects/github-assets/blob/main/visual-electric-fireworks/fireworks-demo.gif)

## Links

- [View demo](http://movingobjects.github.io/visual-electric-fireworks)
- [Animation challenge prompt](http://github.com/VisualElectric/animation-prompt)

## Implementation notes

### Fireworks system

Starting this challenge, I was excited to set up a _system_ that could generate a variety of fireworks (rather than a pre-scripted animation) and perhaps even unfold in unexpected ways.

#### Building blocks

The basic atoms of the display are (of course) [`firework`](https://github.com/movingobjects/visual-electric-fireworks/blob/main/client/src/pixi/Firework/index.ts)s, which I set up to contain a [`projectile`](https://github.com/movingobjects/visual-electric-fireworks/blob/main/client/src/pixi/Firework/Projectile.ts) and [`spark`](https://github.com/movingobjects/visual-electric-fireworks/blob/main/client/src/pixi/Spark/index.ts)s. The `projectile` is what shoots up, and the `spark`s are what fly off when the firework explodes.

Then the whole demo is broken into different [`mode`](https://github.com/movingobjects/visual-electric-fireworks/blob/main/client/src/config/modes.ts)s, which show how things can be configured to create different feelings.

#### Allowing variance

My typical approach to problems like this is to set up a handful of numeric properties that can vary within some given min/max range (for instance, the radius of each `spark`). From there, you can vary those properties for each firework to produce different effects.

For this exercise, I wanted add an additional layer—I wanted to allow variance both between each `firework` and between each `spark` within a single `firework`. So, for instance, in a single `firework`, each `spark` could be a different size/color and shoot off at a different speed, and each `firework` could also have a different feel than the others.

#### Collapse

The solution I came to here was to allow numeric values to be specified as `number`s, `Range`s, or `Array`s (what I typed as [`NumberOptions`](https://github.com/movingobjects/visual-electric-fireworks/blob/b49cd602d8b10694b38f7d2a47c2903da68b65e8/client/src/types/fireworks.ts#L3)). When a piece of code needs a number and encounters a `NumberOptions` value, the [`collapse`](https://github.com/movingobjects/visual-electric-fireworks/blob/b49cd602d8b10694b38f7d2a47c2903da68b65e8/client/src/utils/collapse.ts#L32) function is called to convert it to a single number in the following way:

- If the value is already a `number`, it just uses the number
- If the value is a `Range`, it collapses down to a random value between the min/max of that range
- If the value is an `Array`, it picks a random item from that list and then recursively collapses that item
  - In this way, the array could be a list of numbers, ranges, or another nested array

I also introduced [`shallowCollapse`](https://github.com/movingobjects/visual-electric-fireworks/blob/b49cd602d8b10694b38f7d2a47c2903da68b65e8/client/src/utils/collapse.ts#L10) for instances where I want to collapse the `NumberOptions` value one level, but not necessarily down to a single number.

With the `collapse` and `shallowCollapse` functions, I can control the variance of any property at the `spark` level, `firework` level, or at the level of the entire `mode`.

#### Trade-offs

Unfortunately, the multi-layer/recursive collapsing setup turns implementing a fun, simple control panel that allows users to play with the firework settings into a bit of a nightmare.

I instead set up [a few different modes](https://github.com/movingobjects/visual-electric-fireworks/blob/main/client/src/config/modes.ts) myself and added a simple UI to switch between them.

### PixiJS implementation

I did begin the project using [PixiJS React](https://pixijs.io/pixi-react/), but found myself fighting with it within the Next.js setup. I've been working mostly in React for a number of years, so this would have likely been a more familiar way to build things.

I found using the traditional object-oriented PixiJS approach was quicker getting going and perhaps lent itself better to the project for making use of the update/render loop.

### Going further

An idea I didn't end up having time to execute was allowing sequencing/choreographing of the fireworks, and being able to play back a fireworks show timed to music.

While I didn't end up getting to this, I did try to set things up in a way that would allow setting this up in the future. For instance, each firework is actually launched toward a particular location and is meant to explode there (in contrast to a perhaps simpler approach of launching with a particular angle & velocity or just specifying X and Y velocity values). This required setting up a [`utility function`](https://github.com/movingobjects/visual-electric-fireworks/blob/b49cd602d8b10694b38f7d2a47c2903da68b65e8/client/src/utils/math.ts#L15) that converts a target point on the screen to a X and Y velocity that will allow the `projectile` to reach that point at the peak of its arc.

This approach was a little over-engineered for the ultimate outcome, but I was happy that things were set up to someday allow a sequencer UX where you could decide exactly when and where a firework would explode.
