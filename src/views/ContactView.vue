<template>
  <div class="page-heading header-text">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <span class="breadcrumb"><router-link to="/">Home</router-link> / Contact Us</span>
          <h3>Contact Us</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="contact-page section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="section-heading">
            <h6>| Contact Us</h6>
            <h2>Get In Touch With Our Agents</h2>
          </div>
          <p>When you really need to download free CSS templates, please remember our website TemplateMo. Also, tell
            your friends about our website. Thank you for visiting. There is a variety of Bootstrap HTML CSS templates
            on our website. If you need more information, please contact us.</p>
          <div class="row">
            <div class="col-lg-12">
              <div class="item phone">
                <img :src="getImageUrl('/assets/images/phone-icon.png')" alt="Phone Icon" style="max-width: 52px;">
                <h6>{{ contactInfo.phone }}<br><span>Phone Number</span></h6>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="item email">
                <img :src="getImageUrl('/assets/images/email-icon.png')" alt="Email Icon" style="max-width: 52px;">
                <h6>{{ contactInfo.email }}<br><span>Business Email</span></h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <form id="contact-form" @submit.prevent="submitForm">
            <div class="row">
              <div class="col-lg-12">
                <fieldset>
                  <label for="name">Full Name</label>
                  <input type="text" name="name" id="name" placeholder="Your Name..." autocomplete="on" required
                    v-model="formData.name">
                </fieldset>
              </div>
              <div class="col-lg-12">
                <fieldset>
                  <label for="email">Email Address</label>
                  <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..."
                    required v-model="formData.email">
                </fieldset>
              </div>
              <div class="col-lg-12">
                <fieldset>
                  <label for="subject">Subject</label>
                  <input type="text" name="subject" id="subject" placeholder="Subject..." autocomplete="on"
                    v-model="formData.subject">
                </fieldset>
              </div>
              <div class="col-lg-12">
                <fieldset>
                  <label for="message">Message</label>
                  <textarea name="message" id="message" placeholder="Your Message"
                    v-model="formData.message"></textarea>
                </fieldset>
              </div>
              <div class="col-lg-12">
                <fieldset>
                  <button type="submit" id="form-submit" class="orange-button" :disabled="isSubmitting">
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
        <div class="col-lg-12 mt-5">
          <div id="map">
            <iframe :src="contactInfo.mapLocation" width="100%" height="500px" frameborder="0"
              style="border:0; border-radius: 10px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);"
              allowfullscreen=""></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 團隊成員部分 -->
  <div class="team section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <div class="section-heading text-center">
            <h6>| Our Team</h6>
            <h2>Meet Our Professional Real Estate Agents</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-6" v-for="member in teamMembers" :key="member.id">
          <div class="team-member">
            <div class="member-image">
              <img :src="getImageUrl(member.image)" alt="Team Member">
            </div>
            <div class="member-info">
              <h4>{{ member.name }}</h4>
              <span>{{ member.position }}</span>
              <div class="contact-info">
                <p><i class="fa fa-phone"></i>{{ member.phone }}</p>
                <p><i class="fa fa-envelope"></i>{{ member.email }}</p>
              </div>
              <div class="social-links">
                <a :href="member.socialLinks.facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a :href="member.socialLinks.twitter" target="_blank"><i class="fab fa-twitter"></i></a>
                <a :href="member.socialLinks.linkedin" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                <a :href="member.socialLinks.instagram" target="_blank"><i class="fab fa-instagram"></i></a>
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

// 引入圖片資源
import phoneIcon from '@/assets/images/phone-icon.png';
import emailIcon from '@/assets/images/email-icon.png';
import team01 from '@/assets/images/team-01.jpg';
import team02 from '@/assets/images/team-02.jpg';
import team03 from '@/assets/images/team-03.jpg';
import team04 from '@/assets/images/team-04.jpg';

// 圖片映射表
const imageMap = {
  '/assets/images/phone-icon.png': phoneIcon,
  '/assets/images/email-icon.png': emailIcon,
  '/assets/images/team-01.jpg': team01,
  '/assets/images/team-02.jpg': team02,
  '/assets/images/team-03.jpg': team03,
  '/assets/images/team-04.jpg': team04
};

// 獲取圖片URL的函數
const getImageUrl = (path) => {
  return imageMap[path] || path;
};

// 聯絡信息
const contactInfo = ref({
  address: '',
  phone: '',
  email: '',
  mapLocation: ''
});

// 團隊成員
const teamMembers = ref([]);

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

  // 獲取團隊成員
  teamMembers.value = propertyService.getTeamMembers();

  console.log('Contact info loaded:', contactInfo.value);
  console.log('Team members loaded:', teamMembers.value);
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

.contact-page {
  padding-top: 120px;
  padding-bottom: 120px;

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
      color: #1e1e1e;
      line-height: 40px;
    }
  }

  p {
    margin-bottom: 30px;
    line-height: 28px;
  }

  .item {
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    padding: 25px 30px;
    background-color: #fff;
    margin-bottom: 30px;
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

      input,
      textarea {
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

.team {
  padding-top: 0;
  padding-bottom: 120px;

  .section-heading {
    margin-bottom: 50px;

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

  .team-member {
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    overflow: hidden;

    .member-image {
      img {
        width: 100%;
        display: block;
      }
    }

    .member-info {
      background-color: #fff;
      padding: 30px;

      h4 {
        font-size: 20px;
        font-weight: 700;
        color: #1e1e1e;
        margin-bottom: 5px;
      }

      span {
        font-size: 15px;
        color: #f35525;
        display: block;
        margin-bottom: 20px;
      }

      .contact-info {
        border-top: 1px solid #eee;
        padding-top: 20px;
        margin-bottom: 20px;

        p {
          margin-bottom: 10px;
          font-size: 14px;

          i {
            margin-right: 10px;
            color: #f35525;
          }
        }
      }

      .social-links {
        display: flex;
        justify-content: space-between;

        a {
          display: inline-block;
          width: 36px;
          height: 36px;
          background-color: #f7f7f7;
          color: #4a4a4a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .3s;

          &:hover {
            background-color: #f35525;
            color: #fff;
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

  .contact-page {
    padding-top: 100px;
    padding-bottom: 100px;

    form {
      margin-top: 30px;
    }

    #map {
      margin-top: 30px;
    }
  }

  .team {
    padding-bottom: 100px;
  }
}

@media (max-width: 767px) {
  .page-heading {
    padding: 60px 0px;

    h3 {
      font-size: 30px;
    }
  }

  .contact-page {
    padding-top: 80px;
    padding-bottom: 80px;

    .section-heading {
      h2 {
        font-size: 26px;
        line-height: 36px;
      }
    }
  }

  .team {
    padding-bottom: 80px;

    .section-heading {
      h2 {
        font-size: 26px;
        line-height: 36px;
      }
    }
  }
}
</style>