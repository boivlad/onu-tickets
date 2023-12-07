import { reactive } from 'vue'

export const store = reactive({
  marketAddress: import.meta.env.VITE_MARKET_ADDRESS.toLowerCase(),
  nftStoreKey: import.meta.env.VITE_NFT_STORE_KEY,
})
