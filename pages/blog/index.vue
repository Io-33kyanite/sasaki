<template>
  <v-container fluid class="pa-4">
    <v-row>
      <!-- サイドバー（タグランキング） -->
      <v-col cols="12" md="3" class="d-none d-md-block">
        <v-card flat border class="sidebar-card">
          <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
            <v-icon class="me-2" color="primary">mdi-tag-multiple</v-icon>
            Tags
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="tag-ranking">
              <div
                v-for="(tagData, index) in tagRanking"
                :key="tagData.tag"
                class="tag-ranking-item d-flex align-center justify-space-between py-2"
                :class="{ 'border-bottom': index < tagRanking.length - 1 }"
              >
                <div class="d-flex align-center">
                  <span class="ranking-number me-3 text-caption font-weight-bold">
                    {{ index + 1 }}
                  </span>
                  <v-chip
                    size="small"
                    variant="outlined"
                    color="primary"
                    class="tag-ranking-chip"
                  >
                    {{ tagData.tag }}
                  </v-chip>
                </div>
                <span class="text-caption text-medium-emphasis">
                  {{ tagData.count }} posts
                </span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- 月別記事数 -->
        <v-card flat border class="sidebar-card mt-4">
          <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
            <v-icon class="me-2" color="secondary">mdi-calendar-month</v-icon>
            Monthly
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="monthly-stats">
              <div
                v-for="(monthData, index) in monthlyStats"
                :key="monthData.month"
                class="monthly-stats-item d-flex align-center justify-space-between py-2"
                :class="{ 'border-bottom': index < monthlyStats.length - 1 }"
              >
                <div class="d-flex align-center">
                  <v-icon size="16" class="me-2" color="secondary">mdi-calendar</v-icon>
                  <span class="text-body-2">{{ monthData.month }}</span>
                </div>
                <span class="text-caption text-medium-emphasis">
                  {{ monthData.count }} posts
                </span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- メインコンテンツ -->
      <v-col cols="12" md="9">
        <div class="main-content">
          <div
            v-for="page in pages"
            :key="page.path"
            class="mb-3"
          >
            <NuxtLink :to="getLocalizedPath(page.path)" class="text-decoration-none">
              <v-hover v-slot="{ isHovering }">
                <v-card
                  :elevation="isHovering ? 3 : 1"
                  class="transition-swing article-card mx-4"
                  flat
                  border
                >
                  <!-- メタ情報ヘッダー -->
                  <v-card-text class="pb-2">
                    <div class="d-flex align-center text-caption text-medium-emphasis">
                      <v-icon size="16" class="me-1">mdi-calendar-outline</v-icon>
                      <span>{{ page.meta.created_at }}</span>
                    </div>
                  </v-card-text>
                  
                  <!-- 記事タイトルと内容 -->
                  <v-card-text class="pt-0">
                    <h3 class="text-h6 font-weight-bold mb-3 article-title">
                      {{ page.title }}
                    </h3>
                    
                    <!-- 記事の概要/抜粋 -->
                    <p class="text-body-2 text-medium-emphasis mb-3 article-excerpt">
                      {{ getExcerpt(page) }}
                    </p>

                    <!-- タグ -->
                    <div class="d-flex flex-wrap gap-2 mb-3">
                      <v-chip
                        v-for="tag in page.meta.tags || []"
                        :key="tag"
                        size="small"
                        variant="outlined"
                        color="primary"
                        class="tag-chip"
                      >
                        {{ tag }}
                      </v-chip>
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </NuxtLink>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
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
 * タグランキングを計算する
 */
const tagRanking = computed(() => {
  if (!pages.value) return []
  
  const tagCount: { [key: string]: number } = {}
  
  // 各記事のタグをカウント
  pages.value.forEach(page => {
    const tags = page.meta?.tags || []
    tags.forEach((tag: string) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  
  // カウント順にソートして上位10個を返す
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

/**
 * 月別記事数を計算する
 */
const monthlyStats = computed(() => {
  if (!pages.value) return []
  
  const monthCount: { [key: string]: number } = {}
  
  // 各記事の作成日または更新日から月を取得してカウント
  pages.value.forEach(page => {
    const dateString = page.meta?.created_at
    if (dateString) {
      try {
        const date = new Date(dateString)
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        monthCount[yearMonth] = (monthCount[yearMonth] || 0) + 1
      } catch (error) {
        console.warn('Error:', dateString)
      }
    }
  })
  
  // 年月順にソートして返す（新しい月から）
  return Object.entries(monthCount)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => {
      // 年月文字列を比較用に変換
      const aDate = a.month.replace('年', '-').replace('月', '')
      const bDate = b.month.replace('年', '-').replace('月', '')
      return bDate.localeCompare(aDate)
    })
    .slice(0, 12) // 直近12ヶ月まで表示
})

/**
 * ローカライズされたパスを取得する関数
 */
const getLocalizedPath = (path: string): string => {
  if (locale.value === 'en') {
    return path.replace(/^\/en\//, '/')
  }
  return path
}

/**
 * 記事の抜粋を取得する関数
 */
const getExcerpt = (page: ContentCollectionItem): string => {
  // contentから最初の段落やdescriptionを取得
  if (page.description) {
    return page.description
  }
  // bodyから最初の150文字を抽出（HTMLタグを除去）
  if (page.body) {
    const text = page.body.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')
    return text.length > 150 ? text.substring(0, 150) + '...' : text
  }
  return 'Preview Errors'
}
</script>

<style scoped>
.sidebar-card {
  border-radius: 8px !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  position: sticky;
  top: 20px;
}

.tag-ranking {
  max-height: 400px;
  overflow-y: auto;
}

.monthly-stats {
  max-height: 300px;
  overflow-y: auto;
}

.tag-ranking-item,
.monthly-stats-item {
  transition: background-color 0.2s ease;
}

.tag-ranking-item:hover,
.monthly-stats-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
  border-radius: 4px;
}

.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.ranking-number {
  min-width: 20px;
  text-align: center;
  color: rgb(var(--v-theme-primary));
}

.tag-ranking-chip {
  font-size: 0.7rem !important;
  height: 20px !important;
}

.main-content {
  width: 100%;
}

.article-card {
  border-radius: 8px !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  transition: all 0.2s ease-in-out;
}

.article-card:hover {
  border-color: rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-1px);
}

.article-title {
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
}

.article-title:hover {
  color: rgb(var(--v-theme-primary));
}

.article-excerpt {
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tag-chip {
  font-size: 0.75rem !important;
  height: 24px !important;
}

.gap-2 {
  gap: 8px;
}
</style>