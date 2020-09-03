import {
  PropsOptions,
  PropsOtionsSubscribe,
  PropsOtionsUnsubscribe
} from './types'

class Notify {
  instance: Object | undefined = undefined
  container: HTMLElement | undefined = undefined
  divNotification: HTMLElement | undefined = undefined
  index: number = 1
  arr: PropsOtionsUnsubscribe[] = []
  constructor() {
    if (typeof window !== 'undefined') {
      this.container = Notify.createContainer()
      this.divNotification = Notify.createContainerNotify()
      if (!this.instance) {
        this._init()
      }
    }
  }

  // init
  _init() {
    if (window && window.document) {
      const container = this.container
      const containnerNotify = this.divNotification
      if (container && containnerNotify) {
        document.body.appendChild(container)
        const sheet = document.createElement('style')
        sheet.innerHTML = `
          #divNotification {
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
          }
          .notifyCustom {
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
          #notifyContainer{
            position: fixed;
            top: 20px;
            right: 0;
            margin: auto;
            left: 0;
            z-index: 2000;
            pointer-events: none;
          }
        `
        container.appendChild(sheet)
        container.appendChild(containnerNotify)
        this.instance = Notify
      } else {
        throw new Error('Error - Access node element')
      }
    } else {
      throw new Error('Error - Reader Window')
    }
  }

  // setters

  static createContainer(): HTMLElement | undefined {
    const container = document.getElementById('notifyContainer')
    if (container) return

    const notifyContainer = Object.assign(document.createElement('div'), {
      id: 'notifyContainer'
    })

    return notifyContainer
  }

  static createContainerNotify(): HTMLElement | undefined {
    const hasDivNotification = document.getElementById('divNotification')
    if (hasDivNotification) return

    const divNotification = Object.assign(document.createElement('div'), {
      id: 'divNotification'
    })

    return divNotification
  }

  setNotify(data: PropsOtionsSubscribe): Node {
    const { type, message, option } = data

    let bg = '#07bc0c'
    switch (type) {
      case 'warning':
        bg = '#F09200'
        break
      case 'error':
        bg = '#FF322C'
        break
      default:
        bg = '#13BF5F'
        break
    }

    const item = Object.assign(document.createElement('div'), {
      className: 'notifyCustom',
      id: `notify-${this.index}`,
      innerHTML:
        option.icon && option.icon.el
          ? `${option.icon.el} <p style="margin: 0 5px">${message}</p>`
          : message,
      style: `background-color: ${bg}; display: flex; align-items: center`
    })

    return item
  }

  updateIndex() {
    this.index += 1
  }

  // animations
  animateOut(id: number) {
    const target: HTMLElement | null = document.getElementById(`notify-${id}`)

    if (target) {
      const targetAnimation = target.animate(
        [
          {
            opacity: '1'
          },
          {
            opacity: '0'
          }
        ],
        {
          duration: 500
        }
      )

      if (targetAnimation) {
        targetAnimation.addEventListener('finish', () => {
          target.style.opacity = '0'
          target.remove()
        })
      }
    }
  }

  animateIn() {
    const target = document.getElementById(`notify-${this.index}`)

    if (target) {
      const targetAnimation = target.animate(
        [
          {
            opacity: '0'
          },
          {
            opacity: '.9'
          }
        ],
        {
          duration: 500,
          id: `notify${this.index}`
        }
      )

      if (targetAnimation) {
        targetAnimation.addEventListener('finish', () => {
          target.style.opacity = '1'
        })
        this.updateIndex()
      }
    }
  }

  subscribe(subscriptor: PropsOtionsSubscribe) {
    const data = { ...subscriptor, id: this.index }

    this.arr.push(data)
    const containner = this.divNotification
    if (containner) {
      const element = this.setNotify(subscriptor)
      if (element) {
        containner.appendChild(element)
        this.animateIn()
        this.unsubscribe(data)
      }
    }
  }

  unsubscribe(subscriptor: PropsOtionsUnsubscribe) {
    setTimeout(() => {
      this.arr = this.arr.filter(item => item.id !== subscriptor.id)
      this.animateOut(subscriptor.id)
    }, subscriptor.option.time)
  }

  // methods

  success(data: PropsOptions) {
    this.subscribe({ ...data, type: 'success' })
  }
  warning(data: PropsOptions) {
    this.subscribe({ ...data, type: 'warning' })
  }
  error(data: PropsOptions) {
    this.subscribe({ ...data, type: 'error' })
  }
}

const notify = new Notify()

export default notify
