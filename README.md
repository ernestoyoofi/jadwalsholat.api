# 🕌 jadwalsholat.api

Module bukan resmi dari pembuat, module ini digunakan untuk melihat jadwal sholat diberbagai kota / provinsi diIndonesia.

Untuk cara penggunakan bisa lihat dibawah ini !

## 🚧 Install Module

Kamu bisa menggunakan dua cara.
Jika module tidak tersedia pada node package manager, kamu bisa install lewat git dengan cara

```bash
npm i https://github.com/ernestoyoofi/jadwalsholat.api
```

Namun jika tersedia pada npm atau node package manager bisa install dengan cara

```bash
npm i @ernestoyoofi/jadwalsholat.api
```

## 🎉 Cara menggunakannya

pertama kamu bisa lihat configurasi dibawah ini.

```js
// Lihat contoh pada file ./test.js
const dayNow = new Date()

const configs = {
  // (Permintaan!) Pada bawaan akan tersedia untuk jakarta "31"
  // Pada bagian kota, kamu bisa lihat pada halaman
  // https://github.com/cahyadsn/wilayah#data-kepmendagri-no-050-145-tahun-2022 pada id_prov
  kota: 34,
  // (Tambahan)
  prov: 0,
  // (Kostume data) Pada pengaturan ini, kamu bisa sesuaikan pada bulan yang diinginkan
  bulan: dayNow.getMonth() + 1,
  // (Kata lain parameter) Parameter ini, bahasa inggris dari parameter "bulan"
  mounth: dayNow.getMonth() + 1,
  // (Kostume data)
  tahun: dayNow.getFullYear(),
  // (Kata lain parameter) Parameter ini, bahasa inggris dari parameter "tahun"
  year: dayNow.getFullYear(),
  // (Tambahan) Jika ubah ke false, maka logs tidak terekam / tidak diperlihatkan di console
  logs:true
}
```

Lalu kamu bisa gunakan dengan cara

```js
// Lihat contoh pada file ./test.js
const JadwalSholatAPI = require("@ernestoyoofi/jadwalsholat")

JadwalSholatAPI.jadwal(configs)
.then((data) => {
  console.log(data)
})
```

## 🐞 Permasalahan

Jika ada bug atau error kamu bisa laporkan pada [halaman issues](https://github.com/ernestoyoofi/jadwalsholat.api/issues)

Jika ingin menambahakan bisa [pull request](https://github.com/ernestoyoofi/jadwalsholat.api/pulls) atau berikan label ["Add Features"](https://github.com/ernestoyoofi/lahelu-dwn/issues/new?labels=Add+Features) pada [issues](https://github.com/ernestoyoofi/lahelu-dwn/issues/new?labels=Add+Features)

## 📝 Sample Via Nextjs

Untuk sample atau contoh menggunakan nextjs, ada pada halaman
[jadwalsholat-api.vercel.app](https://jadwalsholat-api.vercel.app/)
