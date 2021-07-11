import { store } from '../../store'
import { useToken } from '../useToken'
import { useCallback, useState } from 'react'
import { useAccounts } from '../useAccounts'

export const useApprove = () => {
  const web3 = store.web3
  const contractAddress = store.contractAddress
  const token = useToken()
  const { myAccount } = useAccounts()
  const [loading, setLoading] = useState(false)

  const approve = useCallback(
    async (amount: string, callback?: any) => {
      if (!token || !myAccount || !contractAddress) return
      if(!web3) return
      const amountInWei = web3.utils.toWei(amount);
      let options = {
        from: myAccount,
      }
      setLoading(true)
      let confirmed = false
      let errored = false
      // Send a transaction to blockchain
      token.methods
        .approve(contractAddress, amountInWei)
        .send(options)
        .on('error', (error: any) => {
          setLoading(false)
          if (!errored) {
            console.error(error)
            errored = true
          }
        })
        .on('confirmation', (confirmationNumber: any, receipt: any) => {
          console.log('confirmationNumber', confirmationNumber)
          console.log(receipt)
          setLoading(false)
          if (!confirmed) {
            if (callback) {
              callback()
            }
            confirmed = true
          }
        })
    },
    [web3, token, myAccount, contractAddress],
  )

  return {
    approve,
    loading
  }
}
