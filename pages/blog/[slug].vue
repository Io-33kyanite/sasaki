<template>
  <div class="article-page">
    <v-container class="pa-0" fluid>
      <v-row no-gutters>
        <!-- メイン記事コンテンツ -->
        <v-col cols="12" lg="9" class="main-article">
          <div class="article-container">
            <!-- 記事ヘッダー -->
            <div class="article-header pa-6 pb-4">
              <div class="d-flex align-center mb-4">
                <div class="text-body-2 text-medium-emphasis">
                  <v-icon size="16" class="me-1">mdi-calendar-outline</v-icon>
                  {{ data.meta.created_at }} (edited: {{ data.meta.updated_at }})
                </div>
              </div>

              <!-- 記事タイトル -->
              <h1 class="article-title text-h4 font-weight-bold mb-4">
                {{ data?.title }}
              </h1>

              <!-- タグ -->
              <div class="d-flex flex-wrap gap-2 mb-4" v-if="data.meta.tags.length">
                <v-chip
                  v-for="tag in data.meta.tags"
                  :key="tag"
                  size="small"
                  variant="outlined"
                  color="primary"
                  class="tag-chip mx-1"
                >
                  <v-icon start size="15">mdi-tag</v-icon>
                  {{ tag }}
                </v-chip>
              </div>
            </div>

            <v-divider />

            <!-- 記事本文 -->
            <div class="article-content pa-6">
              <ContentRenderer v-if="data" :value="data.body" />
            </div>

            <v-divider class="my-4" />

          </div>
        </v-col>

        <!-- サイドバー（目次・関連記事） -->
        <v-col cols="12" lg="3" class="d-none d-lg-block">
          <div class="sidebar-container">
            <!-- 目次 -->
            <v-card flat border class="sidebar-card mb-4" v-if="tocItems.length">
              <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
                <v-icon class="me-2" color="primary">mdi-format-list-bulleted</v-icon>
                Table of Contents
              </v-card-title>
              <v-card-text class="pt-0">
                <div class="toc-list">
                  <div
                    v-for="item in tocItems"
                    :key="item.id"
                    class="toc-item py-1"
                    :class="`toc-level-${item.level}`"
                  >
                    <a
                      :href="`#${item.id}`"
                      class="text-body-2 text-decoration-none toc-link"
                    >
                      {{ item.text }}
                    </a>
                  </div>
                </div>
              </v-card-text>
            </v-card>

          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'

const { locale } = useI18n()
const route = useRoute()
const slug = route.params.slug

const { data } = await useAsyncData(`pages-${locale.value}`, () => {
  return queryCollection('content')
    .path(`/${locale.value}/blog/${slug}`)
    .first()
})

const tocItems = computed(() => {
  if (!data.value) {
    console.log('No data available')
    return []
  }
  
  if (data.value.body && data.value.body.toc) {
    console.log('Using built-in TOC:', data.value.body.toc)
    return data.value.body.toc.links || []
  }
  
  // 手動でTOCを生成する場合
  const headings: Array<{ id: string; text: string; level: number }> = []
  
  // 複数のパターンでデータ構造を確認
  const bodyData = data.value.body
  
  if (!bodyData) {
    console.log('No body data found')
    return []
  }
  
  console.log('Body data structure:', bodyData)
  
  if (Array.isArray(bodyData)) {
    console.log('Trying direct array approach')
    extractHeadingsFromNodes(bodyData, headings)
  }
  
  console.log('Final headings:', headings)
  
  return headings.filter(h => h.level >= 2 && h.level <= 4)
})

/**
 * ノードから見出しを抽出する関数
 */
const extractHeadingsFromNodes = (nodes: any[], headings: any[]): void => {
  if (!Array.isArray(nodes)) return
  
  nodes.forEach(node => {
    console.log('Processing node:', node)
    
    // 見出し要素をチェック
    if (node.type === 'element' && node.tag && /^h[1-6]$/.test(node.tag)) {
      const level = parseInt(node.tag.slice(1))
      const text = extractTextContent(node)
      const id = generateHeadingId(text)
      
      console.log('Found heading:', { level, text, id })
      
      headings.push({ id, text, level })
    }
    
    // 子要素を再帰的に処理
    if (node.children && Array.isArray(node.children)) {
      extractHeadingsFromNodes(node.children, headings)
    }
  })
}

/**
 * テキストコンテンツを抽出
 */
const extractTextContent = (node: any): string => {
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  
  if (node.children && Array.isArray(node.children)) {
    return node.children
      .map((child: any) => extractTextContent(child))
      .join('')
      .trim()
  }
  
  return node.value || node.text || ''
}

/**
 * 生のMarkdownテキストから見出しを抽出（フォールバック）
 */
const extractHeadingsFromRawText = (rawText: string, headings: any[]): void => {
  if (!rawText) return
  
  const lines = rawText.split('\n')
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const id = generateHeadingId(text)
      
      headings.push({ id, text, level })
    }
  })
}

/**
 * 見出しIDを生成
 */
const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
    || 'heading-' + Math.random().toString(36).substr(2, 9)
}

/**
 * Twitterでシェアする
 */
const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(data.value?.title || '')
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

/**
 * リンクをコピーする
 */
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    // トースト通知などでコピー完了を知らせる
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}
</script>

<style scoped>
.article-page {
  background-color: rgb(var(--v-theme-surface));
  min-height: 100vh;
}

.main-article {
  background-color: rgb(var(--v-theme-background));
}

.article-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.article-title {
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
}

.article-content {
  line-height: 1.8;
  font-size: 16px;
}

.article-content :deep(h1 a),
.article-content :deep(h2 a),
.article-content :deep(h3 a),
.article-content :deep(h4 a),
.article-content :deep(h5 a),
.article-content :deep(h6 a) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  scroll-margin-top: 80px; /* 固定ヘッダーがある場合の調整 */
  color: inherit !important;        /* 親要素の色を継承 */
  text-decoration: none !important; /* 下線を削除 */
  border: none !important;          /* 境界線を削除 */
}

.article-content :deep(h1) { font-size: 2rem; }
.article-content :deep(h2) { 
  font-size: 1.75rem;
  border-bottom: 2px solid rgba(var(--v-theme-primary), 0.2);
  padding-bottom: 0.5rem;
}
.article-content :deep(h3) { 
  font-size: 1.5rem;
  color: rgb(var(--v-theme-primary));
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(code) {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.article-content :deep(pre) {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.sidebar-container {
  padding: 20px;
  position: sticky;
  top: 20px;
}

.sidebar-card {
  border-radius: 8px !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.toc-list {
  max-height: 400px;
  overflow-y: auto;
}

.toc-item {
  padding-left: 0;
  transition: all 0.2s ease;
}

.toc-level-2 {
  padding-left: 0px;
  border-left: 2px solid rgba(var(--v-theme-primary), 0.3);
  padding-left: 12px;
}

.toc-level-3 {
  padding-left: 24px;
  border-left: 2px solid rgba(var(--v-theme-secondary), 0.3);
}

.toc-level-4 {
  padding-left: 36px;
  font-size: 0.85rem;
}

.toc-link {
  color: rgb(var(--v-theme-on-surface));
  transition: color 0.2s ease;
}

.toc-link:hover {
  color: rgb(var(--v-theme-primary));
}

.tag-chip {
  font-size: 0.75rem !important;
  height: 24px !important;
}

.article-footer {
  background-color: rgba(var(--v-theme-surface), 0.5);
}

@media (max-width: 1280px) {
  .article-container {
    margin: 0 16px;
  }
}
</style>