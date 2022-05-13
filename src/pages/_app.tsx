import type { AppProps } from 'next/app'
import Head from 'next/head'

import { AppShell, Header, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { NhostClient, NhostNextProvider } from '@nhost/nextjs'

import NavBar from '../components/NavBar'

import '../styles/globals.css'

const nhost = new NhostClient({ backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string })
const title = 'Nhost with NextJs'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>

        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light'
          }}
        >
          <NotificationsProvider>
            <AppShell
              padding="md"
              navbar={<NavBar />}
              header={
                <Header height={60} p="xs">
                  {title}
                </Header>
              }
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
                }
              })}
            >
              <Component {...pageProps} />
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
    </NhostNextProvider>
  )
}

export default MyApp
