<template>
  <header class="header-area header-sticky">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            <!-- Logo Start -->
            <router-link to="/" class="logo">
              <h1>Villa</h1>
            </router-link>
            <!-- Logo End -->

            <!-- Menu Start -->
            <ul class="nav" :class="{ 'active': menuOpen }">
              <li><router-link :to="{ name: 'home' }" :class="{ active: isRouteActive('home') }">Home</router-link></li>
              <li><router-link :to="{ name: 'properties' }"
                  :class="{ active: isRouteActive('properties') }">Properties</router-link></li>
              <li><router-link :to="{ name: 'property-details' }"
                  :class="{ active: isRouteActive('property-details') }">Property Details</router-link></li>
              <li><router-link :to="{ name: 'contact' }" :class="{ active: isRouteActive('contact') }">Contact
                  Us</router-link></li>
              <!-- 只在桌面版顯示 -->
              <li class="desktop-only"><router-link to="#"><i class="fa fa-calendar"></i> Schedule a visit</router-link>
              </li>
            </ul>
            <a class='menu-trigger' :class="{ 'active': menuOpen }" @click="toggleMenu">
              <span>Menu</span>
            </a>

            <!-- Menu End -->
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const isRouteActive = (routeName) => {
  return route.name === routeName
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// 監聽路由變化，關閉選單
watch(() => route.path, () => {
  menuOpen.value = false
})

// 監聽視窗大小變化
const handleResize = () => {
  if (window.innerWidth > 992 && menuOpen.value) {
    menuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
// 移動端樣式
@media (max-width: 992px) {
  .main-nav .nav {
    display: none;
  }

  .main-nav .nav.active {
    display: block;
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    z-index: 999;
    margin-left: 0;
    padding: 0;
    border-radius: 0 0 24px 24px;
  }

  .main-nav .nav.active li {
    display: block;
    width: 100%;
    text-align: center;
    border-top: 1px solid #ddd;
    background-color: #f1f0fe;
    height: 50px;
  }

  .main-nav .nav.active li a {
    display: block;
    height: 50px;
    line-height: 50px;
    padding: 0;
    font-weight: 400;
  }

  // 在移動端隱藏桌面專用元素
  .desktop-only {
    display: none !important;
  }
}

// 漢堡選單按鈕特定樣式
.menu-trigger.active span {
  background-color: transparent;
}

.menu-trigger.active span:before {
  transform: translateY(6px) translateX(1px) rotate(45deg);
  background-color: #1e1e1e;
}

.menu-trigger.active span:after {
  transform: translateY(-6px) translateX(1px) rotate(-45deg);
  background-color: #1e1e1e;
}
</style>