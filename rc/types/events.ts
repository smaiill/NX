export enum PlayerEventsE {
  PLAYER_LOADED = 'NAF::playerLoaded',
  NEW_PLAYER = 'NAF::newPlayer',
  UPDATE_COORDS = 'NAF::updateCoords',
  UPDATE_STATUS = 'NAF::updateStatus',
  STATUS_UPDATED = 'NAF::statusUpdated',
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

export enum JobsEventsE {
  JOB_UPDATED = 'NAF::jobUpdated',
  JOB2_UPDATED = 'NAF::job2Updated',
}

export enum InventoryEeventsE {
  ITEM_ADDED = 'NAF::itemAdded',
  ITEM_REMOVED = 'NAF::itemRemoved',
}

export interface EventE {
  [property: string]: Function
}
