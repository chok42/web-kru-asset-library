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
      <Breadcrumb pageName="Asset" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-row justify-between items-center py-6 px-4 md:px-6 xl:px-7.5 ">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              รายละเอียดครุภัณฑ์
            </h4>
            <Link
              to="/asset/insert"
              className="inline-flex items-center justify-center gap-2.5 bg-primary py-2.5 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-6"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              ลงทะเบียนครุภัณฑ์
            </Link>
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
                    {/* <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      รหัสครุภัณฑ์
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      ชื่อครุภัณฑ์
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      ประเภท
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      ราคา
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      อาคาร/ห้อง
                    </th>

                    <th className="min-w-[50px]  py-4 px-4 font-medium text-black dark:text-white">
                      สถานะ
                    </th>
                    <th className="min-w-[120px]  py-4 px-4 font-medium text-black dark:text-white">
                      การใช้งาน
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white"></th> */}
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
                  {/* {result.length > 0 &&
                    result.map((item, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-sm text-black dark:text-white">
                            {item.asset_code}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="w-[50px] h-[50px] rounded-md">
                              <img
                                src={`${processEnv}/${item.asset_image}`}
                                alt="Product"
                              />
                            </div>
                            <p className="text-sm text-black dark:text-white">
                              {item.asset_name}
                            </p>
                          </div>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-sm text-black dark:text-white">
                            {item.asset_type_name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success`}
                          >
                            ฿{item.asset_price}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-sm text-black dark:text-white">
                            {item.asset_building_code}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-sm text-black dark:text-white">
                            {item.asset_status_name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-sm text-black dark:text-white">
                            {
                              proIsUsed.find(
                                (fd) => fd.id === item.asset_is_used,
                              )?.name
                            }
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                          <button
                            >
                              <BsInfoSquare className="hover:text-fuchsia-600" />
                            </button>
                            <button
                            >
                              <BsTrash className="hover:text-danger" />
                            </button>
                            <button
                              type='button'
                              onClick={() =>
                                navigate(`/asset/update`, {
                                  state: { id: item.asset_id },
                                })
                              }
                            >
                              <BsPencilSquare className="hover:text-warning" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetDetail;
