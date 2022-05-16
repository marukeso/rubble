import { Container, Title } from '@mantine/core'
import { useAccessToken, useAuthenticated } from '@nhost/nextjs'
import { NextPage } from 'next'

const PublicSSRPage: NextPage = () => {
  const isAuthenticated = useAuthenticated()
  const accessToken = useAccessToken()
  return (
    <Container>
      <Title>Public Client-side Page</Title>
      User authenticated: {isAuthenticated ? 'yes' : 'no'}
      <div>Access token: {accessToken}</div>
    </Container>
  )
}

export default PublicSSRPage
