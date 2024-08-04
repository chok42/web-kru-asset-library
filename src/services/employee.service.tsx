import axios from '../common/axios';
import { getStorage, serviceEmployee, setStorage } from '../constants/constant';

export interface LoginProps {
  username: string;
  password: string;
}

export const EmployeeLoginService = async (
  username: string,
  password: string,
) => {
  try {
    const body: { emp_username: string; emp_password: string } = {
      emp_username: username,
      emp_password: password,
    };
    const resp = await axios.post(serviceEmployee.GET_EMPLOYEE_LOGIN_URL, body);
    const json = resp.data;
    switch (json.status) {
      case '200':
        setStorage('key', json.data.emp_id);
        setStorage('username', json.data.emp_username);
        setStorage('action', json.data.emp_status);
        setStorage('email', json.data.emp_email);
        setStorage('level', json.data.role_id);
        return '200';
      case '400':
        console.log('WARNING:', json.detail);
        return '400';
      case '404':
        console.log('WARNING:', json.detail);
        return '404';
      default:
        console.log('WARNING:', json.detail);
        return '500';
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return '500';
  }
};

export const EmployeeAuthenService = async () => {
  try {
    const key = getStorage('key');
    const username = getStorage('username');
    const email = getStorage('email');
    const action = getStorage('action');
    const level = getStorage('level');
    const body = {
      emp_id: key,
      emp_username: username,
      emp_email: email,
      emp_status: action,
      role_id: level,
    };

    const resp = await axios.post(
      serviceEmployee.GET_EMPLOYEE_AUTHEN_URL,
      body,
    );
    const json = resp.data;

    switch (json.status) {
      case '200':
        return '200';
      case '400':
        console.log('WARNING:', json.detail);
        return '400';
      case '404':
        console.log('WARNING:', json.detail);
        return '404';
      default:
        console.log('WARNING:', json.detail);
        return '500';
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return '500';
  }
};

export interface EmployeeBody {
  page: number;
  pageSize: number;
  search: string;
  role_id: string;
}

export interface EmployeeJson {
  emp_id: string;
  emp_username: string;
  emp_password: string;
  emp_firstname: string;
  emp_lastname: string;
  emp_phone: string;
  emp_email: string;
  emp_status: string;
  role_id: string;
  role_name: string;
}

export interface EmployeeJsonSendData {
  data: EmployeeJson[];
  totalCount: number;
  totalPages: number;
  status: string;
  message: string;
  detail: string;
}
//employee
//get
export const GetEmployeeService = async (
  page = 1,
  pageSize = 10,
  search = '',
  role_id = '',
) => {
  try {
    const body: EmployeeBody = {
      page: page,
      pageSize: pageSize,
      search: search,
      role_id: role_id,
    };
    const resp = await axios.post(serviceEmployee.GET_EMPLOYEE_URL, body);
    const json: EmployeeJsonSendData = resp.data;
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

export const GetByIdEmployeeService = async (id: string) => {
  try {
    const body = {
      emp_id: id,
    };
    const resp = await axios.post(serviceEmployee.GETBYID_EMPLOYEE_URL, body);
    const json = resp.data;
    switch (json.status) {
      case '200':
        const jsonData: EmployeeJson = json.data;
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
export interface InsertEmployeeJson {
  emp_username: string;
  emp_password: string;
  emp_firstname: string;
  emp_lastname: string;
  emp_phone: string;
  emp_email: string;
  emp_status: string;
  role_id: string;
}

//insert
export const InsertEmployeeService = async (data: InsertEmployeeJson) => {
  try {
    const body = { ...data };

    const resp = await axios.post(serviceEmployee.INSERT_EMPLOYEE_URL, body);
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
export interface UpdateEmployeeJson {
  emp_id: string;
  emp_username: string;
  emp_password: string;
  emp_firstname: string;
  emp_lastname: string;
  emp_phone: string;
  emp_email: string;
  emp_status: string;
  role_id: string;
}

export const UpdateEmployeeService = async (data: UpdateEmployeeJson) => {
  try {
    const body = { ...data };

    const resp = await axios.post(serviceEmployee.UPDATE_EMPLOYEE_URL, body);
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
export const DeleteEmployeeService = async (id: string) => {
  try {
    const body = {
      emp_id: id,
    };

    const resp = await axios.post(serviceEmployee.DELETE_EMPLOYEE_URL, body);
    const json = resp.data;
    if (json) {
      return json.status;
    }
  } catch (error: any) {
    console.log('ERROR:', error.message);
    return '500';
  }
};
