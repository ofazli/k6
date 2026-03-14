import http from "k6/http";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<300"],
    "http_req_duration{status:200}": ["p(95)<300"],
    "http_req_duration{status:201}": ["p(95)<500"],
  },
};

export default () => {
  http.get("https://665a15e8ebd94b92a26543a5a5a12104.api.mockbin.io/");
  http.get("https://f6c3eb9e886b47428d1b8b343d98a138.api.mockbin.io/");
};
