import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsPencilSquare,BsTrash,BsInfoSquare } from "react-icons/bs";
//components
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
//types
import { ProductIsUsed } from '../../types/product';
//services
import { AssetJson, GetAssetService, GetByIdAssetService } from '../../services/asset.service';
//common
import { processEnv } from '../../common/axios';
import { toThaiDateString, toThaiDateTimeString } from '../../constants/format';


export const proIsUsed: ProductIsUsed[] = [
  {
    id: "1",
    name: 'ใช้งาน',
  },
  {
    id: "0",
    name: 'ไม่ได้ใช้งาน',
  },
];



const AssetDetail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [asset, setAsset] = useState<AssetJson>();

    const { id }: { id: string } = location.state ? location.state : {};

    useMemo(async () => {
      const asset = await GetByIdAssetService(id);
      if (asset) {
        setAsset(asset);
      }
    }, []);
    
  
  return (
    <>
      <Breadcrumb pageName="Asset" defaultPageName='หน้าหลัก' />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-row justify-between items-center py-6 px-4 md:px-6 xl:px-7.5 ">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              รายละเอียดครุภัณฑ์
            </h4>
          </div>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-row justify-between items-center py-6 px-4 md:px-6 xl:px-7.5 ">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                รูปภาพ
              </h4>
            </div>
            <div>
              <div className="w-[250px] h-[250px]">
                {asset && asset.asset_image && (
                  <img
                    className="w-[250px] h-[250px]"
                    src={`${processEnv}/${asset.asset_image}`}
                    style={{objectFit:'contain'}}
                    alt="Product"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[50] py-4 px-4 font-medium text-black dark:text-white">
                      หัวข้อ
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      รายละเอียด
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        รหัสครุภัณฑ์
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {asset?.asset_code}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        ชื่อครุภัณฑ์
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {asset?.asset_name}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">ราคา</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        ฿{asset?.asset_price}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        ประเภท
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {asset?.asset_type_name}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        สถาบัน
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {asset?.agency_name}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        อาคาร/ห้อง
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {asset?.asset_building_code}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        วันที่ใช้งาน
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {toThaiDateString(asset?.asset_start_date || '')}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        วันที่เพิ่มข้อมูล
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {toThaiDateTimeString(asset?.asset_creation_date || '')}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        สถานะ
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {asset?.asset_status_name}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-lg text-black dark:text-white">
                        การใช้งาน
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {
                          proIsUsed.find((fd) => fd.id === asset?.asset_is_used)
                            ?.name
                        }
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end gap-4.5 my-10">
                      <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="button"
                        onClick={() => navigate(-1)}
                      >
                        ย้อนกลับ
                      </button>
                    </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </>
  );
};

export default AssetDetail;
