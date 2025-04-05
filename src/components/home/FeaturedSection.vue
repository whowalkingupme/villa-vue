<template>
    <div class="featured section">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="left-image">
                        <img src="@/assets/images/featured.jpg" alt="">
                        <router-link to="/property-details" class="icon-link">
                            <img src="@/assets/images/featured-icon.png" alt="" style="max-width: 60px; padding: 0px;">
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="section-heading">
                        <h6>| Featured</h6>
                        <h2>Best Appartment &amp; Sea view</h2>
                    </div>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item" v-for="(item, index) in accordionItems" :key="index">
                            <h2 class="accordion-header" :id="`heading${index}`">
                                <button class="accordion-button" :class="{ collapsed: activeItem !== index }"
                                    type="button" @click="toggleAccordion(index)" :aria-expanded="activeItem === index"
                                    :aria-controls="`collapse${index}`">
                                    {{ item.title }}
                                </button>
                            </h2>
                            <div :id="`collapse${index}`" class="accordion-collapse collapse"
                                :class="{ show: activeItem === index }" :aria-labelledby="`heading${index}`">
                                <div class="accordion-body" v-html="item.content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="info-table">
                        <ul>
                            <li v-for="(feature, index) in features" :key="index">
                                <img :src="feature.icon" alt="" style="max-width: 52px;">
                                <h4>{{ feature.title }}<br><span>{{ feature.subtitle }}</span></h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import featureIcon1 from '@/assets/images/info-icon-01.png';
import featureIcon2 from '@/assets/images/info-icon-02.png';
import featureIcon3 from '@/assets/images/info-icon-03.png';
import featureIcon4 from '@/assets/images/info-icon-04.png';

const router = useRouter();

// 手風琴當前活動項
const activeItem = ref(0);

// 切換手風琴
const toggleAccordion = (index) => {
    activeItem.value = activeItem.value === index ? null : index;
};

// 手風琴內容
const accordionItems = [
    {
        title: 'Best useful links ?',
        content: 'Get <strong>the best villa</strong> website template in HTML CSS and Bootstrap for your business. TemplateMo provides you the <a href="https://www.google.com/search?q=best+free+css+templates" target="_blank">best free CSS templates</a> in the world. Please tell your friends about it.'
    },
    {
        title: 'How does this work ?',
        content: 'Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed doesn\'t eiusmod tempor incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        title: 'Why is Villa Agency the best ?',
        content: 'Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed doesn\'t eiusmod tempor incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
];

// 特色數據
const features = [
    {
        icon: featureIcon1,
        title: '250 m2',
        subtitle: 'Total Flat Space'
    },
    {
        icon: featureIcon2,
        title: 'Contract',
        subtitle: 'Contract Ready'
    },
    {
        icon: featureIcon3,
        title: 'Payment',
        subtitle: 'Payment Process'
    },
    {
        icon: featureIcon4,
        title: 'Safety',
        subtitle: '24/7 Under Control'
    }
];
</script>

<style lang="scss" scoped>
.featured {
    padding-top: 72px;
    padding-bottom: 130px;
    background-color: #f7f7f7;

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
            color: #1e1e1e;
            line-height: 40px;
        }
    }

    .left-image {
        margin-right: 15px;
        border-radius: 10px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            display: block;
        }

        .icon-link {
            position: absolute;
            left: 14%;
            top: 82%;
            transform: translate(-50%, -50%);
            width: 90px;
            height: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f35525;
            border-radius: 50%;

            img {
                width: 60%;
                height: auto;
                border-radius: 0;
            }
        }
    }

    .accordion {
        margin-left: 30px;

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
            font-size: 15px;
            line-height: 26px;
            color: #4a4a4a;

            a {
                color: #f35525;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .info-table {
        background-color: #fff;
        border-radius: 10px;
        padding: 40px 30px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);

        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                margin-bottom: 30px;
                padding-bottom: 30px;
                border-bottom: 1px solid #eee;
                display: flex;
                align-items: center;

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
                    margin-bottom: 0;

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

@media (max-width: 992px) {
    .featured {
        padding-top: 100px;
        padding-bottom: 100px;

        .left-image {
            margin-right: 0;
            margin-bottom: 30px;
        }

        .accordion {
            margin-left: 0;
            margin-bottom: 30px;
        }
    }
}

@media (max-width: 767px) {
    .featured {
        padding-top: 80px;
        padding-bottom: 80px;

        .section-heading {
            margin-bottom: 30px;

            h2 {
                font-size: 26px;
                line-height: 36px;
            }
        }

        .info-table ul li {
            flex-direction: column;
            text-align: center;

            img {
                margin-right: 0;
                margin-bottom: 15px;
            }
        }
    }
}
</style>