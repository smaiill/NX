import { NXPlayer } from '@nx/types'

export const getPlayerMethods = (nxPlayer: NXPlayer) => {
  return {
    GetName: nxPlayer.getName.bind(nxPlayer),
    GetIdentifier: nxPlayer.getIdentifier.bind(nxPlayer),
    GetAccountMoney: nxPlayer.getAccountMoney.bind(nxPlayer),
    GetCharInfo: nxPlayer.getCharInfo.bind(nxPlayer),
    GetCoords: nxPlayer.getCoords.bind(nxPlayer),
    GetWeight: nxPlayer.getWeight.bind(nxPlayer),
    GetMaxWeight: nxPlayer.getMaxWeight.bind(nxPlayer),
    GetInventory: nxPlayer.getInventory.bind(nxPlayer),
    GetAccounts: nxPlayer.getAccounts.bind(nxPlayer),
    GetGroup: nxPlayer.getGroup.bind(nxPlayer),
    GetBloodType: nxPlayer.getBloodType.bind(nxPlayer),
    GetThirst: nxPlayer.getThirst.bind(nxPlayer),
    GetHunger: nxPlayer.getHunger.bind(nxPlayer),
    GetJob: nxPlayer.getJob.bind(nxPlayer),
    GetJobs: nxPlayer.getJobs.bind(nxPlayer),
    GetUID: nxPlayer.getUID.bind(nxPlayer),
    SetCoords: nxPlayer.setCoords.bind(nxPlayer),
    SetJob: nxPlayer.setJob.bind(nxPlayer),
    SetGroup: nxPlayer.setGroup.bind(nxPlayer),
    SetThirst: nxPlayer.setThirst.bind(nxPlayer),
    SetHunger: nxPlayer.setHunger.bind(nxPlayer),
    SetCharInfoKey: nxPlayer.setCharInfoKey.bind(nxPlayer),
    SetAccountMoney: nxPlayer.setAccountMoney.bind(nxPlayer),
    HasItem: nxPlayer.hasItem.bind(nxPlayer),
    RemoveItem: nxPlayer.removeItem.bind(nxPlayer),
    AddItem: nxPlayer.addItem.bind(nxPlayer),
    EmitEvent: nxPlayer.emitEvent.bind(nxPlayer),
    Kick: nxPlayer.kick.bind(nxPlayer),
    Save: nxPlayer.save.bind(nxPlayer),
  }
}