<script>
import { computed, reactive } from 'vue';
import { SELECT_ACTUAL_EVENTS_BY_BUYER } from '@/utils/api';
import { classifyAndSortTickets } from '@/utils/classifyAndSortTickets';

import { useQuery } from "@vue/apollo-composable";
import { getAccount } from '@wagmi/core'
import TicketCard from '@/components/TicketCard.vue';


export default {
  components: { TicketCard },
  setup() {
    const dateNow = Math.floor(Date.now() / 1000)
    const account = getAccount()
    if (!account) {
      return {
        state: {
          events: computed(() => []),
        }
      }
    }
    const selectEventsVariables = {
      where: {
        buyer_contains: account.address.toLowerCase(),
      }
    }
    const ticketsQuery = useQuery(SELECT_ACTUAL_EVENTS_BY_BUYER, selectEventsVariables)
    const buyTickets = computed(() => ticketsQuery.result.value?.buyTickets || [])
    const refundTickets = computed(() => ticketsQuery.result.value?.refundTickets || [])
    const state = reactive({
      type: "private",
      filterType: "all",
      computedTickets: computed(() => classifyAndSortTickets(buyTickets.value,
          refundTickets.value,
          dateNow)),
      boughtTickets: computed(() => buyTickets.value),
      refundedTickets: computed(() => refundTickets.value),
    })
    return {
      ticketsQuery,
      buyTickets,
      refundTickets,
      state,
    }
  },

};

</script>


<template>
  <div class="va-gutter-2 flex gap-3 row justify-center">
    <va-card class="item flex flex-col justify-center">
      <va-card-title class="justify-center">My Tickets</va-card-title>
      <va-card-content class="d-flex flex-wrap w-100">
        <ticket-card
            v-for="ticket in state.computedTickets"
            :name="ticket.event.ticketInfo_name"
            :dateStart="ticket.event.ticketInfo_dateStart"
            :dateEnd="ticket.event.ticketInfo_dateEnd"
            :price="ticket.event.ticketInfo_price"
            :amount="ticket.event.ticketInfo_amount"
            :uri="ticket.event.ticketInfo_uri"
            :event-id="Number(ticket.eventId)"
            :tokenId="Number(ticket.tokenId)"
            :status="ticket.status"
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
