import { classes } from '@/helpers/classes'
import { useMetrics } from '@/hooks/useMetrics'
import { Spinner, Title } from '@/ui'

export function Home() {
  const { metrics, isLoading } = useMetrics()

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="flex-1 relative flex overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none xl:order-first">
          <div className="absolute inset-0">
            <Title level={3}>Fonoster Metrics</Title>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-20">
            {metrics.map(metric => (
              <div
                key={metric.id}
                className={classes(
                  'cursor-pointer relative rounded-lg bg-gray-700 border border-gray-500 p-12 shadow-sm mb-8 flex space-x-4 justify-between flex-col'
                )}
              >
                <div className="">
                  <div className="bill-name">
                    <Title level={3} className="flex m-0 p-0 mb-8">
                      <strong>{metric.label}</strong>
                    </Title>
                  </div>
                  <div className="bill-price">
                    <Title level={4} className="m-0 p-0">
                      {metric.count}
                    </Title>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
