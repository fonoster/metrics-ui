import { Title } from '@/ui'

export function Home() {
  return (
    <>
      <div className="flex-1 relative flex overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none xl:order-first">
          <div className="absolute inset-0">
            <Title level={3}>Latest</Title>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
