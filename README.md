# Notify zh ✨

[![NPM Version](https://img.shields.io/npm/v/notify-zh?style=flat-square)](https://www.npmjs.com/package/notify-zh)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/notify-zh?style=flat-square)](https://bundlephobia.com/result?p=notify-zh)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**Notify zh** is an extremely lightweight (≈1.6 KB gzipped), zero-dependency notification library designed for maximum flexibility and compatibility across all frontend projects.

Simple, fast, and easy to integrate, it works seamlessly with:

- Vanilla JavaScript
- React & Next.js
- Vue.js
- Angular
- Svelte

and any other framework or library using JavaScript in the browser!

It now features enhanced customization options, allowing easy integration with CSS frameworks like **Tailwind CSS**, Bootstrap, Bulma, or your own custom styles.

---

**[➡️ View Live Demo ⬅️]**(https://codesandbox.io/p/sandbox/notify-zh-vh3jk)

---

## ✨ Features

- **🚀 Extremely Lightweight:** Tiny footprint (≈1.4 KB gzipped).
- **✅ Zero Dependencies:** No external libraries needed.
- **🔧 Simple API:** Get started in minutes with an intuitive API.
- **🎨 Highly Customizable:** Use custom HTML icons and easily integrate with **any CSS framework** (Tailwind, Bootstrap, etc.) or your own styles by providing custom classes and disabling default styles.
- **🌐 Universal Compatibility:** Works everywhere JavaScript runs in the browser.
- **🎯 TypeScript Ready:** Written in TypeScript with types included.

## 📦 Installation

Install `notify-zh` using your favorite package manager:

```bash
npm install notify-zh
or
yarn add notify-zh
```

🚀 Usage notify-zh exports a single pre-initialized instance, ready to use immediately after import.

```js
// Import the default instance
import notify from 'notify-zh'

// Basic usage anywhere in your client-side JavaScript code
notify.success({ message: 'Action completed!' })

notify.error({
  message: 'Something went wrong!',
  time: 5000 // Show for 5 seconds
})

// Using different positions
notify.info({
  message: 'Information message',
  position: 'top-right'
})

// With custom icon and title
notify.warning({
  message: 'Please check your input',
  title: 'Validation Warning',
  icon: { el: '⚠️' },
  position: 'bottom-left'
})

// Configure global settings
notify.config({
  defaultTime: 4000,
  position: 'top-right',
  backgrounds: {
    success: '#10B981',
    error: '#EF4444'
  }
})
```

Here are examples for different environments:🍦 Vanilla JavaScript

```js
<!DOCTYPE html>
<html>
<head>
    <title>Notify zh Demo</title>
    <script type="module">
        // Import directly from node_modules or your bundled assets
        import notify from './node_modules/notify-zh/dist/index.mjs'; // Adjust path as needed

        function showInfo() {
            notify.info({
                message: 'This is an informational message.',
                time: 5000 // Show for 5 seconds
            });
        }

        function setup() {
            const btn = document.getElementById('infoButton');
            if (btn) {
                btn.addEventListener('click', showInfo);
            }
        }
        document.addEventListener('DOMContentLoaded', setup);
    </script>
</head>
<body>
    <h1>Notify zh - Vanilla JS</h1>
    <button id="infoButton">Show Info Notification</button>
</body>
</html>

```

⚛️ React / Next.jsWorks identically in React and Next.js (client-side components).

```jsx
import React from 'react'
import notify from 'notify-zh'

function MyComponent() {
  const handleSuccess = () => {
    notify.success({
      message: 'Item added!',
      time: 2500,
      icon: { el: `<span style="margin-right: 8px;">✅</span>` }
    })
  }

  return (
    <div>
      <h2>React/Next.js Example</h2>
      <button onClick={handleSuccess}>Show Success</button>
    </div>
  )
}
export default MyComponent
```

💚 Vue.js

```jsx
<template>
  <div>
    <h2>Vue Example</h2>
    <button @click="showWarning">Show Warning</button>
  </div>
</template>

<script>
import notify from 'notify-zh';

export default {
  name: 'VueNotifyExample',
  methods: {
    showWarning() {
      notify.warning({
        message: 'Please check the input fields.',
        time: 4000,
      });
    }
  }
}
</script>
```

Angular

```jsx
// my-component.component.ts
import { Component } from '@angular/core'
import notify from 'notify-zh' // Import the instance

@Component({
  selector: 'app-my-component',
  template: `
    <h2>Angular Example</h2>
    <button (click)="showInfo()">Show Info</button>
  `
})
export class MyComponent {
  showInfo() {
    notify.info({
      message: 'System maintenance upcoming.',
      time: 6000
    })
  }
}
```

### ⚙️ API Reference

#### Methods

The imported **Notify** object provides the following methods to display notifications:

- notify.success(options)
- notify.error(options)
- notify.warning(options)
- notify.info(options)

#### Options (PropsOptions)

All notification methods accept an options object:

| Option   | Type                 | Default   | Description                                      |
| -------- | -------------------- | --------- | ------------------------------------------------ |
| message  | string               | ''        | (Required) The text content of the notification. |
| time     | number               | 3000      | Duration in milliseconds before auto-closing.    |
| position | NotificationPosition | 'center-top' | Position where the notification appears.      |
| icon.el  | string               | undefined | Optional HTML string for a custom icon element.  |
| title    | string               | undefined | Optional title for the notification.             |

#### Available Positions

The `position` option accepts the following values:

- `'top-left'` - Top left corner
- `'top-right'` - Top right corner  
- `'bottom-left'` - Bottom left corner
- `'bottom-right'` - Bottom right corner
- `'center-top'` - Top center (default)
- `'center-bottom'` - Bottom center
- `'center'` - Screen center

#### Configuration (notify.config(options))

Set global configuration options that apply to all subsequent notifications. Call this early in your application setup.

import notify from 'notify-zh';

```js
notify.config({
defaultTime: 5000, // Default display time: 5 seconds
// --- For CSS Framework Integration ---
disableDefaultStyles: true, // Disable built-in CSS
classNames: { /_ ... see Styling section ... _/ }
});

```

The config method accepts an object (Partial<PropsConfig>) with these properties:

| Option               | Type                 | Default      | Description                                                                                                         |
| -------------------- | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| defaultTime          | number               | 3000         | Default auto-close time in milliseconds.                                                                            |
| position             | NotificationPosition | 'center-top' | Default position for all notifications.                                                                             |
| backgrounds          | object               | {}           | Object to override default background colors per type (success, error, warning, info). Ignored if using classNames. |
| maxWidth             | string               | undefined    | Maximum width for notifications.                                                                                    |
| width                | string               | undefined    | Fixed width for notifications.                                                                                      |
| disableDefaultStyles | boolean              | false        | If true, prevents the library from injecting its default CSS. Essential for using custom framework classes.         |
| classNames           | object               | {}           | An object to provide custom CSS class names, replacing the library's defaults. See details below.                   |

#### Default Background Colors

The library comes with these default background colors:

```javascript
{
  warning: '#F09200',  // Orange
  error: '#DE350B',    // Red
  success: '#13BF5F',  // Green
  info: '#4261fb'      // Blue
}
```

#### 🎨 Styling & CSS Framework Integration

You have two main ways to style notifications:

1. Using Default Styles (Easiest)By default, notify-zh injects basic CSS for functional notifications with default colors and animations. You can slightly customize the background colors using notify.config({ backgrounds: { ... } }).
2. Using Custom Classes (Tailwind CSS, Bootstrap, etc.).

   For complete control and integration with CSS frameworks:Disable Default Styles: Set

   - disableDefaultStyles: true in the config.

   - Provide Custom Classes: Use the classNames object in the config to map your framework's classes (or your own custom classes) to the notification elements.

```js
notify.config({
  disableDefaultStyles: true, // REQUIRED for custom classes
  classNames: {
    // Class(es) for the base notification element (replaces .notifyCustom)
    base: 'p-4 mb-2 rounded-md shadow-lg text-white max-w-sm pointer-events-auto flex items-center',

    // Additional classes applied based on notification type
    success: 'bg-green-500', // Example: Tailwind success background
    error: 'bg-red-600', // Example: Tailwind error background
    warning: 'bg-yellow-500', // Example: Tailwind warning background
    info: 'bg-blue-500', // Example: Tailwind info background

    // Classes for animations (You'll need to define these animations in your CSS)
    animateIn: 'animate-fade-in', // Example: Your custom fade-in animation class
    animateOut: 'animate-fade-out' // Example: Your custom fade-out animation class
  }
})

// Example usage with Tailwind - Icon uses Tailwind classes too!
notify.success({
  message: 'Tailwind styled notification!',
  icon: {
    el: `<svg class="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`
  }
})
```

#### **Key classNames Properties:**

- base: Applied to every notification element.
- success, error, warning, info: Applied in addition to base based on the notification type.
- animateIn, animateOut: Applied during the show/hide animations.
