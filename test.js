const JadwalSholatAPI = require("./index")

const dayNow = new Date()

const configs = {
  kota: 34, // (Require!) Pada bawaan akan tersedia untuk jakarta "31"
  prov: 0, // (Not Require)
  bulan: dayNow.getMonth() + 1, // (Not Require) Pada pengaturan ini, kamu bisa sesuaikan pada bulan yang diinginkan
  mounth: dayNow.getMonth() + 1, // (Not Require) Parameter ini, bahasa inggris dari parameter "bulan"
  tahun: dayNow.getFullYear(), // (Not Require)
  year: dayNow.getFullYear(), // (Not Require) Parameter ini, bahasa inggris dari parameter "tahun"
  logs:true // (Not Require) Jika ubah ke false, maka logs tidak terekam / tidak diperlihatkan di console
}

JadwalSholatAPI.jadwal(configs)
.then((data) => {
  console.log(`[List kota]\n`, data.ls_kota.map(
    z =>`\nNama: ${z.kota}, Kode: ${z.id}`
  ).join(""))
  console.log(`\n[Jadwal Sholat]\n`, data.jadwal.map(
    z => ` [${z.hari_masehi}]

 • Subuh: ${z.waktu_subuh}
 • Dhuhur: ${z.waktu_dhuhur}
 • Asar: ${z.waktu_asar}
 • Magrib: ${z.waktu_magrib}
 • Isya: ${z.waktu_isya}
======================\n`
  ).join(""))
})
