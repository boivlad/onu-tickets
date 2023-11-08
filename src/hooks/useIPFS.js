import { NFTStorage } from 'nft.storage'

export function useIPFS(apiToken) {
  const client = new NFTStorage({ token: apiToken })

  const submitFile = async (
    {
      name,
      description,
      amount,
      dateStart,
      dateEnd,
      address,
      promoterInfo,
      image
    }
  ) => {
    try {
      console.log('file', image)
      const imageFile = new File([image],
        `poster.${image.name.split('.')[1]}`,
        { type: image.type }
      )
      const metadata = {
        name,
        description,
        image: imageFile,
        properties: {
          maxSupply: amount,
          dateStart: dateStart.getUTCDate(),
          dateEnd: dateEnd.getUTCDate(),
          address,
          promoterInfo
        }
      };
      const result = await client.store(metadata)
      console.log(result)
      return `https://ipfs.io/ipfs/${result.url.split('ipfs://')[1]}`
    }
    catch (error) {
      console.error(error);
    }
  };

  return {
    submitFile,
  }
}
