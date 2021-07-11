import React from 'react'
import { store } from '../store'
import { useNetId } from '../hooks/useNetId'
import { observer } from 'mobx-react-lite'

export const NetworkIndicator = observer(() => {
  useNetId()
  return (
    <div className="w-full">
      <p className="text-lg flex flex-col">
        <span className="font-bold text-sm">Network</span>
        {store.netId ? (
          <span>{store.netName}</span>
          ) : (
          <span>Loading network...</span>
        )}
      </p>
    </div>
  )
})
