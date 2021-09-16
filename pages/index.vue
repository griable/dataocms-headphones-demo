<template>
  <p v-if="$fetchState.pending">Récupération des montagnes... ⛰️</p>
  <p v-else-if="$fetchState.error">Une erreur est survenue :(</p>
  <div v-else>
    <p>{{ data.homePage.seo.title }}</p>
    <p>{{ data.homePage.seo.description }}</p>
    <datocms-structured-text
      :data="data.homePage.content"
      :render-block="renderBlock"
    />
  </div>
</template>
<script>
import { h } from 'vue-demi'
import { StructuredText, Image } from 'vue-datocms'
import { request } from '../datocms'

const HOMEPAGE_QUERY = `query HomePage($locale: SiteLocale!) {
  homePage {
    seo(locale: $locale) {
      description
      title
    }
    content {
      value
      blocks {
        __typename
        ... on HeroRecord {
          id
          title
          description
          image {
            responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
              srcSet
              webpSrcSet
              sizes
              src
              width
              height
              aspectRatio
              alt
              title
              base64
            }
          }
        }
      }
    }
  }
}

`
export default {
  name: 'App',
  components: {
    'datocms-structured-text': StructuredText,
  },
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
  methods: {
    renderBlock: ({ record, key }) => {
      if (record.__typename === 'HeroRecord') {
        return h('div', {}, [
          h('h1', {}, record.title),
          h('p', {}, record.description),
          h(Image, {
            key,
            props: { data: record.image.responsiveImage },
          }),
        ])
      }
      return null
    },
  },
}
</script>
