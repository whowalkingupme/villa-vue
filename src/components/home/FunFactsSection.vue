<template>
    <div class="fun-facts">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="wrapper">
              <div class="row">
                <div class="col-lg-4" :class="{ 'pb-4': index !== stats.length - 1 }"  v-for="(stat, index) in stats" :key="index">
                  <div class="counter-box">
                    <div class="dot"></div>
                    <h2 class="timer count-title count-number">{{ stat.count }}</h2>
                    <p class="count-text" v-html="stat.title"></p>
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
  import propertyService from '@/services/propertyService';
  
  // 獲取統計數據
  const stats = ref([]);
  
  onMounted(() => {
    // 從服務獲取數據
    stats.value = propertyService.getStats();
  });
  </script>
  
  <style lang="scss" scoped>
  .fun-facts {
    padding: 30px 0px;
    background-color: #222;
    position: relative;
    
    .wrapper {
      background-color: #333;
      border-radius: 10px;
      padding: 40px 30px;
      position: relative;
    }
  
    .counter-box {
      position: relative;
      background-color: rgba(255, 245, 245, 0.05);
      border-radius: 12px;
      padding: 30px 20px;
      text-align: left;
      margin: 0 10px;
      
      .dot {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 50px;
        background-color: #f35525;
        border-radius: 50%;
        transform: translate(20%, -20%);
      }
      
      h2 {
        color: #fff;
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      
      p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 15px;
        line-height: 24px;
        margin-bottom: 0px;
      }
    }
  }
  
  @media (max-width: 992px) {
    .fun-facts {
      padding: 60px 0px;
      
      .wrapper {
        padding: 30px 20px;
      }
      
      .counter-box {
        margin-bottom: 30px;
        
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
  
  @media (max-width: 767px) {
    .fun-facts {
      padding: 50px 0px;
      
      .wrapper {
        padding: 25px 15px;
      }
      
      .counter-box {
        padding: 25px 15px;
        
        h2 {
          font-size: 32px;
        }
      }
    }
  }
  </style>