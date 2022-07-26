import { injectMockData } from '../utils/mock.data'

injectMockData([
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'SUCCES',
      duration: 500,
      body: {
        content: 'SUCCES',
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
        content: 'WARN',
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
        content: 'ERROR',
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
        content: 'NORMAL',
      },
    },
  },
])

injectMockData([
  {
    app: 'NX::input',
    method: 'NX::createInput',
    data: {
      title: 'title',
      rows: [
        {
          label: 'Input 1',
          id: 'input1',
        },
        {
          label: 'Input 2',
          id: 'input2',
        },
      ],
    },
  },
])
