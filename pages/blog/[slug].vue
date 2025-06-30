<template>
  <ContentRenderer v-if="data" :value="data.body" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const slug = useRoute().params.slug
const { data } = await useAsyncData(`pages-${locale.value}`, () => {
  return queryCollection('content')
            .path(`/${locale.value}/blog/${slug}`)
            .first()
})

</script>
