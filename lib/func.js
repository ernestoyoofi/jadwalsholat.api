/*
=================================================================
  Namefile        : func.js
  Author Original : @ernestoyoofi
  Blob File       : github.com/ernestoyoofi/jadwalsholat.api/blob/main/lib/func.js
  Time Created    : 10-03-2023
  Time Updated    : 11-03-2023

  If you want to change or modify this script, please, dont'f forget to give credit or the original source code. Thanks you !

  Jika kamu ingin mengubah atau memodifikasi script ini, silahkan, jangan lupa berikan credit atau sumber original kode ini. Terimakasih !
=================================================================
*/
function stringBulatkanAngka(angka) {
  if(isNaN(angka)) {
    return `00`
  } else if(angka < 9) {
    return `0${angka}`
  } else {
    return `${angka}`
  }
}

function formatToTimeCode(_date) {
  const __ms = _date.split(" "),
        getDays = Number(__ms[0]),
        getMounth = __ms[1]?.toLowerCase(),
        getYear = __ms[2]

  const getMet = [
    "januari", "febuari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"
  ]
  const mth = getMet.indexOf(getMounth)

  return `${getYear}-${stringBulatkanAngka(mth+1)}-${stringBulatkanAngka(getDays)}`
}

function toSectionLink(text) {
  const stx = "abcdefghijklmnopqrstuvwxyz1234567890_- ".split("")
  const xpc = text.toLowerCase().split("")
  let mtx = ""
  for(let cxx of xpc) {
    if(stx.indexOf(cxx) != -1) {
      mtx += cxx
    }
  }

  return mtx?.replace(/ /g, "+")
}

module.exports = {
  formatToTimeCode,
  toSectionLink
}