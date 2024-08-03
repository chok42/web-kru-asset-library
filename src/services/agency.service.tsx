
import axios from "../common/axios";
import {serviceAgency, serviceAssetType} from "../constants/constant";


export interface AgencyBody {
  page: number;
  pageSize: number;
  search: string;
}

export interface AgencyJson {
  agency_id: number;
  agency_name: string;
}


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