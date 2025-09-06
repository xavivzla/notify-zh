import {
  PropsOptions,
  PropsConfig,
  PropsOtionsSubscribe,
  PropsOtionsUnsubscribe,
  NotificationPosition
} from './types'

const NOTIFY_CONTAINER_ID = 'notifyContainer'
const NOTIFICATION_WRAPPER_ID = 'divNotification'
const NOTIFY_CLASS = 'notifyCustom'
const ANIMATE_IN_CLASS = 'animateInOpacity'
const ANIMATE_OUT_CLASS = 'animateOutOpacity'

class Notify {
  #container: HTMLElement | null = null
  #notificationWrapper: HTMLElement | null = null
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
  // #activeTimeouts: Map<number, number> = new Map();

  arr: PropsOtionsUnsubscribe[] = []

  #getPositionStyles(position: NotificationPosition): string {
    const baseStyles = 'position: fixed; z-index: 2000; pointer-events: none;'

    switch (position) {
      case 'top-left':
        return `${baseStyles} top: 20px; left: 20px;`
      case 'top-right':
        return `${baseStyles} top: 20px; right: 20px;`
      case 'bottom-left':
        return `${baseStyles} bottom: 20px; left: 20px;`
      case 'bottom-right':
        return `${baseStyles} bottom: 20px; right: 20px;`
      case 'center-bottom':
        return `${baseStyles} bottom: 20px; left: 50%; transform: translateX(-50%);`
      case 'center-top':
        return `${baseStyles} top: 20px; left: 50%; transform: translateX(-50%);`
      case 'center':
        return `${baseStyles} top: 50%; left: 50%; transform: translate(-50%, -50%);`
      default:
        return `${baseStyles} top: 20px; left: 50%; transform: translateX(-50%);`
    }
  }


  
  #addGlobalStyles() {
    // Check if styles already exist
    if (document.getElementById('notify-zh-styles')) {
      return
    }
    
    const sheet = document.createElement('style')
    sheet.id = 'notify-zh-styles'
    sheet.textContent = `
      .${NOTIFY_CLASS} {
        z-index: 9999;
        border-radius: 3px;
        box-sizing: border-box;
        color: #fff;
        font-size: 1rem;
        background: #000;
        text-align: center;
        padding: 12px 40px;
        opacity: 0;
        display: inline;
        margin-bottom: 10px;
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
        border-radius: 5px;
      }
      .${ANIMATE_IN_CLASS} {
        animation: showOpacity 1s;
      }
      .${ANIMATE_OUT_CLASS} {
        animation: hideOpacity 1s;
      }
      @keyframes showOpacity {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes hideOpacity {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `
    document.head.appendChild(sheet)
  }





  #getOrCreateContainerForPosition(position: NotificationPosition): HTMLElement {
    const containerId = `${NOTIFY_CONTAINER_ID}-${position}`
    let container = document.getElementById(containerId)
    
    if (!container) {
      container = document.createElement('div')
      container.id = containerId
      
      // Apply position styles
      const positionStyles = this.#getPositionStyles(position)
      container.style.cssText = positionStyles
      
      // Create wrapper for this position
      const wrapper = document.createElement('div')
      wrapper.id = `${NOTIFICATION_WRAPPER_ID}-${position}`
      wrapper.style.display = 'flex'
      wrapper.style.flexDirection = position.includes('bottom') ? 'column' : 'column-reverse'
      wrapper.style.alignItems = 'center'
      
      container.appendChild(wrapper)
      document.body.appendChild(container)
    }
    
    return container
  }

  #setNotify(data: PropsOtionsSubscribe): HTMLElement {
    const { type, message, icon } = data
    const notificationId = this.#index++
    let bg = this.#settings.backgrounds?.[type] ?? '#000'
    // let maxWidth = this.#settings.maxWidth
    // let width = this.#settings.width
    const baseClass = this.#settings.classNames?.base ?? NOTIFY_CLASS
    const typeClass = this.#settings.classNames?.[type] ?? `notify-${type}`

    const item = document.createElement('div')
    item.className = `${baseClass} ${typeClass}`
    item.id = `notify-${notificationId}`

    const messageSpan = document.createElement('span')
    messageSpan.textContent = message

    if (icon?.el) {
      const iconSpan = document.createElement('span')
      iconSpan.innerHTML = icon?.el
      item.appendChild(iconSpan)
    }
    item.appendChild(messageSpan)
    item.style.display = 'flex'
    item.style.alignItems = 'center'
    item.style.background = bg

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
      element.addEventListener(
        'animationend',
        () => {
          // element.classList.remove(ANIMATE_IN_CLASS);
        },
        { once: true }
      )
      element.classList.add(animateInClass)
      element.style.opacity = '1'
    })
  }

  #subscribe(subscriptor: PropsOtionsSubscribe) {
    // Initialize global styles if not done yet
    if (!this.#isInitialized && !this.#settings.disableDefaultStyles) {
      this.#addGlobalStyles()
      this.#isInitialized = true
    }
    
    // Use position from notification or fallback to global setting
    const position = subscriptor.position ?? this.#settings.position ?? 'center-top'
    
    // Get or create container for this specific position
    const container = this.#getOrCreateContainerForPosition(position)
    const wrapper = container.querySelector(`#${NOTIFICATION_WRAPPER_ID}-${position}`) as HTMLElement
    
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
  config(data: Partial<PropsConfig>) {
    const oldPosition = this.#settings.position

    this.#settings = {
      ...this.#settings,
      ...data,
      classNames: {
        ...this.#settings.classNames,
        ...(data.classNames ?? {})
      }
    }

    // Update container position if position changed and container exists
    if (data.position && data.position !== oldPosition && this.#container) {
      const positionStyles = this.#getPositionStyles(data.position)
      this.#container.style.cssText = positionStyles

      // Update notification wrapper flex direction
      if (this.#notificationWrapper) {
        this.#notificationWrapper.style.flexDirection = data.position.includes('bottom') ? 'column' : 'column-reverse'
      }
    }
  }

  success(data: PropsOptions) {
    this.#subscribe({ ...data, type: 'success' })
  }
  warning(data: PropsOptions) {
    this.#subscribe({ ...data, type: 'warning' })
  }
  error(data: PropsOptions) {
    this.#subscribe({ ...data, type: 'error' })
  }
  info(data: PropsOptions) {
    this.#subscribe({ ...data, type: 'info' })
  }
}

const notify = new Notify()

export default notify
