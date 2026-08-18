<script setup>
import notify from 'notify-zh'

notify.config({ position: 'top-right' })

const success = () => notify.success({ message: 'Hello from Vue!' })

const sticky = () =>
  notify.info({
    title: 'Sticky',
    message: 'Close me manually',
    time: Infinity,
    closable: true
  })

const save = () =>
  notify.promise(new Promise((r) => setTimeout(r, 2000)), {
    loading: 'Saving…',
    success: 'Saved!',
    error: 'Something went wrong'
  })
</script>

<template>
  <main style="font-family: system-ui; padding: 40px">
    <h1>notify-zh — Vue</h1>
    <button @click="success">Success</button>
    <button @click="sticky">Sticky + closable</button>
    <button @click="save">Promise</button>
    <button @click="notify.dismissAll()">Dismiss all</button>
  </main>
</template>
