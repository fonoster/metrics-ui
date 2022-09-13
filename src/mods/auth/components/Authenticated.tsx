import { NextPage } from 'next'

import { Container, Title } from '@/ui'

export const NotUserLogged = () => (
  <Container>
    <Title>401 Unauthorized — This page could not be found.</Title>
  </Container>
)

export const Authenticated: NextPage = ({ children }) => {
  return <>{children}</>
}
