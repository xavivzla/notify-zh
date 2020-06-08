# Notify zh

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).


It is a small library that can be used in any frontend framework. the library has a weight of 1.4 KB
Can be used on static websites as well as react js, vue js and angular js.

## Installation


```bash
 yarn add notify-zh or npm install notify-zh
```

## Usage

### React js

```jsx
  import React, {UseEffect} from 'React'
  import Notify from 'notify-zh'

  const MyComponent = () => {

    useEffect(() => {
      Notify.success("Load Component Success", { time: 5000 })
    }, [])

    return (
      <div>
        <button
        onClick={() =>
          Notify.success("Click Success", { time: 5000 })
        }
      >
        Success
      </button>
      </div>
    )
  }
```


### Vue js

```js
import Vue from "vue";
import Notify from "notify-zh";
import App from "./App.vue";

Vue.config.productionTip = false;

const MyPlugin = {
  install() {
    Vue.notify = Notify;
    Vue.prototype.$notify = Notify;
  }
};

Vue.use(MyPlugin);

new Vue({
  render: h => h(App)
}).$mount("#app");

### component 

<template>
  <div>
    <button @click="runError">Error</button>
  </div>
</template>

<script>
export default {
  name: "Component1",
  methods: {
    runError() {
      this.$notify.error("prueba", { position: "top-center", time: 5000 });
    }
  }
}
</script>
```