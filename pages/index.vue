<template>
  <v-app>
    <v-container fluid>
      <!-- プロフィールセクション -->
      <v-sheet class="pa-8 mb-12" elevation="2" rounded>
        <v-row align="center">
          <v-col cols="15" md="2" class="text-center">
            <v-avatar size="130">
              <v-img
                src="/sasaki/assets/avator.jpg"
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
          :key="(project.meta.path ?? project.meta.title) as string"
        >
          <v-hover v-slot="{ isHovering }">
            <v-card
              :elevation="isHovering ? 8 : 2"
              class="transition-swing pa-4 mb-6"
              rounded
            >
              <v-card-title class="text-h6 font-weight-bold text-wrap">
                {{ project.meta.title }}
              </v-card-title>
              
              <!-- メディアカルーセル -->
              <ProjectMediaCarousel
                :media-items="project.meta.media"
              />
              
              <v-card-text class="body-2">
                <div 
                  :class="[
                    'description-container',
                    { 'is-expanded': expandedProjects[project.meta.path ?? project.meta.title] }
                  ]"
                >
                  <MarkdownRenderer :content="project.meta.description" />
                </div>
                <div
                  v-if="isMobile"
                  class="show-more-btn"
                  @click="toggleExpand(project.meta.path ?? project.meta.title)"
                >
                  {{ expandedProjects[project.meta.path ?? project.meta.title] ? t('common.showLess') : t('common.showMore') }}
                </div>
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
import { useDisplay } from 'vuetify'
import type { MediaItem } from '~/types/project'

const { t, locale } = useI18n()
const { smAndDown } = useDisplay()

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

// モバイル判定（600px未満）
const isMobile = computed(() => smAndDown.value)

// 展開状態を管理
const expandedProjects = ref<Record<string, boolean>>({})

const toggleExpand = (projectKey: string) => {
  expandedProjects.value[projectKey] = !expandedProjects.value[projectKey]
}
</script>

<style scoped>
.description-container {
  position: relative;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

/* 小さい画面サイズで5行に制限 (600px未満) */
@media (max-width: 599px) {
  .description-container:not(.is-expanded) {
    max-height: 7.5em; /* 1行あたり約1.5em × 5行 = 7.5em */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .description-container.is-expanded {
    max-height: none;
  }
}

/* 中サイズ以上では制限なし (600px以上) */
@media (min-width: 600px) {
  .description-container {
    max-height: none;
  }
}

/* シンプルなボタンデザイン */
.show-more-btn {
  margin-top: 8px;
  color: #1976d2;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: center;
  padding: 4px 0;
  user-select: none;
}

.show-more-btn:hover {
  text-decoration: underline;
}
</style>