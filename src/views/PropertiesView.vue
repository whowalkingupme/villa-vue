<template>
  <div class="page-heading header-text">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <span class="breadcrumb"><router-link to="/">Home</router-link> / Properties</span>
          <h3>Properties</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="section properties">
    <div class="container">
      <ul class="properties-filter">
        <li v-for="category in categories" :key="category.value">
          <a href="#!" :class="{ is_active: activeFilter === category.value }"
            @click.prevent="filterProperties(category.value)">
            {{ category.label }}
          </a>
        </li>
      </ul>
      <div class="row properties-box">
        <div v-for="property in filteredProperties" :key="property.id"
          class="col-lg-4 col-md-6 align-self-center mb-30 properties-items"
          :class="getPropertyClasses(property.category)">
          <div class="item">
            <router-link :to="`/property-details/${property.id}`">
              <img :src="getImageUrl(property.image)" alt="Property Image">
            </router-link>
            <span class="category">{{ property.category }}</span>
            <h6>${{ formatPrice(property.price) }}</h6>
            <h4>
              <router-link :to="`/property-details/${property.id}`">{{ property.title }}</router-link>
            </h4>
            <ul>
              <li>Bedrooms: <span>{{ property.bedrooms }}</span></li>
              <li>Bathrooms: <span>{{ property.bathrooms }}</span></li>
              <li>Area: <span>{{ property.area }}m²</span></li>
              <li>Floor: <span>{{ property.floor }}</span></li>
              <li>Parking: <span>{{ property.parking }}</span></li>
            </ul>
            <div class="main-button">
              <router-link :to="`/property-details/${property.id}`">Schedule a visit</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <ul class="pagination">
            <li v-for="page in totalPages" :key="page">
              <a href="#" :class="{ is_active: currentPage === page }" @click.prevent="goToPage(page)">
                {{ page }}
              </a>
            </li>
            <li v-if="currentPage < totalPages">
              <a href="#" @click.prevent="goToPage(currentPage + 1)">>></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import propertyService from '@/services/propertyService';

// 引入圖片資源
import property01 from '@/assets/images/property-01.jpg';
import property02 from '@/assets/images/property-02.jpg';
import property03 from '@/assets/images/property-03.jpg';
import property04 from '@/assets/images/property-04.jpg';
import property05 from '@/assets/images/property-05.jpg';
import property06 from '@/assets/images/property-06.jpg';

// 圖片映射表
const imageMap = {
  '/assets/images/property-01.jpg': property01,
  '/assets/images/property-02.jpg': property02,
  '/assets/images/property-03.jpg': property03,
  '/assets/images/property-04.jpg': property04,
  '/assets/images/property-05.jpg': property05,
  '/assets/images/property-06.jpg': property06,
};

// 獲取圖片URL的函數
const getImageUrl = (path) => {
  return imageMap[path] || path;
};

// 格式化價格的函數
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 類別映射
const categoryClassMap = {
  'Apartment': 'adv',
  'Luxury Villa': 'str',
  'Penthouse': 'rac',
  'Modern Condo': 'adv rac'
};

// 獲取類別 CSS 類別
const getPropertyClasses = (category) => {
  return categoryClassMap[category] || '';
};

// 篩選類別選項
const categories = [
  { label: 'Show All', value: 'all' },
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Villa House', value: 'Luxury Villa' },
  { label: 'Penthouse', value: 'Penthouse' }
];

// 房產數據
const allProperties = ref([]);
const activeFilter = ref('all');
const currentPage = ref(1);
const propertiesPerPage = ref(6);

// 篩選後的房產
const filteredProperties = computed(() => {
  let result = allProperties.value;

  // 應用類別篩選
  if (activeFilter.value !== 'all') {
    result = result.filter(property => property.category === activeFilter.value);
  }

  // 應用分頁
  const startIndex = (currentPage.value - 1) * propertiesPerPage.value;
  const endIndex = startIndex + propertiesPerPage.value;

  return result.slice(startIndex, endIndex);
});

