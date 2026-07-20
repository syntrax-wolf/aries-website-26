import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'ARIES — The AI Society of IIT Delhi' },
      {
        name: 'description',
        content:
          'ARIES is the student-led AI research and engineering collective at IIT Delhi — workshops, papers, projects, and events.',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <main className="page-wrap py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-[var(--ink-soft)] uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-navy sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-[var(--ink-soft)]">
        We couldn&rsquo;t find what you were looking for.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream no-underline"
      >
        Back to Home
      </Link>
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHome = pathname === '/'

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-accent/30 selection:text-navy">
        {isHome ? (
          // Landing: transparent fixed header, full-bleed hero, no sidebar
          <>
            <Header />
            {children}
            <Footer />
          </>
        ) : (
          // Inner pages: fixed sidebar + content area with top padding for mobile bar
          <div className="flex min-h-screen">
            <Sidebar />
            {/* Content shifts right on desktop to clear the sidebar */}
            <div className="flex flex-1 flex-col lg:ml-[210px]">
              {/* Bottom bar spacer on mobile */}
              <div className="pb-16 lg:pb-0">
                {children}
              </div>
            </div>
          </div>
        )}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
        />
        <Scripts />
      </body>
    </html>
  )
}
