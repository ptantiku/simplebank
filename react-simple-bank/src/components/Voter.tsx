import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useCandidateCount } from '../hooks/useCandidateCount'
import { CandidateCard } from './CandidateCard'

export const Voter = observer(() => {
  const { count } = useCandidateCount()
  const arr = useMemo(() => Array.from(new Array(count), (x, i) => i), [count])

  return (
    <div 
      className="bg-gradient-to-b from-indigo-900 to-indigo-800 py-12" 
      style={{
        minHeight: '40vh'
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-2xl text-white mb-4">
          Candidates Count: <b>{count}</b>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {arr.map((idx) => (
            <CandidateCard index={idx} key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
})
