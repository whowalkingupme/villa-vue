<template>
    <div class="properties section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 offset-lg-4">
            <div class="section-heading text-center">
              <h6>| Properties</h6>
              <h2>We Provide The Best Property You Like</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6" v-for="property in properties" :key="property.id">
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
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import propertyService from '@/services/propertyService';
  
  // 引入資源處理
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
  
  // 獲取房產數據
  const properties = ref([]);
  
  onMounted(async () => {
    try {
      // 獲取精選房產（限制顯示6個）
      properties.value = propertyService.getFeaturedProperties(6);
      console.log('Properties loaded:', properties.value);
    } catch (error) {
      console.error('Error loading properties:', error);
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .properties {
    padding-bottom: 120px;
    
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
  }
  
  @media (max-width: 992px) {
    .properties {
      padding-top: 100px;
      padding-bottom: 100px;
      
      .section-heading {
        margin-bottom: 40px;
      }
    }
  }
  
  @media (max-width: 767px) {
    .properties {
      padding-top: 80px;
      padding-bottom: 80px;
      
      .section-heading {
        margin-bottom: 30px;
        
        h2 {
          font-size: 26px;
          line-height: 36px;
        }
      }
    }
  }
  </style>