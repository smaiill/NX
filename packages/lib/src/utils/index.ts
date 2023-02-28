export const cls = (...classes: Array<string | undefined>): string => {
  const clsxs = classes.map((cls) => {
    return cls
  })

  return clsxs.join(' ')
}
