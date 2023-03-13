import { injectMockData } from '../utils/mock.data'

export const __teste = 'teste'
injectMockData([
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'SUCCESS',
      duration: 500,
      body: {
        content: '^6Success Example',
      },
    },
  },
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'WARN',
      duration: 500,
      body: {
        content: 'Warn example',
      },
    },
  },
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'ERROR',
      duration: 500,
      body: {
        content: 'Error ^5example',
      },
    },
  },
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'NORMAL',
      duration: 500,
      body: {
        content: '^3Normal example',
      },
    },
  },
])

// NX.Input.Create({
//   title: 'Register',
//   rows: [
//     {
//       label: 'Nom',
//       id: 'name',
//       type: 'text',
//       required: true,
//     },
//     {
//       label: 'Prénom',
//       id: 'amount',
//       type: 'text',
//       required: true,
//     },
//     {
//       label: 'Age',
//       id: 'age',
//       type: 'text',
//       required: true,
//     },
//     {
//       label: 'Color',
//       id: 'color',
//       type: 'color',
//       required: true,
//     },
//   ],
// })

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::input',
//       method: 'NX::createInput',
//       data: {
//         title: 'Register',
//         rows: [
//           {
//             label: 'Nom',
//             id: 'name',
//             type: 'text',
//             required: true,
//           },
//           {
//             label: 'Prénom',
//             id: 'amount',
//             type: 'text',
//             required: true,
//           },
//           {
//             label: 'Age',
//             id: 'age',
//             type: 'text',
//             required: true,
//           },
//           {
//             label: 'Color',
//             id: 'color',
//             type: 'color',
//             required: true,
//           },
//         ],
//       },
//     },
//   ])
// }, 1000)

// injectMockData([
//   {
//     app: 'NX::loadingBar',
//     method: 'NX::createLoadingBar',
//     data: {
//       duration: 40,
//       type: 'circle',
//       style: {
//         label: {
//           color: 'white',
//         },
//         container: {
//           backgroundColor: '#232323',
//         },
//         bar: {
//           backgroundColor: '#363434',
//         },
//       },
//     },
//   },
// ])

// injectMockData([
//   {
//     app: 'NX::timeline',
//     method: 'NX::createTimeline',
//     data: {
//       rows: [
//         {
//           label: 'Etape 1',
//           id: '1',
//           type: 'OUTLINE',
//         },
//         {
//           label: 'Etape 2',
//           id: '2',
//           type: 'OUTLINE',
//         },
//         {
//           label: 'Etape 3',
//           id: '3',
//         },
//         {
//           label: 'Etape 4',
//           id: '4',
//         },
//       ],
//     },
//   },
// ])

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::timeline',
//       method: 'NX::updateTimeline',
//       data: {
//         type: TimelineUpdateActions.SET_COMPLETED,
//         id: '1',
//       },
//     },
//   ])
// }, 1000)

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::timeline',
//       method: 'NX::updateTimeline',
//       data: {
//         type: TimelineUpdateActions.SET_COMPLETED,
//         id: '2',
//       },
//     },
//   ])
// }, 2000)

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::timeline',
//       method: 'NX::updateTimeline',
//       data: {
//         type: TimelineUpdateActions.SET_COMPLETED,
//         id: '3',
//       },
//     },
//   ])
// }, 3000)

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::timeline',
//       method: 'NX::updateTimeline',
//       data: {
//         type: TimelineUpdateActions.SET_COMPLETED,
//         id: '4',
//       },
//     },
//   ])
// }, 4000)

/*
  - BUTTON
  - SLIDER
  - SPACE
  - CATEGORY BUTTON
  - LIST
  - CHECKBOX

*/

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::menu',
//       method: 'NX::createMenu',
//       data: {
//         options: {
//           title: 'MENU TITLE',
//           width: 400,
//         },
//         items: [
//           {
//             type: 'BUTTON',
//             label: 'Button',
//           },
//           {
//             type: 'SLIDER',
//             label: 'Slider',
//             max: 15,
//             min: 5,
//           },
//           {
//             type: 'SEPARATOR',
//             label: '------',
//           },
//           {
//             type: 'CHECKBOX',
//             label: 'Chckbox',
//           },
//           {
//             type: 'CHECKBOX',
//             label: 'Chckbox 2',
//           },
//           {
//             type: 'LIST',
//             label: 'List',
//             choices: [
//               {
//                 id: '1',
//                 label: 'One',
//               },
//               {
//                 id: '2',
//                 label: 'Two',
//               },
//               {
//                 id: '3',
//                 label: 'Three',
//               },
//             ],
//           },
//         ],
//       },
//     },
//   ])
// }, 100)
export const teste = 'zdqzd'
