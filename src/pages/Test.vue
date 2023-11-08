<template>
  <div>
    <input type="file" @change="uploadFile" />
    <button @click="createNFT">Create NFT</button>
    <p v-if="nftUrl">NFT URL: <a :href="nftUrl" target="_blank">{{ nftUrl }}</a></p>
  </div>
</template>

<script>
import { NFTStorage, File } from 'nft.storage'

export default {
  data() {
    return {
      file: null,
      nftUrl: ''
    }
  },
  methods: {
    async uploadFile(event) {
      this.file = event.target.files[0]
    },
    async createNFT() {
      if (!this.file) {
        alert('Please upload a file first')
        return
      }

      const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZkOUZlNGE5Y0Y5MGY0QWEzZjBhNUM1RDAwNDkzMjM0MjFEY2M3N0YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5Njc3NDA1MDM5NywibmFtZSI6Ik9OVSJ9.YtAsVUu-8e9NLzI2DFgpBI_U93rZT5LfkfR7zKgBIi4' })

      const metadata = await client.store({
        name: 'Your NFT Name',
        description: 'Your NFT Description',
        image: new File([this.file], this.file.name, { type: this.file.type })
      })

      this.nftUrl = metadata.url
    }
  },
  watch: {
    file: {
      handler: function (val, oldVal) {
        console.log('file', val)
      },
      deep: true
    }
  }
}
</script>
