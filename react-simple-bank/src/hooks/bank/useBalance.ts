import { useContract } from '../useContract'
import { useCallback, useState, useEffect } from 'react'
import { useAccounts } from '../useAccounts'
import { store } from '../../store'

export const useBalance = () => {
  const web3 = store.web3
  const [balance, setBalance] = useState<number>(0)
  const contract = useContract()
  const { myAccount } = useAccounts()

  const fetch = useCallback(async () => {
    if (!web3 || !contract || !myAccount) return
    let options = {
      from: myAccount,
    }
    const c = await contract.methods.balance().call(options)
    setBalance(Number(web3.utils.fromWei(c as string)))
  }, [web3, contract, myAccount])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    balance,
    fetch,
  }
}
