# OCR.Space

## Description

Run pdf files through the OCR process, receive aggregated chunk of parsed text from an array of urls. This is useful when extracting the text of pdf documents in order to make them fully searchable by creating an AWS cloudsearch ingestable JSON document.

Accepts:

- apiKey for your OCR.space account
- Array of urls of publicly accessible pdf files 
- callback function

Returns:

- JSON compatible single text string containing the parsed content from all the files sent

The ocr.space API is good at extracting text from any type of pdf file, even ones that are partially images and partially searchable text but is limited in the number of parallel requests any one endpoint called with your API Key will process. This code will spread the requests out through the list of available ocr.space endpoints as recommended by OCR.space tech support to reduce throttling errors.

Returned text has newline characters normalized and is processed with the following regex to allow it to be used safely in JSON files.

```
normalizeNewline(data).replace(/\n/g, " ").replace(/\"/g,'\\"').replace(/[^\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]/g,'').trim();
```

## How to use

Install the package:

```
npm install @coprocure/ocr-space
```

Use it in your node.js code:

```
const ocr = require('@coprocure/ocr-space')

ocr('myAPIKey',[documentURL1, documentURL2], (text) => {
  // do something with the returned text
})
```

We often want to run many documents through this process and the ocr.space API will throttle too many simultaneous requests so use await to avoid errors:

```
textContentOfAllUrlArrayPDFFiles = await new Promise((resolve, reject) => {
  ocr(myAPIKey, urlArray, (text) => {
    resolve(true);
  })
});
```




