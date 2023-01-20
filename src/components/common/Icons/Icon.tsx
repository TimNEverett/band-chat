import { FC } from 'react'
import { IconPaths, IconPathType } from './IconPaths'

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Props = {
  size?: IconSize
  path: IconPathType
}

const Icon: FC<Props> = ({ size = 'md', path }) => {
  let width, height

  switch (size) {
    case 'xs':
      width = 16
      height = 16
      break
    case 'sm':
      width = 20
      height = 20
      break
    case 'md':
      width = 24
      height = 24
      break
    case 'lg':
      width = 32
      height = 32
      break
    case 'xl':
      width = 40
      height = 40
      break
    default:
      width = 24
      height = 24
  }

  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {IconPaths[path]}
    </svg>
  )
}

export default Icon
