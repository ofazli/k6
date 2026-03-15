import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.5.0/index.js";

export const options = {
  vus: 5,
  duration: "20s",
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  console.log("-VU stage -");
  sleep(randomIntBetween(1, 3)); //sleep for a random time between 1 and 3 seconds
  /*
  randomIntBetween(min, max) is a function that returns a random integer between min and max
  if you use randomIntBetween code is doing some iteration waiting randomly 
  min is the minimum value
  max is the maximum value
  */
}
