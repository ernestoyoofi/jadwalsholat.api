/*
=================================================================
  Namefile        : scrap-html.js
  Author Original : @ernestoyoofi
  Blob File       : github.com/ernestoyoofi/jadwalsholat.api/blob/main/lib/scrap-html.js
  Time Created    : 10-03-2023
  Time Updated    : 11-03-2023

  If you want to change or modify this script, please, dont'f forget to give credit or the original source code. Thanks you !

  Jika kamu ingin mengubah atau memodifikasi script ini, silahkan, jangan lupa berikan credit atau sumber original kode ini. Terimakasih !
=================================================================
*/
const axios = require("axios")
const _config = require("./config")
const _error = require("./error")
const _fuc = require("./func")
const cheerio = require("cheerio")

const __logs = (logs, {type, message}) => {
  const types =
  type === "INFO"?
  `${_config.color.blue}[${type}]${_config.color.reset}   `:
  type === "ERROR"?
  `${_config.color.red}[${type}]${_config.color.reset}  `:
  type === "SUCCESS"?
  `${_config.color.green}[${type}]${_config.color.reset}`:""

  logs === true?
  console.log(`${types}: ${message}`)
  :
  null
}

const BuildCollectionId = ({ kota = "", prov = ""}) => {
  if(isNaN(prov) || Number(prov) === 0) {
    return kota
  } else {
    return `${kota}.${prov}`
  }
}

const scrapAPI = async (options = {}) => {
  const {
    isGetList = false,
    logs, kota = "31", prov = "0",
    mounth = new Date().getMonth() + 1,
    year = new Date().getFullYear()
  } = options
  try {
    __logs(logs, { type: "INFO", message: "Memulai Mengambil Data..." })
    __logs(logs, { type: "INFO", message: `Data validasi bulan ke: ${mounth} tahun ke: ${year}` })
    if(!isGetList) {
      const isKota = isNaN(kota),
            isYear = isNaN(year),
            isMounth = isNaN(mounth),
            isProv = isNaN(prov)
      if(isKota || isYear || isMounth || isProv) {
        throw new _error(
          isKota? 'Parameters "kota" is not valid ':
          isYear? 'Parameters "year" is not valid ':
          isMounth? 'Parameters "mounth" is not valid ':
          isProv? 'Parameters "prov" is not valid ': null
        )
      }
    }
    let __urls = _config.table_pg
    if(!isGetList) {
      __urls = _config.tabel_jadwal + Math.random()

      const reqHttp = await axios.default.postForm(__urls, {
        y: year,
        m: mounth,
        id: BuildCollectionId({kota, prov})
      })

      return {
        headers: reqHttp.headers,
        data: reqHttp.data
      }
    }

    const reqHttp = await axios.default.get(__urls)
    __logs(logs, { type: "SUCCESS", message: "Berhasil !"})
    return {
      headers: reqHttp.headers,
      data: reqHttp.data
    }
  } catch(err) {
    __logs(logs, { type: "ERROR", message: err.response? `HTTP Request is ${err.response.status} (${err.response.statusText}) !`: err.message })
    throw new _error(
      err.response? `HTTP Request is ${err.response.status} (${err.response.statusText}) !`: err.message
    , {
      code: err.response?.status,
      error_type: err.code,
      response: err.response
    })
  }
}

/**
* @name scrapJadwalSholatToJsons
* @returns {{}}
*
* **📌 scrapJadwalSholatToJsons**
*
* Fungsi ini digunakan untuk mengambil hasil dari jadwalsholat.org
* Kamu bisa menggunakan fungsi ini dengan contoh pada [script ini](./test.js)
*
* [📝 • Pelajari lebih lanjut](./readme.md)
*/
const scrapJadwalSholatToJson = async ({
    kota, prov, bulan, tahun,
    mounth, year,
    logs,
  }) => {

  const scrap = await scrapAPI({
    prov: prov,
    kota: kota,
    mounth: bulan || mounth,
    year: tahun || year,
    logs: logs || false
  })

  const getHome = await scrapAPI({
    isGetList: true
  })

  const hl = cheerio.load(getHome.data)

  let getLoc = []

  hl("body select.slcProv option").each((i, el) => {
    if(hl(el).attr("value")) {
      getLoc.push({
        kota: hl(el).text(),
        id: hl(el).attr("value")
      })
    }
  })

  if(!scrap.data.status) {
    __logs(logs, { type: "ERROR", message: "Location For Selection Not Found !, try again !"})
    throw new _error(
      "Location For Selection Not Found !, try again !"
    )
  }

  const schTable = cheerio.load(
    `<table>${scrap.data.data.sch}</table>`
  )

  let collection_schTable = []
  schTable("html body table tr").each((i, el) => {
    let tl = schTable(el)
    if(schTable("td", el).eq(0).attr("colspan") === undefined) {
      collection_schTable.push({
        today: tl.attr("class") === "w3-theme-d1",
        dt: _fuc.formatToTimeCode(schTable("td", el).eq(1).text()),
        hari_masehi: schTable("td", el).eq(1).text(),
        hari_hijriah: schTable("td", el).eq(2).text(),
        hari_pasaran: schTable("td", el).eq(0).text(),
        waktu_subuh: schTable("td", el).eq(3).text(),
        waktu_dhuhur: schTable("td", el).eq(4).text(),
        waktu_asar: schTable("td", el).eq(5).text(),
        waktu_magrib: schTable("td", el).eq(6).text(),
        waktu_isya: schTable("td", el).eq(7).text()
      })
    }
  })
  const searchTps = collection_schTable.map(z => z.dt).indexOf(new Date().toISOString().split("T")[0])
  const dtsTps = collection_schTable[searchTps]
  const forReturn = {
    ls_kota: getLoc,
    jadwal: collection_schTable,
    info: {
      periode: scrap.data.data.periode,
      rentang: scrap.data.data.rentang,
      nama: scrap.data.data.nama,
      maps_embed: `https://www.google.com/maps?q=${_fuc.toSectionLink(scrap.data.data.nama)}&output=embed`,
    },
    hari_ini: searchTps === -1? {} : dtsTps
  }

  return forReturn
}

module.exports = {
  scrapJadwalSholatToJson,
}