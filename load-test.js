// Import the necessary k6 modules.
// 'http' is used for making HTTP requests.
// 'sleep' is for pausing the execution to simulate real user behavior.
import http from 'k6/http';
import { sleep } from 'k6';

// 1. OPTIONS
// These are the options for the load test execution.
// You can configure the number of virtual users (VUs) and the duration of the test.
export const options = {
  // vus: The number of virtual users to run concurrently.
  vus: 100,
  // duration: The total duration of the test.
  duration: '30s',
  // thresholds: Define success criteria for the test.
  // The test will fail if these conditions are not met.
  // thresholds: {
  //   'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
  //   'http_req_duration': ['p(95)<500'], // 95% of requests should be below 200ms
  // },
};

// 2. DEFAULT FUNCTION
// This is the main function that k6 will execute for each virtual user.
// The code inside this function is executed in a loop for the specified duration.
export default function () {
  // Define the API endpoint you want to test.
  const url = 'http://localhost:5000/api/url/create';

  // Define the payload for the POST request.
  // k6 provides variables like __VU (virtual user ID) and __ITER (iteration number)
  // to help generate unique data for each request.
  // IMPORTANT: You should modify this payload to match the data structure your API expects.
  const payload = JSON.stringify({
    "url": "https://bitly.com/"
  });

  // Define the headers for the request.
  // For sending JSON data, 'Content-Type': 'application/json' is essential.
  const params = {
    headers: {
      'Content-Type': 'application/json',
      // You can add other headers here, like Authorization tokens.
      // 'Authorization': 'Bearer YOUR_API_TOKEN',
    },
  };

  // Send the POST request.
  const res = http.post(url, payload, params);


  // Add a sleep period at the end of the iteration.
  // This simulates a user pausing between actions. 1 second is a common choice.
  sleep(1);
}
