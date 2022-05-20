import {
  AppShell,
  Burger,
  Button,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from '@mantine/core'
import { useSignOut } from '@nhost/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import NavBar from '../components/NavBar'

export const AppLayout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const { signOut } = useSignOut()
  const router = useRouter()
  const handleClick = async () => {
    await signOut()
    router.replace('/')
  }
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      header={
        <Header height={50} p="md">
          <div className="flex h-full items-center">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
              />
            </MediaQuery>
            <Link href="/">
              <Image src="/rubble.png" width={50} height={50} alt="rubble" />
            </Link>

            <div className="ml-auto">
              <Button variant="subtle" onClick={handleClick}>
                Sign Out
              </Button>
            </div>
          </div>
        </Header>
      }
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ base: 300 }}
        >
          <NavBar />
        </Navbar>
      }
    >
      {children}
    </AppShell>
  )
}

export default AppLayout
