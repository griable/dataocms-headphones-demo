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
import { StructuredText } from 'vue-datocms'
import { request } from '../datocms'
// import Hero from '../components/Hero'

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
    // renderBlock: ({ record, key }) => {
    //   if (record.__typename === 'HeroRecord') {
    //     return h(Hero, {
    //       key,
    //       props: {
    //         title: record.title,
    //         description: record.description,
    //         image: record.image.responsiveImage,
    //       },
    //     })
    //   }
    //   return null
    // },
    renderBlock: async ({ record, key }) => {
      if (record.__typename === 'HeroRecord') {
        // TODO: implementation expected but failing with:
        // [Vue warn]: `createElement()` has been called outside of render function.
        const hero = await import(
          /* webpackPrefetch: true */
          `../components/${record.__typename.replace(/Record/g, '')}/index.vue`
        );
        return h(hero.default, {
          key,
          props: {
            title: record.title,
            description: record.description,
            image: record.image.responsiveImage,
          },
        })
      }
      return null
    },
  },
}
</script>
