/*
=================================================================
  Namefile        : index.js
  Author Original : @ernestoyoofi
  Blob File       : github.com/ernestoyoofi/jadwalsholat.api/blob/main/index.js
  Time Created    : 10-03-2023
  Time Updated    : 11-03-2023

  If you want to change or modify this script, please, dont'f forget to give credit or the original source code. Thanks you !

  Jika kamu inggin mengubah atau memodifikasi script ini, silahkan, jangan lupa berikan credit atau sumber original kode ini. Terimakasih !
=================================================================
*/
const __config = require("./lib/config")
const __scrap = require("./lib/scrap-html")

module.exports = {
  confg: __config,
  jadwal: __scrap.scrapJadwalSholatToJson,
}