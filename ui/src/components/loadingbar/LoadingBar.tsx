import React, { useEffect, useState } from 'react'

const LoadingBar = () => {
  let [percentage, setPercentage] = useState<number>(0)

  useEffect(() => {
    const i = setInterval(() => {
      setPercentage(percentage++)
      if (percentage === 101) clearInterval(i)
    }, 250)

    return () => clearInterval(i)
  }, [])

  return (
    <div
      style={{
        width: `${percentage}%`,
      }}
      className="loadingbar"
    ></div>
  )
}

export default LoadingBar
