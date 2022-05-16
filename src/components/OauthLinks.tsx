import { useProviderLink } from '@nhost/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'

import AuthLink from './AuthLink'

export default function OauthLinks() {
  const { github, google, facebook } = useProviderLink()
  return (
    <>
      <AuthLink icon={<FaGithub />} link={github} color="#333">
        Continue with GitHub
      </AuthLink>
      <AuthLink icon={<FaGoogle />} link={google} color="#de5246">
        Continue with Google
      </AuthLink>
      <AuthLink icon={<FaFacebook />} link={facebook} color="#3b5998">
        Continue with Facebook
      </AuthLink>
    </>
  )
}
