import { useState, useCallback, useEffect } from 'react'
import { useContract } from './useContract'

export const useCandidateScore = (name?: string) => {
  const [score, setScore] = useState<number>(0)
  const contract = useContract()

  const fetch = useCallback(async () => {
    if (!contract) return

    
    try {
      const sc = await contract.methods.totalVotesFor(name).call()
      if (sc) setScore(parseInt(sc))
      
      // on received voted
      contract.events
        .voted()
        .on('data', (res: any) => {
          if (res.returnValues[0] === name && res.returnValues[1]) setScore(parseInt(res.returnValues[1]))
        })
    } catch (err) {
      console.warn(err)
    }
  }, [contract, name])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    score,
    fetch,
  }
}
