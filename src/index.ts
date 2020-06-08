

class Notify {
  container: HTMLElement | undefined = undefined
  divNotification: HTMLElement | undefined = undefined
  constructor() {
    if (typeof window !== 'undefined') {
      this.container = Notify.createContainer()

      // this.index = 1
      // this.arr = []
    }
  }

  // init


  // setters
  static createContainer() {
    const container = document.getElementById('notifyContainer')
    if (container) return

    const notifyContainer = Object.assign(document.createElement('div'), {
      id: 'notifyContainer'
    })

    return notifyContainer
  }


}

const tt = new Notify()