// src/services/propertyService.js

// 房產數據
const properties = [
    {
      id: 1,
      title: '18 New Street Miami, OR 97219',
      category: 'Luxury Villa',
      price: 2264000,
      image: '/assets/images/property-01.jpg',
      bedrooms: 8,
      bathrooms: 8,
      area: 545,
      floor: 3,
      parking: '6 spots',
      description: '這是一個豪華別墅，位於邁阿密的優質地段。寬敞的客廳和餐廳，美麗的花園和游泳池，為家庭提供了完美的放鬆空間。',
      features: ['中央空調', '游泳池', '花園', '健身房', '安保系統', '影音室'],
      location: {
        address: '18 New Street',
        city: 'Miami',
        state: 'Oregon',
        zip: '97219',
        latitude: 25.761681,
        longitude: -80.191788
      }
    },
    {
      id: 2,
      title: '54 Mid Street Florida, OR 27001',
      category: 'Luxury Villa',
      price: 1180000,
      image: '/assets/images/property-02.jpg',
      bedrooms: 6,
      bathrooms: 5,
      area: 450,
      floor: 3,
      parking: '8 spots',
      description: '這是一個位於佛羅里達的精美別墅，四周環繞著自然風景。寬敞的主臥室配有豪華套房浴室，設有私人陽台，可欣賞壯麗的日落。',
      features: ['智能家居', '無邊泳池', '酒窖', '桑拿房', '雙層車庫', '戶外廚房'],
      location: {
        address: '54 Mid Street',
        city: 'Orlando',
        state: 'Florida',
        zip: '27001',
        latitude: 28.538336,
        longitude: -81.379234
      }
    },
    {
      id: 3,
      title: '26 Old Street Miami, OR 38540',
      category: 'Luxury Villa',
      price: 1460000,
      image: '/assets/images/property-03.jpg',
      bedrooms: 5,
      bathrooms: 4,
      area: 225,
      floor: 3,
      parking: '10 spots',
      description: '這是邁阿密老城區的一處豪華住宅，保留了歷史特色同時融入現代設計。高天花板和大窗戶讓整個家充滿自然光。',
      features: ['私人電梯', '頂層露台', '保姆套房', '酒吧區', '電影院', '智能安全系統'],
      location: {
        address: '26 Old Street',
        city: 'Miami',
        state: 'Oregon',
        zip: '38540',
        latitude: 25.775084,
        longitude: -80.194702
      }
    },
    {
      id: 4,
      title: '12 New Street Miami, OR 12650',
      category: 'Apartment',
      price: 584500,
      image: '/assets/images/property-04.jpg',
      bedrooms: 4,
      bathrooms: 3,
      area: 125,
      floor: 25,
      parking: '2 cars',
      description: '這是一間位於高樓層的現代公寓，擁有令人驚嘆的城市景觀。開放式廚房和客廳完美融合，創造出寬敞的娛樂空間。',
      features: ['24小時門衛', '健身中心', '社區游泳池', '屋頂花園', '會議室', '兒童遊樂區'],
      location: {
        address: '12 New Street',
        city: 'Miami',
        state: 'Oregon',
        zip: '12650',
        latitude: 25.762825,
        longitude: -80.193642
      }
    },
    {
      id: 5,
      title: '34 Beach Street Miami, OR 42680',
      category: 'Penthouse',
      price: 925600,
      image: '/assets/images/property-05.jpg',
      bedrooms: 4,
      bathrooms: 4,
      area: 180,
      floor: 38,
      parking: '2 cars',
      description: '這是一間豪華頂層公寓，擁有 360 度全景海景。寬敞的露台是舉行私人派對的完美場所，設有戶外廚房和休息區。',
      features: ['私人電梯入口', '全景視野', '私人無邊泳池', '私人健身房', '智能家居系統', '專屬管家服務'],
      location: {
        address: '34 Beach Street',
        city: 'Miami',
        state: 'Oregon',
        zip: '42680',
        latitude: 25.792740,
        longitude: -80.139659
      }
    },
    {
      id: 6,
      title: '22 New Street Portland, OR 16540',
      category: 'Modern Condo',
      price: 450000,
      image: '/assets/images/property-06.jpg',
      bedrooms: 3,
      bathrooms: 2,
      area: 165,
      floor: 26,
      parking: '3 cars',
      description: '這是一間位於波特蘭市中心的現代公寓，步行即可到達眾多餐廳、商店和公園。內部設計時尚，採用高端飾面和設備。',
      features: ['陽光露台', '寵物友好', '共享屋頂花園', '自行車存放處', '共享工作空間', '客用套房'],
      location: {
        address: '22 New Street',
        city: 'Portland',
        state: 'Oregon',
        zip: '16540',
        latitude: 45.523064,
        longitude: -122.676483
      }
    },
    {
      id: 7,
      title: '14 Mid Street Miami, OR 36450',
      category: 'Luxury Villa',
      price: 980000,
      image: '/assets/images/property-03.jpg',
      bedrooms: 8,
      bathrooms: 8,
      area: 550,
      floor: 3,
      parking: '12 spots',
      description: '這是一棟位於邁阿密的豪華別墅，完美結合了古典和現代設計元素。高聳的天花板和大型窗戶創造出明亮寬敞的生活空間。',
      features: ['私人碼頭', '遊戲室', '私人海灘', '網球場', '溫泉浴池', '專業廚房'],
      location: {
        address: '14 Mid Street',
        city: 'Miami',
        state: 'Oregon',
        zip: '36450',
        latitude: 25.808447,
        longitude: -80.124127
      }
    },
    {
      id: 8,
      title: '26 Old Street Miami, OR 12870',
      category: 'Luxury Villa',
      price: 1520000,
      image: '/assets/images/property-02.jpg',
      bedrooms: 12,
      bathrooms: 15,
      area: 380,
      floor: 3,
      parking: '14 spots',
      description: '這是一棟令人印象深刻的豪華別墅，擁有多個起居區和娛樂空間。適合大型家庭或喜歡招待客人的人。',
      features: ['室內外游泳池', '私人高爾夫球場', '直升機停機坪', '葡萄園', '私人湖泊', '馬廄'],
      location: {
        address: '26 Old Street',
        city: 'Miami',
        state: 'Oregon',
        zip: '12870',
        latitude: 25.835387,
        longitude: -80.183254
      }
    },
    {
      id: 9,
      title: '34 New Street Miami, OR 24650',
      category: 'Luxury Villa',
      price: 3145000,
      image: '/assets/images/property-01.jpg',
      bedrooms: 10,
      bathrooms: 12,
      area: 860,
      floor: 3,
      parking: '10 spots',
      description: '這是最頂級的豪華別墅，位於最負盛名的社區。完美的工藝和精緻的細節貫穿整個房產，擁有所有現代設施。',
      features: ['私人海灘', '直升機停機坪', '前庭和後院', '冥想花園', '安保巡邏', '室內室外水療中心'],
      location: {
        address: '34 New Street',
        city: 'Miami',
        state: 'Oregon',
        zip: '24650',
        latitude: 25.820521,
        longitude: -80.142044
      }
    }
  ];
  
  // 輪播橫幅數據
  const bannerSlides = [
    {
      id: 1,
      location: 'Toronto',
      country: 'Canada',
      title: 'Hurry!<br>Get the Best Villa for you',
      image: '/assets/images/banner-01.jpg'
    },
    {
      id: 2,
      location: 'Melbourne',
      country: 'Australia',
      title: 'Be Quick!<br>Get the best villa in town',
      image: '/assets/images/banner-02.jpg'
    },
    {
      id: 3,
      location: 'Miami',
      country: 'South Florida',
      title: 'Act Now!<br>Get the highest level penthouse',
      image: '/assets/images/banner-03.jpg'
    }
  ];
  
  // 最佳交易數據
  const deals = [
    {
      id: 'apartment',
      label: 'Apartment',
      title: 'Extra Info About Property',
      image: '/assets/images/deal-01.jpg',
      specs: [
        { label: 'Total Flat Space', value: '185 m2' },
        { label: 'Floor number', value: '26th' },
        { label: 'Number of rooms', value: '4' },
        { label: 'Parking Available', value: 'Yes' },
        { label: 'Payment Process', value: 'Bank' }
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor pack incididunt ut labore et dolore magna aliqua quised ipsum suspendisse. When you need free CSS templates, you can simply type TemplateMo in any search engine website.'
    },
    {
      id: 'villa',
      label: 'Villa House',
      title: 'Detail Info About Villa',
      image: '/assets/images/deal-02.jpg',
      specs: [
        { label: 'Total Flat Space', value: '250 m2' },
        { label: 'Floor number', value: '26th' },
        { label: 'Number of rooms', value: '5' },
        { label: 'Parking Available', value: 'Yes' },
        { label: 'Payment Process', value: 'Bank' }
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor pack incididunt ut labore et dolore magna aliqua quised ipsum suspendisse. Swag fanny pack lyft blog twee. JOMO ethical copper mug, succulents typewriter shaman DIY kitsch twee taiyaki fixie hella venmo.'
    },
    {
      id: 'penthouse',
      label: 'Penthouse',
      title: 'Extra Info About Penthouse',
      image: '/assets/images/deal-03.jpg',
      specs: [
        { label: 'Total Flat Space', value: '320 m2' },
        { label: 'Floor number', value: '34th' },
        { label: 'Number of rooms', value: '6' },
        { label: 'Parking Available', value: 'Yes' },
        { label: 'Payment Process', value: 'Bank' }
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor pack incididunt ut labore et dolore magna aliqua quised ipsum suspendisse. Swag fanny pack lyft blog twee. JOMO ethical copper mug, succulents typewriter shaman DIY kitsch twee taiyaki fixie hella venmo.'
    }
  ];
  
  // 統計數據
  const stats = [
    {
      id: 1,
      count: 34,
      title: 'Buildings<br>Finished Now'
    },
    {
      id: 2,
      count: 12,
      title: 'Years<br>Experience'
    },
    {
      id: 3,
      count: 24,
      title: 'Awards<br>Won 2023'
    }
  ];
  
  // 團隊成員數據
  const team = [
    {
      id: 1,
      name: 'John Doe',
      position: 'CEO & Founder',
      image: '/assets/images/team-01.jpg',
      phone: '+1 234 567 8900',
      email: 'john@villa.com',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Property Manager',
      image: '/assets/images/team-02.jpg',
      phone: '+1 234 567 8901',
      email: 'jane@villa.com',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
      }
    },
    {
      id: 3,
      name: 'Michael Johnson',
      position: 'Senior Agent',
      image: '/assets/images/team-03.jpg',
      phone: '+1 234 567 8902',
      email: 'michael@villa.com',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
      }
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'Marketing Director',
      image: '/assets/images/team-04.jpg',
      phone: '+1 234 567 8903',
      email: 'sarah@villa.com',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
      }
    }
  ];
  
  // 聯絡資訊
  const contactInfo = {
    address: 'Sunny Isles Beach, FL 33160',
    phone: '010-020-0340',
    email: 'info@villa.co',
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12469.776493332698!2d-80.14036379941481!3d25.907788681148624!2m3!1f357.26927939317244!2f20.870722720054623!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x88d9add4b4ac788f%3A0xe77469d09480fcdb!2sSunny%20Isles%20Beach!5e1!3m2!1sen!2sth!4v1642869952544!5m2!1sen!2sth'
  };
  
  // 公司信息
  const companyInfo = {
    name: 'Villa Agency Co., Ltd.',
    foundedYear: 2010,
    copyright: `Copyright © ${new Date().getFullYear()} Villa Agency Co., Ltd. All rights reserved.`,
    designer: 'TemplateMo',
    designerUrl: 'https://templatemo.com'
  };
  
  // 服務方法
  export default {
    // 房產相關
    getAllProperties() {
      return properties;
    },
    
    getPropertyById(id) {
      return properties.find(property => property.id === parseInt(id));
    },
    
    getPropertiesByCategory(category) {
      if (!category || category === 'all') return properties;
      return properties.filter(property => 
        property.category.toLowerCase().includes(category.toLowerCase())
      );
    },
    
    getPropertiesByPrice(minPrice, maxPrice) {
      return properties.filter(property => 
        property.price >= minPrice && property.price <= maxPrice
      );
    },
    
    getFeaturedProperties(limit = 6) {
      return properties.slice(0, limit);
    },
    
    searchProperties(keyword) {
      if (!keyword) return properties;
      
      const searchTerm = keyword.toLowerCase();
      return properties.filter(property => 
        property.title.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm) ||
        property.category.toLowerCase().includes(searchTerm) ||
        property.location.city.toLowerCase().includes(searchTerm) ||
        property.location.state.toLowerCase().includes(searchTerm)
      );
    },
    
    // 輪播橫幅相關
    getBannerSlides() {
      return bannerSlides;
    },
    
    // 最佳交易相關
    getDeals() {
      return deals;
    },
    
    getDealById(id) {
      return deals.find(deal => deal.id === id);
    },
    
    // 統計數據相關
    getStats() {
      return stats;
    },
    
    // 團隊成員相關
    getTeamMembers() {
      return team;
    },
    
    getTeamMemberById(id) {
      return team.find(member => member.id === parseInt(id));
    },
    
    // 聯絡資訊相關
    getContactInfo() {
      return contactInfo;
    },
    
    // 公司資訊相關
    getCompanyInfo() {
      return companyInfo;
    },
    
    // 模擬 API 請求（帶延遲）
    async fetchProperties() {
      // 模擬網絡延遲
      await new Promise(resolve => setTimeout(resolve, 800));
      return properties;
    },
    
    async fetchPropertyById(id) {
      // 模擬網絡延遲
      await new Promise(resolve => setTimeout(resolve, 600));
      return this.getPropertyById(id);
    },
    
    // 模擬表單提交
    async submitContactForm(formData) {
      // 模擬網絡延遲
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模擬成功回應
      return {
        success: true,
        message: '您的訊息已成功送出，我們會盡快與您聯繫。',
        id: Math.floor(Math.random() * 1000000)
      };
    },
    
    // 模擬預約看房
    async scheduleVisit(propertyId, visitorData) {
      // 模擬網絡延遲
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // 模擬成功回應
      return {
        success: true,
        message: '您的看房預約已成功安排，我們的顧問將與您聯絡確認詳情。',
        visitId: `VISIT-${Math.floor(Math.random() * 10000)}`,
        propertyId: propertyId,
        scheduledDate: visitorData.date,
        scheduledTime: visitorData.time
      };
    }
  };