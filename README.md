# Breakpoints Composable for Vue 3

A simple Vue 3 composable that provides reactive breakpoints for Tailwind, Bootstrap, or custom configurations. Easily determine the current viewport size and its relation to your breakpoints with auto-completion in TypeScript.

## This works only with Vue 3 Composition API

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

### Examples of usage

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

#### Global availablity by using pinia store

This approach is beneficial as it allows us to initialize the composable just once, minimizing the number of event listeners.

```
//Pinia file store
import { useBreakpoints } from 'vue3-responsive-breakpoints';
import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', () => {

//Since the composable is already reactive, there's no need to store the breakpoints in a ref.
const breakpoints = useBreakpoints();

//Other store shenanigans

  return {
    breakpoints
  };
});
```

```
<script setup>
import { useGeneralStore } from 'store directory'

// If the breakpoints was not assigned to a ref, DO NO USE storeToRefs
const { breakpoints } = useGeneralStore();

</script>

<template>
  <p v-if="breakpoints.sm">This is an example</p>
</template>
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
