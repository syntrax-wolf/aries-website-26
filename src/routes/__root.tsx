import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { SidebarProvider, useSidebar } from '../components/SidebarContext'

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

/*
 * One shell for every route: the navy rail runs floor-to-ceiling on the left,
 * and all page content (footer included) lives in the column to its right.
 * Keeping the footer inside that column — rather than full-bleed underneath
 * the rail — is what makes the vertical edge read as continuous. The margin
 * tracks the rail so the column reclaims the space when it's hidden.
 */
function Shell({ children }: { children: React.ReactNode }) {
  const { hidden } = useSidebar()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className={`flex min-w-0 flex-1 flex-col transition-[margin] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden ? 'lg:ml-0' : 'lg:ml-[240px]'
        }`}
      >
        {/* Bottom bar spacer on mobile */}
        <div className="flex flex-1 flex-col pb-16 lg:pb-0">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-navy/15 selection:text-navy">
        <SidebarProvider>
          <Shell>{children}</Shell>
        </SidebarProvider>
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
