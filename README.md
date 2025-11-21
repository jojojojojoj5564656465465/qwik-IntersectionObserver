# Qwik IntersectionObserver Example

This repository demonstrates how to use the Intersection Observer API with Qwik framework to detect when elements become visible in the viewport.

## Overview

The `useIntersectionObserver` hook is a custom Qwik composable that provides a reactive way to track when elements enter or leave the viewport. This is particularly useful for:

- Lazy loading images or components
- Triggering animations when elements come into view
- Implementing infinite scrolling
- Tracking analytics for element visibility
- Performance optimization by deferring content until needed

## Features

- **Qwik Optimized**: Built with Qwik's reactivity system using signals
- **Flexible Configuration**: Customizable IntersectionObserver options
- **One-time Observation**: Option to stop observing after first intersection
- **TypeScript Support**: Fully typed for better developer experience
- **Cleanup Handling**: Automatic observer cleanup to prevent memory leaks

## Installation

```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
```

## Usage

### Basic Example

```tsx
import { component$, useSignal } from '@builder.io/qwik';
import { useIntersectionObserver } from './useIntersectionObserver';

export default component$(() => {
  const elementRef = useSignal<HTMLElement>();
  const isVisible = useIntersectionObserver(elementRef, false);

  return (
    <div>
      <div 
        ref={elementRef}
        class={`transition-opacity duration-500 ${
          isVisible.value ? 'opacity-100' : 'opacity-0'
        }`}
      >
        This element will fade in when it becomes visible
      </div>
    </div>
  );
});
```

### One-time Observation

```tsx
import { component$, useSignal } from '@builder.io/qwik';
import { useIntersectionObserver } from './useIntersectionObserver';

export default component$(() => {
  const elementRef = useSignal<HTMLElement>();
  // Only trigger once - when the element first becomes visible
  const hasBeenSeen = useIntersectionObserver(elementRef, true);

  return (
    <div>
      {hasBeenSeen.value && (
        <div ref={elementRef}>
          This content only loads when it enters the viewport
        </div>
      )}
    </div>
  );
});
```

### Custom Options

```tsx
import { component$, useSignal } from '@builder.io/qwik';
import { useIntersectionObserver } from './useIntersectionObserver';

export default component$(() => {
  const elementRef = useSignal<HTMLElement>();
  
  const options = {
    threshold: 0.8, // Trigger when 80% visible
    rootMargin: '50px', // Expand the root margin
  };

  const isMostlyVisible = useIntersectionObserver(elementRef, false, options);

  return (
    <div ref={elementRef}>
      {isMostlyVisible.value ? '80% visible!' : 'Scroll more...'}
    </div>
  );
});
```

## API Reference

### `useIntersectionObserver`

```typescript
function useIntersectionObserver(
  elementREF: Signal<HTMLElement | undefined>,
  onceObserver: boolean,
  option?: IntersectionObserverInit
): Signal<boolean | undefined>
```

#### Parameters

- `elementREF`: A Qwik signal containing the HTML element to observe
- `onceObserver`: If `true`, stops observing after the first intersection
- `option`: Optional IntersectionObserver configuration
  - `threshold`: Number between 0 and 1 indicating the percentage that should be visible before triggering
  - `root`: The element that is used as the viewport
  - `rootMargin`: Margin around the root (similar to CSS margin)

#### Returns

A reactive signal that updates with the intersection state (`true` when intersecting, `false` otherwise).

## Qwik Specific Notes

- Uses `useVisibleTask$` for DOM operations (runs only in the browser)
- Implements proper cleanup with Qwik's `cleanup` function
- Leverages Qwik signals for reactive state management
- Follows Qwik's lazy loading principles for optimal performance

## Browser Support

The Intersection Observer API is supported in all modern browsers. For older browsers, consider adding a polyfill.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

MIT License - feel free to use this code in your own projects!