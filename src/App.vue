<template>

  <div id="app">
    <div id="js-preloader" class="js-preloader">
      <div class="preloader-inner">
        <span class="dot"></span>
        <div class="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <SubHeader />

    <Header></Header>

    <RouterView />

    <Footer></Footer>
  </div>
</template>

<script setup>

import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/layout/Header.vue';
import SubHeader from './components/layout/SubHeader.vue';
import Footer from './components/layout/Footer.vue';

onMounted(() => {
  setTimeout(() => {
    const preloader = document.getElementById('js-preloader')
    if (preloader) {
      preloader.classList.add('loaded')
    }
  }, 1000)
})


onMounted(() => {
  setTimeout(() => {
    const preloader = document.getElementById('js-preloader')
    if (preloader) {
      preloader.classList.add('loaded')
    }
  }, 1000)
})

</script>

<style scoped></style>
