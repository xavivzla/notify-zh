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

export interface PropsConfig {
  maxWidth?: string
  width?: string
  backgrounds: {
    warning: string
    error: string
    success: string
  }
}

export interface Status {
  warning: '#F09200'
  error: '#FF322C'
  success: '#13BF5F'
}

export type PropsOtionsSubscribe = PropsOptions & {
  type: keyof Status
}

export type PropsOtionsUnsubscribe = PropsOptions & {
  id: number
}
