import Stripe from 'stripe'

const SECRET = process.env.STRIPE_SECRET_KEY || ''

export const stripe = new Stripe(SECRET, { apiVersion: '2022-08-01' })

export const getRevenueFromStripe = async () => {
  let monthlyRevenue = 0

  await stripe.customers
    .list({
      expand: ['data.subscriptions'],
    })
    .autoPagingEach(customer => {
      const subscriptions = customer?.subscriptions?.data

      if (!subscriptions) return

      let revenue = 0

      for (const sub of subscriptions) {
        const price = sub.items.data[0].price

        if (!price) return

        const amount = Number(price.unit_amount)
        const isYearSub = Boolean(price.recurring?.interval === 'year')

        revenue += isYearSub ? amount / 12.0 : amount
      }

      monthlyRevenue += revenue
    })

  return new Intl.NumberFormat('en-EN', {
    currency: 'USD',
    style: 'currency',
  }).format(monthlyRevenue / 100)
}
