<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <a href="https://www.ampumaurheiluliitto.fi/"
          ><img src="src/assets/logo.png" height="64px" alt="Logo" class="logo-img"
        /></a>
        <q-toolbar-title>
          <router-link to="/" class="flex items-center no-decoration">{{
            $t('app_title')
          }}</router-link>
        </q-toolbar-title>

        <q-btn-dropdown flat dense borderless :label="$t('menu')" class="lt-md">
          <q-list>
            <q-item v-for="item in menuItems" :key="item.label">
              <q-item-section>
                <q-btn stretch flat :label="item.label" :to="item.to" />
              </q-item-section>
            </q-item>
            <q-item class="lt-sm">
              <q-item-section>
                <LanguageSwitcher />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-btn stretch flat label="Login" to="/login" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          v-for="item in menuItems"
          :key="item.label"
          flat
          stretch
          :label="item.label"
          :to="item.to"
          class="gt-sm"
        />
        <q-space />
        <LanguageSwitcher customClass="gt-xs" />
        <q-btn stretch flat label="Login" to="/login" class="gt-sm" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

const { t } = useI18n()

const menuItems = computed(() => [
  { label: t('event', 2), to: '/events' },
  { label: t('competition', 2), to: '/competitions' },
  { label: t('statistics'), to: '/statistics' },
  { label: t('record', 2), to: '/records' },
  { label: t('athlete', 2), to: '/athletes' },
  { label: t('info'), to: '/info' },
])
</script>
