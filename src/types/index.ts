export interface PropsNotify {
  message: string
  time: number
  type: string
  id: number
}

export interface PropsOptions {
  message: string,
  option: {
    time: number,
      icon ?: {
        el: string,
        position: string
      }
  },
  id: number,
  type: string
}
