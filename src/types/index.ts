export type NotificationPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center-bottom'
  | 'center-top'
  | 'center'

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
  position?: NotificationPosition
  icon?: {
    el?: string
  }
  title?: string
}

export interface PropsConfig {
  defaultTime?: number
  position?: NotificationPosition
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

export interface PropsOtionsSubscribe extends PropsOptions {
  type: 'success' | 'error' | 'warning' | 'info'
}
