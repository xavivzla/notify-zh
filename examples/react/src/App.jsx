import notify from 'notify-zh'

notify.config({ position: 'top-right' })

export default function App() {
  const save = () =>
    notify.promise(new Promise((r) => setTimeout(r, 2000)), {
      loading: 'Saving…',
      success: 'Saved!',
      error: 'Something went wrong'
    })

  return (
    <main style={{ fontFamily: 'system-ui', padding: 40 }}>
      <h1>notify-zh — React</h1>
      <button onClick={() => notify.success({ message: 'Hello from React!' })}>
        Success
      </button>{' '}
      <button
        onClick={() =>
          notify.info({
            title: 'Sticky',
            message: 'Close me manually',
            time: Infinity,
            closable: true
          })
        }
      >
        Sticky + closable
      </button>{' '}
      <button onClick={save}>Promise</button>{' '}
      <button onClick={() => notify.dismissAll()}>Dismiss all</button>
    </main>
  )
}
