class Notify {
  container: HTMLElement | undefined = undefined
  divNotification: HTMLElement | undefined = undefined
  constructor() {
    if (typeof window !== 'undefined') {
      this.container = Notify.createContainer()
      this.divNotification = Notify.createContainerNotify()
      this._init()
      // this.index = 1
      // this.arr = []
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
}

const tt = new Notify()