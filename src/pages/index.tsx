import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { addDays } from 'date-fns'
import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'

import { classes } from '@/helpers/classes'
import { useMetrics } from '@/hooks/useMetrics'
import { Spinner, Title } from '@/ui'

export function Home() {
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection',
  })

  const { metrics, isLoading } = useMetrics({
    start: state.startDate.toISOString(),
    end: state.endDate.toISOString(),
  })

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 relative overflow-y-auto focus:outline-none xl:order-first pr-4">
        <Title level={3} className="my-4">
          Fonoster Metrics
        </Title>
        <div className="fn-range">
          <DateRangePicker
            onChange={({ selection }) => setState(selection)}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={[state]}
            direction="vertical"
            scroll={{ enabled: true }}
            months={1}
          />
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="relative grid grid-cols-2 gap-4">
            {isLoading && <Spinner />}
            {metrics.map(metric => (
              <div
                key={metric.id}
                className={classes(
                  'cursor-pointer relative rounded bg-gray-700 border border-gray-500 p-6 shadow-sm flex space-x-4 justify-between flex-col'
                )}
              >
                <div className="">
                  <div className="bill-name">
                    <Title level={4} className="flex m-0 p-0 mb-4">
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
    </div>
  )
}

export default Home
