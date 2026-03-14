import http from "k6/http";
import { check } from "k6";

export default function () {
  let res = http.get("http://localhost:8000/public/crocodiles/");
  const crocodiles = res.json(); //get the all crocodiles
  const crocodileId = crocodiles[0].id; //get the first crocodile id
  const crocodileName = crocodiles[0].name; //get the first crocodile name

  //Request By Id
  res = http.get(`http://localhost:8000/public/crocodiles/${crocodileId}/`);

  //headers
  console.log(res.headers.Allow);
  console.log(res.headers["Content-Type"]);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "crocodile name": (r) => r.json().name === crocodileName, // assert the first crocodile name and id
  });
}
