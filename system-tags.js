import http from "k6/http";
import {sleep} from 'k6';


export const options ={
  thresholds : {
    http_req_duration : ['p(95)<1000'],
    'http_req_duration{status:200}' : ['p(95)<500'],
    'http_req_duration{status:201}' : ['p(95)<500'],

  }
}




export default function () {
http.get("https://1f46f6ed64034d179205b23f6d564653.api.mockbin.io/");
http.get('https://6266954839c043ffaefeb324461d1ef0.api.mockbin.io/')


 
}
