<template>
  <v-footer class="footer">
    <div class="footer-inner">
      <div class="footer-main">
        <div>© {{ year }} {{ $t('profile.name') }}</div>
        <div class="footer-affiliation">{{ $t('profile.organizations') }}</div>
      </div>

      <a
        v-if="locale === 'ja'"
        :href="teamsUrl"
        target="_blank"
        rel="noopener"
        class="footer-hidden-link"
      >
        {{ $t('footer.labStudents') }}
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const year = new Date().getFullYear()
const teamsUrl = 'https://akitacitm.sharepoint.com/:u:/r/teams/ST_Lab2023/SitePages/%E3%83%86%E3%82%B9%E3%83%88.aspx?csf=1&web=1&e=k7Cyuk'
</script>

<style scoped>
.footer {
  display: block;
  background-color: #fafafa;
  border-top: 1px solid #eee;
  padding: 16px 24px;
  font-size: 0.85rem;
  color: #666;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-affiliation {
  font-size: 0.8rem;
  color: #888;
}
.footer-hidden-link {
  font-size: 0.75rem;
  color: #bbb;
  text-decoration: none;
}
.footer-hidden-link:hover {
  color: #666;
  text-decoration: underline;
}
</style>
