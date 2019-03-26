const fetch = require('node-fetch');
const normalizeNewline = require('normalize-newline');

module.exports = function getDocContent(apiKey, urls, callback) {
  let OCRServers = ['https://apipro1.ocr.space','https://apipro2.ocr.space','https://apipro3.ocr.space','https://api.ocr.space','https://apix.ocr.space']

  totalContracts = urls.length;
  let contractsDownloaded = 0;
  let contractContent = '';
  let index = 0;
  urls.forEach(function(docUrl) {
    if(index == OCRServers.length) {
      index = 0;
    }
    let myServer = OCRServers[index]
    index++;

    let convertUrl = myServer+'/parse/imageurl?apikey='+apiKey+'&url='+encodeURIComponent(docUrl);
    fetch(convertUrl)
    .then(res => res.json())
    .then(json => {
      let data = '';
      if(json.ParsedResults) {
        // console.log('parsed results')
        json.ParsedResults.forEach(function(item) {
          data += item.ParsedText + ' ';
        })
        contractsDownloaded++;
        contractContent += normalizeNewline(data).replace(/\n/g, " ").replace(/\"/g,'\\"').replace(/[^\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]/g,'').trim();
  
        // if at last file append to contract_content
        console.log('total: '+totalContracts)
        console.log('downloaded: '+contractsDownloaded)
        if(contractsDownloaded === totalContracts) {
          console.log('calling back')
          callback(contractContent);
        }
      } else {
        console.log('failed')
        console.log(convertUrl)
        callback('');
      }
    })
    .catch(err => {
      console.error(err);
      return err; 
    });
  })
}