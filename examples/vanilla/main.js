import notify from 'notify-zh'

notify.config({ position: 'top-right' })

document.getElementById('success').addEventListener('click', () => {
  notify.success({ message: 'Operation successful!', icon: { el: '✅' } })
})

document.getElementById('sticky').addEventListener('click', () => {
  notify.warning({
    title: 'Heads up',
    message: 'This stays until you close it',
    time: Infinity,
    closable: true
  })
})

document.getElementById('promise').addEventListener('click', () => {
  notify.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
    loading: 'Saving…',
    success: 'Saved!',
    error: 'Something went wrong'
  })
})

document.getElementById('dismiss').addEventListener('click', () => {
  notify.dismissAll()
})
