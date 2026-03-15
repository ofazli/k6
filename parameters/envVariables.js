import http from "k6/http";

export default function () {
  //First you need to set the BASE_URL in the command line
  //k6 run -e BASE_URL=http://localhost:8000/public/crocodiles/ parameters/envVariables.js
  //Then you can use the BASE_URL in the script
  //__ENV.BASE_URL is a special variable that k6 provides to access the environment variables
  //__ENV is a special object that k6 provides to access the environment variables
  //__ENV.BASE_URL is a special variable that k6 provides to access the environment variables
  //__ENV.BASE_URL is a special variable that k6 provides to access the environment variables
  http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}
