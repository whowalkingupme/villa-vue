<template>
  <div class="section best-deal">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="section-heading">
            <h6>| BEST DEAL</h6>
            <h2>Find Your Best Deal<br>Right Now!</h2>
          </div>
        </div>
        <div class="col-lg-6 text-end">
          <div class="tabs-nav">
            <button v-for="(deal, index) in deals" :key="deal.id"
              :class="['tab-button', { active: activeTab === deal.id }]" @click="activeTab = deal.id">
              {{ deal.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="row mt-5" v-for="deal in filteredDeal" :key="`content-${deal.id}`">
        <div class="col-lg-3">
          <div class="info-table">
            <div class="info-item" v-for="(spec, i) in deal.specs" :key="i">
              <div class="label">{{ spec.label }}</div>
              <div class="value">{{ spec.value }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="property-image">
            <img :src="getImageUrl(deal.image)" alt="">
          </div>
        </div>
        <div class="col-lg-3">
          <div class="property-info">
            <h4>{{ deal.title }}</h4>
            <p>{{ deal.description }}</p>
            <div class="schedule-btn">
              <router-link to="/property-details" class="btn">
                <i class="fa fa-calendar"></i> Schedule a visit
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import propertyService from '@/services/propertyService';

// 引入資源處理
import deal01 from '@/assets/images/deal-01.jpg';
import deal02 from '@/assets/images/deal-02.jpg';
import deal03 from '@/assets/images/deal-03.jpg';

// 圖片映射表
const imageMap = {
  '/assets/images/deal-01.jpg': deal01,
  '/assets/images/deal-02.jpg': deal02,
  '/assets/images/deal-03.jpg': deal03,
};

// 獲取圖片URL的函數
const getImageUrl = (path) => {
  return imageMap[path] || path;
};

// 獲取交易資料
const deals = ref([]);
const activeTab = ref('');

// 過濾出當前選中的交易資料
const filteredDeal = computed(() => {
  return deals.value.filter(deal => deal.id === activeTab.value);
});

onMounted(() => {
  // 從服務獲取資料
  deals.value = propertyService.getDeals();

  // 默認激活第一個選項卡
  if (deals.value.length > 0) {
    activeTab.value = deals.value[0].id;
  }
});
</script>

<style lang="scss" scoped>
.best-deal {
  padding: 80px 0;
  background-color: #fff;

  .section-heading {
    h6 {
      font-size: 16px;
      color: #f35525;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 15px;
    }

    h2 {
      font-size: 44px;
      font-weight: 700;
      color: #1e1e1e;
      line-height: 1.2;
    }
  }

  .tabs-nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    .tab-button {
      padding: 12px 25px;
      border: none;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 600;
      background-color: #222;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background-color: #f35525;
      }

      &:hover {
        background-color: #f35525;
      }
    }
  }

  .info-table {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

    .info-item {
      margin-bottom: 20px;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .label {
        color: #888;
        font-size: 15px;
        margin-bottom: 5px;
      }

      .value {
        color: #222;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }

  .property-image {
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .property-info {
    h4 {
      font-size: 22px;
      font-weight: 700;
      color: #1e1e1e;
      margin-bottom: 20px;
    }

    p {
      font-size: 15px;
      line-height: 28px;
      color: #666;
      margin-bottom: 30px;
    }

    .schedule-btn {
      .btn {
        display: inline-flex;
        align-items: center;
        background-color: #f35525;
        color: #fff;
        padding: 12px 25px;
        border-radius: 30px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;

        i {
          margin-right: 8px;
        }

        &:hover {
          background-color: #222;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .best-deal {
    padding: 60px 0;

    .section-heading {
      margin-bottom: 30px;

      h2 {
        font-size: 36px;
      }
    }

    .tabs-nav {
      justify-content: flex-start;
      margin-bottom: 30px;
    }

    .property-image {
      margin-bottom: 30px;
    }

    .info-table {
      margin-bottom: 30px;
    }
  }
}

@media (max-width: 767px) {
  .best-deal {
    padding: 40px 0;

    .section-heading {
      h2 {
        font-size: 28px;
      }
    }

    .tabs-nav {
      flex-wrap: wrap;

      .tab-button {
        width: 100%;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>