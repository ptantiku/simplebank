import Web3 from 'web3'
import { useEffect, useCallback } from 'react'
import { store } from '../store'

export const useWeb3 = () => {
  const initWeb3 = useCallback(async () => {
    if (window.ethereum) {
      const tmpWeb3 = new Web3(window.ethereum)
      try {
        const result = await window.ethereum.enable()
        console.log('result', result)
        store.updateWeb3(tmpWeb3)

        store.updateContractAddress('0x2E75F1C09C7327C64607095B21940a950FefB741')
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  useEffect(() => {
    initWeb3()
  }, [initWeb3])

  return store.web3
}
