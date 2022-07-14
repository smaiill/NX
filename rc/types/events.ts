export enum PlayerEventsE {
  PLAYER_LOADED = 'NX::playerLoaded',
  NEW_PLAYER = 'NX::newPlayer',
  UPDATE_COORDS = 'NX::updateCoords',
  UPDATE_STATUS = 'NX::updateStatus',
  STATUS_UPDATED = 'NX::statusUpdated',
  ADD_STATUS = 'NX::addStatus',
}

export enum ItemsEventsE {
  DROP_ITEM = 'NX::dropItem',
  CREATE_PICKUP = 'NX::createPickup',
  CREATE_MISSING_PICKUPS = 'NX::createMissingPickups',
  PICKUP_ITEM = 'NX::pickupItem',
  REMOVE_PICKUP = 'NX::removePickup',
  HANDLE_PICKUPS = 'NX::handlePickups',
  USE_ITEM = 'NX::useItem',
  CREATE_ITEM = 'NX::createItem',
  ITEM_CREATED = 'NX:itemCreated',
}

export enum JobsEventsE {
  JOB_UPDATED = 'NX::jobUpdated',
  JOB2_UPDATED = 'NX::job2Updated',
}

export enum InventoryEeventsE {
  ITEM_ADDED = 'NX::itemAdded',
  ITEM_REMOVED = 'NX::itemRemoved',
}

export enum MiscEventsE {
  DB_CONNECTED = 'NX::DBConnected',
}

export interface EventE {
  [property: string]: Function
}
