import { h } from 'preact'

export const Header = (props: any) => {
  const { children } = props

  if (children) {
    return (
      <div class='header'>
        <div class='header-label'>{children}</div>
      </div>
    )
  } else {
    return <div class='header empty'></div>
  }
}
