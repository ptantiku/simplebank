import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from '../store'
import { message } from 'antd'

export const ContractAddress = observer(() => {
  const [addr, setAddr] = useState(store.contractAddress)
  return (
    <div className="w-full text-center">
      <div className="text-2xl font-bold mb-2">Contract Address</div>
      <input
        className="border border-gray-400 px-3 py-2 w-full text-center rounded text-lg"
        value={addr}
        onChange={(e) => {
          setAddr(e.target.value)
        }}
        placeholder="0x0000000000000"
      />
      <div className="flex flex-col justify-center items-center mt-6">
        <button
          className="bg-indigo-700 hover:bg-indigo-800 text-lg text-white font-bold py-2 px-4 rounded w-full md:w-64"
          onClick={() => {
            store.updateContractAddress(addr)
            message.success('Update Success!')
          }}
        >
          Update Address
        </button>
        {
          store.contractAddress && (
            <a
              href={`https://kovan.etherscan.io/address/${store.contractAddress}`}
              className="underline flex items-baseline text-sm mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open on EtherScan
            </a>
          )
        }
      </div>
    </div>
  )
})
