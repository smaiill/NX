export enum PlayerEvents {
  PLAYER_LOADED = 'NX::playerLoaded',
  NEW_PLAYER = 'NX::newPlayer',
  UPDATE_COORDS = 'NX::updateCoords',
  UPDATE_STATUS = 'NX::updateStatus',
  ADD_STATUS = 'NX::addStatus',
  PLAYER_DROPPED = 'NX::playerDropped',
  BAN_PLAYER = 'NX::banPlayer',
  ON_STATUS_UPDATED = 'NX::onStatusUpdated',
  ON_PLAYER_LOADED = 'NX::onPlayerLoaded',
  SEND_MESSAGE_TO_PLAYER = 'NX::sendMessageToPlayer',
  PLAYER_FIRST_CONNECTION = 'NX::playerFirstConnection',

  UPDATE_LOCALE_CACHE_BY_KEY = 'NX::updateLocaleCacheByKey',
  CHARINFO_UPDATED = 'NX::charInfoUpdated',
}

export enum ItemsEvents {
  DROP_ITEM = 'NX::dropItem',
  CREATE_PICKUP = 'NX::createPickup',
  CREATE_MISSING_PICKUPS = 'NX::createMissingPickups',
  PICKUP_ITEM = 'NX::pickupItem',
  REMOVE_PICKUP = 'NX::removePickup',
  HANDLE_PICKUPS = 'NX::handlePickups',
  USE_ITEM = 'NX::useItem',
  CREATE_ITEM = 'NX::createItem',
  ITEM_CREATED = 'NX::itemCreated',
  GET_ALL_CLIENT_PICKUPS = 'NX::getAllClientPickups',
}

export enum MenuEvents {
  CREATE_MENU = 'NX::createMenu',
  KEY_PRESSED = 'KEY_PRESSED',
  HIDE_MENU = 'HIDE_MENU',
  CHECKBOX_CHANGED = 'CHECKBOX_CHANGED',
}

export enum InputEvents {
  CREATE_INPUT = 'NX::createInput',
  SUBMIT_DATA = 'NX::inputSubmitData',
  DESTROY_INPUT = 'NX::destroyInput',
}

export enum InventoryEvents {
  UPDATE_INVENTORY = 'NX::updateInventory',
  ON_INVENTORY_UPDATED = 'NX::onInventoryUpdated',
}

export enum TimelineEvents {
  CREATE_TIMELINE = 'NX::createTimeline',
  UPDATE_TIMELINE = 'NX::updateTimeline',
  DESTROY_TIMELINE = 'NX::destroyTimeline',
}

export enum PermissionsEvents {
  PERMISSIONS_UPDATED = 'NX::permissionsUpdated',
}

export enum AccountsEvents {
  ACCOUNT_UPDATED = 'NX::accountUpdated',
}

export enum JobsEvents {
  JOB_UPDATED = 'NX::jobUpdated',
}

export enum DBEvents {
  DB_CONNECTED = 'NX::DBConnected',
}

export enum NotificationEvents {
  CREATE_NOTIFICATION = 'NX::createNotification',
}

export enum LoadingBarEvents {
  CREATE_LOADING_BAR = 'NX::createLoadingBar',
}
