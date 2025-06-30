<template>
  <v-app>
    <v-app-bar app color="white" elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none" />
      <v-toolbar-title>I. Sasaki</v-toolbar-title>

      <v-spacer />

      <!-- 横並びナビゲーション（モバイル非表示） -->
      <div class="d-none d-sm-flex align-center">
        <v-btn :to="localePath('/')">Featured</v-btn>
        <v-btn :to="localePath('/blog')">Blog</v-btn>
        <v-btn :href=researchmapUrl target="_blank">CV(external)</v-btn>

        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-earth</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="l in locales"
              :key="l.code"
              @click="setLocale(l.code)"
              :active="locale === l.code"
            >
              <v-list-item-title>{{ l.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <!-- モバイル用ドロワー -->
    <v-navigation-drawer v-model="drawer" temporary class="d-sm-none">
      <v-list>
        <v-list-item :to="localePath('/')">Featured</v-list-item>
        <v-list-item :to="localePath('/blog')">Blog</v-list-item>
        <v-list-item href="https://example.com/cv.pdf" target="_blank">CV(external)</v-list-item>
        <v-divider />
        <v-list-item
          v-for="l in locales"
          :key="l.code"
          @click="setLocale(l.code)"
        >
          {{ l.name }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const localePath = useLocalePath()

const drawer = ref(false)
const { locales, locale, setLocale } = useI18n()

const researchmapUrl = ref(
  locale.value === 'en'
  ? "https://researchmap.jp/sasakii?lang=en"
  : "https://researchmap.jp/sasakii?lang=ja"
)

// 言語変更時にresearchmapUrlを更新
watch(locale, (newLocale) => {
  researchmapUrl.value =
    newLocale === 'en'
      ? 'https://researchmap.jp/sasakii?lang=en'
      : 'https://researchmap.jp/sasakii?lang=ja'
})
</script>
