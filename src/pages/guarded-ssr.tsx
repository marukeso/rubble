import { Container, Title } from '@mantine/core'
import { getNhostSession, useAccessToken } from '@nhost/nextjs'
import { GetServerSideProps } from 'next'

import { authProtected } from '../components/protected-route'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nhostSession = await getNhostSession(
    process.env.NEXT_PUBLIC_BACKEND_URL as string,
    context
  )
  return {
    props: {
      nhostSession,
    },
  }
}

const RefetchPage: React.FC = () => {
  const accessToken = useAccessToken()
  return (
    <Container>
      <Title>Guarded Server-side Page</Title>
      <div>Access token: {accessToken}</div>
    </Container>
  )
}

export default authProtected(RefetchPage)
