<template>
  <v-app>
    <v-container fluid>
      <!-- プロフィールセクション -->
      <v-sheet class="pa-8 mb-12" elevation="2" rounded>
        <v-row align="center">
          <v-col cols="15" md="2" class="text-center">
            <v-avatar size="130">
              <v-img
                src="assets/avator.jpg"
                alt="Profile"
              />
            </v-avatar>
          </v-col>
          <v-col cols="12" md="9">
            <h2 class="text-h4 font-weight-bold">{{ profileName }}</h2>
            <p class="text-subtitle-1">
              {{ profileTitle }} | {{ profileRole }} @ {{ profileOrgs }}
            </p>
            <div class="d-flex align-center">
              <a href="https://www.linkedin.com/in/iori33ky/" target="_blank">
                <v-icon size="28" color="grey darken-1" class="mr-2">mdi-linkedin</v-icon>
              </a>
              <a href="https://github.com/Io-33kyanite" target="_blank">
                <v-icon size="28" color="grey darken-1" class="mr-2">mdi-github</v-icon>
              </a>
              <a href="https://www.youtube.com/@iorisasaki1652" target="_blank">
                <v-icon size="28" color="grey darken-1" class="mr-2">mdi-youtube</v-icon>
              </a>
            </div>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- 研究サマリー -->
      <v-sheet class="pa-8 mb-8" color="grey lighten-4" rounded>
        <h3 class="text-h5 font-weight-bold">{{ summary?.meta.title }}</h3>
        <p class="body-1 mt-2">{{ summary?.meta.description }}</p>
      </v-sheet>

      <!-- プロジェクト一覧 -->
      <v-row dense>
        <v-col
          cols="12"
          md="6"
          v-for="project in projects"
          :key="project.meta.path ?? project.meta.title"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 8 : 2"
              class="transition-swing pa-4 mb-6"
              rounded
            >
              <v-card-title class="text-h6 font-weight-bold text-wrap">
                {{ project.meta.title }}
              </v-card-title>
              <v-img
                :src="`assets/${project.meta.image_name}.png`"
                class="bg-white"
              ></v-img>
              <v-card-text class="body-2">
                {{ project.meta.description }}
              </v-card-text>
              <v-divider class="my-4" />
              <v-list dense>
                <v-list-item
                  v-for="(ref, idx) in project.meta.refs"
                  :key="idx"
                  class="py-1"
                >
                  <v-list-item-title>
                    <v-list-item-title class="text-caption text-wrap">
                      {{ ref.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-caption">
                      DOI:
                      <a
                        :href="`https://doi.org/${ref.doi}`"
                        target="_blank"
                      >
                        {{ ref.doi }}
                      </a>
                    </v-list-item-subtitle>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 文字列の場合は t() でOK
const profileName = t('profile.name')
const profileTitle = t('profile.title')
const profileRole = t('profile.role')
const profileOrgs = t('profile.organizations')

const targetPath = ref(locale.value + '/featured/')

const { data: summary } = await useAsyncData(`summary-${locale.value}`, () => {
  return queryCollection('data')
    .where('stem', '=', `${targetPath.value}summary`)
    .first()
})

const { data: projects } = await useAsyncData(`data-${locale.value}`, () => {
  return queryCollection('data')
    .where('stem', 'LIKE', `${targetPath.value}proj-%`)
    .all()
})

</script>