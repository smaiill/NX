// class Client {

//     Vehicles: Vehicle

//     constructor() {
//         this.Vehicles = new Vehicle()
//     }

//     logClient() {
//         console.log('Hello client !')

//     }
// }

// globalThis.exports('useClient', () => {
//     const client = new Client();

//     return {
//         logClient: client.logClient.bind(client),

//         Vehicles: {
//             Spawn: client.Vehicles.spawnCar.bind(client.Vehicles)
//         }
//     };
// })
