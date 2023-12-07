<script setup>

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { avalancheFuji } from '@wagmi/core/chains'
import { reactive } from 'vue';

// 1. Get projectId
const projectId = 'd91206221ddaf87f5e96a7573d1a7038'

// 2. Create wagmiConfig
const metadata = {
  name: 'ONTM',
  description: 'ONU NFT Ticket Market',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [avalancheFuji]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

function isMobile() {
  return screen.width <= 760;
}

const state = reactive({
  enabled: false,
  minimized: false,
})

</script>

<template>
  <header>
    <va-navbar v-if="!isMobile()">
      <template #left>
        <va-navbar-item class="navbar-item-slot">
          <h1>ONU NFT <b>Ticket</b> Market</h1>
        </va-navbar-item>
      </template>
      <template #center>
        <va-navbar-item class="hidden sm:block">
          <router-link to="/">Marketplace</router-link>
        </va-navbar-item>
        <va-navbar-item class="hidden sm:block">
          <router-link to="/create-event">New Event</router-link>
        </va-navbar-item>
        <va-navbar-item class="hidden sm:block">
          <router-link to="/my-tickets">My Tickets</router-link>
        </va-navbar-item>
      </template>
      <template #right>
        <va-navbar-item class="navbar-item-slot">
          <w3m-button/>
        </va-navbar-item>
      </template>
    </va-navbar>
    <div v-if="isMobile()">
      <div @click="state.enabled = !state.enabled"><h1>ONU <b>Ticket</b> Market</h1></div>
      <va-sidebar
          v-model="state.enabled"
          class="sidebar"
          animated="top"
      >
        <va-sidebar-item :active="$route.name === 'Marketplace'">
          <va-sidebar-item-content>
            <va-icon name="storefront"/>
            <router-link to="/">Marketplace</router-link>
          </va-sidebar-item-content>
        </va-sidebar-item>
        <va-sidebar-item :active="$route.name === 'CreateEvent'">
          <va-sidebar-item-content>
            <va-icon name="edit_calendar"/>
            <router-link to="/create-event">New Event</router-link>
          </va-sidebar-item-content>
        </va-sidebar-item>
        <va-sidebar-item :active="$route.name === 'MyTickets'">
          <va-sidebar-item-content>
            <va-icon name="book_online"/>
            <router-link to="/my-tickets">My Tickets</router-link>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </va-sidebar>
    </div>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>


@media (min-width: 1024px) {
  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  main {
    margin-top: 2rem;
    padding: 0 2rem;
    width: 100%;
  }

  .content {
    width: 100%;
    height: 100%;
    background-color: var(--va-background-primary);
  }
}

@media (max-width: 760px ) {
  header {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  h1 {
    text-align: center;
  }

  .sidebar {
    position: absolute;
    top: 36px;
    right: 0;
    left: auto;
  }
}
</style>
