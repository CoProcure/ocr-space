# OCR.Space

Run pdf files through the OCR process, receive aggregated chunk of parsed text from an array of urls.

Accepts 

- apiKey for your OCR.space account
- Array of urls of publicly accessible pdf files 
- callback function

Returns

- JSON compatible single text string containing the parsed content from all the files sent

The ocr.space API is good at extracting text from any type of pdf file, even ones that are partially images and partially searchable text but is limited in the number of parallel requests any one endpoint called with your API Key will process. This code will spread the requests out through the list of available ocr.space endpoints so that it is processed in parallel.

Returned text has newline characters normalized and is processed with the following regex to allow it to be used safely in JSON files.

```
normalizeNewline(data).replace(/\n/g, " ").replace(/\"/g,'\\"').replace(/[^\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]/g,'').trim();
```

