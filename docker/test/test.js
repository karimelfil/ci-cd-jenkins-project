const http = require("http");

const options = {
  hostname: "php-apache",
  port: 80,
  path: "/api/hello.php",
  method: "GET",
};

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    data = data.trim();
    console.log("Response:", data);

    if (data.toLowerCase() === "hello world") {
      console.log("✅ TEST PASSED");
      process.exit(0);
    } else {
      console.error("❌ TEST FAILED");
      process.exit(1);
    }
  });
});

req.on("error", (error) => {
  console.error("❌ ERROR:", error.message);
  process.exit(1);
});

req.end();