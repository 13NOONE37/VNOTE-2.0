import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import './TagsSlider.css';

export default function TagsSlider() {
  const { t } = useTranslation();
  const { tags, setTags } = useContext(AppContext);

  return (
    <Swiper
      className="tagsSlider"
      spaceBetween={50}
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <button className="tagItem selectedItem">{t('All')}</button>
      </SwiperSlide>
      <SwiperSlide>
        <button className="tagItem">{t('Alaaaaaaaaaaaaaaal')}</button>
      </SwiperSlide>
      {tags.map((item) => (
        <SwiperSlide>
          <button className="tagItem">{item}</button>
        </SwiperSlide>
      ))}
      <SwiperSlide>
        <button className="tagItem newTag">{t('NewTag')}</button>
      </SwiperSlide>
    </Swiper>
    // <nav
    //   className="tagsSlider"
    //   style={{ gridTemplateColumns: `repeat(${tags.length + 3}, auto)` }}
    // >
    //   <div className="swiper_wrap">
    //     <div className="swiper_container">
    //       <div className="swiper_wrapper"></div>
    //       <button className="tagItem selectedItem">{t('All')}</button>
    //       <button className="tagItem">{t('Alaaaaaaaaaaaaaaal')}</button>
    //       {tags.map((item) => (
    //         <button className="tagItem">{item}</button>
    //       ))}
    //       <button className="tagItem newTag">{t('NewTag')}</button>
    //     </div>
    //   </div>
    // </nav>
  );
}
