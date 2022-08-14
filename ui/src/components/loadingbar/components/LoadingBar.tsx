import { LoadingBarDataT } from '../../../types/loadingBar'
import useLoadingBarService from '../hooks/useLoadingBarService'
import { useEffect, useState } from 'react'

const LoadingBar = ({ data }: { data: LoadingBarDataT }) => {
  const { handleRemoveLoadingBar } = useLoadingBarService()
  let [percentage, setPercentage] = useState<number>(0)

  useEffect(() => {
    const i = setInterval(() => {
      // ! Can't use functional setter dont know why !
      setPercentage(percentage++)
      if (percentage === 102) handleRemoveLoadingBar(i)
    }, (data.duration * 1000) / 100)

    return () => clearInterval(i)
  }, [])

  return (
    <div
      style={{
        ...data.style?.container,
      }}
      className="loadingbar-container"
    >
      <p
        style={{
          ...data.style?.label,
        }}
      >
        {data.label ?? percentage}
        {!data.label && '%'}
      </p>
      <div
        style={{
          ...data.style?.bar,
          width: `${percentage}%`,
        }}
        className="loadingbar"
      ></div>
    </div>
  )
}

export default LoadingBar
