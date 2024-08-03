
import axios from "../common/axios";
import { serviceAsset} from "../constants/constant";


export interface AssetBody {
  page: number;
  pageSize: number;
  search: string;
  asset_is_used: string;
  asset_status_id: string;
  agency_id: string;
  asset_type_id: string;
}

export interface AssetJson {
  asset_id: string;
  asset_code: string;
  asset_name: string;
  agency_name: string;
  asset_model: string;
  asset_brand: string;
  asset_description: string;
  asset_price: number;
  asset_creation_date: string;
  asset_start_date: string;
  asset_building_code: string;
  asset_image: string;
  asset_is_used: string;
  asset_status_id: string;
  asset_status_name: string;
  agency_id: string;
  asset_type_id: string;
  asset_type_name: string;
  emp_id: string;
}

//asset
//get
export const GetAssetService = async (page = 1,pageSize = 10,search = '',asset_is_used = '',asset_status_id = '',agency_id = '',asset_type_id = '') => {
    try {
      const body: AssetBody = {
        page: page,
        pageSize: pageSize,
        search: search,
        asset_is_used:asset_is_used,
        asset_status_id: asset_status_id,
        agency_id: agency_id,
        asset_type_id: asset_type_id,
      };
      const resp = await axios.post(serviceAsset.GET_ASSET_URL,body);
      const json = resp.data
      switch (json.status) {
        case '200':        
         const jsonData:AssetJson[] = json.data  
          return jsonData
        case '400':
          console.log('WARNING:', json.detail);
          return 
        case '404':
          console.log('WARNING:', json.detail);
          return 
        default:
          console.log('WARNING:', json.detail);
          return 
      }

    } catch (error: any) {
      console.log('ERROR:',error.message);
      return 
    }
};

export interface InsertAssetJson {
  asset_code: string;
  asset_name: string;
  asset_model: string;
  asset_brand: string;
  asset_description: string;
  asset_price: number;
  asset_start_date: string;
  asset_building_code: string;
  asset_image: string;
  asset_is_used: string;
  asset_status_id: string;
  agency_id: string;
  asset_type_id: string;
  emp_id: string;
}

//insert
export const InsertAssetService = async (data:InsertAssetJson) => {
  try {
    const body = {...data};
    console.log('body',body);
    
    const resp = await axios.post(serviceAsset.INSERT_ASSET_URL,body);
    const json = resp.data

    if (json) {
      return json.status
    } 

  } catch (error: any) {
    console.log('ERROR:',error.message);
    return 
  }
};

export interface UpdateAssetJson {
  asset_id:string,
  asset_code: string;
  asset_name: string;
  asset_model: string;
  asset_brand: string;
  asset_description: string;
  asset_price: number;
  asset_start_date: string;
  asset_building_code: string;
  asset_image: string;
  asset_image_old: string;
  asset_is_used: string;
  asset_status_id: string;
  agency_id: string;
  asset_type_id: string;
  emp_id: string;
}

export const UpdateAssetService = async (data:UpdateAssetJson) => {
  try {
    const body = {...data};
    console.log('body',body);
    
    const resp = await axios.post(serviceAsset.UPDATE_ASSET_URL,body);
    if (resp.status === 200) {
      const json = resp.data;
      if (json) {
        return json.status;
      }
    }
  } catch (error: any) {
    console.log('ERROR:',error.message);
    return  '500'
  }
};

//asset status
//get
export interface AssetStatusJson {
  asset_status_id: string;
  asset_status_name: string;
}

export const GetByIdAssetService = async (id:string) => {
  try {
    const body:{asset_id:string} = {
      asset_id:id
    }
    const resp = await axios.post(serviceAsset.GETBYID_ASSET_TYPE_URL,body);
    const json = resp.data
    switch (json.status) {
      case '200':        
       const jsonData:AssetJson = json.data  
        return jsonData
      case '404':
        console.log('WARNING:', json.detail);
        return 
      default:
        console.log('WARNING:', json.detail);
        return 
    }

  } catch (error: any) {
    console.log('ERROR:',error.message);
    return 
  }
};


export const GetListAssetStatusService = async () => {

  try {
    const resp = await axios.post(serviceAsset.GET_LIST_ASSET_STSTUS_URL);
    const json = resp.data
    switch (json.status) {
      case '200':        
       const jsonData:AssetStatusJson[] = json.data  
        return jsonData
      case '404':
        console.log('WARNING:', json.detail);
        return 
      default:
        console.log('WARNING:', json.detail);
        return 
    }

  } catch (error: any) {
    console.log('ERROR:',error.message);
    return 
  }
};