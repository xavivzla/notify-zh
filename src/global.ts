import notify from './index'

declare global {
  interface Window {
    notify: typeof notify
  }
}

if (typeof window !== 'undefined') {
  window.notify = notify
}

export default notify
