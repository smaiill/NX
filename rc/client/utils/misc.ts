const RANDOM_NUMBER_TIMES = 100_000_000

const Wait = (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms)
  })
}

const uuid = () => Math.floor(Math.random() * RANDOM_NUMBER_TIMES).toString(16)

export { Wait, uuid }
