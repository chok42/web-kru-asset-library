
import axios from "../common/axios";
import {serviceAgency} from "../constants/constant";


export interface AgencyBody {
  page: number;
  pageSize: number;
  search: string;
}

export interface AgencyJson {
  agency_id: string;
  agency_name: string;
}

export interface AgencyJsonSendData {
  data: AgencyJson[];
  totalCount: number;
  totalPages: number;
  status: string;
  message: string;
  detail: string;
}
//asset
//get
export const GetAgencyService = async (
  page = 1,
  pageSize = 10,
  search = '',
) => {
  try {
    const body: AgencyBody = {
      page: page,
      pageSize: pageSize,
      search: search,
    };
    const resp = await axios.post(serviceAgency.GET_AGENCY_URL, body);
    const json: AgencyJsonSendData = resp.data;
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


export const GetListAgencyService = async () => {
  try {
    const resp = await axios.post(serviceAgency.GET_LIST_AGENCY_URL);
    const json = resp.data
    switch (json.status) {
      case '200':        
       const jsonData:AgencyJson[] = json.data  
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

export interface InsertAgencyJson {
  agency_name: string;
}

//insert
export const InsertAgencyService = async (data: InsertAgencyJson) => {
  try {
    const body = { ...data };

    const resp = await axios.post(serviceAgency.INSERT_AGENCY_URL, body);
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
export interface UpdateAgencyJson {
  agency_id: string;
  agency_name: string;
}

export const UpdateAgencyService = async (data: UpdateAgencyJson) => {
  try {
    const body = { ...data };

    const resp = await axios.post(serviceAgency.UPDATE_AGENCY_URL, body);
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
export const DeleteAgencyService = async (id: string) => {
  try {
    const body = {
      agency_id: id,
    };

    const resp = await axios.post(serviceAgency.DELETE_AGENCY_URL, body);
    const json = resp.data;
    if (json) {
      return json.status;
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return '500';
  }
};


