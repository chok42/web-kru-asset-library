import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AssetJson } from '../../../services/asset.service';
import { processEnv } from '../../../common/axios';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1150 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  desktop2: {
    breakpoint: { max: 1150, min: 890 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 890, min: 600 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0},
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


const CarouselAsset = ({props,data}:{props:any,data:AssetJson[]}) => {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      //autoPlay={props.deviceType !== 'mobile' ? true : false}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      //removeArrowOnDeviceType={['tablet', 'mobile']}
      deviceType={props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-[40-px]"
      className="h-[500px]"
    >
      {
        data.map((item,index) => (
            <div className="m-auto" key={index}>
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-70">
                <div className="flex justify-center items-center flex-col border-b border-stroke  dark:border-strokedark p-2 bg-zinc-300 ">
                  <div className="w-[150px] h-[150px]">
                    {item && item.asset_image && (
                      <img
                        className="w-[150px] h-[150px]"
                        src={`${processEnv}/${item.asset_image}`}
                        style={{ objectFit: 'contain' }}
                        alt="Product"
                      />
                    )}
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-black dark:text-white">
                      {item.asset_code}
                    </h3>
                    <span className="mb-1.5 text-black dark:text-white">
                      {item.asset_name}
                    </span>{' '}
                    <button className="text-sm hover:text-primary"></button>
                    <span className="font-sm text-black dark:text-white">
                      ห้อง {item.asset_building_code}
                    </span>
                  </div>
                </div>
              </div>
            </div>
        ))}
    </Carousel>
  );
}

export default CarouselAsset
