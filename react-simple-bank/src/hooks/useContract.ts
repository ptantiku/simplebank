import { useMemo } from 'react'
import { store } from '../store'

// const abi = [
//   {
//       "inputs": [
//           {
//               "internalType": "string[]",
//               "name": "candidateNames",
//               "type": "string[]"
//           }
//       ],
//       "payable": false,
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//   },
//   {
//       "anonymous": false,
//       "inputs": [
//           {
//               "indexed": false,
//               "internalType": "string",
//               "name": "candidate",
//               "type": "string"
//           },
//           {
//               "indexed": false,
//               "internalType": "uint256",
//               "name": "count",
//               "type": "uint256"
//           }
//       ],
//       "name": "voted",
//       "type": "event"
//   },
//   {
//       "constant": false,
//       "inputs": [
//           {
//               "internalType": "string",
//               "name": "candidate",
//               "type": "string"
//           }
//       ],
//       "name": "voteForCandidate",
//       "outputs": [],
//       "payable": false,
//       "stateMutability": "nonpayable",
//       "type": "function"
//   },
//   {
//       "constant": true,
//       "inputs": [],
//       "name": "candidateCount",
//       "outputs": [
//           {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//           }
//       ],
//       "payable": false,
//       "stateMutability": "view",
//       "type": "function"
//   },
//   {
//       "constant": true,
//       "inputs": [
//           {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//           }
//       ],
//       "name": "candidateList",
//       "outputs": [
//           {
//               "internalType": "string",
//               "name": "",
//               "type": "string"
//           }
//       ],
//       "payable": false,
//       "stateMutability": "view",
//       "type": "function"
//   },
//   {
//       "constant": true,
//       "inputs": [
//           {
//               "internalType": "string",
//               "name": "candidate",
//               "type": "string"
//           }
//       ],
//       "name": "totalVotesFor",
//       "outputs": [
//           {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//           }
//       ],
//       "payable": false,
//       "stateMutability": "view",
//       "type": "function"
//   }
// ]

const abi = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'deposit',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'increaseYear',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'accountAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'DepositMade',
      type: 'event',
    },
    {
      stateMutability: 'nonpayable',
      type: 'fallback',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256',
        },
      ],
      name: 'withdraw',
      outputs: [
        {
          internalType: 'uint256',
          name: 'remainingBal',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'balance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'balances',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'systemBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]
export const useContract = () => {
  const web3 = store.web3
  const addr = store.contractAddress
  // const addr = '0x9924e50aC6b65D6b50Bf572f7aC4AC811d7BC7de'
  // const addr = '0xDc30B5342279f6eC13C239CD259163B4599b7Ecf'
  const contract = useMemo(() => {
    if (!web3) return null
    try {
      const c = new web3.eth.Contract(abi as any, addr)
      return c
    } catch (err) {
      console.warn(err)
      return null
    }
  }, [web3, addr])
  return contract
}
