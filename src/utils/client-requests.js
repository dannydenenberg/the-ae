/**
For helping with requests to the server.
 */

// let api = "/api";

export async function POST(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // MUST be 'include' for cookies
    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function GET(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // MUST be 'include' for cookies
    // headers: {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export function checkIfLoggedOn() {
  return new Promise((resolve, reject) => {
    GET("/api/validatetoken").then((a) => {
      if (a.error) {
        console.log(`📮 you are NOT logged on.`);
        resolve(false);
      } else {
        console.log(`✅ you are logged on.`);
        resolve(true);
      }
    });
  });
}

export let redirectTo = (url) => window.location.replace(url);
