import './assets/main.css'

import { createApp, h, provide } from 'vue'
import App from './App.vue'
import CreateEvent from './pages/CreateEvent.vue';
import { createVuestic } from "vuestic-ui"
import * as VueRouter from 'vue-router'
import config from '../vuestic.config.js'
import Marketplace from '@/pages/Marketplace.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import MyTickets from '@/pages/MyTickets.vue';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
})

const mode = import.meta.env.MODE || 'development'

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const routes = [
  { path: '/', component: Marketplace, name: 'Marketplace' },
  { path: '/create-event', component: CreateEvent, name: 'CreateEvent' },
  { path: '/my-tickets', component: MyTickets, name: 'MyTickets' },
]
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: mode === "production" ? VueRouter.createWebHashHistory() : VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
});
app.use(router);
app.use(createVuestic({ config }));
app.mount('#app')
