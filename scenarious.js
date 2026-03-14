import http from "k6/http";
import {check} from "k6";
import {sleep} from 'k6'
import exec from 'k6/execution';

export const options ={
  vus : 10, 
  duration : "10s",
  thresholds : {
    //https://grafana.com/docs/k6/latest/using-k6/metrics/reference/ in here you can find the metrics and the thresholds
    http_req_duration : ['p(95)<100'], // 95% of the requests should be less than 100ms
    http_req_duration : ['max<200'], // 200ms is the max duration of the requests
    http_req_failed : ['rate<0.01'], // 1% of the requests should fail
    http_reqs : ['count>20'], // 20 requests per second
    http_reqs : ['rate>4'], // 4 requests per second
    vus : ['value>9'], // 9 virtual users
    checks : ['rate>=0.98'], // 95% of the checks should be successful
  }
}

export default function () {
  const res = http.get("https://quickpizza.grafana.com/test.k6.io/" + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
  check(res, {
    'Status is 200' : (r) => r.status === 200,
    'Page startpage' : (r)=>r.body.includes('QuickPizza Legacy') === true
  })   
  sleep(2)
 
}
