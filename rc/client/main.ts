import { PlayerEventsE } from '../types/events'
import './items/index'
;(() => {
  const interval = setInterval(() => {
    if (NetworkIsPlayerActive(PlayerId())) {
      ShutdownLoadingScreen()
      ShutdownLoadingScreenNui()
      globalThis.exports.spawnmanager.setAutoSpawn(false)
      setTimeout(() => {
        emitNet(PlayerEventsE.NEW_PLAYER)
      }, 2_000)
      clearInterval(interval)
    }
  }, 500)
})()

const syncPlayer = () => {
  console.log('Starting sync player')
  setInterval(() => {
    const naPlayer = PlayerPedId()
    if (IsEntityAPed(naPlayer)) {
      const coords = GetEntityCoords(naPlayer, false)
      const heading = GetEntityHeading(naPlayer)
      emitNet(PlayerEventsE.UPDATE_COORDS, coords, heading)
    }
  }, 5000)
}

onNet(PlayerEventsE.PLAYER_LOADED, (naPlayer: any) => {
  console.log('Player loaded')
  const skin = {
    blemishes_2: 0,
    glasses_1: 0,
    lipstick_4: 0,
    arms_2: 0,
    helmet_2: 0,
    face: 0,
    eyebrows_1: 0,
    sun_1: 0,
    sun_2: 0,
    eye_color: 0,
    eyebrows_4: 0,
    bags_1: 0,
    makeup_2: 0,
    decals_2: 0,
    skin: 0,
    chest_3: 0,
    chest_1: 0,
    tshirt_2: 0,
    beard_4: 0,
    hair_color_2: 0,
    beard_2: 0,
    mask_1: 0,
    helmet_1: -1,
    hair_color_1: 0,
    age_2: 0,
    pants_2: 0,
    chest_2: 0,
    complexion_2: 0,
    age_1: 0,
    chain_1: 0,
    sex: 0,
    blush_2: 0,
    moles_1: 0,
    decals_1: 0,
    makeup_3: 0,
    mask_2: 0,
    bproof_2: 0,
    hair_1: 0,
    tshirt_1: 0,
    makeup_4: 0,
    beard_1: 0,
    blush_1: 0,
    bodyb_2: 0,
    ears_1: -1,
    bracelets_1: -1,
    torso_2: 0,
    lipstick_3: 0,
    beard_3: 0,
    complexion_1: 0,
    moles_2: 0,
    bracelets_2: 0,
    makeup_1: 0,
    ears_2: 0,
    bodyb_1: 0,
    bags_2: 0,
    eyebrows_2: 0,
    blemishes_1: 0,
    arms: 0,
    watches_2: 0,
    glasses_2: 0,
    lipstick_1: 0,
    hair_2: 0,
    shoes_1: 0,
    bproof_1: 0,
    torso_1: 0,
    eyebrows_3: 0,
    shoes_2: 0,
    chain_2: 0,
    blush_3: 0,
    watches_1: -1,
    lipstick_2: 0,
    pants_1: 23,
  }

  // ! if not works get position if !== naPlayer.positoon trigger spawnmanager.

  globalThis.exports.spawnmanager.spawnPlayer(
    {
      x: naPlayer.position.x,
      y: naPlayer.position.y,
      z: naPlayer.position.z,
      heading: naPlayer.position.heading,
      model: GetHashKey('mp_m_freemode_01'),
      skipFade: true,
    },
    () => {
      console.log('callback !')
      if (naPlayer.skin === {}) {
        emit('skinchanger:loadDefaultModel', naPlayer.charinfo.sex == 0)
      } else {
        emit('skinchanger:loadSkin', skin)
      }
    }
  )

  syncPlayer()
})
