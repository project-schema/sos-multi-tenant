import React, { useRef, useState } from "react";
// Import Swiper React components
import sliderImg from "../../../../public/images/serviceDetailsSliderSmallImg.png";
import sliderSmallImg from "../../../../public/images/serviceDetailsSliderSmallImg.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import slideImg2 from "../../../../public/images/slider2.png";
import slideImg1 from "../../../../public/images/slider1.png";
import UserImg from "../../../../public/images/sDetailsUser.png";
import UserReview from "../../../../public/images/reviewUser.png";
import Image from "next/image";
import style from "./ServicesDetails.style.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

function SerVicesDetails() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <section className={style.servicesDetails}>
        <div className="layout">
          <div className={style.servicesDetailsWp}>
            <div className={style.servicesdetailsSlider}>
              <h2 className={style.sDetailsHeading}>
                Digital Marketing Analysis Stategy
              </h2>
              <div className={style.userDetails}>
                <div>
                  <Image
                    className={style.sDetailsUserImg}
                    src={UserImg}
                    alt="Choose Us Images"
                  />
                </div>
                <div>
                  <p className={style.userName}>
                    Jahid <span className={style.userSpan}>@jahidrifat</span>
                  </p>
                </div>
              </div>
              <div className={style.userBorder}></div>
              <div className={style.servicesDetailsSlideImg}></div>

              {/* slider */}

              <Swiper
                // style={{
                //   "--swiper-navigation-color": "#fff",
                //   "--swiper-pagination-color": "#fff",
                // }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.topSliderImg}>
                  <Image src={sliderImg} alt="Service Slider Image" />
                </SwiperSlide>
              </Swiper>
              <Swiper
                // onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={20}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
                <SwiperSlide className={style.sliderSmallImg}>
                  <Image src={sliderSmallImg} alt="Service Slider Image" />
                </SwiperSlide>
              </Swiper>

              {/* slider */}

              <div className={style.servicesDetailsContent}>
                <h3 className={style.sDetailsContentHeading}>Description</h3>
                <p className={style.sDetailsParagraph}>
                  <span className={style.sDeSpan}>
                    Are you ready to take your fitness journey to the next
                    level?
                  </span>{" "}
                  Look no further than the UltraFit Pro X1 Smart Fitness Watch –
                  the ultimate companion to help you achieve your health and
                  fitness goals! Whether you &apos; re a seasoned athlete or
                  just starting your fitness journey, this cutting-edge
                  smartwatch is designed to elevate your performance,
                </p>
                <p className={style.sDetailsParagraph}>
                  <span className={style.sDeSpan}>
                    Advanced Fitness Tracking:
                  </span>{" "}
                  The UltraFit Pro X1 is equipped with a range of sensors that
                  accurately monitor your heart rate, steps, distance, calories
                  burned.
                </p>
                <p className={style.sDetailsParagraph}>
                  <span className={style.sDeSpan}>Personalized Coaching:</span>{" "}
                  Say goodbye to generic workouts! This smart fitness watch
                  provides personalized coaching based on your fitness level and
                  goals.
                </p>
                <p className={style.sDetailsParagraph}>
                  <span className={style.sDeSpan}>
                    Smartphone Connectivity:
                  </span>{" "}
                  Connect the UltraFit Pro X1 to your smartphone via Bluetooth
                  to receive notifications for calls, messages, and social media
                  updates.
                </p>
                <p className={style.sDetailsParagraph}>
                  <span className={style.sDeSpan}>
                    Why Choose UltraFit Pro X1?
                  </span>
                </p>
                <p className={style.sDetailsParagraph}>
                  The UltraFit Pro X1 goes beyond the typical fitness tracker,
                  offering a comprehensive approach to your well-being. Its
                  intelligent features and real-time data empower you to make
                  informed decisions about your health and fitness routine. By
                  seamlessly integrating into your lifestyle, this smart fitness
                  watch becomes a trusted companion on your journey to a
                  healthier and more active life.
                </p>
                <div className={style.userBorder}></div>
                <div className={style.userCategoryWP}>
                  <div className={style.sUserCateItem}>
                    <p className={style.sDetailsCategory}>Category</p>
                    <p className={style.sDetailsCategoryHeadhing}>
                      Subcategory
                    </p>
                  </div>
                  <div className={style.sUserCateItem}>
                    <p className={style.sDetailsCategory}>Sub Category</p>
                    <p className={style.sDetailsCategoryHeadhing}>Vendor</p>
                  </div>
                  <div className={style.sUserCateItem}>
                    <p className={style.sDetailsCategory}>Service Type</p>
                    <p className={style.sDetailsCategoryHeadhing}>
                      Smart Gadgets
                    </p>
                  </div>
                </div>
                <div className={style.userReviewWPTop}>
                  <div>
                    <p className={style.reviewText}>Reviews</p>
                  </div>
                  <div className={style.userReviewItemWP}>
                    <p className={style.sortText}>Sort By:</p>
                    <select
                      className={style.userSelectBox}
                      name="languages"
                      id="lang"
                    >
                      <option
                        className={style.selectBoxItem}
                        value="javascript"
                      >
                        Recent
                      </option>
                      <option className={style.selectBoxItem} value="php">
                        PHP
                      </option>
                      <option className={style.selectBoxItem} value="java">
                        Java
                      </option>
                      <option className={style.selectBoxItem} value="golang">
                        Golang
                      </option>
                    </select>
                  </div>
                </div>
                <div className={style.userBorder}></div>
                <div className={style.userReviewWP}>
                  <div className={style.reviewImgWidth}>
                    <Image
                      className={style.reviewUser}
                      src={UserReview}
                      alt="Choose Us Images"
                    />
                  </div>
                  <div className={style.reviewimgText}>
                    <h3 className={style.userReviewH}>halfmartian</h3>
                    <p className={style.userReviewP}>martin@34gmail.com</p>
                    <div className={style.reviewUserDetails}>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>
                      <p>| 4h ago</p>
                    </div>
                    <p className={style.reviewParagraph}>
                      The seller is very knowledgeable, skilled, and talented.
                      He went above and beyond to assist me with this project. I
                      had been working with many different artists trying to get
                      this cover idea to come to fruition and FINALLY, I met the
                      right person... See more
                    </p>
                  </div>
                </div>
                <div className={style.userBorder}></div>
                <div className={style.userReviewWP}>
                  <div className={style.reviewImgWidth}>
                    <Image
                      className={style.reviewUser}
                      src={UserReview}
                      alt="Choose Us Images"
                    />
                  </div>
                  <div className={style.reviewimgText}>
                    <h3 className={style.userReviewH}>halfmartian</h3>
                    <p className={style.userReviewP}>martin@34gmail.com</p>
                    <div className={style.reviewUserDetails}>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>
                      <p>| 4h ago</p>
                    </div>
                    <p className={style.reviewParagraph}>
                      The seller is very knowledgeable, skilled, and talented.
                      He went above and beyond to assist me with this project. I
                      had been working with many different artists trying to get
                      this cover idea to come to fruition and FINALLY, I met the
                      right person... See more
                    </p>
                  </div>
                </div>
                <div className={style.userBorder}></div>
                <div className={style.userReviewWP}>
                  <div className={style.reviewImgWidth}>
                    <Image
                      className={style.reviewUser}
                      src={UserReview}
                      alt="Choose Us Images"
                    />
                  </div>
                  <div className={style.reviewimgText}>
                    <h3 className={style.userReviewH}>halfmartian</h3>
                    <p className={style.userReviewP}>martin@34gmail.com</p>
                    <div className={style.reviewUserDetails}>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>
                      <p>| 4h ago</p>
                    </div>
                    <p className={style.reviewParagraph}>
                      The seller is very knowledgeable, skilled, and talented.
                      He went above and beyond to assist me with this project. I
                      had been working with many different artists trying to get
                      this cover idea to come to fruition and FINALLY, I met the
                      right person... See more
                    </p>
                  </div>
                </div>
                <div className={style.userBorder}></div>
                <div className={style.userReviewWP}>
                  <div className={style.reviewImgWidth}>
                    <Image
                      className={style.reviewUser}
                      src={UserReview}
                      alt="Choose Us Images"
                    />
                  </div>
                  <div className={style.reviewimgText}>
                    <h3 className={style.userReviewH}>halfmartian</h3>
                    <p className={style.userReviewP}>martin@34gmail.com</p>
                    <div className={style.reviewUserDetails}>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>

                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill="#F89100"
                        />
                      </svg>
                      <p>| 4h ago</p>
                    </div>
                    <p className={style.reviewParagraph}>
                      The seller is very knowledgeable, skilled, and talented.
                      He went above and beyond to assist me with this project. I
                      had been working with many different artists trying to get
                      this cover idea to come to fruition and FINALLY, I met the
                      right person... See more
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.servicesDetailsTab}>
              <Tabs className={style.tabTotalBox}>
                <TabList className={style.tabBox}>
                  <Tab classID={style.tabHeaderContent}>Basic</Tab>
                  <Tab classID={style.tabHeaderContent}>Standard</Tab>
                  <Tab classID={style.tabHeaderContent}>Premium</Tab>
                </TabList>

                <TabPanel className={style.boxtab}>
                  <div className={style.tabContentBox}>
                    <div className={style.tabDetail}>
                      <h3 className={style.tabHeadign}>$40</h3>
                      <p className={style.tabParagraph}>Cool</p>
                    </div>
                    <div>
                      <p className={style.tabContentp}>
                        Save up to 10% with{" "}
                        <span className={style.tabSpan}>Register to Save</span>
                      </p>
                    </div>
                    <p className={style.tabContentpt}>
                      An AI image based on your idea. Not for overly detailed
                      ideas with multiple specific characters.This includes
                      setting up the program, creating tracking links, and
                      managing payouts. This includes training on how to choose
                      the right affiliate programs
                    </p>
                    <div className={style.tabIcon}>
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z"
                            fill="#6A6A6A"
                          />
                        </svg>
                      </div>
                      <div>
                        <p>4 Days Delivery</p>
                      </div>
                    </div>
                    <div className={style.tabfullBtnb}>
                      <button className={style.tabBtn}>
                        <span className={style.btnText}>Buy now </span>
                        <svg
                          width="23"
                          height="20"
                          viewBox="0 0 23 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.8839 10.8839C22.372 10.3957 22.372 9.60427 21.8839 9.11612L13.9289 1.16117C13.4408 0.673011 12.6493 0.673011 12.1612 1.16117C11.673 1.64932 11.673 2.44078 12.1612 2.92893L19.2322 10L12.1612 17.0711C11.673 17.5592 11.673 18.3507 12.1612 18.8388C12.6493 19.327 13.4408 19.327 13.9289 18.8388L21.8839 10.8839ZM-1.09278e-07 11.25L21 11.25L21 8.75L1.09278e-07 8.75L-1.09278e-07 11.25Z"
                            fill="#FAFAFA"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className={style.boxtab}>
                  <div className={style.tabContentBox}>
                    <div className={style.tabDetail}>
                      <h3 className={style.tabHeadign}>$99</h3>
                      <p className={style.tabParagraph}>Cool</p>
                    </div>
                    <div>
                      <p className={style.tabContentp}>
                        Save up to 15% with{" "}
                        <span className={style.tabSpan}>Register to Save</span>
                      </p>
                    </div>
                    <p className={style.tabContentpt}>
                      An AI image based on your idea. Not for overly detailed
                      ideas with multiple specific characters.This includes
                      setting up the program, creating tracking links, and
                      managing payouts. This includes training on how to choose
                      the right affiliate programs
                    </p>
                    <div className={style.tabIcon}>
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z"
                            fill="#6A6A6A"
                          />
                        </svg>
                      </div>
                      <div>
                        <p>4 Days Delivery</p>
                      </div>
                    </div>
                    <div className={style.tabfullBtnb}>
                      <button className={style.tabBtn}>
                        <span className={style.btnText}>Buy now </span>
                        <svg
                          width="23"
                          height="20"
                          viewBox="0 0 23 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.8839 10.8839C22.372 10.3957 22.372 9.60427 21.8839 9.11612L13.9289 1.16117C13.4408 0.673011 12.6493 0.673011 12.1612 1.16117C11.673 1.64932 11.673 2.44078 12.1612 2.92893L19.2322 10L12.1612 17.0711C11.673 17.5592 11.673 18.3507 12.1612 18.8388C12.6493 19.327 13.4408 19.327 13.9289 18.8388L21.8839 10.8839ZM-1.09278e-07 11.25L21 11.25L21 8.75L1.09278e-07 8.75L-1.09278e-07 11.25Z"
                            fill="#FAFAFA"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </TabPanel>
                
                <TabPanel className={style.boxtab}>
                  <div className={style.tabContentBox}>
                    <div className={style.tabDetail}>
                      <h3 className={style.tabHeadign}>$169</h3>
                      <p className={style.tabParagraph}>Cool</p>
                    </div>
                    <div>
                      <p className={style.tabContentp}>
                        Save up to 17% with{" "}
                        <span className={style.tabSpan}>Register to Save</span>
                      </p>
                    </div>
                    <p className={style.tabContentpt}>
                      An AI image based on your idea. Not for overly detailed
                      ideas with multiple specific characters.This includes
                      setting up the program, creating tracking links, and
                      managing payouts. This includes training on how to choose
                      the right affiliate programs
                    </p>
                    <div className={style.tabIcon}>
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z"
                            fill="#6A6A6A"
                          />
                        </svg>
                      </div>
                      <div>
                        <p>4 Days Delivery</p>
                      </div>
                    </div>
                    <div className={style.tabfullBtnb}>
                      <button className={style.tabBtn}>
                        <span className={style.btnText}>Buy now </span>
                        <svg
                          width="23"
                          height="20"
                          viewBox="0 0 23 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.8839 10.8839C22.372 10.3957 22.372 9.60427 21.8839 9.11612L13.9289 1.16117C13.4408 0.673011 12.6493 0.673011 12.1612 1.16117C11.673 1.64932 11.673 2.44078 12.1612 2.92893L19.2322 10L12.1612 17.0711C11.673 17.5592 11.673 18.3507 12.1612 18.8388C12.6493 19.327 13.4408 19.327 13.9289 18.8388L21.8839 10.8839ZM-1.09278e-07 11.25L21 11.25L21 8.75L1.09278e-07 8.75L-1.09278e-07 11.25Z"
                            fill="#FAFAFA"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SerVicesDetails;
