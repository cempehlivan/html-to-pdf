# Chromium-based HTML to PDF API

![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/cempehlivan/html-to-pdf)

Run in docker container:

```bash
docker run -p 3000:3000 -d --restart always cempehlivan/html-to-pdf
```

Run in NodeJS:

```bash
cd app
..
npm install
..
node app.js
```

swagger documentation url: `http://localhost:3000/api-docs`

html to pdf endpoint: `http://localhost:3000/converter/htmltopdf`

## Parameters

| Parameter | Type                       | Description       |
| --------- | -------------------------- | ----------------- |
| html      | HTML string                | required          |
| options   | [PDFOptions](#pdf-options) | <i>(Optional)</i> |

### PDF Options

| Property             | Type                         | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| displayHeaderFooter? | boolean                      | <i>(Optional)</i> Whether to show the header and footer.                                                                                                                                                                                                                                                                                                                                    |
| footerTemplate?      | string                       | <i>(Optional)</i> HTML template for the print footer. Has the same constraints and support for special classes as [PDFOptions.headerTemplate](./puppeteer.pdfoptions.headertemplate.md).                                                                                                                                                                                                    |
| format?              | [PaperFormat](#paper-format) | <i>(Optional)</i>                                                                                                                                                                                                                                                                                                                                                                           |
| headerTemplate?      | string                       | <p><i>(Optional)</i> HTML template for the print header. Should be valid HTML with the following classes used to inject values into them: - <code>date</code> formatted print date</p><p>- <code>title</code> document title</p><p>- <code>url</code> document location</p><p>- <code>pageNumber</code> current page number</p><p>- <code>totalPages</code> total pages in the document</p> |
| height?              | string \| number             | <i>(Optional)</i> Sets the height of paper. You can pass in a number or a string with a unit.                                                                                                                                                                                                                                                                                               |
| landscape?           | boolean                      | <i>(Optional)</i> Whether to print in landscape orientation.                                                                                                                                                                                                                                                                                                                                |
| margin?              | [PDFMargin](#pdf-margin)     | <i>(Optional)</i> Set the PDF margins.                                                                                                                                                                                                                                                                                                                                                      |
| omitBackground?      | boolean                      | <i>(Optional)</i> Hides default white background and allows generating pdfs with transparency.                                                                                                                                                                                                                                                                                              |
| pageRanges?          | string                       | <i>(Optional)</i> Paper ranges to print, e.g. <code>1-5, 8, 11-13</code>.                                                                                                                                                                                                                                                                                                                   |
| path?                | string                       | <i>(Optional)</i> The path to save the file to.                                                                                                                                                                                                                                                                                                                                             |
| preferCSSPageSize?   | boolean                      | <i>(Optional)</i> Give any CSS <code>@page</code> size declared in the page priority over what is declared in the <code>width</code> or <code>height</code> or <code>format</code> option.                                                                                                                                                                                                  |
| printBackground?     | boolean                      | <i>(Optional)</i> Set to <code>true</code> to print background graphics.                                                                                                                                                                                                                                                                                                                    |
| scale?               | number                       | <i>(Optional)</i> Scales the rendering of the web page. Amount must be between <code>0.1</code> and <code>2</code>.                                                                                                                                                                                                                                                                         |
| timeout?             | number                       | <i>(Optional)</i> Timeout in milliseconds                                                                                                                                                                                                                                                                                                                                                   |
| width?               | string \| number             | <i>(Optional)</i> Sets the width of paper. You can pass in a number or a string with a unit.                                                                                                                                                                                                                                                                                                |

### Paper Format

The sizes of each format are as follows: - `Letter`: 8.5in x 11in

- `Legal`: 8.5in x 14in

- `Tabloid`: 11in x 17in

- `Ledger`: 17in x 11in

- `A0`: 33.1in x 46.8in

- `A1`: 23.4in x 33.1in

- `A2`: 16.54in x 23.4in

- `A3`: 11.7in x 16.54in

- `A4`: 8.27in x 11.7in

- `A5`: 5.83in x 8.27in

- `A6`: 4.13in x 5.83in

### PDF Margin

| Property | Modifiers | Type             | Description       |
| -------- | --------- | ---------------- | ----------------- |
| bottom?  |           | string \| number | <i>(Optional)</i> |
| left?    |           | string \| number | <i>(Optional)</i> |
| right?   |           | string \| number | <i>(Optional)</i> |
| top?     |           | string \| number | <i>(Optional)</i> |

## Post JSON

```json
{
    "html": "<h1>test</h1>",
    "options": {
        "format": "A4",
        "printBackground": true,
        "margin": {
            "top": "10.5mm",
            "left": "10.5mm",
            "right": "10.5mm",
            "bottom": "10.5mm"
        }
    }
}
```

## Response JSON

```json
{
    "status": "success",
    "data": {
        "pdf": "<base64pdf>"
    }
}
```

## Packages used

- [puppeteer](https://github.com/puppeteer/puppeteer)
- [express](https://github.com/expressjs/express)
- [body-parser](https://github.com/expressjs/body-parser)
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
