<script>
import { computed, reactive } from 'vue';
import { SELECT_ACTUAL_EVENTS } from '@/utils/api';

import { useQuery } from "@vue/apollo-composable";
import EventCard from '@/components/EventCard.vue';

export default {
  components: { EventCard },
  setup() {
    const selectEventsVariables = {
      where: {
        ticketInfo_dateStart_gte: Math.floor(new Date().getTime() / 1000),
      },
      order_by: {
        created_at: "desc",
      },
    }
    const eventsQuery = useQuery(SELECT_ACTUAL_EVENTS, selectEventsVariables)
    const eventsResult = computed(() => eventsQuery.result.value?.createEvents)
    const state = reactive({
      type: "private",
      filterType: "all",
      events: computed(() => eventsResult.value),
    })
    return {
      eventsQuery,
      eventsResult,
      state,
    }
  },

};

</script>


<template>
  <div class="va-gutter-2 flex gap-3 row justify-center">
    <va-card class="item flex flex-col justify-center">
      <va-card-title class="justify-center">Marketplace</va-card-title>
      <va-card-content class="d-flex flex-wrap w-100">
        <event-card
            v-for="event in state.events"
            :name="event.ticketInfo_name"
            :dateStart="event.ticketInfo_dateStart"
            :dateEnd="event.ticketInfo_dateEnd"
            :price="event.ticketInfo_price"
            :amount="event.ticketInfo_amount"
            :uri="event.ticketInfo_uri"
            :event-id="Number(event.eventId)"
        />
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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
