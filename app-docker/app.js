const puppeteer = require("puppeteer-core");
const app = require("express")();
var bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const pjson = require("./package.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

var browser;

puppeteer
  .launch({
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })
  .then((res) => {
    browser = res;
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", function (req, res) {
  res.redirect("/api-docs");
});

app.post("/converter/htmltopdf", async (req, res) => {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  if (req.body.url != undefined) {
    await page.goto(req.body.url);
  } else {
    await page.setContent(req.body.html);
  }

  var options = Object.assign(
    {},
    {
      format: "A4",
      printBackground: true,
    },
    req.body.options ?? {}
  );

  options.path = null;
  options.timeout = 0;

  var pdf = await page.pdf(options);

  page.close();

  var producerIndex = pdf.indexOf("Creator");
  var producerLineEndIndex = pdf.indexOf("\n", pdf.indexOf("Producer"));

  const before = pdf.slice(0, producerIndex);
  const after = pdf.slice(producerLineEndIndex);

  pdf = Buffer.concat([
    before,
    Buffer.from(
      "Creator (" +
        pjson.repository.url +
        ")\n/Producer (" +
        pjson.repository.url +
        ")"
    ),
    after,
  ]);

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    status: "success",
    data: {
      pdf: pdf.toString("base64"),
    },
  });
});

app.listen(PORT, HOST, () => {
  console.log(`App listening on port ${PORT}`);
});
