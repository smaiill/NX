export enum PlayerEventsE {
  PLAYER_LOADED = 'NAF::playerLoaded',
  NEW_PLAYER = 'NAF::newPlayer',
  UPDATE_COORDS = 'NAF::updateCoords',
}

export enum ItemsEventsE {
  DROP_ITEM = 'NAF::dropItem',
  CREATE_PICKUP = 'NAF::createPickup',
  CREATE_MISSING_PICKUPS = 'NAF::createMissingPickups',
  PICKUP_ITEM = 'NAF::pickupItem',
  REMOVE_PICKUP = 'NAF::removePickup',
  HANDLE_PICKUPS = 'NAF::handlePickups',
  USE_ITEM = 'NAF::useItem',
}

export interface EventE {
  [property: string]: Function
}
