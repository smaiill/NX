import { LoadingBarData } from '@nx/types'
import { useEffect, useState } from 'react'
import { useLoadingBarService } from '../hooks/useLoadingBarService'

const LoadingBar = ({ style, label, duration }: LoadingBarData) => {
  const { handleRemoveLoadingBar } = useLoadingBarService()
  const [percentage, setPercentage] = useState<number>(0)
  const [lInterval, setLInterval] = useState<NodeJS.Timer | undefined>()

  useEffect(() => {
    const i = setInterval(() => {
      setPercentage((prevV) => prevV + 1)
    }, (duration * 1000) / 100)

    setLInterval(i)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    if (percentage === 100) {
      handleRemoveLoadingBar(lInterval)
    }
  }, [percentage])

  return (
    <div
      style={{
        ...style?.container,
      }}
      className="loadingbar__container"
    >
      <p
        style={{
          ...style?.label,
        }}
      >
        {label ?? percentage}
        {!label && '%'}
      </p>
      <div
        style={{
          ...style?.bar,
          width: `${percentage}%`,
        }}
        className="loadingbar"
      ></div>
    </div>
  )
}

export { LoadingBar }
