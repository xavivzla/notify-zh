interface PropsNotify {
  message: string
  time: number
  type: string
}

class Notify {
  private static instance: Notify
  container: HTMLElement | undefined = undefined
  divNotification: HTMLElement | undefined = undefined
  index: number = 1
  // message: string = ""
  arr: {
      message: string,
      time: number,
      type: string,
      id: number
  }[] = []
  constructor() {
    Notify.getInstance()
    if (typeof window !== 'undefined') {
      this.container = Notify.createContainer()
      this.divNotification = Notify.createContainerNotify()
      this._init()
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
      }else {
        throw new Error('Error - Access node element')
      }
    } else {
      throw new Error('Error - Reader Window')
    }
  }

  // setters
  static getInstance() {
    if (!Notify.instance) {
      Notify.instance = new Notify()
    }
    return Notify.instance
  }

  static createContainer() {
    const container = document.getElementById('notifyContainer')
    if (container) return

    const notifyContainer = Object.assign(document.createElement('div'), {
      id: 'notifyContainer'
    })

    return notifyContainer
  }

  static createContainerNotify() {
    const hasDivNotification = document.getElementById('divNotification')
    if (hasDivNotification) return

    const divNotification = Object.assign(document.createElement('div'), {
      id: 'divNotification'
    })

    return divNotification
  }

  setNotify(data: PropsNotify) {
    let bg = '#07bc0c'
    switch (data.type) {
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
      innerHTML: data.message,
      style: `background-color: ${bg}`
    })

    return item
  }

  updateIndex() {
    this.index += 1
  }

  // animations
  animateOut(id: number) {
    const target: HTMLElement | null  = document.getElementById(`notify-${id}`)

    if(target) {
      const targetAnimation = target.animate([
        { opacity: '1' },
        { opacity: '0' }
      ], {
        duration: 500
      })

      if(targetAnimation) {
        targetAnimation.addEventListener('finish', () => {
          target.style.opacity = '0'
          target.remove()
        })
      }
    }
  }

  animateIn() {
    const target: HTMLElement | null = document.getElementById(`notify-${this.index}`)

    if(target) {
      const targetAnimation = target.animate([
        { opacity: '0' },
        { opacity: '.9' }
      ], {
        duration: 500,
        id: `notify${this.index}`
      })

      if(targetAnimation) {
        targetAnimation.addEventListener('finish', () => {
          target.style.opacity = '1'
        })
        this.updateIndex()
      }
    }
  }

  subscribe(subscriptor: {
    message: string,
    time: number,
    type: string
    }) {
    const data = { ...subscriptor, id: this.index }

    this.arr.push(data)
    const containner = this.divNotification
    if(containner) {
      const element = this.setNotify(subscriptor)
      if(element) {
        containner.appendChild(element)
        this.animateIn()
        this.unsubscribe(data)
      }
    }
  }

  unsubscribe(subscriptor: {
    message: string,
    time: number,
    type: string,
    id: number
  }) {
    setTimeout(() => {
      this.arr = this.arr.filter(item => item.id !== subscriptor.id)
      this.animateOut(subscriptor.id)
    }, subscriptor.time)
  }

  // methods

  success(message: string, option: {time: number} = { time: 2000 }) {
    this.subscribe({ message, time: option.time, type: 'success' })
  }
  warning(message: string, option: {time: number} = { time: 2000 }) {
    this.subscribe({ message, time: option.time, type: 'warning' })
  }
  error(message: string, option: {time: number} = { time: 2000 }) {
    this.subscribe({ message, time: option.time, type: 'error' })
  }
}


const notify = new Notify()


export default notify