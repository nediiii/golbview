import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/iview.js";

Vue.config.productionTip = false;

// apollo

// apollo
import VueApollo from "vue-apollo";
Vue.use(VueApollo);
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

// HTTP connection to the API

const httpOptions = {
  uri: process.env.VUE_APP_GRAPHQL_HTTP || "/query",
  headers: {
    // Authorization: "your token here",
  },
};

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: createUploadLink(httpOptions),
  cache,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
