
import axios from "../common/axios";
import {serviceRole} from "../constants/constant";


export interface RoleJson {
  role_id: string;
  role_name: string;
}

export const GetListRoleService = async () => {
  try {
    const resp = await axios.post(serviceRole.GET_LIST_ROLE_URL);
    const json = resp.data
    switch (json.status) {
      case '200':        
       const jsonData:RoleJson[] = json.data  
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
