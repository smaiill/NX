import { TimelineUpdateActions } from '../../../types/timeline'
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
//           label: 'Name',
//           id: 'name',
//           type: 'text',
//           required: true,
//         },
//         {
//           label: 'Amount',
//           id: 'amount',
//           type: 'text',
//         },
//         {
//           label: 'Color',
//           id: 'color',
//           type: 'color',
//         },
//       ],
//     },
//   },
// ])

// injectMockData([
//   {
//     app: 'NX::loadingBar',
//     method: 'NX::createLoadingBar',
//     data: {
//       duration: 2,
//       type: 'circle',
//       style: {
//         label: {
//           color: 'cyan',
//         },
//         container: {
//           backgroundColor: 'green',
//         },
//         bar: {
//           backgroundColor: 'red',
//         },
//       },
//     },
//   },
// ])

injectMockData([
  {
    app: 'NX::timeline',
    method: 'NX::createTimeline',
    data: {
      rows: [
        {
          label: 'Salut les amis',
          id: '1',
          type: 'DOT',
        },
        {
          label: 'Salut les amis',
          id: '2',
          type: 'OUTLINE',
        },
        {
          label: 'Salut les amis',
          id: '3',
        },
        {
          label: 'Salut les amis',
          id: '4',
        },
      ],
    },
  },
])

setTimeout(() => {
  injectMockData([
    {
      app: 'NX::timeline',
      method: 'NX::updateTimeline',
      data: {
        type: TimelineUpdateActions.SET_COMPLETED,
        id: '1',
      },
    },
  ])
}, 1000)

setTimeout(() => {
  injectMockData([
    {
      app: 'NX::timeline',
      method: 'NX::updateTimeline',
      data: {
        type: TimelineUpdateActions.SET_COMPLETED,
        id: '2',
      },
    },
  ])
}, 2000)

setTimeout(() => {
  injectMockData([
    {
      app: 'NX::timeline',
      method: 'NX::updateTimeline',
      data: {
        type: TimelineUpdateActions.SET_COMPLETED,
        id: '3',
      },
    },
  ])
}, 3000)

setTimeout(() => {
  injectMockData([
    {
      app: 'NX::timeline',
      method: 'NX::updateTimeline',
      data: {
        type: TimelineUpdateActions.SET_COMPLETED,
        id: '4',
      },
    },
  ])
}, 4000)
