<template>
  <div>
    <!-- 主橫幅 -->
    <HomeBanner />
    
    <!-- 特色部分 -->
    <FeaturedSection />
    
    <!-- 影片部分 -->
    <VideoSection />
    
    <!-- 統計數字部分 -->
    <FunFactsSection />
    
    <!-- 最佳交易部分 -->
    <BestDealSection />
    
    <!-- 屬性部分 -->
    <PropertiesSection />
    
    <!-- 聯絡部分 -->
    <ContactSection />
  </div>
</template>

<script setup>
import HomeBanner from '@/components/home/HomeBanner.vue'
import FeaturedSection from '@/components/home/FeaturedSection.vue'
import VideoSection from '@/components/home/VideoSection.vue'
import FunFactsSection from '@/components/home/FunFactsSection.vue'
import BestDealSection from '@/components/home/BestDealSection.vue'
import PropertiesSection from '@/components/home/PropertiesSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'

</script>

<style lang="scss" scoped></style>