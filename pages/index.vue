<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Something bad happened</div>
    <div v-else>{{ data.homePage.seo.title }}</div>
  </div>
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
    error: null,
    loading: true,
  }),
  async mounted() {
    try {
      this.data = await request({
        query: HOMEPAGE_QUERY,
        variables: {
          locale: 'en',
        },
      })
    } catch (e) {
      this.error = e
    }
    this.loading = false
  },
}
</script>
