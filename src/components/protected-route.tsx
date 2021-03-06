import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { FC } from 'react'

export function authProtected(Comp: FC) {
  return function AuthProtected(props: JSX.IntrinsicAttributes) {
    const router = useRouter()
    const { isLoading, isAuthenticated } = useAuthenticationStatus()
    console.log('Authentication guard: check auth status', {
      isLoading,
      isAuthenticated,
    })
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!isAuthenticated) {
      router.push('/sign-in')
      return null
    }

    return <Comp {...props} />
  }
}
