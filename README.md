#### malinovkaAdminka - api и админка для мобильного приложения (pwa) [malinovkaPWA](https://github.com/dsa25/malinovkaPWA)
Смотреть тут: [malinovka.dsa25.ru](https://malinovka.dsa25.ru)

### Stack:
- fastify (веб-фреймворк для Node.js)
- sqlite (БД)
- sequelize (использую для синхронизации моделей в БД sqlite)
- vue
- vue-router
- tailwindcss
- vite
</br>

#### Особенности:
1) С клиента принимал картинки в формате base64 и декодировал его в jpeg.  
index - помог не потерять фотки в процессе, когда их больше одной, тк в период времени Date.now() в массив listImg добавлялись одинаковые пути к фото, а fs.writeFile() просто перезаписывал файл
```js
let listImg = []
if (req.body.srcPhoto.length) {
  req.body.srcPhoto.forEach(async (item, index) => {
    let base64Image = item.split(";base64,").pop()
    let pathImg = `./img/${req.body.idSector}_${index}_${getTime()}_${Date.now()}.jpg`
    listImg.push(pathImg)
    await fs.writeFile(pathImg, base64Image, {encoding: "base64"})
  })
console.log({ listImg })
```
2) Фрагмент HTML научился сохранять в файл, в данном случае в .xls:
```js
saveXls() {
  console.log("click save..xls...")
  let table = document.getElementById("myTable")
  this.downloadFileXls(
    table,
    "Осмотры",
    `Осмотр_${getTime("now", "d.m.y")}.xls`
  )
}
```
```js
const downloadFileXls = (table1, name1, filename1) => {
  const uri = "data:application/vnd.ms-excel;base64,"
  const template ='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
  const base64 = (s) => {
    return window.btoa(unescape(encodeURIComponent(s)))
  }
  const format = (s, c) => {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p]
    })
  }
  const downloadURI = (uri, name) => {
    var link = document.createElement("a")
    link.download = name
    link.href = uri
    link.click()
  }

  const run = (table, name, fileName) => {
    var ctx = {
      worksheet: name || "Worksheet",
      table: table.innerHTML
    }
    var resuri = uri + base64(format(template, ctx))
    downloadURI(resuri, fileName)
  }

  run(table1, name1, filename1)
}
```
3) Показать пустые сектора и повторяющиеся:
```js
const listSectors = ref([])
const getEmptySectors = computed(() => {
  console.log("send getEmptySectors...........")
  let result = []
  let idsInspections = []

  inspections.value.forEach((item) => {
    idsInspections.push(item.idSector)
  })
  idsInspections = Array.from(new Set(idsInspections))

  console.log("listSectors.value", listSectors.value)
  listSectors.value.forEach((item) => {
    if (idsInspections.includes(item.id) == false) {
      result.push(item)
    }
  })
  console.log({ result })

  return result
})
```
```js
const listDuplicate = computed(() => {
  if (typeSort.value == "sector") {
    let list = sortedInspections.value
    let listNumber = []
    list.forEach((item, index) => {
      if (
        item.idSector == list[index + 1]?.idSector ||
        item.idSector == list[index - 1]?.idSector
      ) {
        listNumber.push(item.idSector)
      }
    })
    return Array.from(new Set(listNumber))
  } else return []
})
```
4) Насколько помню, чтобы в контроллерах в методе класса можно было вызывать другой метод - необходимо в роутинге `fastify`  
вместо записи: `app.post("/updateUser", userController.updateUser)`  
писать: ` app.post("/updateUser", async (req, reply) => await userController.updateUser(req, reply))`
 ```js
 class userController {
   async updateUser(req, reply) {
    ...
      const { vers, version } = await this.updateVersUsers(db)
    ...
    }
  }
  ```

### steps:
- git clone ...
- npm install
- create file: .env 
```bash
PORT=5004
IP=localhost
```
- **create file: .env.production // - ** из-за alias не собрался на ubuntu =)
```bash
VITE_BASE_URL=https://malinovka.example.ru
```
- npm run build // на windows =)
- папку /dist - отправляем в корень на сервер
- в файле migrate.js раскомментируем все модели и 'npm run migrate' // - создаем пустые таблицы в БД
- 'npm run start'   или   'pm2 start malinovka.js'
</br>

#### Screenshots:

<table>
  <tr>
    <td  valign="top">Список осмотров и история по участку </td>
    <td>
      <img src="_screenshots/curMonthJob.jpg">
      <img src="_screenshots/sectors_6.jpg">
      <img src="_screenshots/sectors_7.jpg">
    </td>
  </tr>
  <tr>
     <td valign="top">Фильтры по осмотрам</td>
     <td>
       <img src="_screenshots/recurring.jpg">
       <img src="_screenshots/empty.jpg">
    </td>
  </tr>
  <tr>
    <td  valign="top">Пользователи</td>
    <td><img src="_screenshots/users.jpg"></td>
  </tr>
  <tr>
    <td  valign="top">Участки</td>
    <td>
      <img src="_screenshots/sectors.jpg">
    </td>
  </tr>
</table>
