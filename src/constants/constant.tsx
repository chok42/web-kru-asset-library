export const API_KEY = 'ZexDt8kzODTsIutq9cDCZB0XFrzj';


export const serviceEmployee = {
    //employee
    GET_EMPLOYEE_LOGIN_URL: "/employee/login",
    GET_EMPLOYEE_AUTHEN_URL: "/employee/authen",
    GET_EMPLOYEE_URL: "/employee/get",
    GETBYID_EMPLOYEE_URL: "/employee/getbyid",
    INSERT_EMPLOYEE_URL: "/employee/insert",
    UPDATE_EMPLOYEE_URL: "/employee/update",
    DELETE_EMPLOYEE_URL: "/employee/delete",
}

export const serviceAsset = {
    //asset
    GET_ASSET_URL: "/asset/get",
    GETBYID_ASSET_TYPE_URL: "/asset/getbyid",
    INSERT_ASSET_URL: "/asset/insert",
    UPDATE_ASSET_URL: "/asset/update",
    DELETE_ASSET_URL: "/asset/delete",
    GET_LIST_ASSET_STSTUS_URL: "/asset/get-list-status",
}

export const serviceAssetType = {
    //asset type
    GET_ASSET_TYPE_URL: "/asset-type/get",
    GET_LIST_ASSET_TYPE_URL: "/asset-type/get-list",
    INSERT_ASSET_TYPE_URL: "/asset-type/insert",
    UPDATE_ASSET_TYPE_URL: "/asset-type/update",
    DELETE_ASSET_TYPE_URL: "/asset-type/delete",

}

export const serviceAgency = {
    //aency
    GET_AGENCY_URL: "/agency/get",
    GET_LIST_AGENCY_URL: "/agency/get-list",
    INSERT_AGENCY_URL: "/agency/insert",
    UPDATE_AGENCY_URL: "/agency/update",
    DELETE_AGENCY_URL: "/agency/delete",
}

export const serviceRole = {
    //aency
    GET_LIST_ROLE_URL: "/role/get-list",
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