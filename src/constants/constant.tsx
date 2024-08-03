export const API_KEY = 'ZexDt8kzODTsIutq9cDCZB0XFrzj';


export const serviceEmployee = {
    //employee
    GET_EMPLOYEE_LOGIN_URL: "/employee/login",
    GET_EMPLOYEE_AUTHEN_URL: "/employee/authen",
    GET_EMPLOYEE_REGISTER_URL: "/employee/register",
}

export const serviceAsset = {
    //employee
    GET_ASSET_URL: "/asset/get",
    GETBYID_ASSET_TYPE_URL: "/asset/getbyid",
    INSERT_ASSET_URL: "/asset/insert",
    UPDATE_ASSET_URL: "/asset/update",
    GET_LIST_ASSET_STSTUS_URL: "/asset/get-list-status",
}

export const serviceAssetType = {
    //employee
    GET_ASSET_TYPE_URL: "/asset-type/get",
    GET_LIST_ASSET_TYPE_URL: "/asset-type/get-list",
}

export const serviceAgency = {
    //employee
    GET_AGENCY_URL: "/agency/get",
    GET_LIST_AGENCY_URL: "/agency/get-list",
}


// Local Storage
export const removeStorage = async (value:string[]) => {
    let keys:string[] = value.length > 0 ?  value : ['key','username','email','action','level'];
    keys.forEach(k => localStorage.removeItem(k))
    window.location.reload()
    return 
}


export const setStorage =  (key:string,value:any) => localStorage.setItem(key,value)
export const getStorage =  (key:string) => localStorage.getItem(key) 