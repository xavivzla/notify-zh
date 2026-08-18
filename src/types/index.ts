/** Where a notification stack is anchored on screen. */
export type NotificationPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center-bottom'
  | 'center-top'
  | 'center'

/**
 * Custom CSS classes to replace the library defaults.
 * Set `disableDefaultStyles: true` in `notify.config()` when using these
 * with a CSS framework (Tailwind, Bootstrap, etc.).
 */
export interface ClassNameOptions {
  /** Applied to every notification element (replaces the default `notifyCustom` class). */
  base?: string
  /** Extra class(es) for success notifications. When set, the inline background color is not applied. */
  success?: string
  /** Extra class(es) for error notifications. When set, the inline background color is not applied. */
  error?: string
  /** Extra class(es) for warning notifications. When set, the inline background color is not applied. */
  warning?: string
  /** Extra class(es) for info notifications. When set, the inline background color is not applied. */
  info?: string
  /** Class applied while the notification enters (replaces the default fade-in). */
  animateIn?: string
  /** Class applied while the notification leaves (replaces the default fade-out). */
  animateOut?: string
}

/** Options accepted by notify.success / error / warning / info. */
export interface PropsOptions {
  /** Text content of the notification. Rendered as plain text (never HTML). */
  message: string
  /**
   * Duration in milliseconds before auto-closing.
   * Defaults to the configured `defaultTime` (3000).
   * Pass `Infinity` for a sticky notification that never auto-closes.
   */
  time?: number
  /** Show a close (×) button. Overrides the global `closable` config. */
  closable?: boolean
  /** Position for this notification. Defaults to the configured `position` ('center-top'). */
  position?: NotificationPosition
  /**
   * Optional icon rendered before the message.
   * `el` is an HTML string (e.g. an emoji or inline SVG).
   * Only pass trusted markup here — it is injected with innerHTML.
   */
  icon?: {
    el?: string
  }
  /** Optional bold title rendered above the message. Rendered as plain text. */
  title?: string
}

/** Global configuration accepted by notify.config(). */
export interface PropsConfig {
  /** Default auto-close time in milliseconds for all notifications. Default: 3000. */
  defaultTime?: number
  /** Default position for all notifications. Default: 'center-top'. */
  position?: NotificationPosition
  /**
   * Background color per notification type.
   * Ignored for a type when a matching `classNames` entry is provided.
   */
  backgrounds?: {
    warning?: string
    error?: string
    success?: string
    info?: string
  }
  /** Max width applied to each notification element (any CSS length, e.g. '360px'). */
  maxWidth?: string
  /** Fixed width applied to each notification element (any CSS length, e.g. '280px'). */
  width?: string
  /** If true, the library injects no CSS. Required when styling via `classNames`. */
  disableDefaultStyles?: boolean
  /** Custom CSS classes replacing the library defaults. See ClassNameOptions. */
  classNames?: ClassNameOptions
  /**
   * Maximum notifications visible at once per position.
   * Extra notifications wait in a queue and appear as older ones close.
   * Unlimited when unset.
   */
  maxVisible?: number
  /** Show a close (×) button on every notification. Default false. */
  closable?: boolean
  /** Pause the auto-close timer while the pointer hovers a notification. Default true. */
  pauseOnHover?: boolean
}

/** Messages for notify.promise(). */
export interface PromiseMessages<T = unknown> {
  /** Shown while the promise is pending (sticky info notification). */
  loading: string
  /** Shown when the promise resolves. A function receives the resolved value. */
  success: string | ((value: T) => string)
  /** Shown when the promise rejects. A function receives the rejection reason. */
  error: string | ((error: unknown) => string)
}

/** Internal: PropsOptions plus the resolved notification type. */
export interface PropsOptionsSubscribe extends PropsOptions {
  type: 'success' | 'error' | 'warning' | 'info'
}
