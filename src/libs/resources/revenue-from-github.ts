import axios from 'axios'

type Response = {
  organization: {
    id: string
    monthlyEstimatedSponsorsIncomeInCents: number
    estimatedNextSponsorsPayoutInCents: number
  }
}

const query = `{
	organization(login: "fonoster") {
    id
    monthlyEstimatedSponsorsIncomeInCents
    estimatedNextSponsorsPayoutInCents
  }
}`

export const getRevenueFromGithub = async () => {
  if (!process.env.GITHUB_ACCESS_TOKEN) return '0'

  const response = await axios({
    method: 'POST',
    url: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
    data: { query },
  })

  const data = { ...response.data?.data } as Response

  if (!data?.organization) return '0'

  return new Intl.NumberFormat('en-EN', {
    currency: 'USD',
    style: 'currency',
  }).format(data.organization.monthlyEstimatedSponsorsIncomeInCents / 100)
}
