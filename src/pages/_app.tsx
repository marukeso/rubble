import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { NhostClient, NhostNextProvider } from '@nhost/nextjs'
import Head from 'next/head'

import AppLayout from '../layouts/AppLayout'

import type { AppProps } from 'next/app'

import '../styles/globals.css'

const nhost = new NhostClient({
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <Head>
        <title>rubble</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </NotificationsProvider>
      </MantineProvider>
    </NhostNextProvider>
  )
}

export default MyApp
