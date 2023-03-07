import { Icon as IconProps } from '@nx/types'
import { useEffect, useState } from 'react'

const Icon = ({ name, size = 20 }: IconProps) => {
  const [icon, setIcon] = useState<string>('')

  useEffect(() => {
    const loadIcon = async () => {
      const importedIcon = await import(`../../assets/icons/${name}.svg`)

      setIcon(importedIcon.default)
    }

    loadIcon()
  }, [])

  return <img width={size} src={icon} />
}

export { Icon }
