/* eslint-disable */
import axios from 'axios';
const API_URL = 'https://breannebeutler.pythonanywhere.com'; /*http://groyce.pythonanywhere.com' or http://localhost:8000 or https://breannebeutler.pythonanywhere.com*/

export class APIService {
  constructor() {

  }

   getEmployee(param_pk) {
     const url = `${API_URL}/api/employees/${param_pk}`;
     let jwtToken = localStorage.getItem('token');
     console.log(":::jwtToken:::::"+jwtToken);
     const headers = {Authorization: `jwt ${jwtToken}`};
     return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }

   getEmployeeList() {
    const url = `${API_URL}/api/employees/`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});

  }

  addNewEmployee(employee){
   const url = `${API_URL}/api/employees/`;
   let jwtToken = localStorage.getItem('token');
   const headers = {Authorization: `jwt ${jwtToken}`};
   return axios.post(url, employee, {headers: headers});
  }

  updateEmployee(employee){
    const url = `${API_URL}/api/employees/${employee.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, employee, {headers: headers});
  }

  deleteEmployee(employee_Pk){
     const url = `${API_URL}/api/employees/${employee_Pk}`;
     let jwtToken = localStorage.getItem('token');
     const headers = {Authorization: `jwt ${jwtToken}`};
     return axios.delete(url, {headers: headers});
  }


  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }

  getMeeting(param_pk) {
       const url = `${API_URL}/api/meetings/${param_pk}`;
       let jwtToken = localStorage.getItem('token');
       console.log(":::jwtToken:::::"+jwtToken);
       const headers = {Authorization: `jwt ${jwtToken}`};
       return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
    }


     getMeetingList() {
         const url = `${API_URL}/api/meetings`;
         let jwtToken = localStorage.getItem('token');
         console.log(":::jwtToken:::::" + jwtToken);
         const headers = {Authorization: `jwt ${jwtToken}`};
         return axios.get(url, {headers: headers});

     }

      addNewMeeting(meeting){
     const url = `${API_URL}/api/meetings/`;
     let jwtToken = localStorage.getItem('token');
     const headers = {Authorization: `jwt ${jwtToken}`};
     return axios.post(url, meeting, {headers: headers});
    }

    updateMeeting(meeting){
      const url = `${API_URL}/api/meetings/${meeting.pk}`;
      let jwtToken = localStorage.getItem('token');
      const headers = {Authorization: `jwt ${jwtToken}`};
      return axios.put(url, meeting, {headers: headers});
    }

    deleteMeeting(meeting_Pk){
       const url = `${API_URL}/api/meetings/${meeting_Pk}`;
       let jwtToken = localStorage.getItem('token');
       const headers = {Authorization: `jwt ${jwtToken}`};
       return axios.delete(url, {headers: headers});
    }
  
  getStock(param_pk) {
       const url = `${API_URL}/api/stocks/${param_pk}`;
       let jwtToken = localStorage.getItem('token');
       console.log(":::jwtToken:::::"+jwtToken);
       const headers = {Authorization: `jwt ${jwtToken}`};
       return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
    }


     getStockList() {
         const url = `${API_URL}/api/stocks`;
         let jwtToken = localStorage.getItem('token');
         console.log(":::jwtToken:::::" + jwtToken);
         const headers = {Authorization: `jwt ${jwtToken}`};
         return axios.get(url, {headers: headers});

     }

      addNewStock(stock){
     const url = `${API_URL}/api/stocks/`;
     let jwtToken = localStorage.getItem('token');
     const headers = {Authorization: `jwt ${jwtToken}`};
     return axios.post(url, stock, {headers: headers});
    }

    updateStock(stock){
      const url = `${API_URL}/api/stocks/${stock.pk}`;
      let jwtToken = localStorage.getItem('token');
      const headers = {Authorization: `jwt ${jwtToken}`};
      return axios.put(url, stock, {headers: headers});
    }

    deleteStock(stock_Pk){
       const url = `${API_URL}/api/stocks/${stock_Pk}`;
       let jwtToken = localStorage.getItem('token');
       const headers = {Authorization: `jwt ${jwtToken}`};
       return axios.delete(url, {headers: headers});
    }
  }
