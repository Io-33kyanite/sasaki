<template>
  <div class="overview-diagram" ref="diagramRef">
    <svg
      width="100%"
      viewBox="130 10 620 455"
      role="img"
      aria-labelledby="mt md"
      style="font-family: 'Noto Sans JP', sans-serif;"
    >
      <title id="mt">{{ t('diagram.title') }}</title>
      <desc id="md">{{ t('diagram.desc') }}</desc>

      <defs>
        <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#999" stroke-width="1"/>
        </pattern>
      </defs>

      <!-- Color zones -->
      <rect
        v-for="zone in zones"
        :key="zone.name"
        :class="['zone-fade', zone.delayClass, zoneStateClass(zone.name)]"
        :x="zone.x" :y="zone.y" :width="zone.w" :height="zone.h"
        rx="6" :fill="zone.fill"
      />

      <!-- Base diagram -->
      <g class="diagram-base">
        <!-- Local frame -->
        <g>
          <rect x="150" y="95" width="595" height="190" rx="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
          <rect x="163" y="107" width="18" height="28" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
          <circle cx="172" cy="130" r="1.2" fill="rgba(255,255,255,0.5)"/>
          <text x="190" y="127" font-size="11" font-style="italic" fill="rgba(255,255,255,0.5)">local</text>
        </g>

        <!-- Cloud frame -->
        <g>
          <rect x="150" y="295" width="595" height="115" rx="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
          <path d="M 163 312 Q 156 312 156 319 Q 149 320 150 327 Q 150 334 158 334 L 189 334 Q 197 334 197 327 Q 197 320 190 319 Q 189 310 180 310 Q 172 310 169 315 Q 166 312 163 312 Z"
                fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
          <text x="203" y="328" font-size="11" font-style="italic" fill="rgba(255,255,255,0.5)">cloud</text>
        </g>

        <!-- Actors -->
        <g>
          <ellipse cx="420" cy="40" rx="90" ry="22" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" stroke-width="1.2"/>
          <text x="420" y="37" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.actorTop1') }}</text>
          <text x="420" y="53" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.actorTop2') }}</text>
          <ellipse cx="420" cy="440" rx="60" ry="20" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" stroke-width="1.2"/>
          <text x="420" y="445" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.actorBottom') }}</text>
        </g>

        <!-- Inner boxes -->
        <g>
          <rect x="210" y="175" width="120" height="36" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          <text x="270" y="198" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.boxGuide') }}</text>

          <rect x="210" y="335" width="120" height="36" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          <text x="270" y="358" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.boxEdit') }}</text>

          <rect x="395" y="130" width="120" height="36" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          <text x="455" y="153" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.boxSensing') }}</text>

          <rect x="595" y="130" width="110" height="36" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          <text x="650" y="153" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.boxInterpret') }}</text>

          <!-- Cylinder 1 -->
          <g>
            <ellipse cx="455" cy="215" rx="28" ry="6.5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
            <path d="M 427 215 L 427 240 Q 427 246.5 455 246.5 Q 483 246.5 483 240 L 483 215" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
            <ellipse cx="455" cy="215" rx="28" ry="6.5" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          </g>

          <rect x="395" y="255" width="120" height="36" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          <text x="455" y="278" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.boxShare') }}</text>

          <!-- Cylinder 2 -->
          <g>
            <ellipse cx="595" cy="320" rx="28" ry="6.5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
            <path d="M 567 320 L 567 345 Q 567 351.5 595 351.5 Q 623 351.5 623 345 L 623 320" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
            <ellipse cx="595" cy="320" rx="28" ry="6.5" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          </g>

          <rect x="595" y="365" width="110" height="36" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          <text x="650" y="388" text-anchor="middle" font-size="12" fill="#e8eaf0">{{ t('diagram.boxAnalytics') }}</text>
        </g>

        <!-- Arrows -->
        <g fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.3">
          <path d="M 455 57 Q 475 95 455 130" marker-end="url(#ar)"/>
          <line x1="455" y1="166" x2="455" y2="208" marker-end="url(#ar)"/>
          <line x1="455" y1="247" x2="455" y2="253" marker-end="url(#ar)"/>
          <path d="M 515 277 Q 560 295 587 315" marker-end="url(#ar)"/>
          <line x1="595" y1="355" x2="622" y2="365" marker-end="url(#ar)"/>
          <path d="M 595 395 Q 500 425 478 435" marker-end="url(#ar)"/>
          <path d="M 365 432 Q 290 400 270 373" marker-end="url(#ar)"/>
          <line x1="270" y1="335" x2="270" y2="213" marker-end="url(#ar)"/>
          <path d="M 255 175 Q 230 95 355 47" marker-end="url(#ar)"/>
          <path d="M 483 210 Q 560 195 650 168" stroke-dasharray="5,4" marker-end="url(#ar)"/>
          <path d="M 650 130 Q 650 65 485 45" stroke-dasharray="5,4" marker-end="url(#ar)"/>
          <path d="M 623 318 Q 725 250 700 168" stroke-dasharray="5,4" marker-end="url(#ar)"/>
        </g>
      </g>

      <!-- Hover overlays -->
      <g>
        <rect
          v-for="zone in zones"
          :key="'overlay-' + zone.name"
          class="overlay"
          :x="zone.x" :y="zone.y" :width="zone.w" :height="zone.h"
          fill="transparent"
          @mouseenter="activeZone = zone.name"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave"
        />
      </g>
    </svg>

    <div
      v-if="activeZone"
      class="diagram-tooltip"
      :style="tooltipStyle"
    >
      {{ messages[activeZone!] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const activeZone = ref<string | null>(null)
const diagramRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)

const messages = computed<Record<string, string>>(() => ({
  guide:     t('diagram.zoneGuide'),
  record:    t('diagram.zoneRecord'),
  analytics: t('diagram.zoneAnalytics'),
}))

const zones = [
  { name: 'guide',     delayClass: 'z1', x: 165, y: 105, w: 185, h: 295, fill: '#d9e8d4' },
  { name: 'record',    delayClass: 'z2', x: 350, y: 105, w: 380, h: 170, fill: '#cfe0ec' },
  { name: 'analytics', delayClass: 'z3', x: 350, y: 275, w: 380, h: 125, fill: '#f3d6c4' },
]

function zoneStateClass(name: string) {
  if (!activeZone.value) return ''
  return activeZone.value === name ? 'hovered' : 'dimmed'
}

function onMouseMove(e: MouseEvent) {
  if (!diagramRef.value) return
  const rect = diagramRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function onMouseLeave() {
  activeZone.value = null
}

const tooltipStyle = computed(() => ({
  left: `${mouseX.value + 12}px`,
  top: `${mouseY.value - 32}px`,
}))
</script>

<style scoped>
.overview-diagram {
  width: 100%;
  position: relative;
}

.diagram-tooltip {
  position: absolute;
  pointer-events: none;
  background: rgba(33, 33, 33, 0.88);
  color: #fff;
  font-size: 13px;
  line-height: 1.4;
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 10;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: var(--final-opacity, 1); }
}

.diagram-base {
  opacity: 0;
  animation: fadeIn 1.1s ease-out 0.15s forwards;
  --final-opacity: 1;
}

.zone-fade {
  opacity: 0;
  --final-opacity: 0.55;
  transition: opacity 0.25s ease;
}
.zone-fade.z1 { animation: fadeIn 0.8s ease-out 1.25s forwards; }
.zone-fade.z2 { animation: fadeIn 0.8s ease-out 1.60s forwards; }
.zone-fade.z3 { animation: fadeIn 0.8s ease-out 1.95s forwards; }

.zone-fade.hovered { opacity: 0.85 !important; }
.zone-fade.dimmed  { opacity: 0.15 !important; }

.overlay {
  cursor: pointer;
}

@media (prefers-reduced-motion: reduce) {
  .diagram-base, .zone-fade {
    animation: none;
    opacity: var(--final-opacity);
  }
}
</style>
