export class _Utils {
  constructor() {}

  static uuid(numberAmount: number = 100_000_000): string {
    return Math.floor(Math.random() * numberAmount).toString(16)
  }
}
