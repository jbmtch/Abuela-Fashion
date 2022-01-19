import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '15s'
}
//get questions
// const url = 'http://localhost:8080/qa/questions?product_id=450&count=10&page=1';

// //get reviews
const url = `http://localhost:5555/reviews/meta/?product_id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}`;




export default function () {
  const res = http.get(url);
  sleep(1);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200 ms': r => r.timings.duration < 200,
    'transaction time < 500 ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
}