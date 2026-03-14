import http from "k6/http";
import {check} from "k6";

// check(subject, checks) — validates subject against the given checks.
// - First argument (subject): The value to validate; it is passed as the argument to each check function.
// - Second argument (checks): An object. Each key = check name (shown in reports), each value = (subject) => boolean.
//   Returning true means the check passes; false means it fails (the test keeps running, result is recorded in the summary).
// Why { check } in the import?
// k6 exports `check` as a named export (not the default). In JavaScript, to import
// a named export we use curly braces: import { name } from "module". So { check }
// means "import the export named 'check' from 'k6'". It is not an object called "checks".

export default ()=>{
   const res = http.get("https://quickpizza.grafana.com/test.k6.io/");
   check(true, {
    'true is true' : (value) => value === true
   })
}