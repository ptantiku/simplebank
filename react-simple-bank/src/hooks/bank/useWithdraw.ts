import { store } from '../../store'
import { useContract } from '../useContract'
import { useCallback, useState } from 'react'
import { useAccounts } from '../useAccounts'

export const useWithdraw = () => {
  const web3 = store.web3
  const contract = useContract()
  const { myAccount } = useAccounts()
  const [loading, setLoading] = useState(false)

  const withdraw = useCallback(
    async (amount: string, callback?: any) => {
      if (!contract || !myAccount) return
      if(!web3) return
      const amountInWei = web3.utils.toWei(amount);
      let options = {
        from: myAccount,
      }
      setLoading(true)
      let confirmed = false
      let errored = false
      // Send a transaction to blockchain
      contract.methods
        .withdraw(amountInWei)
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
    [web3, contract, myAccount],
  )

  return {
    withdraw,
    loading
  }
}
