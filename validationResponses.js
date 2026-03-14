import http from "k6/http";
import {check} from "k6";

export default ()=>{
    const res = http.get("https://quickpizza.grafana.com/test.k6.io/");
    check(res, {
// You can use 'res' instead of 'r': the parameter name is up to you (e.g. (res) => res.status === 200).
// You can also omit the parameter and use the outer 'res': () => res.status === 200. Both work;
// (r) => ... makes it clear we're validating the value passed to check(); () => res.status ...
// uses the variable from the surrounding scope and gives the same result here.
        'status is 200' : (r) => r.status === 200,
        'page is startpage' : (r) => r.body.includes('QuickPizza Legacy')

    })

 }
