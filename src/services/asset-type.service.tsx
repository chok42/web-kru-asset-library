import axios from '../common/axios';
import { serviceAssetType } from '../constants/constant';

export interface AssetTypeBody {
  page: number;
  pageSize: number;
  search: string;
}

export interface AssetTypeJson {
  asset_type_id: string;
  asset_type_name: string;
}

export interface AssetTypeJsonSendData {
  data: AssetTypeJson[];
  totalCount: number;
  totalPages: number;
  status: string;
  message: string;
  detail: string;
}
//asset
//get
export const GetAssetTypeService = async (
  page = 1,
  pageSize = 10,
  search = '',
) => {
  try {
    const body: AssetTypeBody = {
      page: page,
      pageSize: pageSize,
      search: search,
    };
    const resp = await axios.post(serviceAssetType.GET_ASSET_TYPE_URL, body);
    const json: AssetTypeJsonSendData = resp.data;
    switch (json.status) {
      case '200':
        return json;
      case '400':
        console.log('WARNING:', json.detail);
        return;
      case '404':
        console.log('WARNING:', json.detail);
        return;
      default:
        console.log('WARNING:', json.detail);
        return;
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return;
  }
};

export interface InsertAssetTypeJson {
  asset_type_name: string;
}

//insert
export const InsertAssetTypeService = async (data: InsertAssetTypeJson) => {
  try {
    const body = { ...data };

    const resp = await axios.post(serviceAssetType.INSERT_ASSET_TYPE_URL, body);
    const json = resp.data;

    if (json) {
      return json.status;
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return;
  }
};

//update
export interface UpdateAssetTypeJson {
  asset_type_id: string;
  asset_type_name: string;
}

export const UpdateAssetTypeService = async (data: UpdateAssetTypeJson) => {
  try {
    const body = { ...data };

    const resp = await axios.post(serviceAssetType.UPDATE_ASSET_TYPE_URL, body);
    const json = resp.data;
    if (json) {
      return json.status;
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return '500';
  }
};

//delete
export const DeleteAssetTypeService = async (id: string) => {
  try {
    const body = {
      asset_type_id: id,
    };

    const resp = await axios.post(serviceAssetType.DELETE_ASSET_TYPE_URL, body);
    const json = resp.data;
    if (json) {
      return json.status;
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return '500';
  }
};

export const GetListAssetTypeService = async () => {
  try {
    const resp = await axios.post(serviceAssetType.GET_LIST_ASSET_TYPE_URL);
    const json = resp.data;
    switch (json.status) {
      case '200':
        const jsonData: AssetTypeJson[] = json.data;
        return jsonData;
      case '404':
        console.log('WARNING:', json.detail);
        return;
      default:
        console.log('WARNING:', json.detail);
        return;
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return;
  }
};
