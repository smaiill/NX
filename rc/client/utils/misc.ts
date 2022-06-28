const Wait = (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms)
  })
}

export { Wait }
