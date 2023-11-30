import http from 'k6/http'; 

export default function () { 
    const response = http.get('https://test.k6.io'); 
    console.log(response.body); 
}


// in order to use some options we are required
// to run in cmd the next 
// k6 run test_k6.js --vus 5 --duration 10s