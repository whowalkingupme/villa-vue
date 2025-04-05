<template>
    <div class="video section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 offset-lg-4">
            <div class="section-heading text-center">
              <h6>| Video View</h6>
              <h2>Get Closer View & Different Feeling</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="video-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <div class="video-frame">
              <img src="@/assets/images/video-frame.jpg" alt="">
              <a href="https://youtube.com" target="_blank">
                <i class="fa fa-play"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // 不需要特別的數據或方法
  </script>
  
  <style lang="scss" scoped>
  .video {
    padding-top: 110px;
    padding-bottom: 30px;
    background-color: #fff;
  
    .section-heading {
      margin-bottom: 30px;
  
      h6 {
        font-size: 15px;
        color: #f35525;
        font-weight: 700;
        text-transform: uppercase;
      }
  
      h2 {
        font-size: 30px;
        font-weight: 700;
        color: #ffffff;
        line-height: 40px;
      }
    }
  }
  
  .video-content {
    background-color: #fff;
    padding-bottom: 110px;
  
    .video-frame {
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  
      img {
        width: 100%;
        height: auto;
        display: block;
      }
  
      a {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 90px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f35525;
        border-radius: 50%;
        color: #fff;
        font-size: 20px;
        text-decoration: none;
        transition: all 0.3s;
  
        &:hover {
          background-color: #fff;
          color: #f35525;
        }
      }
    }
  }
  
  @media (max-width: 992px) {
    .video {
      padding-top: 80px;
      padding-bottom: 20px;
    }
  
    .video-content {
      padding-bottom: 80px;
    }
  }
  
  @media (max-width: 767px) {
    .video {
      padding-top: 60px;
  
      .section-heading h2 {
        font-size: 26px;
        line-height: 36px;
      }
    }
  
    .video-content {
      padding-bottom: 60px;
    }
  }
  </style>