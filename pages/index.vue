<template>
  <p v-if="$fetchState.pending">Récupération des montagnes... ⛰️</p>
  <p v-else-if="$fetchState.error">Une erreur est survenue :(</p>
  <div v-else>{{ data.homePage.seo.title }}</div>
</template>
<script>
import { request } from '../datocms'
const HOMEPAGE_QUERY = `query HomePage($locale: SiteLocale!) {
  homePage {
    seo(locale: $locale) {
      description
      title
    }
  }
}

`
export default {
  name: 'App',
  data: () => ({
    data: null,
  }),
  async fetch() {
    this.data = await request({
      query: HOMEPAGE_QUERY,
      variables: {
        locale: 'en',
      },
    })
  },
}
</script>
