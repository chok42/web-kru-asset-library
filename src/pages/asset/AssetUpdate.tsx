import { useMemo, useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
//components
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
//images
import iconSun from '../../images/icon/icon-sun.svg';
//services
import {AssetTypeJson,GetListAssetTypeService} from '../../services/asset-type.service';
import {AgencyJson,GetListAgencyService,} from '../../services/agency.service';
import ImageUploader from './ImageUploader';
import {AssetJson, AssetStatusJson,GetByIdAssetService,GetListAssetStatusService, UpdateAssetJson, UpdateAssetService} from '../../services/asset.service';
//constants
import { getStorage } from '../../constants/constant';
//common
import { processEnv } from '../../common/axios';

const AssetSchema = Yup.object().shape({
  asset_code: Yup.string()
    .max(50, 'จำนวนตัวอักษรมากกว่า 100 ตัวอักษร')
    .required('กรุณากรอกรหัสวัสดุครุภัณฑ์'),
  asset_name: Yup.string()
    .max(250, 'จำนวนตัวอักษรมากกว่า 250 ตัวอักษร')
    .required('กรุณากรอกชื่อวัสดุครุภัณฑ์'),
  asset_model: Yup.string()
    .max(100, 'จำนวนตัวอักษรมากกว่า 100 ตัวอักษร')
    .required('กรุณากรอกรุ่น'),
  asset_brand: Yup.string()
    .max(100, 'จำนวนตัวอักษรมากกว่า 100 ตัวอักษร')
    .required('กรุณากรอกยี่ห้อ'),
  asset_building_code:  Yup.string()
    .max(50, 'จำนวนตัวอักษรมากกว่า 50 ตัวอักษร')
    .required('รหัสอาคาร - ห้อง'),
});

const AssetUpdate = () => {
  const location = useLocation()
  const {id}:{id:string} = location.state ? location.state :{}
  const navigate = useNavigate()
  const [asset, setAsset] = useState<AssetJson>();
  const [assetType, setAssetType] = useState<AssetTypeJson[]>([]);
  const [agency, setAgency] = useState<AgencyJson[]>([]);
  const [assetStatus, setAssetStatus] = useState<AssetStatusJson[]>([]);
  const [validateRepeat, setValidateRepeat] = useState<boolean>(false);

  const emp_id = getStorage('key')

  useMemo(async () => {
    const asset = await GetByIdAssetService(id)
    const asset_type = await GetListAssetTypeService();
    const agency = await GetListAgencyService();
    const status = await GetListAssetStatusService();
    setAsset(asset)
    setAssetType(asset_type ? asset_type : []);
    setAgency(agency ? agency : []);
    setAssetStatus(status ? status : []);
  }, []);

  const onSubmitAsset = async (data: UpdateAssetJson) => {
    const resp = await UpdateAssetService(data);
    if (resp === '200') {
      navigate(-1)
    } else if(resp === "404"){
      setValidateRepeat(true)
    }
  };
  
  return (
    <>
      <Breadcrumb pageName="แก้ไขวัสดุครุภัณฑ์" defaultPageName='หน้าหลัก' />
      <Formik
        enableReinitialize
        validationSchema={AssetSchema}
        initialValues={{
          asset_id: id,
          asset_code: asset ? asset.asset_code : "",
          asset_name: asset ? asset.asset_name : "",
          asset_model: asset ? asset.asset_model : "",
          asset_brand: asset ? asset.asset_brand : "",
          asset_description: asset ? asset.asset_description : "",
          asset_price: asset ? asset.asset_price : 0,
          asset_start_date: asset ? moment(asset.asset_start_date).format('YYYY-MM-DD') : "",
          asset_building_code: asset ? asset.asset_building_code : "",
          asset_is_used: asset ? asset.asset_is_used : "",
          asset_status_id: asset ? asset.asset_status_id : "",
          agency_id: asset ? asset.agency_id : "",
          asset_type_id: asset ? asset.asset_type_id : "",
          asset_image:  "",
          asset_image_old: asset ? `${processEnv}/${asset.asset_image}` : iconSun,
          emp_id: emp_id ? emp_id : '',
        }}
        onSubmit={onSubmitAsset}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-5 xl:col-span-2">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      รูปภาพครุภันฑ์
                    </h3>
                  </div>
                  <div className="p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-30 w-30 rounded-full">
                        {
                          <img
                            src={values.asset_image ? values.asset_image : values.asset_image_old}
                            alt="image"
                            height={'100px'}
                            width={'100px'}
                          />
                        }
                      </div>
                      <div>
                        <span className="mb-1.5 text-black dark:text-white">
                          เลือกรูปภาพ
                        </span>
                      </div>
                    </div>
                    <ImageUploader
                      onChange={(base64: unknown) =>
                        setFieldValue('asset_image', base64)
                      }
                    />
                    <div className="flex justify-end gap-4.5">
                      <button
                        disabled={values.asset_image ? false : true}
                        onClick={() => setFieldValue('asset_image', '')}
                        className={`flex justify-center rounded ${
                          values.asset_image ? `bg-danger` : `bg-black`
                        }  py-2 px-6 font-medium text-gray hover:bg-opacity-90`}
                        type="submit"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      เพิ่มข้อมูลวัสดุครุภัณฑ์
                    </h3>
                  </div>
                  <div className="p-7">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          รหัสวัสดุครุภัณฑ์
                        </label>
                        <input
                          disabled
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="asset_code"
                          value={values.asset_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=""
                        />
                        {validateRepeat && (
                          <p className="mt-3 block text-sm font-medium text-danger ">
                            รหัสวัสดุครุภัณฑ์ซ้ำ
                          </p>
                        )}

                        {touched.asset_code && errors.asset_code && (
                          <p className="mt-3 block text-sm font-medium text-danger ">
                            <ErrorMessage name="asset_code" />
                          </p>
                        )}
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          ชื่อวัสดุครุภัณฑ์
                        </label>
                        <div className="relative">
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="asset_name"
                            value={values.asset_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder=""
                          />
                        </div>
                        {touched.asset_name && errors.asset_name && (
                          <p className="mt-3 block text-sm font-medium text-danger ">
                            <ErrorMessage name="asset_name" />
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          รุ่น
                        </label>
                        <div className="relative">
                          <input
                            id="asset_model"
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="asset_model"
                            value={values.asset_model}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder=""
                          />
                        </div>
                        {touched.asset_model && errors.asset_model && (
                          <p className="mt-3 block text-sm font-medium text-danger ">
                            <ErrorMessage name="asset_model" />
                          </p>
                        )}
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          ยี่ห้อ
                        </label>
                        <input
                          id="asset_brand"
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="asset_brand"
                          value={values.asset_brand}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=""
                        />
                        {touched.asset_brand && errors.asset_brand && (
                          <p className="mt-3 block text-sm font-medium text-danger ">
                            <ErrorMessage name="asset_brand" />
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                  
                        >
                          ราคา
                        </label>
                        <div className="relative">
                          <input
                        
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name="asset_price"
                            min={0}
                            value={values.asset_price}
                            onChange={(e)=> {
                               const price = parseFloat(e.target.value)
                               if(price < 0){
                                setFieldValue('asset_price',0)
                                return
                               }
                               setFieldValue('asset_price',price)
                            }}
                            onBlur={handleBlur}
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                          อาคาร/ห้อง
                        </label>
                        <input
                          id="asset_building_code"
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="asset_building_code"
                          value={values.asset_building_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=""
                        />
                        {touched.asset_building_code &&
                          errors.asset_building_code && (
                            <p className="mt-3 block text-sm font-medium text-danger ">
                              <ErrorMessage name="asset_building_code" />
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          ประเภท
                        </label>
                        <div className="relative">
                          <select
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="asset_type_id"
                            value={values.asset_type_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option
                              value=""
                              disabled
                              className="text-body dark:text-bodydark"
                            >
                              เลือกประเภท
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
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          สถาบัน
                        </label>
                        <div className="relative">
                          <select
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="agency_id"
                            value={values.agency_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option
                              value=""
                              disabled
                              className="text-body dark:text-bodydark"
                            >
                              เลือกสถาบัน
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
                      </div>
                    </div>{' '}
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          วันที่เริ่มใช้งาน
                        </label>
                        <input
                          id="asset_start_date"
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="date"
                          name="asset_start_date"
                          value={values.asset_start_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=""
                        />
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          สถานะ
                        </label>
                        <div className="relative">
                          <select
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="asset_status_id"
                            value={values.asset_status_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option
                              value=""
                              disabled
                              className="text-body dark:text-bodydark"
                            >
                              เลือกสถานะ
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
                    </div>
                    <div className="w-full mb-5.5">
                      <div className="w-20">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="Username"
                        >
                          การใช้งาน
                        </label>
                        <label
                          htmlFor="toggle1"
                          className="flex cursor-pointer select-none items-center"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="toggle1"
                              className="sr-only"
                              onChange={() => {
                                setFieldValue(
                                  'asset_is_used',
                                  !values.asset_is_used,
                                );
                              }}
                            />
                            <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                            <div
                              className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                                values.asset_is_used &&
                                '!right-1 !translate-x-full !bg-success dark:!bg-white'
                              }`}
                            ></div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        คำอธิบาย
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                fill=""
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_88_10224">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>

                        <textarea
                          id="asset_description"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="asset_description"
                          value={values.asset_description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={6}
                          placeholder=""
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="button"
                        onClick={() => navigate(-1)}
                      >
                        ย้อนกลับ
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        บันทึก
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AssetUpdate;
