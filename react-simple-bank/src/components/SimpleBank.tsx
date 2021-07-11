import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useBalance } from '../hooks/bank/useBalance'
import { useSystemBalance } from '../hooks/bank/useSystemBalance'
import { useApprove } from '../hooks/bank/useApprove'
import { useDeposit } from '../hooks/bank/useDeposit'
import { useWithdraw } from '../hooks/bank/useWithdraw'
import { useIncreaseYear } from '../hooks/bank/useIncreaseYear'

export const SimpleBank = observer(() => {
  const { balance } = useBalance()
  const { systemBalance } = useSystemBalance()
  const { approve } = useApprove()
  const { deposit } = useDeposit()
  const { withdraw } = useWithdraw()
  const { increaseYear } = useIncreaseYear()

  const [depositAmount, setDepositAmount] = useState('0')
  const [withdrawAmount, setWithdrawAmount] = useState('0')

  return (
    <div 
      className="bg-gradient-to-b from-indigo-900 to-indigo-800 py-12 px-10" 
    >
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between mb-4">
          <div className="text-3xl text-white font-bold">Simple Bank</div>
          <div 
            className="bg-blue-500 px-6 py-2 cursor-pointer rounded-lg text-lg font-bold" 
            onClick={() => increaseYear()}
          >Increase Year</div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <div className="font-bold">Balance</div>
            <div className="text-2xl">{balance}</div>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <div className="font-bold">System Balance</div>
            <div className="text-2xl">{systemBalance}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="p-4 bg-blue-100 font-bold text-xl">Deposit</div>
            <div className="p-6">
              <input 
                value={depositAmount}
                onChange={e => setDepositAmount(e.target.value)}
                placeholder="0.00"
                className="text-lg border border-gray-400 w-full p-3 mb-3"
              />
              <button
                className="p-3 bg-blue-700 text-white px-6 mr-4"
                onClick={() => approve(depositAmount, () => {})}
              >Approve</button>
              <button 
                className="p-3 bg-blue-700 text-white px-6"
                onClick={() => deposit(depositAmount, () => setDepositAmount('0'))}
              >Deposit</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="p-4 bg-blue-100 font-bold text-xl">Withdraw</div>
            <div className="p-6">
              <input 
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="text-lg border border-gray-400 w-full p-3 mb-3"
              />
              <button 
                className="p-3 bg-blue-700 text-white px-6"
                onClick={() => withdraw(withdrawAmount, () => setWithdrawAmount('0'))}
              >Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})