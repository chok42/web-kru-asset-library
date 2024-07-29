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
    GET_EMPLOYEE_AUTHEN_URL: "/employee/authen",
    GET_EMPLOYEE_REGISTER_URL: "/employee/register",
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