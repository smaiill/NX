export enum PlayerEventsE {
  PLAYER_LOADED = 'NX::playerLoaded',
  NEW_PLAYER = 'NX::newPlayer',
  UPDATE_COORDS = 'NX::updateCoords',
  UPDATE_STATUS = 'NX::updateStatus',
  ADD_STATUS = 'NX::addStatus',
  PLAYER_DROPPED = 'NX::playerDropped',
  BAN_PLAYER = 'NX::banPlayer',
  ON_STATUS_UPDATED = 'NX::onStatusUpdated',
  ON_PLAYER_LOADED = 'NX::onPlayerLoaded',
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
}

export enum InputEvents {
  CREATE_INPUT = 'NX::createInput',
  SUBMIT_DATA = 'NX::inputSubmitData',
  DESTROY_INPUT = 'NX::destroyInput',
}

export enum InventoryEeventsE {
  UPDATE_INVENTORY = 'NX::updateInventory',
  ON_INVENTORY_UPDATED = 'NX::onInventoryUpdated',
}

export enum TimelineEventsE {
  CREATE_TIMELINE = 'NX::createTimeline',
  UPDATE_TIMELINE = 'NX::updateTimeline',
  DESTROY_TIMELINE = 'NX::destroyTimeline',
}

export enum PermissionsEventsE {
  ON_PERMISSIONS_UPDATED = 'NX::onPermissionsUpdated',
}

export enum AccountsEventsE {
  ON_ACCOUNT_UPDATED = 'NX::onAccountUpdated',
}

export enum JobsEventsE {
  ON_JOB_UPDATED = 'NX::onJobUpdated',
}

export enum DBEventsE {
  DB_CONNECTED = 'NX::DBConnected',
}

export enum NotificationEvents {
  CREATE_NOTIFICATION = 'NX::createNotification',
}

export enum LoadingBarEvents {
  CREATE_LOADING_BAR = 'NX::createLoadingBar',
}
export interface EventE {
  [property: string]: Function
}
