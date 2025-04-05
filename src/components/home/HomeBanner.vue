<template>
    <div class="main-banner">
        <swiper :modules="swiperModules" :slides-per-view="1" :loop="true" :autoplay="{
            delay: 5000,
            disableOnInteraction: false
        }" :pagination="{
            clickable: true,
            el: '.swiper-pagination'
        }" :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }">
            <swiper-slide v-for="slide in processedSlides" :key="slide.id">
                <div class="slide-item" :style="{ backgroundImage: `url(${slide.image})` }">
                    <div class="header-text">
                        <span class="category">{{ slide.location }}, <em>{{ slide.country }}</em></span>
                        <h2 v-html="slide.title"></h2>
                    </div>
                </div>
            </swiper-slide>

            <!-- 自定義分頁點 -->
            <div class="swiper-pagination"></div>

            <!-- 自定義導航按鈕 -->
            <div class="swiper-button-prev">
                <i class="fa fa-chevron-left"></i>
            </div>
            <div class="swiper-button-next">
                <i class="fa fa-chevron-right"></i>
            </div>
        </swiper>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import propertyService from '@/services/propertyService';

// 靜態導入圖片
import banner01 from '@/assets/images/banner-01.jpg';
import banner02 from '@/assets/images/banner-02.jpg';
import banner03 from '@/assets/images/banner-03.jpg';

// 建立圖片映射表
const imageMap = {
    '/assets/images/banner-01.jpg': banner01,
    '/assets/images/banner-02.jpg': banner02,
    '/assets/images/banner-03.jpg': banner03
};

// 設定 Swiper 模組
const swiperModules = [Autoplay, Pagination, Navigation];

// 取得輪播數據
const slides = ref([]);

// 處理過的幻燈片數據，修正圖片路徑
const processedSlides = computed(() => {
    return slides.value.map(slide => ({
        ...slide,
        image: imageMap[slide.image] || slide.image
    }));
});

onMounted(() => {
    try {
        // 從服務獲取數據
        slides.value = propertyService.getBannerSlides();
        console.log('輪播數據載入成功:', slides.value);
    } catch (error) {
        console.error('載入輪播數據時出錯:', error);
    }
});
</script>

<style lang="scss" scoped>
.main-banner {
    position: relative;
    width: 100%;
    height: 700px;
    overflow: hidden;

    :deep(.swiper) {
        width: 100%;
        height: 100%;
    }

    :deep(.swiper-slide) {
        width: 100%;
        height: 100%;
    }

    .slide-item {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;

        .header-text {
            position: absolute;
            top: 50%;
            left: 20%;
            transform: translateY(-50%);
            color: white;

            .category {
                background-color: #fff;
                color: #1e1e1e;
                font-size: 16px;
                font-weight: 500;
                text-transform: capitalize;
                padding: 6px 15px;
                display: inline-block;
                margin-bottom: 30px;

                em {
                    font-style: normal;
                    color: #f35525;
                }
            }

            h2 {
                font-size: 62px;
                font-weight: 700;
                text-transform: uppercase;
                color: #fff;
                line-height: 72px;
                max-width: 50%;
                margin-bottom: 0;
            }
        }
    }

    // 自定義分頁點樣式
    :deep(.swiper-pagination) {
        text-align: left;
        left: 20%;
        bottom: 60px;
        width: auto;

        .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background-color: #fff;
            opacity: 1;
            margin: 0 10px 0 0;
        }

        .swiper-pagination-bullet-active {
            background-color: #f35525;
        }
    }

    // 自定義導航箭頭樣式
    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
        width: 50px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.5);
        }

        &::after {
            content: none; // 移除默認的 Swiper 箭頭圖標
        }

        i {
            font-size: 24px;
        }
    }

    :deep(.swiper-button-prev) {
        left: 45px;
    }

    :deep(.swiper-button-next) {
        right: 45px;
    }
}

// 響應式調整
@media (max-width: 992px) {
    .main-banner {
        height: 600px;

        .slide-item {
            .header-text {
                left: 15%;

                h2 {
                    font-size: 48px;
                    line-height: 60px;
                    max-width: 70%;
                }
            }
        }

        :deep(.swiper-pagination) {
            left: 15%;
        }
    }
}

@media (max-width: 768px) {
    .main-banner {
        height: 500px;

        .slide-item {
            .header-text {
                left: 10%;

                h2 {
                    font-size: 36px;
                    line-height: 46px;
                    max-width: 80%;
                }
            }
        }

        :deep(.swiper-pagination) {
            left: 10%;
        }

        :deep(.swiper-button-prev) {
            left: 20px;
        }

        :deep(.swiper-button-next) {
            right: 20px;
        }
    }
}
</style>