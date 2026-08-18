import {
  PropsOptions,
  PropsConfig,
  PropsOptionsSubscribe,
  PromiseMessages,
  NotificationPosition
} from './types'

const NOTIFY_CONTAINER_ID = 'notifyContainer'
const NOTIFICATION_WRAPPER_ID = 'divNotification'
const NOTIFY_CLASS = 'notifyCustom'
const ANIMATE_IN_CLASS = 'animateInOpacity'
const ANIMATE_OUT_CLASS = 'animateOutOpacity'

interface QueuedNotification {
  subscriptor: PropsOptionsSubscribe
  id: number
}

class Notify {
  #isInitialized: boolean = false
  #index: number = 1
  #timers = new Map<number, ReturnType<typeof setTimeout>>()
  #queues = new Map<NotificationPosition, QueuedNotification[]>()

  #settings: PropsConfig = {
    defaultTime: 3000,
    position: 'center-top',
    disableDefaultStyles: false,
    pauseOnHover: true,
    closable: false,
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
    sheet.textContent = `.${NOTIFY_CLASS}{z-index:9999;border-radius:5px;box-sizing:border-box;color:#fff;font-size:1rem;background:#000;text-align:center;padding:12px 40px;opacity:0;display:inline;margin-bottom:10px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.${ANIMATE_IN_CLASS}{animation:showOpacity 1s}.${ANIMATE_OUT_CLASS}{animation:hideOpacity 1s}@keyframes showOpacity{from{opacity:0}to{opacity:1}}@keyframes hideOpacity{from{opacity:1}to{opacity:0}}@media (prefers-reduced-motion:reduce){.${ANIMATE_IN_CLASS},.${ANIMATE_OUT_CLASS}{animation-duration:.01s}}`
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

  #setNotify(data: PropsOptionsSubscribe, id: number): HTMLElement {
    const { type, message, icon, title } = data
    const baseClass = this.#settings.classNames?.base ?? NOTIFY_CLASS
    const customTypeClass = this.#settings.classNames?.[type]
    const typeClass = customTypeClass ?? `notify-${type}`

    const item = document.createElement('div')
    item.className = `${baseClass} ${typeClass}`
    item.id = `notify-${id}`
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

