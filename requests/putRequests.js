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
  http.get("http://localhost:8000/my/crocodiles/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  res = http.post("http://localhost:8000/my/crocodiles/", newCrocodileUser, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const newCrocodileId = res.json().id;
  res = http.get(`http://localhost:8000/my/crocodiles/${newCrocodileId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  check(res, {
    "status is 200": (r) => r.status === 200,
    "crocodile id": (r) => r.json().id === newCrocodileId,
  });

  //PUT Request
  //Step 1: Write new JSON Body which part of the resource you want to update
  //Step 2: Put in the put method in the HTTP Request
  //Step 3 : Dont forget to add correct id in the endpoint
  //Step 4: Don't forget add Authirzation and Content-Type headers
  res = http.put(
    `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
    JSON.stringify({
      name: "Hatice",
      sex: "F",
      date_of_birth: "1978-05-10",
    }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );
}
