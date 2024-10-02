import { BsSearch } from 'react-icons/bs';
import CoverOne from '../../images/cover/cover-02.jpg';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import CarouselAsset from './sections/CarouselAsset';
import { AssetJson, GetAssetService } from '../../services/asset.service';
import IconBooks from '../../images/task/icons8-books-000.png'
import IconUniversity from '../../images/task/icons8-university-000.png'
import IconComputer from '../../images/task/icons8-computer-000.webp'

const PublicMain = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>("")
    const [carouselAsset, setCarouselAsset] = useState<AssetJson[]>([]);
    useMemo(async ()=> {
      const resp = await GetAssetService(
        1,
        8,
        '',
        '1',
        '',
        '',
        '',
      );
      if(resp && resp.data){
        setCarouselAsset(resp.data)
      }
    },[])

    const onClickSearch = () => {
      navigate('/asset', { state: { search_main: search } });
    };
  return (
    <>
      <div className="h-[100vh]">
        <div className="absolute flex flex-col justify-center items-center h-full w-full">
          <h3 className="mb-2 text-4xl font-semibold text-white text-center">
            วัสดุครุภัณฑ์ ห้องสมุด
          </h3>
          <h3 className="mb-10 text-4xl font-semibold text-white  text-center">
            มหาวิทยาลัยราชภัฏกาญจนบุรี
          </h3>
          <div className="flex flex-row justify-center itec">
            <div className="relative rounded-md px-5 bg-white flex justify-center items-center">
              <BsSearch className=" hover:fill-primary dark:fill-bodydark dark:hover:fill-primary text-black" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  const search = e.target.value;
                  setSearch(search);
                }}
                placeholder="ค้นหาวัสดุครุภัณฑ์ "
                className="w-100 bg-transparent  text-black focus:outline-none  px-2"
              />
            </div>
            <button
              onClick={onClickSearch}
              className="rounded-md text-sm px-8 py-2.5 ml-6 text-white bg-blue-900 "
            >
              ค้นหา
            </button>
          </div>
        </div>
        <img
          src={CoverOne}
          alt="profile cover"
          className="h-full w-full object-center"
        />
      </div>
      <div className="bg-transparent  flex justify-evenly mt-[-60px]">
        <a href='https://arit.kru.ac.th/' target='_blank' className="bg-white h-[180px] w-[250px] rounded-sm flex flex-col justify-evenly items-center shadow-md "
     
        >
          <img src={IconBooks} className='w-[75px] h-[75px] text-black' />
          <p className='text-black font-bold '>เกี่ยวกับห้องสมุด</p>
        </a>
        <button className="bg-white h-[180px] w-[250px] rounded-sm flex flex-col justify-evenly items-center shadow-md"
         onClick={onClickSearch}
        >
          <img src={IconComputer} className='w-[90px] h-[90px] text-black object-contain'  />
          <p className='text-black font-bold'>เกี่ยวกับวัสดุครุภันฑ์</p>
        </button>
        <a href='https://www.kru.ac.th/kru/intro/' target='_blank' className="bg-white h-[180px] w-[250px] rounded-sm flex flex-col justify-evenly items-center shadow-md"
  
        >
          <img src={IconUniversity} className='w-[75px] h-[75px] text-black' />
          <p className='text-black font-bold'>เกี่ยวกับมหาวิทยาลัย</p>
        </a>
      </div>
      <div className="mt-10 h-auto w-full">
        <div>
          <h3 className="mb-0 text-4xl font-semibold text-black  text-center">
            วัสดุครุภัณฑ์
          </h3>
        </div>
        <div className="px-5">
          <CarouselAsset props data={carouselAsset} />
        </div>
      </div>
    </>
  );
};

export default PublicMain;
