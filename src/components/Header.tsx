import React from 'react'

import { getPath } from '../helpers/getPath'

export const Header = () => {
  return (
    <>
      <nav className="bg-gray-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block h-8 w-auto"
                  src={getPath('isotipo.svg')}
                  alt="Fonoster"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
