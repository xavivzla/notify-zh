import {
  PropsOptions,
  PropsConfig,
  PropsOtionsSubscribe,
  PropsOtionsUnsubscribe
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

  #initialize () {
    if (
      this.#isInitialized ||
      typeof window === 'undefined' ||
      typeof document === 'undefined'
    ) {
      return
    }

    this.#container = this.#createContainer()
    this.#notificationWrapper = this.#createNotificationWrapper()

    if (this.#container && this.#notificationWrapper) {
      document.body.appendChild(this.#container)
      if (!this.#settings.disableDefaultStyles) {
        const sheet = document.createElement('style')
        sheet.textContent = `
              #${NOTIFICATION_WRAPPER_ID} {
              display: flex;
              flex-direction: column-reverse;
              align-items: center;
            }
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
              boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)';
              border-radius: 5px;
            }
              #${NOTIFY_CONTAINER_ID} {
              position: fixed;
              top: 20px;
              right: 0;
              margin: auto;
              left: 0;
              z-index: 2000;
              pointer-events: none;
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
        this.#container.appendChild(sheet)
      }
      this.#container.appendChild(this.#notificationWrapper)
      this.#isInitialized = true
    } else {
      console.error('Notify zh: Could not create container elements.')
    }
  }

  #createContainer (): HTMLElement | null {
    let container = document.getElementById(NOTIFY_CONTAINER_ID)
    if (!container) {
      container = document.createElement('div')
      container.id = NOTIFY_CONTAINER_ID
      // other styles
    }
    return container
  }

  #createNotificationWrapper (): HTMLElement | null {
    let wrapper = document.getElementById(NOTIFICATION_WRAPPER_ID)
    if (!wrapper) {
      wrapper = document.createElement('div')
      wrapper.id = NOTIFICATION_WRAPPER_ID
      // other styles
    }
    return wrapper
  }

  #setNotify (data: PropsOtionsSubscribe): HTMLElement {
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

  #animateOut (element: HTMLElement) {
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

  #animateIn (element: HTMLElement) {
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

  #subscribe (subscriptor: PropsOtionsSubscribe) {
    this.#initialize()

    if (!this.#notificationWrapper) {
      console.error('Notify zh: Notification container not available.')
      return
    }

    const element = this.#setNotify(subscriptor)
    // const notificationId = parseInt(element.id.split('-')[1])
    const time = subscriptor.time ?? this.#settings.defaultTime

    this.#notificationWrapper.appendChild(element)
    this.#animateIn(element)

    setTimeout(() => {
      this.#animateOut(element)
      // this.#activeTimeouts.delete(notificationId);
    }, time)

    // this.#activeTimeouts.set(notificationId, timeoutId);
  }

  // methods
  config (data: Partial<PropsConfig>) {
    this.#settings = {
      ...this.#settings,
      ...data,
      classNames: {
        ...this.#settings.classNames,
        ...(data.classNames ?? {})
      }
    }
  }

  success (data: PropsOptions) {
    this.#subscribe({ ...data, type: 'success' })
  }
  warning (data: PropsOptions) {
    this.#subscribe({ ...data, type: 'warning' })
  }
  error (data: PropsOptions) {
    this.#subscribe({ ...data, type: 'error' })
  }
  info (data: PropsOptions) {
    this.#subscribe({ ...data, type: 'info' })
  }
}

const notify = new Notify()

export default notify
