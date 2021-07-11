import React from 'react'
import { Account } from './Account'
// import { ContractAddress } from './ContractAddress'
import { NetworkIndicator } from './NetworkIndicator'

interface IProps {
  isAddress: boolean
}

const cardStyleTw = `bg-white p-6 rounded-lg shadow-lg flex items-center justify-center`

export const Header: React.FC<IProps> = ({ isAddress }) => {
  return (
    <>
      <header
        className={`px-16 py-12 bg-gradient-to-r from-red-400 to-blue-500 ${isAddress ? '' : 'min-h-screen flex items-center justify-center'}`}
      >
        <div className="grid grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
          {/* <div className={cardStyleTw}>
            <ContractAddress />
          </div> */}
          <div className={`${cardStyleTw} flex-col`}>
            <div className="mb-2 w-full">
              <NetworkIndicator />
            </div>
            <Account />
          </div>
        </div>
      </header>
    </>
  )
}
