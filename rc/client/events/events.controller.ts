import Utils from '@shared/utils/misc'
let num = 0

setTick(async () => {
  if (IsControlJustPressed(0, 51)) {
    console.log('yes')
  }
  await Utils.wait(100)
})
