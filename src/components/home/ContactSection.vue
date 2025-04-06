<template>
    <div class="contact section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 offset-lg-4">
            <div class="section-heading text-center">
              <h6>| Contact Us</h6>
              <h2>Get In Touch With Our Agents</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="contact-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <div id="map">
              <iframe 
                :src="contactInfo.mapLocation" 
                width="100%" 
                height="500px" 
                frameborder="0" 
                style="border:0; border-radius: 10px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);" 
                allowfullscreen=""
              ></iframe>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="item phone">
                  <img src="@/assets/images/phone-icon.png" alt="Phone Icon" style="max-width: 52px;">
                  <h6>{{ contactInfo.phone }}<br><span>Phone Number</span></h6>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="item email">
                  <img src="@/assets/images/email-icon.png" alt="Email Icon" style="max-width: 52px;">
                  <h6>{{ contactInfo.email }}<br><span>Business Email</span></h6>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <form id="contact-form" @submit.prevent="submitForm">
              <div class="row">
                <div class="col-lg-12">
                  <fieldset>
                    <label for="name">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      placeholder="Your Name..." 
                      autocomplete="on" 
                      required 
                      v-model="formData.name"
                    >
                  </fieldset>
                </div>
                <div class="col-lg-12">
                  <fieldset>
                    <label for="email">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      pattern="[^ @]*@[^ @]*" 
                      placeholder="Your E-mail..." 
                      required 
                      v-model="formData.email"
                    >
                  </fieldset>
                </div>
                <div class="col-lg-12">
                  <fieldset>
                    <label for="subject">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      id="subject" 
                      placeholder="Subject..." 
                      autocomplete="on" 
                      v-model="formData.subject"
                    >
                  </fieldset>
                </div>
                <div class="col-lg-12">
                  <fieldset>
                    <label for="message">Message</label>
                    <textarea 
                      name="message" 
                      id="message" 
                      placeholder="Your Message"
                      v-model="formData.message"
                    ></textarea>
                  </fieldset>
                </div>
                <div class="col-lg-12">
                  <fieldset>
                    <button 
                      type="submit" 
                      id="form-submit" 
                      class="orange-button"
                      :disabled="isSubmitting"
                    >
                      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
            <div class="alert alert-success mt-3" v-if="formSuccess">
              {{ successMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import propertyService from '@/services/propertyService';
  
  // 聯絡信息
  const contactInfo = ref({
    address: '',
    phone: '',
    email: '',
    mapLocation: ''
  });
  
  // 表單數據
  const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // 表單狀態
  const isSubmitting = ref(false);
  const formSuccess = ref(false);
  const successMessage = ref('');
  
  // 提交表單
  const submitForm = async () => {
    isSubmitting.value = true;
    
    try {
      const response = await propertyService.submitContactForm(formData.value);
      
      if (response.success) {
        formSuccess.value = true;
        successMessage.value = response.message;
        
        // 重置表單
        formData.value = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        
        // 5秒後隱藏成功消息
        setTimeout(() => {
          formSuccess.value = false;
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  onMounted(() => {
    // 獲取聯絡信息
    contactInfo.value = propertyService.getContactInfo();
  });
  </script>
  
  <style lang="scss" scoped>
  .contact {
    padding-top: 120px;
    
    .section-heading {
      margin-bottom: 40px;
      
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
  
  .contact-content {
    padding-bottom: 120px;
    
    .item {
      border-radius: 10px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
      padding: 25px 30px;
      background-color: #fff;
      display: flex;
      align-items: center;
      
      img {
        margin-right: 20px;
      }
      
      h6 {
        font-size: 20px;
        font-weight: 700;
        color: #1e1e1e;
        margin-bottom: 0px;
        
        span {
          font-size: 15px;
          color: #aaa;
          font-weight: 400;
        }
      }
    }
    
    form {
      border-radius: 10px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
      padding: 35px;
      background-color: #fff;
      
      fieldset {
        margin-bottom: 20px;
        
        label {
          font-size: 14px;
          color: #1e1e1e;
          font-weight: 600;
          display: block;
          margin-bottom: 10px;
        }
        
        input, textarea {
          width: 100%;
          border: 1px solid #eee;
          border-radius: 5px;
          padding: 15px;
          font-size: 14px;
          color: #4a4a4a;
          transition: all .3s;
          
          &:focus {
            border-color: #f35525;
            outline: none;
          }
        }
        
        textarea {
          min-height: 160px;
          resize: none;
        }
        
        button.orange-button {
          font-size: 15px;
          font-weight: 600;
          background-color: #f35525;
          color: #fff;
          text-transform: capitalize;
          padding: 12px 25px;
          border-radius: 5px;
          border: none;
          transition: all .3s;
          width: 100%;
          cursor: pointer;
          
          &:hover {
            background-color: #1e1e1e;
          }
          
          &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  
  @media (max-width: 992px) {
    .contact {
      padding-top: 100px;
    }
    
    .contact-content {
      padding-bottom: 100px;
      
      .item {
        margin-bottom: 30px;
      }
    }
  }
  
  @media (max-width: 767px) {
    .contact {
      padding-top: 80px;
      
      .section-heading {
        h2 {
          font-size: 26px;
          line-height: 36px;
        }
      }
    }
    
    .contact-content {
      padding-bottom: 80px;
      
      form {
        margin-top: 30px;
      }
    }
  }
  </style>