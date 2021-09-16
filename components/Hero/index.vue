<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>
    <p v-if="description">{{ description }}</p>
    <datocms-image v-if="image" :data="image"></datocms-image>
  </div>
</template>

<script>
import { Image } from 'vue-datocms'
export default {
  components: {
    'datocms-image': Image
  },
  props: {
    title: {
      type: String,
      required: false,
      default: undefined
    },
    description: {
      type: String,
      required: false,
      default: undefined
    },
    image: {
      type: Object,
      required: false,
      default: undefined
    },
  }
}
</script>
