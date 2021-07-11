import { useState, useEffect, useCallback } from 'react'
import { store } from '../store'
import { useToken } from './useToken'


export const useAccounts = () => {
  const web3 = store.web3
  const [accounts, setAccounts] = useState<string[]>([])
  const [myAccount, setMyAccount] = useState<string>()
  const [balance, setBalance] = useState<string>()
  const token = useToken()

  const fetch = useCallback(async () => {
    if (!web3 || !token) return
    const accs = await web3.eth.getAccounts()
    setAccounts(accs)
    const acc = accs[0]
    if (acc) {
      setMyAccount(acc)
      const result = await token.methods.balanceOf(acc).call()
      setBalance(web3.utils.fromWei(result as string))
    }
  }, [web3, token])
  useEffect(() => {
    fetch()
  }, [fetch])
  return {
    accounts,
    myAccount,
    balance,
  }
}
