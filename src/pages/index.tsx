import type { NextPage } from 'next'
import { Suspense, useState } from 'react'

import { Button, Container, Input, Title, Divider } from '@mantine/core';
import {
  useAccessToken,
  useAuthenticated,
  useChangeEmail,
  useChangePassword,
  useSignOut
} from '@nhost/nextjs'

import { authProtected } from '../components/protected-route'
import { useQuery } from '../gqty'

// * Reference: https://blog.codepen.io/2021/09/01/331-next-js-apollo-server-side-rendering-ssr/

const Home: NextPage = () => {
  const isAuthenticated = useAuthenticated()
  const [email] = useState('')
  const [password] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const accessToken = useAccessToken()
  const { signOut } = useSignOut()
  const { changeEmail, ...changeEmailResult } = useChangeEmail()
  const { changePassword, ...changePasswordResult } = useChangePassword()

  const query = useQuery({
    // boolean | undefined
    suspense: true,

    // boolean | object | number | string | null
    // If you put an object to trigger re-validation on-demand, it should be a `memoized` value from `useMemo`
    staleWhileRevalidate: true,

    // ((error: GQtyError) => void) | undefined
    onError(error) {},
  });

  return (
    <Container>
      <Title>Index page</Title>
      {isAuthenticated ? (
        <>
          <Button onClick={signOut}>Logout</Button>
          <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <Button onClick={() => changeEmail(email)}>Change email</Button>
          <div>{JSON.stringify(changeEmailResult)}</div>
          <Button onClick={() => changePassword(password)}>Change password</Button>
          <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <div>{JSON.stringify(changePasswordResult)}</div>
        </>
      ) : (
        <div>go to /sign-in</div>
      )}
      <p>Access Token</p>
      <div>{accessToken}</div>
      {/* {isAuthenticated && (
        <ul>
          {data?.books.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )} */}
      <div>
      USERS:
      {query.users().map(user => <Suspense fallback="Loading..."><div key={user.id ?? 0}>{user.email}</div></Suspense>)}
      </div>
    </Container>
  )
}

export default authProtected(Home)
