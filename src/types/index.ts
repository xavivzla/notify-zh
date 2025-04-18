export interface ClassNameOptions {
  base?: string
  success?: string
  error?: string
  warning?: string
  info?: string
  animateIn?: string
  animateOut?: string
}

export interface PropsOptions {
  message: string
  time?: number
  icon?: {
    el?: string
  }
  title?: string
}

export interface PropsConfig {
  defaultTime?: number
  backgrounds?: {
    warning?: string
    error?: string
    success?: string
    info?: string
  }
  maxWidth?: string
  width?: string

  disableDefaultStyles?: boolean
  classNames?: ClassNameOptions
}

export interface Status {
  warning: string
  error: string
  success: string
  info: string
}

export interface PropsOtionsSubscribe extends PropsOptions {
  type: 'success' | 'error' | 'warning' | 'info'
  // type: keyof Status
}

export interface PropsOtionsUnsubscribe extends PropsOtionsSubscribe {
  id: number
}
