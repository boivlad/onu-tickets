import { reactive } from 'vue'

export const store = reactive({
  marketAddress: import.meta.env.VITE_MARKET_ADDRESS?.toLowerCase() || "0xc313C80839484038512CDA384d9E153502C5CDC0",
  nftStoreKey: import.meta.env.VITE_NFT_STORE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZkOUZlNGE5Y0Y5MGY0QWEzZjBhNUM1RDAwNDkzMjM0MjFEY2M3N0YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5Njc3NDA1MDM5NywibmFtZSI6Ik9OVSJ9.YtAsVUu-8e9NLzI2DFgpBI_U93rZT5LfkfR7zKgBIi4",
})
