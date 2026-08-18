import * as React from 'react'
import { createRoot } from 'react-dom/client'
import notify from '../dist/index.js'

notify.config({
  defaultTime: 2500,
  position: 'top-right'
})

const App = () => {
  const showSuccess = () =>
    notify.success({ message: 'Operation successful!', icon: { el: '✅' } })

  const showStickyClosable = () =>
    notify.warning({
      message: 'Sticky notification — close me manually',
      title: 'Heads up',
      time: Infinity,
      closable: true
    })

  const showPromise = () =>
    notify.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Saving your changes…',
      success: 'Changes saved!',
      error: 'Something went wrong'
    })

  const showQueue = () => {
    notify.config({ maxVisible: 3 })
    for (let i = 1; i <= 6; i++) {
      notify.info({ message: `Queued notification ${i} of 6` })
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, padding: 24, flexWrap: 'wrap' }}>
      <button onClick={showSuccess}>Success</button>
      <button onClick={showStickyClosable}>Sticky + closable</button>
      <button onClick={showPromise}>Promise (loading → success)</button>
      <button onClick={showQueue}>Queue (maxVisible: 3)</button>
      <button onClick={() => notify.dismissAll()}>Dismiss all</button>
    </div>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
