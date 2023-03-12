/*
=================================================================
  Namefile        : error.js
  Author Original : @ernestoyoofi
  Blob File       : github.com/ernestoyoofi/jadwalsholat.api/blob/main/lib/error.js
  Time Created    : 10-03-2023
  Time Updated    : 11-03-2023

  If you want to change or modify this script, please, dont'f forget to give credit or the original source code. Thanks you !

  Jika kamu ingin mengubah atau memodifikasi script ini, silahkan, jangan lupa berikan credit atau sumber original kode ini. Terimakasih !
=================================================================
*/
const _config = require("./config")

class JadwalSholatAPIError extends Error {
  constructor(message, options={}) {
    super(typeof message==="string"?message:"Unknow Error !")
    this.name = this.constructor.name
    typeof options.code==="number"? this.code=options.code:""
    typeof options.error_type==="string"? this.error_type=options.error_type:""
    typeof options.response==="object"? this.response=()=>options.response:""
    this.version = require("../package.json").version
  }
  to_console() {
    let texts = null
    texts = `${_config.color.red}${this.name}${_config.color.reset}:`
    this.code? texts += ` ${_config.color.blue}(${this.code})${_config.color.reset}`: null
    texts += " "+this.message
    return texts
  }
  to_server() {
    let data = {
      status: 500,
      message: this.message,
      ...this,
    }
    delete data.name
    return data
  }
}

module.exports = JadwalSholatAPIError