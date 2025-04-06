<template>
  <div class="page-heading header-text">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <span class="breadcrumb"><router-link to="/">Home</router-link> / Single Property</span>
          <h3>Single Property</h3>
        </div>
      </div>
    </div>
  </div>

  <div v-if="property" class="single-property section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="main-image">
            <img :src="getImageUrl(property.image)" alt="Property Image">
          </div>
          <div class="main-content">
            <span class="category">{{ property.category }}</span>
            <h4>{{ property.title }}</h4>
            <p>{{ property.description }}</p>
          </div> 
          <div class="accordion" id="accordionExample">
            <div class="accordion-item" v-for="(item, index) in accordionItems" :key="index">
              <h2 class="accordion-header" :id="`heading${index}`">
                <button 
                  class="accordion-button" 
                  :class="{ collapsed: activeAccordion !== index }"
                  type="button" 
                  @click="toggleAccordion(index)"
                  :aria-expanded="activeAccordion === index" 
                  :aria-controls="`collapse${index}`"
                >
                  {{ item.title }}
                </button>
              </h2>
              <div 
                :id="`collapse${index}`" 
                class="accordion-collapse collapse" 
                :class="{ show: activeAccordion === index }"
                :aria-labelledby="`heading${index}`"
              >
                <div class="accordion-body" v-html="item.content">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="info-table">
            <ul>
              <li v-for="(feature, index) in features" :key="index">
                <img :src="getImageUrl(feature.icon)" alt="" style="max-width: 52px;">
                <h4>{{ feature.value }}<br><span>{{ feature.label }}</span></h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section best-deal">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="section-heading">
            <h6>| Best Deal</h6>
            <h2>Find Your Best Deal Right Now!</h2>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="tabs-content">
            <div class="row">
              <div class="nav-wrapper">
                <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item" role="presentation" v-for="(deal, index) in deals" :key="deal.id">
                    <button 
                      class="nav-link" 
                      :class="{ active: activeTab === deal.id }"
                      :id="`${deal.id}-tab`" 
                      type="button" 
                      @click="activeTab = deal.id"
                    >
                      {{ deal.label }}
                    </button>
                  </li>
                </ul>
              </div>              
              <div class="tab-content" id="myTabContent">
                <div 
                  class="tab-pane fade" 
                  :class="{ 'show active': activeTab === deal.id }"
                  :id="deal.id" 
                  role="tabpanel" 
                  :aria-labelledby="`${deal.id}-tab`"
                  v-for="deal in deals" 
                  :key="`content-${deal.id}`"
                >
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="info-table">
                        <ul>
                          <li v-for="(spec, i) in deal.specs" :key="i">
                            {{ spec.label }} <span>{{ spec.value }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <img :src="getImageUrl(deal.image)" alt="">
                    </div>
                    <div class="col-lg-3">
                      <h4>{{ deal.title }}</h4>
                      <p>{{ deal.description }}</p>
                      <div class="icon-button">
                        <a href="#" @click.prevent="scheduleVisit"><i class="fa fa-calendar"></i> Schedule a visit</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import propertyService from '@/services/propertyService';

// 引入圖片資源
import property01 from '@/assets/images/property-01.jpg';
import property02 from '@/assets/images/property-02.jpg';
import property03 from '@/assets/images/property-03.jpg';
import property04 from '@/assets/images/property-04.jpg';
import property05 from '@/assets/images/property-05.jpg';
import property06 from '@/assets/images/property-06.jpg';
import singleProperty from '@/assets/images/single-property.jpg';
import deal01 from '@/assets/images/deal-01.jpg';
import deal02 from '@/assets/images/deal-02.jpg';
import deal03 from '@/assets/images/deal-03.jpg';
import infoIcon01 from '@/assets/images/info-icon-01.png';
import infoIcon02 from '@/assets/images/info-icon-02.png';
import infoIcon03 from '@/assets/images/info-icon-03.png';
import infoIcon04 from '@/assets/images/info-icon-04.png';

// 圖片映射表
const imageMap = {
  '/assets/images/property-01.jpg': property01,
  '/assets/images/property-02.jpg': property02,
  '/assets/images/property-03.jpg': property03,
  '/assets/images/property-04.jpg': property04,
  '/assets/images/property-05.jpg': property05,
  '/assets/images/property-06.jpg': property06,
  '/assets/images/single-property.jpg': singleProperty,
  '/assets/images/deal-01.jpg': deal01,
  '/assets/images/deal-02.jpg': deal02,
  '/assets/images/deal-03.jpg': deal03,
  '/assets/images/info-icon-01.png': infoIcon01,
  '/assets/images/info-icon-02.png': infoIcon02,
  '/assets/images/info-icon-03.png': infoIcon03,
  '/assets/images/info-icon-04.png': infoIcon04,
};

// 獲取圖片URL的函數
const getImageUrl = (path) => {
  return imageMap[path] || path;
};

const route = useRoute();
const router = useRouter();

// 房產數據
const property = ref(null);

// 交易選項卡
const deals = ref([]);
const activeTab = ref('');

// 手風琴
const activeAccordion = ref(0);
const accordionItems = [
  {
    title: 'Best useful links ?',
    content: 'Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed doesn\'t eiusmod tempor kinfolk tonx seitan crucifix 3 wolf moon bicycle rights keffiyeh snackwave wolf same vice, chillwave vexillologist incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'How does this work ?',
    content: 'Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed doesn\'t eiusmod tempor kinfolk tonx seitan crucifix 3 wolf moon bicycle rights keffiyeh snackwave wolf same vice, chillwave vexillologist incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'Why is Villa the best ?',
    content: 'Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed doesn\'t eiusmod tempor kinfolk tonx seitan crucifix 3 wolf moon bicycle rights keffiyeh snackwave wolf same vice, chillwave vexillologist incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

// 特色資訊
const features = ref([
  {
    icon: '/assets/images/info-icon-01.png',
    value: '450 m²',
    label: 'Total Flat Space'
  },
  {
    icon: '/assets/images/info-icon-02.png',
    value: 'Contract',
    label: 'Contract Ready'
  },
  {
    icon: '/assets/images/info-icon-03.png',
    value: 'Payment',
    label: 'Payment Process'
  },
  {
    icon: '/assets/images/info-icon-04.png',
    value: 'Safety',
    label: '24/7 Under Control'
  }
]);

// 切換手風琴
const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? null : index;
};

// 預約看房
const scheduleVisit = () => {
  alert('Visit scheduled! Our representative will contact you soon.');
};

onMounted(async () => {
  try {
    // 獲取路由參數中的房產ID
    const propertyId = parseInt(route.params.id);
    
    if (propertyId) {
      // 獲取特定房產數據
      property.value = propertyService.getPropertyById(propertyId);
      
      if (!property.value) {
        // 如果找不到房產，可以重定向到404頁面或房產列表
        console.error('Property not found');
        // router.push('/properties');
      }
    } else {
      // 如果沒有指定ID，可以顯示默認房產
      property.value = propertyService.getFeaturedProperties(1)[0];
    }
    
    // 獲取交易數據
    deals.value = propertyService.getDeals();
    // 設置默認活動標籤
    if (deals.value.length > 0) {
      activeTab.value = deals.value[0].id;
    }
    
    console.log('Property loaded:', property.value);
  } catch (error) {
    console.error('Error loading property details:', error);
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

.single-property {
  padding-top: 120px;
  padding-bottom: 120px;
  
  .main-image {
    
    img {
      width: 100%;
      height: auto;
      max-height: 450px;
      object-fit: cover;
      overflow: hidden;
      border-radius: 10px;
    }
  }
  
  .main-content {
    margin-bottom: 40px;
    
    span.category {
      font-size: 14px;
      background-color: #f35525;
      color: #fff;
      padding: 5px 15px;
      display: inline-block;
      border-radius: 20px;
      margin-bottom: 20px;
      font-weight: 500;
    }
    
    h4 {
      font-size: 30px;
      margin-bottom: 25px;
    }
    
    p {
      margin-bottom: 25px;
      line-height: 28px;
    }
  }
  
  .accordion {
    .accordion-item {
      border: 1px solid #dee2e6;
      border-radius: 5px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .accordion-button {
      font-size: 17px;
      font-weight: 600;
      color: #1e1e1e;
      background-color: #fff;
      padding: 15px 20px;
      box-shadow: none;
      
      &:not(.collapsed) {
        color: #f35525;
        background-color: #fff;
      }
      
      &:focus {
        box-shadow: none;
        border-color: #dee2e6;
      }
    }
    
    .accordion-body {
      padding: 20px;
      background-color: #fff;
      
      code {
        color: #f35525;
        background-color: #f7f8f9;
        padding: 2px 5px;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
  
  .info-table {
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 30px;
    
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      
      li {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid #ddd;
        
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        img {
          margin-right: 20px;
        }
        
        h4 {
          font-size: 20px;
          color: #1e1e1e;
          
          span {
            font-size: 15px;
            color: #aaa;
            font-weight: 400;
          }
        }
      }
    }
  }
}

.best-deal {
  padding-bottom: 120px;
  background-color: #f7f7f7;
  
  .section-heading {
    margin-bottom: 60px;
    
    h6 {
      font-size: 15px;
      color: #f35525;
      font-weight: 700;
      text-transform: uppercase;
    }
    
    h2 {
      font-size: 30px;
      font-weight: 700;
      color: #1e1e1e;
      line-height: 40px;
    }
  }
  
  .tabs-content {
    position: relative;
    
    .nav-wrapper {
      text-align: center;
      
      .nav-tabs {
        border: none;
        display: inline-block;
        
        .nav-item {
          display: inline-block;
          margin: 0px 5px;
        }
        
        .nav-link {
          border: none;
          border-radius: 20px;
          font-size: 14px;
          background-color: #fff;
          transition: all .3s;
          
          &.active {
            background-color: #f35525;
            color: #fff;
          }
          
          &:hover {
            background-color: #f35525;
            color: #fff;
          }
        }
      }
    }
    
    .tab-content {
      .tab-pane {
        transition: all .5s;
        
        img {
          width: 100%;
          border-radius: 10px;
          display: block;
        }
        
        h4 {
          font-size: 22px;
          font-weight: 700;
          color: #1e1e1e;
          margin-bottom: 20px;
        }
        
        p {
          margin-bottom: 30px;
        }
        
        .info-table {
          background-color: #fff;
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 45px;
          
          ul {
            margin: 0;
            padding: 0;
            list-style: none;
            
            li {
              display: block;
              font-size: 14px;
              color: #4a4a4a;
              margin-bottom: 12px;
              padding-bottom: 12px;
              border-bottom: 1px solid #eee;
              
              &:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
              }
              
              span {
                float: right;
                font-weight: 600;
                color: #1e1e1e;
              }
            }
          }
        }
        
        .icon-button {
          a {
            display: inline-block;
            text-decoration: none;
            background-color: #1e1e1e;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            border-radius: 5px;
            transition: all .3s;
            
            i {
              margin-right: 10px;
            }
            
            &:hover {
              color: #f35525;
            }
          }
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
  
  .single-property {
    padding-top: 100px;
    padding-bottom: 100px;
    
    .main-content h4 {
      font-size: 26px;
    }
    
    .info-table {
      margin-top: 45px;
    }
  }
  
  .best-deal {
    padding-top: 100px;
    padding-bottom: 100px;
    
    .section-heading {
      margin-bottom: 40px;
    }
    
    .tabs-content {
      .tab-content {
        .tab-pane {
          .info-table, img {
            margin-bottom: 30px;
          }
        }
      }
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
  
  .single-property {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  
  .best-deal {
    padding-top: 80px;
    padding-bottom: 80px;
    
    .section-heading {
      h2 {
        font-size: 26px;
        line-height: 36px;
      }
    }
    
    .tabs-content {
      .nav-wrapper {
        .nav-tabs {
          .nav-item {
            display: block;
            margin: 0px 0px 10px 0px;
            
            &:last-child {
              margin-bottom: 0px;
            }
          }
          
          .nav-link {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>