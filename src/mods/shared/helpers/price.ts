import { Plan } from '@fonoster/metrics/dist/protos'

export const getPrice = (plan: Plan.AsObject) => {
  const amount = (plan.amount / 100).toString().padStart(2, '0')
  const currency = plan.currency.toUpperCase()
  const recurring = plan.recurringType

  return amount === '00' ? 'Free' : `${amount} ${currency}/${recurring}`
}

export const getBillPrice = (price: number, currency: string) => {
  const amount = (price / 100).toString().padStart(2, '0')

  return amount === '00' ? 'Free' : `${amount} ${currency}`
}
