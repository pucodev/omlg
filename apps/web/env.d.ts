/// <reference types="astro/client" />

declare module 'preact/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        icon?: string
        width?: string | number
        height?: string | number
        rotate?: string | number
        flip?: string
      }
    }
  }
}

export {}
