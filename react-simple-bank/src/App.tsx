import React from 'react'

import { useWeb3 } from './hooks/useWeb3'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
// import { Voter } from './components/Voter'
import { SimpleBank } from './components/SimpleBank'

import { store } from './store'
import { observer } from 'mobx-react-lite'

export const App = observer(() => {
  const isAddress = store.web3 ? true : false

  useWeb3()

  return (
    <div>
      <Header isAddress={isAddress} />
      {/* { isAddress && <Voter /> } */}
      { isAddress && <SimpleBank /> }
      <Footer />
    </div>
  )
})
