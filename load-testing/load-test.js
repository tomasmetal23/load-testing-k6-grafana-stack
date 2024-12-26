import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  stages: [
    { duration: '1m', target: 200 },
    { duration: '3m', target: 200 },
    { duration: '1m', target: 0 },
  ],
};
export default function () {
  http.get('http://host.docker.internal:3000'); // Adjust if needed
  sleep(1);
}