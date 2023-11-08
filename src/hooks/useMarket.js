import { getWalletClient, fetchBalance, getContract } from '@wagmi/core'
import { useContractWrite } from 'use-wagmi'

import marketAbi from '../abis/market.json'
import { ethers } from 'ethers';

// by convention, composable function names start with "use"
export function useMarket(address) {
  const createEvent = async (uri = 'https', name='Test', amount = 10, dateStart = new Date(), dateEnd = new Date(), price = "0.1") => {
    const eventParams = {
      uri: uri,
      name: name,
      amount: amount,
      dateStart: Math.floor(dateStart.getTime() / 1000),
      dateEnd: Math.floor(dateEnd.getTime() / 1000),
    }
    // const  walletClient  = await getWalletClient()
    console.log(eventParams)
    console.log(price)
    console.log('address', address)
    const { write, data, error, isLoading, isError, isSuccess } = useContractWrite({
      address: address,
      abi: marketAbi,
      functionName: 'createEvent',
      chainId: 11155111,
    })
    await write({args: [eventParams, ethers.parseEther(price)]});
  }

  return {
    createEvent,
  }
}