// 計算總頁數
const totalPages = computed(() => {
  let filteredCount = allProperties.value.length;

  if (activeFilter.value !== 'all') {
    filteredCount = allProperties.value.filter(
      property => property.category === activeFilter.value
    ).length;
  }

  return Math.ceil(filteredCount / propertiesPerPage.value);
});

// 篩選房產
const filterProperties = (category) => {
  activeFilter.value = category;
  currentPage.value = 1; // 重置到第一頁
};

// 跳轉到指定頁面
const goToPage = (page) => {
  currentPage.value = page;
  window.scrollTo(0, 0); // 滾動到頁面頂部
};

onMounted(async () => {
  try {
    // 獲取所有房產
    allProperties.value = propertyService.getAllProperties();
    console.log('Properties loaded:', allProperties.value);
  } catch (error) {
    console.error('Error loading properties:', error);
  }
});
</script>

<style lang="scss" scoped>
.page-heading {
  background-image: url('@/assets/images/page-heading-bg.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 100px 0px;
  text-align: center;

  .breadcrumb {
    font-size: 15px;
    color: #1e1e1e;
    font-weight: 500;
    margin-bottom: 15px;
    display: block;

    a {
      color: #1e1e1e;
      text-decoration: none;

      &:hover {
        color: #f35525;
      }
    }
  }

  h3 {
    font-size: 40px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0px;
  }
}

.properties {
  padding-top: 120px;
  padding-bottom: 120px;

  .properties-filter {
    text-align: center;
    margin-bottom: 50px;
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      margin: 0px 10px;

      a {
        display: inline-block;
        text-decoration: none;
        font-size: 15px;
        font-weight: 500;
        transition: all .3s;

        &:hover,
        &.is_active {
          color: #ffffff;
          border-color: #f35525;
        }
      }
    }
  }

  .item {
    background-color: #fff;
    border-radius: 10px;
    padding-bottom: 30px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    position: relative;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
      height: auto;
      display: block;
    }

    span.category {
      position: absolute;
      top: 20px;
      left: 20px;
      background-color: #f35525;
      color: #fff;
      font-size: 14px;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: 500;
    }

    h6 {
      font-size: 18px;
      font-weight: 700;
      color: #f35525;
      margin-top: 25px;
      margin-left: 30px;
    }

    h4 {
      font-size: 20px;
      margin-top: 10px;
      margin-left: 30px;
      margin-right: 30px;

      a {
        color: #1e1e1e;
        text-decoration: none;
        transition: all 0.3s;

        &:hover {
          color: #f35525;
        }
      }
    }

    ul {
      list-style: none;
      margin: 20px 30px 30px 30px;
      padding: 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding-top: 20px;
      padding-bottom: 20px;

      li {
        color: #4a4a4a;
        font-size: 14px;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0px;
        }

        span {
          float: right;
          font-weight: 600;
          color: #1e1e1e;
        }
      }
    }

    .main-button {
      text-align: center;

      a {
        display: inline-block;
        background-color: #1e1e1e;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        border-radius: 30px;
        text-decoration: none;
        transition: all 0.3s;

        &:hover {
          background-color: #f35525;
        }
      }
    }
  }

  .pagination {
    margin-top: 60px;
    text-align: center;
    width: 100%;
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;

    li {
      display: inline-block;
      margin: 0px 5px;

      a {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #efefef;
        color: #1e1e1e;
        font-size: 15px;
        font-weight: 600;
        border-radius: 50%;
        text-decoration: none;
        transition: all .3s;

        &:hover,
        &.is_active {
          background-color: #f35525;
          color: #fff;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .page-heading {
    padding: 80px 0px;

    h3 {
      font-size: 36px;
    }
  }

  .properties {
    padding-top: 100px;
    padding-bottom: 100px;

    .properties-filter {
      margin-bottom: 40px;
    }
  }
}

@media (max-width: 767px) {
  .page-heading {
    padding: 60px 0px;

    h3 {
      font-size: 30px;
    }
  }

  .properties {
    padding-top: 80px;
    padding-bottom: 80px;

    .properties-filter {
      margin-bottom: 30px;

      li {
        display: block;
        margin: 8px 0px;
      }
    }
  }
}
</style>