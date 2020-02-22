import { h } from 'preact'

type iconProps = {
  src: string
  size?: string
  color?: string
  style?: { [key: string]: string | number }
}
export function Icon(props: iconProps) {
  const { src, size, color, style } = props

  const effective_style = Object.assign({ fill: color || 'black' }, style || {})

  if (size) effective_style['--icon-size'] = size

  return (
    <svg class='icon' style={effective_style}>
      <use xlinkHref={src} />
    </svg>
  )
}
