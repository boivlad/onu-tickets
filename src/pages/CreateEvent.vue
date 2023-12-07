<script setup>
import { useIPFS } from '@/hooks/useIPFS';
import { store } from '@/store';
import { reactive } from 'vue';
import DemoCard from '../components/DemoCard.vue';
import DefaultPoster from '../assets/poster.png';
import marketAbi from '@/abis/market.json';
import { ethers } from 'ethers';
import { writeContract } from '@wagmi/core'


const { submitFile, ipfsUrl } = useIPFS(store.nftStoreKey);

const form = reactive({
  name: '',
  description: '',
  amount: '',
  address: '',
  promoterInfo: '',
  price: '',
  dateStart: new Date(),
  dateEnd: new Date(),
  image: DefaultPoster,
})

const imageState = reactive({
  image: '',
})

const state = reactive({
  monthView: { type: "month", month: 1, year: 2000 }
})

const uploadFile = async (image) => {
  if (!image[0]) {
    form.image = DefaultPoster;
    return;
  }
  form.image = image[0];
}
const createEvent = async (uri = 'https', name='Test', amount = 10, dateStart = new Date(), dateEnd = new Date(), price = "0.1") => {

  const eventParams = {
    uri: uri,
    name: name,
    amount: amount,
    dateStart: Math.floor(dateStart.getTime() / 1000),
    dateEnd: Math.floor(dateEnd.getTime() / 1000),
  }

  const data = await writeContract({
    address: store.marketAddress,
    abi: marketAbi,
    args: [eventParams, ethers.parseEther(price)],
    functionName: 'createEvent',
  })

}

const mintEvent = async (form) => {

  const ipfsUrl = await submitFile(form);
  await createEvent(ipfsUrl,
      form.name,
      form.amount,
      form.dateStart,
      form.dateEnd,
      form.price);
}

</script>

<template>
  <div class="va-gutter-2 flex gap-3 row justify-center">
    <va-card class="item flex flex-col md3">
      <va-card-title class="title">Create new event</va-card-title>
      <va-card-content>
        <va-form class="w-[300px]"
                 ref="createEventForm"
                 @submit="submitFile">
          <va-input v-model="form.name" name="name" label="name" class="w-full mb-6"/>
          <va-input v-model="form.description" name="description" label="description" class="w-full mb-6"/>
          <va-input v-model="form.amount" name="amount" label="amount" type="number" class="w-full mb-6"/>
          <va-input v-model="form.price" name="price" label="price" type="number" class="w-full mb-6"/>
          <va-input v-model="form.address" name="address" label="address" class="w-full mb-6"/>
          <va-input v-model="form.promoterInfo" name="promoterInfo" label="promoter Info" class="w-full mb-6"/>
          <va-date-input v-model="form.dateStart" name="dateStart" label="Date Start" class="w-8/12 mb-6"/>
          <va-time-input v-model="form.dateStart" name="dateStart" label="Time Start" class="w-4/12 mb-6"/>
          <va-date-input v-model="form.dateEnd" name="dateEnd" label="date End" class="w-8/12 mb-6"/>
          <va-time-input v-model="form.dateEnd" name="dateStart" label="Time End" class="w-4/12 mb-6"/>
          <va-file-upload
              v-model="imageState.image"
              dropzone
              type="gallery"
              file-types="image/*"
              @fileAdded="uploadFile"
          />
          <va-button @click="mintEvent(form)">
            Create Event
          </va-button>
        </va-form>
      </va-card-content>
    </va-card>

    <va-card class="item flex flex-col md3">
      <va-card-title>Create new event</va-card-title>
      <va-card-content class="d-flex justify-center">
        <demo-card :data="form"/>
      </va-card-content>
    </va-card>
  </div>
</template>

<style scoped>
@import "vuestic-ui/styles/grid";

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.title {
  display: none;
  font-size: 1.5rem; /* 24px */
  line-height: 2rem; /* 32px */
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
