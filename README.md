#### malinovkaAdminka - api и админка для мобильного приложения (pwa) [malinovkaPWA](https://github.com/dsa25/malinovkaPWA)

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
2)
3) Насколько помню, чтобы в контроллерах в методе класса можно было вызывать другой метод - необходимо в роутинге `fastify`  
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
