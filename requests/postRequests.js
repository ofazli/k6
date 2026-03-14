import http from "k6/http";
import { check } from "k6";
const newCrocodileUser = JSON.stringify({
  name: "Orc",
  sex: "M",
  date_of_birth: "2020-01-05",
});

export default function () {
  const body = JSON.stringify({
    username: "Or_" + Date.now(),
    password: "12342774",
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  http.post("http://localhost:8000/user/register/", body, params);

  //Getting Access Token
  let res = http.post("http://localhost:8000/auth/token/login/", body, params);
  const accessToken = res.json().access;
  console.log(accessToken);
  console.log(res.status);

  //Getting information using Access Token ( Authorization Header)

  http.get("http://localhost:8000/my/crocodiles/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  //Authorization Post Request
  res = http.post("http://localhost:8000/my/crocodiles/", newCrocodileUser, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  //Retrieve a resource after creating and assertion the id
  // Step 1 : Get the new id of the created crocodile
  const newCrocodileId = res.json().id;

  //Step 2: Retrieve the created crocodile response and assertion the id
  res = http.get(`http://localhost:8000/my/crocodiles/${newCrocodileId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  check(res, {
    "status is 200": (r) => r.status === 200,
    "crocodile id": (r) => r.json().id === newCrocodileId,
  });
  //301 Moved Permanently
  //If the response is 301, then the crocodile is not found you forget something in the endpoint or the id is wrong
}
