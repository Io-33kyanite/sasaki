<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="page in pages"
        :key="page.path"
        cols="12"
        md="6"
      >
        <NuxtLink :to="getLocalizedPath(page.path)" class="text-decoration-none">
          <v-hover v-slot="{ isHovering }">
            <v-card
              :elevation="isHovering ? 6 : 2"
              class="transition-swing pa-4 mb-4"
              rounded
            >
              <v-card-title class="text-h6 font-weight-bold white-space-normal text-wrap">
                {{ page.title }}
              </v-card-title>

              <!-- 本文から最初の段落のテキストを抽出 -->
              <v-card-text class="text-body-2 text--secondary">
                Created At: {{ page.meta.created_at }}
              </v-card-text>
            </v-card>
          </v-hover>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>



<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'
import type { ContentCollectionItem } from '@nuxt/content'

const { locale } = useI18n()

const targetPath = ref('/' + locale.value + '/blog/')
const pages = ref<ContentCollectionItem[] | null>([])

const { data: contents } = await useAsyncData(`pages-${locale.value}`, () => {
  return queryCollection('content')
    .where('path', 'LIKE', `${targetPath.value}%`)
    .all()
})

pages.value = contents.value


/**
 * ローカライズされたパスを取得する関数
 * デフォルト言語 (en) の場合は言語コードを取り除く
 */
const getLocalizedPath = (path: string): string => {
  if (locale.value === 'en') {
    return path.replace(/^\/en\//, '/')
  }
  return path
}
</script>
