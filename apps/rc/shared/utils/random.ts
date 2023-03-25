const uuid = () => {
  const dt = new Date().getTime()
  const _uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (value) => {
      const rtx = (dt + Math.random() * 16) % 16 | 0
      return (value === 'x' ? rtx : (rtx & 0x3) | 0x8).toString(16)
    },
  )

  return _uuid
}

export { uuid }
