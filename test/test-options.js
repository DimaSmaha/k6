import http from 'k6/http'; 

export const options = {
    vus: 5,
    duration: '15s',
  };

export default function () { 
    const response = http.get('https://test.k6.io'); 
    console.log(response.body); 
}