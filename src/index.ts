import {
  PropsOptions,
  PropsConfig,
  PropsOptionsSubscribe,
  NotificationPosition
} from './types'

const NOTIFY_CONTAINER_ID = 'notifyContainer'
const NOTIFICATION_WRAPPER_ID = 'divNotification'
const NOTIFY_CLASS = 'notifyCustom'
const ANIMATE_IN_CLASS = 'animateInOpacity'
const ANIMATE_OUT_CLASS = 'animateOutOpacity'

class Notify {
  #isInitialized: boolean = false
  #index: number = 1

  #settings: PropsConfig = {
    defaultTime: 3000,
    position: 'center-top',
    disableDefaultStyles: false,
    classNames: {},
    backgrounds: {
      warning: '#F09200',
      error: '#DE350B',
      success: '#13BF5F',
      info: '#4261fb'
    }
  }

  #getPositionStyles(position: NotificationPosition): string {
    const base = 'position:fixed;z-index:2000;pointer-events:none;'
    const positions = {
      'top-left': 'top:20px;left:20px',
      'top-right': 'top:20px;right:20px',
      'bottom-left': 'bottom:20px;left:20px',
      'bottom-right': 'bottom:20px;right:20px',
      'center-bottom': 'bottom:20px;left:50%;transform:translateX(-50%)',
      'center-top': 'top:20px;left:50%;transform:translateX(-50%)',
      center: 'top:50%;left:50%;transform:translate(-50%,-50%)'
    }
    return base + (positions[position] || positions['center-top'])
  }

  #addGlobalStyles() {
    if (document.getElementById('notify-zh-styles')) return
    const sheet = document.createElement('style')
    sheet.id = 'notify-zh-styles'
    sheet.textContent = `.${NOTIFY_CLASS}{z-index:9999;border-radius:5px;box-sizing:border-box;color:#fff;font-size:1rem;background:#000;text-align:center;padding:12px 40px;opacity:0;display:inline;margin-bottom:10px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.${ANIMATE_IN_CLASS}{animation:showOpacity 1s}.${ANIMATE_OUT_CLASS}{animation:hideOpacity 1s}@keyframes showOpacity{from{opacity:0}to{opacity:1}}@keyframes hideOpacity{from{opacity:1}to{opacity:0}}`
    document.head.appendChild(sheet)
  }

  #getOrCreateContainerForPosition(
    position: NotificationPosition
  ): HTMLElement {
    const containerId = `${NOTIFY_CONTAINER_ID}-${position}`
    let container = document.getElementById(containerId)

    if (!container) {
      container = document.createElement('div')
      container.id = containerId

      const positionStyles = this.#getPositionStyles(position)
      container.style.cssText = positionStyles

      const wrapper = document.createElement('div')
      wrapper.id = `${NOTIFICATION_WRAPPER_ID}-${position}`
      wrapper.style.display = 'flex'
      wrapper.style.flexDirection = position.includes('bottom')
        ? 'column'
        : 'column-reverse'
      wrapper.style.alignItems = 'center'

      container.appendChild(wrapper)
      document.body.appendChild(container)
    }

    return container
  }

  #setNotify(data: PropsOptionsSubscribe): HTMLElement {
    const { type, message, icon, title } = data
    const notificationId = this.#index++
    const baseClass = this.#settings.classNames?.base ?? NOTIFY_CLASS
    const customTypeClass = this.#settings.classNames?.[type]
    const typeClass = customTypeClass ?? `notify-${type}`

    const item = document.createElement('div')
    item.className = `${baseClass} ${typeClass}`
    item.id = `notify-${notificationId}`
    item.setAttribute(
      'role',
      type === 'error' || type === 'warning' ? 'alert' : 'status'
    )

    if (icon?.el) {
      const iconSpan = document.createElement('span')
      iconSpan.innerHTML = icon?.el
      item.appendChild(iconSpan)
    }

    const content = document.createElement('div')
    if (title) {
      const titleEl = document.createElement('strong')
      titleEl.textContent = title
      titleEl.style.display = 'block'
      content.appendChild(titleEl)
    }
    const messageSpan = document.createElement('span')
    messageSpan.textContent = message
    content.appendChild(messageSpan)
    item.appendChild(content)

    item.style.display = 'flex'
    item.style.alignItems = 'center'
    if (!customTypeClass) {
      item.style.background = this.#settings.backgrounds?.[type] ?? '#000'
    }
    if (this.#settings.width) item.style.width = this.#settings.width
    if (this.#settings.maxWidth) item.style.maxWidth = this.#settings.maxWidth

    return item
  }

  #animateOut(element: HTMLElement) {
    const animateOutClass =
      this.#settings.classNames?.animateOut ?? ANIMATE_OUT_CLASS
    const animateInClass =
      this.#settings.classNames?.animateIn ?? ANIMATE_IN_CLASS
    element.addEventListener(
      'animationend',
      () => {
        element.remove()
      },
      { once: true }
    )
    element.classList.remove(animateInClass)
    element.classList.add(animateOutClass)
  }

  #animateIn(element: HTMLElement) {
    const animateInClass =
      this.#settings.classNames?.animateIn ?? ANIMATE_IN_CLASS
    element.style.opacity = '0'
    requestAnimationFrame(() => {
      element.classList.add(animateInClass)
      element.style.opacity = '1'
    })
  }

  #subscribe(subscriptor: PropsOptionsSubscribe) {
    // No-op outside the browser (SSR: Next.js, Nuxt, Astro, etc.)
    if (typeof document === 'undefined') return

    if (!this.#isInitialized && !this.#settings.disableDefaultStyles) {
      this.#addGlobalStyles()
      this.#isInitialized = true
    }

    const position =
      subscriptor.position ?? this.#settings.position ?? 'center-top'

    const container = this.#getOrCreateContainerForPosition(position)
    const wrapper = container.querySelector(
      `#${NOTIFICATION_WRAPPER_ID}-${position}`
    ) as HTMLElement

    if (!wrapper) {
      console.error('Notify zh: Notification wrapper not available.')
      return
    }

    const element = this.#setNotify(subscriptor)
    const time = subscriptor.time ?? this.#settings.defaultTime

    wrapper.appendChild(element)
    this.#animateIn(element)

    setTimeout(() => {
      this.#animateOut(element)
    }, time)
  }

  // methods
  /**
   * Update global configuration for all notifications.
   * @param data - Configuration object values to update
   */
  config(data: Partial<PropsConfig>) {
    this.#settings = {
      ...this.#settings,
      ...data,
      classNames: {
        ...this.#settings.classNames,
        ...(data.classNames ?? {})
      }
    }
  }

  /**
   * Show a success notification
   * @param data - Notification options (message, time, position, etc.)
   */
  success(data: PropsOptions) {
    this.#subscribe({ ...data, type: 'success' })
  }

  /**
   * Show a warning notification
   * @param data - Notification options (message, time, position, etc.)
   */
  warning(data: PropsOptions) {
    this.#subscribe({ ...data, type: 'warning' })
  }

  /**
   * Show an error notification
   * @param data - Notification options (message, time, position, etc.)
   */
  error(data: PropsOptions) {
    this.#subscribe({ ...data, type: 'error' })
  }

  /**
   * Show an info notification
   * @param data - Notification options (message, time, position, etc.)
   */
  info(data: PropsOptions) {
    this.#subscribe({ ...data, type: 'info' })
  }

  /**
   * Dismiss every visible notification immediately (plays the out animation).
   */
  dismissAll() {
    if (typeof document === 'undefined') return
    const items = document.querySelectorAll(
      `[id^="${NOTIFICATION_WRAPPER_ID}-"] > div`
    )
    items.forEach((el) => this.#animateOut(el as HTMLElement))
  }
}

const notify = new Notify()

export type {
  PropsOptions,
  PropsConfig,
  ClassNameOptions,
  NotificationPosition
} from './types'

export default notify
