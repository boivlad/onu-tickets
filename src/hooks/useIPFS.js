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
      const imageFile = new File([image],
        `poster.${image.name.split('.')[image.name.split('.').length-1]}`,
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
