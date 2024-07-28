
import axios from "../common/axios";
import { getStorage, serviceEmployee, setStorage } from "../constants/constant";

export interface LoginProps {
  username: string;
  password: string;
}


export const EmployeeLoginService = async (username:string, password:string) => {
    try {
      const body: { emp_username: string; emp_password: string } = {
        emp_username: username,
        emp_password: password,
      };
      const resp = await axios.post(serviceEmployee.GET_EMPLOYEE_LOGIN_URL,body);
      const json = resp.data
      switch (json.status) {
        case '200':          
          setStorage('key',json.data.emp_id)
          setStorage('username',json.data.emp_username)
          setStorage('action',json.data.emp_status)
          setStorage('email',json.data.emp_email)
          setStorage('level',json.data.role_id)
          return "200"
        case '400':
          console.log('WARNING:', json.detail);
          return '400'
        case '404':
          console.log('WARNING:', json.detail);
          return '404'
        default:
          console.log('WARNING:', json.detail);
          return "500"
      }

    } catch (error: any) {
      console.log('ERROR:',error.message);
      return "500"
    }
  };

  export const EmployeeAuthenService = async () => {
    try {
      const key =  getStorage('key')
      const username =  getStorage('username')
      const email =  getStorage('email')
      const action =  getStorage('action')
      const level =  getStorage('level')
      const body = {
        emp_id: key,
        emp_username: username,
        emp_email: email,
        emp_status: action,
        role_id: level,
      };
         
      const resp = await axios.post(serviceEmployee.GET_EMPLOYEE_AUTHEN_URL,body);
      const json = resp.data
      
      switch (json.status) {
        case '200':
          return "200"
        case '400':
          console.log('WARNING:', json.detail);
          return '400'
        case '404':
          console.log('WARNING:', json.detail);
          return '404'
        default:
          console.log('WARNING:', json.detail);
          return "500"
      }

    } catch (error: any) {
      console.log('ERROR:',error.message);
      return "500"
    }
  };

// export interface DataAuth {
//   branch_id?: null;
//   branch_name?: null;
//   create_date: string;
//   division_id: number;
//   division_name: string;
//   email?: null;
//   emp_id: number;
//   group_id?: null;
//   name: string;
//   organization_color_code: string;
//   organization_color_code1: string;
//   organization_id: number;
//   organization_logo: string;
//   organization_name: string;
//   phone?: null;
//   position_name: string;
//   role_id?: null;
//   status: number;
//   systems_position_id: number;
//   username: string;
// }

// interface JsonAuth {
//   data: DataAuth[];
//   status: string;
//   message: string;
// }

// export const Authenticationction = async (emp_id: string, token: string) => {
//   try {

//     let res = await axios.get(service_car.GET_AUTHENTICATION_URL + `param1=${emp_id}&param2=${token}`);
//     let json: JsonAuth = await res.data;

//     switch (json.status) {
//       case "0":
//         Swal.fire({
//           title: "กรุณารอสักครู่!",
//           timer: 1000,
//           timerProgressBar: true,
//           didOpen: () => {
//             Swal.showLoading();
//           },
//           willClose: () => {
//             Swal.fire({
//               title: "แจ้งเตือน",
//               text: "ข้อมูลการเข้าสู่ระบบบไม่ถูกต้องกำลังออกจากระบบ",
//               position: "center",
//               icon: "warning",
//               showConfirmButton: false,
//               timer: 3000,
//               didOpen: () => {
//                 Swal.showLoading();
//               },
//               willClose: () => {
//                 removeStorage([]);
//               },
//             });
//           },
//         });
//         return;
//       case "1":
//         if (json.data && json.data.length > 0) {
//           const data = json.data[0];
//           setStorage("level", data.systems_position_id);
//           return data;
//         }
//         return;
//       default:
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ กรุณาติดต่อผู้ดูแลระบบ!!",
//         });
//         return;
//     }
//   } catch (error:any) {
//     //console.log('error:',error.message);
//     Swal.fire({
//       icon: "error",
//       title: "Network Error",
//       text: error.message
//       //text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต!!",
//     });
//     return;
//   }
// };
