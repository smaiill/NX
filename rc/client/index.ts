import './main'

class Teste {
  name: string
  constructor() {
    this.name = 'niiy'
  }

  getName() {
    return this.name
  }

  setName(name: string) {
    return (this.name = name)
  }
}

const client = new Teste()

globalThis.exports('useCaca', () => {
  return {
    getName: client.getName.bind(client),
    setName: client.setName.bind(client),
  }
})
