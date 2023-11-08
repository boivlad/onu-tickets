<script setup>
import moment from 'moment';
import { reactive, watch } from 'vue';
import DefaultPoster from '../assets/poster.png';

const defaultTicketData = {
  name: "NFT Event",
  dateStart: new Date(),
  dateEnd: new Date(),
  price: 0.5,
  address: "Some address",
  amount: 20,
  promoterInfo: "Some promoter info",
  image: DefaultPoster,
}
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
})

const state = reactive({
  image: "",
})

watch(() => props.data.image, (image) => {
  if (!image || typeof image === "string") {
    state.image = DefaultPoster;
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => {
    state.image = reader.result;
  }
});

</script>
<template>
  <div class="ticket">
    <img :src="state.image || defaultTicketData.image" alt="NFT Image" class="ticket__image">
    <div class="ticket__info">
      <div class="ticket__info__title">
        {{ props.data.name || defaultTicketData.name }}
      </div>
      <div class="ticket__row">
        <div class="ticket__info__item">
          <div class="ticket__label">Date Start</div>
          <div class="ticket__value">{{ moment(props.data.dateStart).format('DD.MM.YYYY HH:mm') || moment(defaultTicketData.dateStart).format('DD.MM.YYYY HH:mm') }}</div>
        </div>
        <div class="ticket__info__item">
          <div class="ticket__label">Date End</div>
          <div class="ticket__value">{{ moment(props.data.dateEnd).format('DD.MM.YYYY HH:mm') || moment(defaultTicketData.dateEnd).format('DD.MM.YYYY HH:mm')}}</div>
        </div>
      </div>
      <div class="ticket__line"></div>

      <div class="ticket__row">
        <div class="ticket__info__item">
          <div class="ticket__label">Price</div>
          <div class="ticket__value">{{ props.data.price || defaultTicketData.price }} ETH</div>
        </div>
        <div class="ticket__info__item">
          <div class="ticket__label">Order #</div>
          <div class="ticket__value">{{ props.data.amount || defaultTicketData.amount}}</div>
        </div>
      </div>
      <div class="ticket__line"></div>

      <div class="ticket__row">
        <div class="ticket__info__item-long">
          <div class="ticket__label">Place</div>
          <div class="ticket__value">{{ props.data.address || defaultTicketData.address }}</div>
        </div>
      </div>
      <div class="ticket__line"></div>
      <div class="ticket__row">
        <div class="ticket__info__item-long">
          <div class="ticket__label">Event Info</div>
          <div class="ticket__value">{{ props.data.promoterInfo || defaultTicketData.promoterInfo }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.ticket {
  width: 275px;
  height: 500px;
  border-radius: 8px;
  background: black;
  overflow: hidden;
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
</style>
