/*
=================================================================
  Namefile        : config.js
  Author Original : @ernestoyoofi
  Blob File       : github.com/ernestoyoofi/jadwalsholat.api/blob/main/lib/config.js
  Time Created    : 10-03-2023
  Time Updated    : 11-03-2023

  If you want to change or modify this script, please, dont'f forget to give credit or the original source code. Thanks you !

  Jika kamu ingin mengubah atau memodifikasi script ini, silahkan, jangan lupa berikan credit atau sumber original kode ini. Terimakasih !
=================================================================
*/

module.exports = {
  version: require("../package.json").version,
  tabel_jadwal: "https://neoadzan.cahyadsn.com/inc/neoadzan_ajax.php?sid=",
  table_pg: "https://neoadzan.cahyadsn.com/",
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    "sec-fetch-site": "cross-site",
    "accept-language": "id",
    "accept": "*/*",
    "origin": "https://neoadzan.cahyadsn.com"
  },
  color: {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    green: "\x1b[32m"
  }
}