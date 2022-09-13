import { getPath } from './getPath'

export const getCardImage = (card: string) => {
  const cards = {
    visa: '/visa.png',
    mastercard: '/mastercard.png',
    amex: '/amex.png',
    dinersclub: '/dinersclub.jpeg',
    discover: '/discover.png',
    jcb: '/jcb.png',
    unionpay: '/unionpay.png',
    maestro: '/maestro.png',
    elo: '/elo.png',
    hiper: '/hiper.png',
    hipercard: '/hipercard.png',
    aura: '/aura.png',
    default: '/visa.png',
    delta: '/delta.png',
    directdebit: '/directdebit.png',
    klarna: '/klarna.png',
    mir: '/mir.png',
  }

  return getPath(cards[card] || cards.default)
}
