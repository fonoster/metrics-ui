import { HomeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import { config } from '../../constants/config'
import { getPath } from '../../helpers/getPath'
import { Notification } from '../Notification'

export const Header = () => {
  return (
    <>
      <Notification />
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
            <div className="flex-shrink-0 flex items-center">
              <Link href={config.APP_URL}>
                <a className="flex items-center text-gray-300 hover:text-primary">
                  <HomeIcon className="w-6 h-6 mr-2" />

                  <span>Go back</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
