import { useContract } from '../useContract'
import { useCallback, useState, useEffect } from 'react'
import { store } from '../../store'

export const useSystemBalance = () => {
  const web3 = store.web3
  const [systemBalance, setSystemBalance] = useState<number>(0)
  const contract = useContract()

  const fetch = useCallback(async () => {
    if (!web3 || !contract) return
    const c = await contract.methods.systemBalance().call()
    setSystemBalance(Number(web3.utils.fromWei(c as string)))
  }, [web3, contract])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    systemBalance,
    fetch,
  }
}
