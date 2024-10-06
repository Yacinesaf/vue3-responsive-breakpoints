# Breakpoints Composable for Vue 3

A simple Vue 3 composable that provides reactive breakpoints for Tailwind, Bootstrap, or custom configurations. Easily determine the current viewport size and its relation to your breakpoints with auto-completion in TypeScript.

### Features

- Responsive breakpoints based on Tailwind or Bootstrap.
- Pass custom breakpoints.
- Adjustable debounce delay for resize events.
- Auto-completion with TypeScript support.

### TypeScript Support

The composable is written in TypeScript and provides full type support, including for custom breakpoints. You’ll get type safety and autocompletion when accessing the returned breakpoint properties.

### Installation

First, install the package via npm:

```
npm install vue3-responsive-breakpoints
```

Since Vue is a peer dependency, ensure it's installed in your project:

```
npm install vue
```

## Usage

Import the useBreakpoints composable and set up your breakpoints configuration.

```
<script setup>
import { useBreakpoints } from 'vue3-responsive-breakpoints';

const breakpoints = useBreakpoints();

</script>
```

examples of usage

```
<script setup>
import { useBreakpoints } from 'vue3-responsive-breakpoints';

const breakpoints = useBreakpoints();

</script>

<template>
  <p v-if="breakpoints.sm">This is an example</p>
</template>
```

```
<script setup>
import { useBreakpoints } from 'vue3-responsive-breakpoints';

const breakpoints = useBreakpoints();

function ExampleFunction() {
  return breakpoints.smDown ? "Screen width is small or below" : "Screen is above small"
}

</script>
```

### Available Breakpoint Properties

- `xs`, `sm`, `md`, `lg`, `xl`, `xxl`: Check if the viewport is within a specific breakpoint range.
- `xsUp`, `smUp`, `mdUp`, `lgUp`, `xlUp`, `xxlUp`: Check if the viewport is at or above a specific breakpoint.
- `xsDown`, `smDown`, `mdDown`, `lgDown`, `xlDown`, `xxlDown`: Check if the viewport is below a specific breakpoint.

## API

| Params                   | Default              | Value                                                                                                        |
| ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Preset (optional)        | Default `'tailwind'` | `'tailwind'`, `'bootstrap'`, custom object: `{ sm: number, md: number, lg: number, xl: number, xxl: number}` |
| debounceDelay (Optional) | 250ms                | `Number`                                                                                                     |

## License

MIT License
