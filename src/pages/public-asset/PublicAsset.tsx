import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BsPencilSquare,
  BsTrash,
  BsInfoSquare,
  BsSearch,
  BsCaretLeft,
  BsCaretRight,
} from 'react-icons/bs';
//components
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
//types
import { ProductIsUsed } from '../../types/product';
//services
import {
  AssetJson,
  AssetStatusJson,
  DeleteAssetService,
  GetAssetService,
  GetListAssetStatusService,
} from '../../services/asset.service';
//common
import { processEnv } from '../../common/axios';
import ReactPaginate from 'react-paginate';

import {
  AssetTypeJson,
  GetListAssetTypeService,
} from '../../services/asset-type.service';
import {
  AgencyJson,
  GetListAgencyService,
} from '../../services/agency.service';

export const proIsUsed: ProductIsUsed[] = [
  {
    id: '1',
    name: 'ใช้งาน',
  },
  {
    id: '0',
    name: 'ไม่ได้ใช้งาน',
  },
];

const PublicAsset = () => {
  const location = useLocation();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [search, setSearch] = useState<string>('');
  const [selAssetType, setSelectAssetType] = useState<string>('');
  const [selAgency, setSelectAgency] = useState<string>('');
  const [selAssetStatus, setSelectAssetStatus] = useState<string>('');
  const [assetType, setAssetType] = useState<AssetTypeJson[]>([]);
  const [agency, setAgency] = useState<AgencyJson[]>([]);
  const [assetStatus, setAssetStatus] = useState<AssetStatusJson[]>([]);
  const [result, setResult] = useState<AssetJson[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const search_main = location && location.state && location.state.search_main;

  useEffect(() => {
    if (search_main && search_main.length > 0) {
      setSearch(search_main);
    }
  }, []);

  useEffect(() => {
    fatchData();
  }, [page, pageSize, search, selAssetStatus, selAgency, selAssetType]);

  const fatchData = async () => {
    const resp = await GetAssetService(
      page,
      pageSize,
      search,
      '',
      selAssetStatus,
      selAgency,
      selAssetType,
    );
    if (resp && resp.data.length >= 0) {
      setResult(resp.data);
      setTotalCount(resp.totalCount);
      setTotalPages(resp.totalPages);
    }
  };

  useMemo(async () => {
    const asset_type = await GetListAssetTypeService();
    const agency = await GetListAgencyService();
    const status = await GetListAssetStatusService();
    setAssetType(asset_type ? asset_type : []);
    setAgency(agency ? agency : []);
    setAssetStatus(status ? status : []);
  }, []);

  const handleChangeSearch = (text: string) => {
    setSearch(text);
  };

  const handlePageClick = (event: any) => {
    const newOffset = event.selected + 1;
    setPage(newOffset);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 ">
        <Breadcrumb pageName="วัสดุครุภัณฑ์" defaultPageName="หน้าหลัก" />
        <div className="flex flex-col w-full">
          <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <div className="py-2 px-2 w-50">
                  <div className="relative flex justify-between">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        const search = e.target.value;
                        handleChangeSearch(search);
                      }}
                      placeholder="ค้นหาวัสดุครุภัณฑ์ "
                      className="bg-transparent  text-black focus:outline-none dark:text-white "
                    />

                    <button>
                      <BsSearch className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" />
                    </button>
                  </div>
                </div>
                <div className="py-2 px-2 ">
                  <select
                    className="w-full rounded border border-stroke bg-gray py-2 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="asset_type_id"
                    value={selAssetType}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectAssetType(value);
                    }}
                  >
                    <option value="" className="text-body dark:text-bodydark">
                      ประเภท
                    </option>
                    {assetType.length > 0 &&
                      assetType.map((res, index) => (
                        <option
                          key={index}
                          value={res.asset_type_id}
                          className="text-body dark:text-bodydark"
                        >
                          {res.asset_type_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="py-2 px-2 ">
                  <select
                    className="w-full rounded border border-stroke bg-gray py-2 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="asset_type_id"
                    value={selAgency}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectAgency(value);
                    }}
                  >
                    <option value="" className="text-body dark:text-bodydark">
                      สถาบัน
                    </option>
                    {agency.length > 0 &&
                      agency.map((res, index) => (
                        <option
                          key={index}
                          value={res.agency_id}
                          className="text-body dark:text-bodydark"
                        >
                          {res.agency_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="py-2 px-2 ">
                  <select
                    className="w-full rounded border border-stroke bg-gray py-2 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="asset_type_id"
                    value={selAssetStatus}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectAssetStatus(value);
                    }}
                  >
                    <option value="" className="text-body dark:text-bodydark">
                      สถานะ
                    </option>
                    {assetStatus.length > 0 &&
                      assetStatus.map((res, index) => (
                        <option
                          key={index}
                          value={res.asset_status_id}
                          className="text-body dark:text-bodydark"
                        >
                          {res.asset_status_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="my-4">
            {result.length > 0 ? (
              <div className="grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xsm:grid-cols-1 gap-6 ">
                {result.map((item, index) => (
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
                          <span className="font-sm text-black dark:text-white">
                            ราคา {item.asset_price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-50 w-full flex justify-center items-center">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  ไม่พบข้อมูล
                </h2>
              </div>
            )}
          </div>

          {result.length > 0 && (
            <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
              <div className="flex flex-row items-center justify-end">
                <ReactPaginate
                  className="flex justify-between w-50 items-center text-body dark:text-white"
                  breakLabel="..."
                  nextLabel={<BsCaretRight />}
                  pageCount={totalPages}
                  onPageChange={handlePageClick}
                  previousLabel={<BsCaretLeft />}
                />
                <div className="flex  px-5 justify-center items-center">
                  <select
                    className="w-full rounded  py-2  text-black focus:border-primary focus-visible:outline-none  dark:bg-transparent dark:text-white dark:focus:border-primary"
                    value={pageSize.toString()}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPageSize(parseInt(value));
                    }}
                  >
                    <option value={'8'} className="text-body dark:text-white">
                      8
                    </option>
                    <option value={'12'} className="text-body dark:text-white">
                      12
                    </option>
                    <option value={'16'} className="text-body dark:text-white">
                      16
                    </option>
                    <option value={'20'} className="text-body dark:text-white">
                      20
                    </option>
                    <option
                      value={totalCount.toString()}
                      className="text-body dark:text-white"
                    >
                      ทั้งหมด
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PublicAsset;
