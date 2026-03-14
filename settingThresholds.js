import http from "k6/http";
import {check} from "k6";
import {sleep} from 'k6';

export const options = {
    vus : 10, 
    duration : '10s',
    thresholds :{
        http_req_duration : ['p(95)<35'], // 95% of the requests should be less than 35ms
        http_req_failed : ['rate<0.01'] // 1% of the requests should fail
    }

}

export default ()=>{
    const res = http.get("https://quickpizza.grafana.com/test.k6.io/");
    check(res, {
        'status is 200' : (r) => r.status === 200,
        'page is startpage' : (r) => r.body.includes('QuickPizza Legacy')

    })
    sleep(2)

 }

 /*
 What are thresholds ? 
 In K6, thresholds are pass/fail criteria for your load test. You define conditions on metrics
 If any threshold is not met, k6 exist with a non-zero exit code so the test is considered failed. 
 What are they used for ? 
 - Enforce SLAs (e.g max reponse time, max error rate)
 - Make CI/CD pipelines fail when performance degrades. 
 - Catch regressions automatically after deployments.
 */