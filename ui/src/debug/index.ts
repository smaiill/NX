import { injectMockData } from '../utils/mock.data'

// injectMockData([
//   {
//     app: 'NX::notification',
//     method: 'NX::createNotification',
//     data: {
//       type: 'SUCCES',
//       duration: 500,
//       body: {
//         content: 'SUCCES',
//       },
//     },
//   },
//   {
//     app: 'NX::notification',
//     method: 'NX::createNotification',
//     data: {
//       type: 'WARN',
//       duration: 500,
//       body: {
//         content: 'WARN',
//       },
//     },
//   },
//   {
//     app: 'NX::notification',
//     method: 'NX::createNotification',
//     data: {
//       type: 'ERROR',
//       duration: 500,
//       body: {
//         content:
//           '^1ERROR qzdzqdqzd q^0qzdqzdqzd qzdqzdg ^7qzdqzdzdqzdqzdqzdqzd',
//       },
//     },
//   },
//   {
//     app: 'NX::notification',
//     method: 'NX::createNotification',
//     data: {
//       type: 'NORMAL',
//       duration: 500,
//       body: {
//         content: 'normal ^2qzdqzdqz^0 qzdz qzd qd ^1qzd qzd qd qd qd ',
//       },
//     },
//   },
// ])

// injectMockData([
//   {
//     app: 'NX::input',
//     method: 'NX::createInput',
//     data: {
//       title: 'title',
//       rows: [
//         {
//           label: 'Input 1',
//           id: 'input1',
//         },
//         {
//           label: 'Input 2',
//           id: 'input2',
//         },
//       ],
//     },
//   },
// ])

injectMockData([
  {
    app: 'NX::loadingBar',
    method: 'NX::createLoadingBar',
    data: {
      duration: 2,
      //   style: {
      //     label: {
      //       color: 'cyan',
      //     },
      //     container: {
      //       backgroundColor: 'green',
      //     },
      //     bar: {
      //         backgroundColor: 'red'
      //     }
      //   },
    },
  },
])
