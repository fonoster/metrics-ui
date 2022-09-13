import React from 'react'

import { Header } from './Header'

const Content: React.FC = ({ children }) => {
  return (
    <div className="h-full flex w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <section className="relative max-w-3xl mx-auto p-6 min-w-0 flex-1 h-full flex flex-col lg:order-last">
              {children}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export const Layout: React.FC = ({ children }) => {
  return <Content {...{ children }} />
}
