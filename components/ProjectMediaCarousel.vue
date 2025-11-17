<template>
  <div>
    <!-- カルーセル本体 -->
    <v-carousel
      v-if="mediaItems && mediaItems.length > 0"
      :show-arrows="mediaItems.length > 1 ? 'hover' : false"
      height="300"
      :cycle="shouldCycle"
      hide-delimiter-background
      :delimiter-icon="mediaItems.length > 1 ? 'mdi-circle' : undefined"
      interval="5000"
      @mouseenter="pauseCycle"
      @mouseleave="resumeCycle"
      v-model="currentIndex"
    >
      <v-carousel-item
        v-for="(item, index) in mediaItems"
        :key="index"
        @click="openModal(index)"
        class="cursor-pointer"
      >
        <!-- 画像の場合 -->
        <v-img
          v-if="item.type === 'image'"
          :src="getImagePath(item.src)"
          :alt="item.alt || ''"
          class="bg-white"
          cover
        >
          <!-- 拡大アイコンのオーバーレイ -->
          <div class="expand-overlay">
            <v-icon size="48" color="white">mdi-magnify-plus-outline</v-icon>
          </div>
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular indeterminate color="primary" />
            </div>
          </template>
        </v-img>

        <!-- YouTube動画の場合 -->
        <div v-else-if="item.type === 'youtube'" class="fill-height youtube-preview">
          <img
            :src="`https://img.youtube.com/vi/${cleanYoutubeId(item.src)}/maxresdefault.jpg`"
            :alt="item.alt || 'YouTube thumbnail'"
            class="youtube-thumbnail"
            @error="(e) => (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${cleanYoutubeId(item.src)}/hqdefault.jpg`"
          />
          <div class="play-overlay">
            <v-icon size="64" color="red">mdi-youtube</v-icon>
          </div>
        </div>

        <!-- キャプション表示 -->
        <div v-if="item.caption" class="carousel-caption">
          {{ item.caption }}
        </div>
      </v-carousel-item>
    </v-carousel>

    <!-- メディアが無い場合の代替表示 -->
    <div v-else class="no-media d-flex align-center justify-center" style="height: 300px; background: #f5f5f5;">
      <v-icon size="64" color="grey lighten-1">mdi-image-off</v-icon>
    </div>

    <!-- モーダルダイアログ -->
    <v-dialog v-model="dialog" max-width="1200px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span v-if="currentMedia?.caption">{{ currentMedia.caption }}</span>
          <v-spacer />
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text class="pa-0">
          <!-- 画像の拡大表示 -->
          <v-img
            v-if="currentMedia?.type === 'image'"
            :src="getImagePath(currentMedia.src)"
            :alt="currentMedia.alt || ''"
            max-height="80vh"
            contain
          />

          <!-- YouTube動画の再生 -->
          <div v-else-if="currentMedia?.type === 'youtube'" class="video-container">
            <iframe
              :src="`https://www.youtube.com/embed/${cleanYoutubeId(currentMedia.src)}?autoplay=1`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="youtube-iframe-modal"
            ></iframe>
          </div>
        </v-card-text>

        <!-- モーダル内ナビゲーション（複数メディアの場合） -->
        <v-card-actions v-if="mediaItems && mediaItems.length > 1" class="justify-space-between">
          <v-btn
            icon
            :disabled="modalIndex === 0"
            @click="previousMedia"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="text-caption">
            {{ modalIndex + 1 }} / {{ mediaItems.length }}
          </span>
          <v-btn
            icon
            :disabled="modalIndex === mediaItems.length - 1"
            @click="nextMedia"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { MediaItem } from '~/types/project'

interface Props {
  mediaItems?: MediaItem[]
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

const currentIndex = ref(0)
const shouldCycle = ref(props.mediaItems && props.mediaItems.length > 1)
const dialog = ref(false)
const modalIndex = ref(0)

const currentMedia = computed(() => {
  if (!props.mediaItems || modalIndex.value >= props.mediaItems.length) return null
  return props.mediaItems[modalIndex.value]
})

// YouTube動画IDをクリーンアップ（余計なパラメータを削除）
const cleanYoutubeId = (src: string): string => {
  // ?や&以降のパラメータを削除
  return src.split('?')[0].split('&')[0]
}

const pauseCycle = () => {
  shouldCycle.value = false
}

const resumeCycle = () => {
  if (props.mediaItems && props.mediaItems.length > 1) {
    shouldCycle.value = true
  }
}

const openModal = (index: number) => {
  modalIndex.value = index
  dialog.value = true
  shouldCycle.value = false // モーダル表示中は自動再生を停止
}

const previousMedia = () => {
  if (modalIndex.value > 0) {
    modalIndex.value--
  }
}

const nextMedia = () => {
  if (props.mediaItems && modalIndex.value < props.mediaItems.length - 1) {
    modalIndex.value++
  }
}

const getImagePath = (src: string) => {
  // 絶対URLの場合はそのまま返す
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  // 相対パスの場合は baseURL を考慮して /sasaki/assets/ 配下として解決
  const baseURL = config.app.baseURL
  return `${baseURL}assets/${src}`
}

// モーダルを閉じたら自動再生を再開
watch(dialog, (newValue) => {
  if (!newValue && props.mediaItems && props.mediaItems.length > 1) {
    shouldCycle.value = true
  }
})
</script>

<style scoped>
/* カルーセルの余白を削減 */
:deep(.v-carousel) {
  margin-bottom: 0;
}

:deep(.v-carousel__controls) {
  background: transparent;
  padding: 4px 0;
}

.cursor-pointer {
  cursor: pointer;
}

.expand-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-carousel-item:hover .expand-overlay {
  opacity: 1;
}

.youtube-preview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}

.youtube-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.youtube-preview:hover .play-overlay {
  transform: translate(-50%, -50%) scale(1.1);
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 16px;
  font-size: 14px;
}

.no-media {
  border-radius: 4px;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  background: #000;
}

.youtube-iframe-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
