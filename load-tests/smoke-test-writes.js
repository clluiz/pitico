import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3, 
  duration: '1m', 
};

export default () => {

  const url = 'http://localhost:5000/api/url/create';
  const payload = JSON.stringify({
    "url": "https://bitly.com/"
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const res = http.post(url, payload, params);

  check(res, { 'status returned 201': (r) => r.status == 201 })
  sleep(1);
};