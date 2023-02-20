import './bans'
import './boot'
import { CommandsServices } from './commands/commands.service'
import './discord'
import { DiscordService } from './discord/discord.service'
import { EventsService } from './events'
import './exports'
import './items'
import { ItemsService } from './items/items.service'
import './player'
import { PlayerService } from './player/player.service'

class Server {
  Players: typeof PlayerService
  Events: typeof EventsService
  Items: typeof ItemsService
  Discord: typeof DiscordService
  Commands: typeof CommandsServices
  constructor() {
    this.Players = PlayerService
    this.Events = EventsService
    this.Items = ItemsService
    this.Discord = DiscordService
    this.Commands = CommandsServices
  }
}

const server = new Server()

globalThis.exports('useServer', function () {
  return {
    Players: {
      GetAllData: server.Players.getPlayersData.bind(server.Players),
      GetAll: server.Players.getPlayers.bind(server.Players),
      GetData: server.Players.getPlayerData.bind(server.Players),
      Get: server.Players.getPlayer.bind(server.Players),
      SaveAll: server.Players.savePlayers.bind(server.Players),
    },
    Misc: {
      RegisterUsableItem: server.Items.registerUsableItem.bind(server.Items),
      OnServerEvent: server.Events.onServerEvent.bind(server.Events),
      AddCommand: server.Commands.addCommand.bind(server.Commands),
    },
    Discord: {
      SendWebhook: server.Discord.sendWebhook.bind(server.Discord),
    },
  }
})