    const closable = data.closable ?? this.#settings.closable ?? false
    if (closable) {
      const closeBtn = document.createElement('button')
      closeBtn.type = 'button'
      closeBtn.textContent = '×'
      closeBtn.setAttribute('aria-label', 'Close notification')
      closeBtn.style.cssText =
        'background:none;border:none;color:inherit;font-size:1.25em;line-height:1;cursor:pointer;margin-left:12px;padding:0'
      closeBtn.addEventListener('click', () => this.#animateOut(item))
      item.appendChild(closeBtn)
    }

    item.style.display = 'flex'
    item.style.alignItems = 'center'
    item.style.pointerEvents = 'auto'
    if (!customTypeClass) {
      item.style.background = this.#settings.backgrounds?.[type] ?? '#000'
    }
    if (this.#settings.width) item.style.width = this.#settings.width
    if (this.#settings.maxWidth) item.style.maxWidth = this.#settings.maxWidth

    return item
  }

  #animateOut(element: HTMLElement) {
    const id = Number(element.id.replace('notify-', ''))
    const timer = this.#timers.get(id)
    if (timer) clearTimeout(timer)
    this.#timers.delete(id)

    const animateOutClass =
      this.#settings.classNames?.animateOut ?? ANIMATE_OUT_CLASS
    const animateInClass =
      this.#settings.classNames?.animateIn ?? ANIMATE_IN_CLASS

    const wrapper = element.parentElement
    element.addEventListener(
      'animationend',
      () => {
        element.remove()
        if (wrapper && wrapper.id.startsWith(NOTIFICATION_WRAPPER_ID)) {
          const position = wrapper.id.slice(
            NOTIFICATION_WRAPPER_ID.length + 1
          ) as NotificationPosition
          this.#drainQueue(position, wrapper)
        }
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

  #drainQueue(position: NotificationPosition, wrapper: HTMLElement) {
    const queue = this.#queues.get(position)
    if (!queue) return
    const maxVisible = this.#settings.maxVisible
    while (
      queue.length > 0 &&
      (!maxVisible || wrapper.children.length < maxVisible)
    ) {
      const next = queue.shift()
      if (next) this.#display(next.subscriptor, next.id, wrapper)
    }
  }

  #display(
    subscriptor: PropsOptionsSubscribe,
    id: number,
    wrapper: HTMLElement
  ) {
    const element = this.#setNotify(subscriptor, id)
    const time = subscriptor.time ?? this.#settings.defaultTime ?? 3000

    wrapper.appendChild(element)
    this.#animateIn(element)

    if (time !== Infinity) {
      let remaining = time
      let startedAt = Date.now()

      const start = () => {
        startedAt = Date.now()
        this.#timers.set(
          id,
          setTimeout(() => this.#animateOut(element), remaining)
        )
      }
      const pause = () => {
        const timer = this.#timers.get(id)
        if (timer) clearTimeout(timer)
        this.#timers.delete(id)
        remaining = Math.max(0, remaining - (Date.now() - startedAt))
      }

      if (this.#settings.pauseOnHover !== false) {
        element.addEventListener('mouseenter', pause)
        element.addEventListener('mouseleave', () => {
          if (element.isConnected) start()
        })
      }
      start()
    }
  }

  #subscribe(subscriptor: PropsOptionsSubscribe): number {
    const id = this.#index++

    // No-op outside the browser (SSR: Next.js, Nuxt, Astro, etc.)
    if (typeof document === 'undefined') return id

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
      return id
    }

    const maxVisible = this.#settings.maxVisible
    if (maxVisible && maxVisible > 0 && wrapper.children.length >= maxVisible) {
      const queue = this.#queues.get(position) ?? []
      queue.push({ subscriptor, id })
      this.#queues.set(position, queue)
      return id
    }

    this.#display(subscriptor, id, wrapper)
    return id
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
   * @returns Notification id, usable with notify.dismiss(id)
   */
  success(data: PropsOptions): number {
    return this.#subscribe({ ...data, type: 'success' })
  }

  /**
   * Show a warning notification
   * @param data - Notification options (message, time, position, etc.)
   * @returns Notification id, usable with notify.dismiss(id)
   */
  warning(data: PropsOptions): number {
    return this.#subscribe({ ...data, type: 'warning' })
  }

  /**
   * Show an error notification
   * @param data - Notification options (message, time, position, etc.)
   * @returns Notification id, usable with notify.dismiss(id)
   */
  error(data: PropsOptions): number {
    return this.#subscribe({ ...data, type: 'error' })
  }

  /**
   * Show an info notification
   * @param data - Notification options (message, time, position, etc.)
   * @returns Notification id, usable with notify.dismiss(id)
   */
  info(data: PropsOptions): number {
    return this.#subscribe({ ...data, type: 'info' })
  }

  /**
   * Track a promise: shows a sticky loading notification, then replaces it
   * with a success or error notification when the promise settles.
   * Returns the same promise, so it can be awaited transparently.
   *
   * @example
   * await notify.promise(saveUser(), {
   *   loading: 'Saving…',
   *   success: 'User saved!',
   *   error: (e) => `Failed: ${e.message}`
   * })
   */
  promise<T>(
    promise: Promise<T>,
    messages: PromiseMessages<T>,
    options?: Omit<PropsOptions, 'message'>
  ): Promise<T> {
    const loadingId = this.#subscribe({
      ...options,
      message: messages.loading,
      time: Infinity,
      type: 'info'
    })

    return promise.then(
      (value) => {
        this.dismiss(loadingId)
        this.#subscribe({
          ...options,
          message:
            typeof messages.success === 'function'
              ? messages.success(value)
              : messages.success,
          type: 'success'
        })
        return value
      },
      (error: unknown) => {
        this.dismiss(loadingId)
        this.#subscribe({
          ...options,
          message:
            typeof messages.error === 'function'
              ? messages.error(error)
              : messages.error,
          type: 'error'
        })
        throw error
      }
    )
  }

  /**
   * Dismiss a single notification by the id returned from
   * success/error/warning/info. Also removes queued notifications.
   */
  dismiss(id: number) {
    if (typeof document === 'undefined') return

    for (const queue of this.#queues.values()) {
      const queuedIndex = queue.findIndex((item) => item.id === id)
      if (queuedIndex !== -1) {
        queue.splice(queuedIndex, 1)
        return
      }
    }

    const element = document.getElementById(`notify-${id}`)
    if (element) this.#animateOut(element)
  }

  /**
   * Dismiss every visible notification immediately (plays the out animation)
   * and drop any queued notifications.
   */
  dismissAll() {
    if (typeof document === 'undefined') return
    this.#queues.clear()
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
  PromiseMessages,
  NotificationPosition
} from './types'

export default notify
