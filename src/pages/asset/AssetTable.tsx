import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsTrash, BsInfoSquare, BsCaretRight, BsCaretLeft } from 'react-icons/bs';
//components
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
//types
import { ProductIsUsed } from '../../types/product';
//services
import {
  AssetJson,
  DeleteAssetService,
  GetAssetService,
} from '../../services/asset.service';
//common
import { processEnv } from '../../common/axios';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

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

const AssetTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [search, setSearch] = useState<string>('');
  const [result, setResult] = useState<AssetJson[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fatchData();
  }, [page, pageSize, search,]);

  const fatchData = async () => {
    const resp = await GetAssetService();
    if (resp && resp.data.length > 0) {
      setResult(resp.data);
      setTotalCount(resp.totalCount)
      setTotalPages(resp.totalPages)
    }
  };

  const handlePageClick = (event: any) => {
    const newOffset = event.selected + 1;
    setPage(newOffset);
  };


  const onClickDelete = (asset_id: string, asset_code: string) => {
    Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: `หากคุณลบ ${asset_code} คุณจะไม่สามารถย้อนกลับสิ่งนี้ได้!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `ยืนยัน`,
      cancelButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await DeleteAssetService(asset_id);
        if (res === '200') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'ลบข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          });
          await fatchData();
        } else if (res === '404') {
          Swal.fire({
            title: 'แจ้งเตือน',
            text: 'ไม่พบรายการดังกล่าว!',
            icon: 'question',
            confirmButtonColor: '#3085d6',
          });
        }
      }
    });
  };



  return (
    <>
      <Breadcrumb pageName="Asset" defaultPageName="หน้าหลัก" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-row justify-between items-center py-6 px-4 md:px-6 xl:px-7.5 ">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              ตารางครุภัณฑ์
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
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
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
                    <th className="py-4 px-4 font-medium text-black dark:text-white"></th>
                  </tr>
                </thead>
                <tbody>
                  {result.length > 0 &&
                    result.map((item, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-sm text-black dark:text-white">
                            {item.asset_code}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="w-[50px] h-[50px]">
                              {item && item.asset_image && (
                                <img
                                  className="w-[50px] h-[50px]"
                                  src={`${processEnv}/${item.asset_image}`}
                                  style={{ objectFit: 'contain' }}
                                  alt="Product"
                                />
                              )}
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
                              type="button"
                              onClick={() =>
                                navigate(`/asset/detail`, {
                                  state: { id: item.asset_id },
                                })
                              }
                            >
                              <BsInfoSquare className="hover:text-fuchsia-600" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/asset/update`, {
                                  state: { id: item.asset_id },
                                })
                              }
                            >
                              <BsPencilSquare className="hover:text-warning" />
                            </button>
                            <button
                              onClick={() =>
                                onClickDelete(item.asset_id, item.asset_code)
                              }
                            >
                              <BsTrash className="hover:text-danger" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetTable;
