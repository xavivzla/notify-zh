export interface PropsOptions {
  message: string
  option: {
    time: number
    icon?: {
      el: string
      position?: string
    }
  }
}

export type PropsOtionsSubscribe = PropsOptions & {
  type: string
}

export type PropsOtionsUnsubscribe = PropsOptions & {
  id: number
}
