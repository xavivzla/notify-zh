# Notify zh

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

Es una pequeña libreria para el FrontEnd. Esta libreria tiene un peso de 1.4 Kb.

Puede ser usada en paginas estaticas como en frameworks (React, Vue js, angular)

## Instalación


```bash
 yarn add notify-zh or npm install notify-zh
```

## Uso

### React js

```jsx
  import React, {UseEffect} from 'React'
  import Notify from 'notify-zh'

  const MyComponent = () => {

    useEffect(() => {
      Notify.success({
            message: 'Success',
            option: {
              time: 5000
            }
          })
    }, [])

    return (
      <div>
        <button
        onClick={() =>
          Notify.success({
            message: 'Success',
            option: {
              time: 5000,
              icon: {
                el: `<span style="background: #ddd; padding: 9px; border-radius: 50%">
                      <i>!</i>
                    </span>`
              }
            }
          })
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
      this.$notify.error({
        message: 'Error',
        option: {
          time: 5000,
          icon: {
            el: `<span style="background: #ddd; padding: 9px; border-radius: 50%">
                  <i>!</i>
                </span>`
          }
        }
      });
    }
  }
}
</script>
```