import React from 'react'
import { observer } from 'mobx-react-lite'
import { useAccounts } from '../hooks/useAccounts'

export const Account = observer(() => {
  const { myAccount, balance } = useAccounts()
  return (
    <div className="w-full" style={{ wordBreak: 'break-all' }}>
      <p className="text-lg flex flex-col mb-2">
        <span className="text-sm font-bold">Account</span>
        <span>{myAccount}</span>
      </p>
      <p className="text-lg flex flex-col">
        <span className="text-sm font-bold">Balance</span>
        <span>{balance} SIM</span>
      </p>
    </div>
  )
})
