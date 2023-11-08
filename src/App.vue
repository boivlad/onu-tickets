<script setup>

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { avalancheFuji } from '@wagmi/core/chains'

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

</script>

<template>
  <header>
    <va-navbar>
      <template #left>
        <va-navbar-item class="navbar-item-slot">
          <h1>ONU NFT <b>Ticket</b> Market</h1>
        </va-navbar-item>
      </template>
      <template #center>
        <va-navbar-item class="hidden sm:block">
          <router-link to="/">Home</router-link>
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

}
</style>
