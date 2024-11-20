import * as http from "http";
import fs from "fs";
// Define API PORT
const PORT: number = 2440;

// Define API server config
const server = http.createServer(
  (request: http.IncomingMessage, response: http.ServerResponse) => {
    console.log("READ REQUEST :", request.method, request.url);
    if (request.method === "GET" && request.url === "/") {
      response.write("Welcome to Intro API");
      response.end();
    } else if (request.method === "GET" && request.url?.includes("/user")) {
      // Membaca isi file db.json
      const dataUser = JSON.parse(fs.readFileSync("./db.json").toString());
      console.log(dataUser.user);
      if (request.url.includes("?")) {
        const queryParams = request.url.split("?")[1].split("&");
        console.log(queryParams); // ["id=1", "username='edo11'"]
        const filter = dataUser.user.filter((val: any, idx: number) => {
          let check = true;
          for (let index = 0; index < queryParams.length; index++) {
            const [field, queryValue] = queryParams[index].split("="); // ["id", "1"]
            if (val[field] != queryValue) {
              // val["id"] != 1
              check = false;
              break;
            }
          }
          return check;
        });
        response.write(JSON.stringify(filter));
        response.end();
      } else {
        response.write(JSON.stringify(dataUser.user));
        response.end();
      }
    } else if (request.method === "GET" && request.url === "/product") {
      response.write("<h1>Data Product</h1>");
      response.end();
    } else {
      response.writeHead(404);
      response.write("<h1>Url Tidak Ada</h1>");
      response.end();
    }
  }
);

// Run server
server.listen(PORT, () => {
  console.log("API is running at ", PORT);
});
