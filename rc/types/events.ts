export enum PlayerEventsE {
  PLAYER_LOADED = 'NX::playerLoaded',
  NEW_PLAYER = 'NX::newPlayer',
  UPDATE_COORDS = 'NX::updateCoords',
  UPDATE_STATUS = 'NX::updateStatus',
  ON_STATUS_UPDATED = 'NX::onStatusUpdated',
  ADD_STATUS = 'NX::addStatus',
  PLAYER_DROPPED = 'NX::playerDropped',
  BAN_PLAYER = 'NX::banPlayer',
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
  ITEM_CREATED = 'NX::itemCreated',
  CLEAR_ALL_PICKUPS_S = 'NX::clearAllPickupsS',
  CLEAR_ALL_PICKUPS_C = 'NX::clearAllPickupsC',
}

export enum JobsEventsE {
  ON_JOB_UPDATED = 'NX::onJobUpdated',
  ON_JOB2_UPDATED = 'NX::onJob2Updated',
}

export enum InventoryEeventsE {
  UPDATE_INVENTORY = 'NX::updateInventory',
  ON_INVENTORY_UPDATED = 'NX::onInventoryUpdated',
}

export enum MiscEventsE {
  DB_CONNECTED = 'NX::DBConnected',
}

export enum InputEvents {
  CREATE_INPUT = 'NX::createInput',
  SUBMIT_DATA = 'NX::inputSubmitData',
  DESTROY_INPUT = 'NX::destroyInput',
}

export enum NotificationEvents {
  CREATE_NOTIFICATION = 'NX::createNotification',
}
export interface EventE {
  [property: string]: Function
}
