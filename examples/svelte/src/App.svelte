<script>
  import notify from 'notify-zh'

  notify.config({ position: 'top-right' })

  const save = () =>
    notify.promise(new Promise((r) => setTimeout(r, 2000)), {
      loading: 'Saving…',
      success: 'Saved!',
      error: 'Something went wrong'
    })
</script>

<main style="font-family: system-ui; padding: 40px">
  <h1>notify-zh — Svelte</h1>
  <button onclick={() => notify.success({ message: 'Hello from Svelte!' })}>
    Success
  </button>
  <button
    onclick={() =>
      notify.info({
        title: 'Sticky',
        message: 'Close me manually',
        time: Infinity,
        closable: true
      })}
  >
    Sticky + closable
  </button>
  <button onclick={save}>Promise</button>
  <button onclick={() => notify.dismissAll()}>Dismiss all</button>
</main>
