import { Icon as IconInterface } from '../../../../types/misc'
import { useEffect, useState } from 'react'

const Icon = ({ name, size = 20 }: IconInterface) => {
  let [icon, setIcon] = useState<string>('')

  useEffect(() => {
    const loadIcon = async () => {
      let importedIcon = await import(`../../assets/icons/${name}.svg`)

      console.log(importedIcon.default)

      setIcon(importedIcon.default)
    }

    loadIcon()
  }, [])

  return <img width={size} src={icon} />
}

export default Icon
