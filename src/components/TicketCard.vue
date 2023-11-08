<script setup>
import moment from 'moment';
import { computed, reactive } from 'vue';
import { ethers } from 'ethers';
import { store } from '@/store';
import { writeContract } from '@wagmi/core';
import marketAbi from '@/abis/market.json';
import DefaultPoster from '../assets/poster.png';

const props = defineProps({
  eventId: Number,
  tokenId: Number,
  name: String,
  dateStart: String,
  dateEnd: String,
  price: Number,
  amount: Number,
  uri: String,
  status: String,
})

const state = reactive({
  nftData: null,
  imageUrl: null,
  inActive: computed(() => {
    return props.status === 'REFUND' || props.status === 'EXPIRED';
  })
})

const formatIpfsUrl = (ipfsUri) => {
  if (!ipfsUri.startsWith('ipfs://')) {
    return ipfsUri;  // Return the original URI if it doesn't start with "ipfs://"
  }

  // Remove the "ipfs://" prefix and return the formatted URL
  const cid = ipfsUri.slice(7);
  return `https://ipfs.io/ipfs/${cid}`;
}

const getImageUrl = (ipfsUri) => {
  return formatIpfsUrl(ipfsUri);
}

const fetchMetadata = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log('data', data)
    state.nftData = data;
    state.imageUrl = getImageUrl(data.image);
    console.log(state.imageUrl)
  }
  catch (error) {
    console.error("There was a problem fetching the metadata:", error);
  }
}

fetchMetadata(props.uri);

const refundTicket = async () => {
  console.log('refundTicket ticket for event', props.eventId)
  const data = await writeContract({
    address: store.marketAddress,
    abi: marketAbi,
    args: [props.eventId, props.tokenId],
    functionName: 'refundTicket'
  })
  console.log('data', data)
}

</script>
<template>
  <div :class="['ticket', state.inActive ? 'disabled' : '']">
    <img :src="state?.imageUrl || DefaultPoster" alt="NFT Image" class="ticket__image">
    <div class="ticket__info">
      <div class="ticket__info__title">
        {{ props.name }}{{ props.status }}
      </div>
      <div class="ticket__row">
        <div class="ticket__info__item">
          <div class="ticket__label">Date Start</div>
          <div class="ticket__value">{{ moment(Number(props.dateStart) * 1000).format('DD.MM.YYYY HH:mm') }}</div>
        </div>
        <div class="ticket__info__item">
          <div class="ticket__label">Date End</div>
          <div class="ticket__value">{{ moment(Number(props.dateEnd) * 1000).format('DD.MM.YYYY HH:mm') }}</div>
        </div>
      </div>
      <div class="ticket__line"></div>

      <div class="ticket__row">
        <div class="ticket__info__item">
          <div class="ticket__label">Price</div>
          <div class="ticket__value">{{ ethers.formatEther(props.price) }} ETH</div>
        </div>
        <div class="ticket__info__item">
          <div class="ticket__label">Ticket #</div>
          <div class="ticket__value">{{ props.tokenId }}</div>
        </div>
      </div>
      <div class="ticket__line"></div>
      <div class="ticket__row">
        <div class="ticket__info__item-long">
          <div class="ticket__label">Place</div>
          <div class="ticket__value">{{ state?.nftData?.properties?.address }}</div>
        </div>
      </div>
      <div class="ticket__line"></div>
      <div class="ticket__row">
        <div class="ticket__info__item-long">
          <div class="ticket__label">Event Info</div>
          <div class="ticket__value">{{ state?.nftData?.properties?.promoterInfo }}</div>
        </div>
      </div>
      <div class="ticket__line"></div>
      <div class="ticket__actions">
        <va-button :disabled="state.inActive"  @click="refundTicket" icon="shopping_cart" size="large" >Refund Ticket</va-button>
      </div>

    </div>
  </div>
</template>

<style>
.ticket {
  margin: 10px;
  width: 275px;
  height: 600px;
  border-radius: 8px;
  background: black;
  overflow: hidden;

  &.disabled {
    opacity: 0.5;
  }
}

.ticket__image {
  width: 100%;
  height: 160px;
}

.ticket__label {
  font-size: 10px;
}

.ticket__value {
  font-size: 14px;
  font-weight: bold;
  color: rgb(109, 224, 162);
}

.ticket__info {
  width: 100%;
  height: 340px;
  padding: 16px;
}

.ticket__line {
  width: 100%;
  height: 1px;
  opacity: 0.3;
  border-bottom: 1.5px groove rgb(109, 224, 162);
}

.ticket__info__title {
  font-size: 22px;
  font-weight: bold;
  line-height: 1.3;
}

.ticket__row {
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
}

.ticket__info__item {
  width: 50%;
}

.ticket__info__item-long {
  width: 100%;
}
.ticket__actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
