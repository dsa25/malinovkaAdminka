### steps:
- git clone ...
- npm install
- create file: .env 
```js
PORT=5004
IP=localhost
```
- create file: .env.production // - из-за alias не собрался на ubuntu =)
```js
VITE_BASE_URL=https://malinovka.example.ru
```
- npm run build // на windows =)
- папку /dist - отправляем в корень на сервер
- в файле migrate.js раскомментируем все модели и 'npm run migrate' // - создаем пустые таблицы в БД
- 'npm run start'   или   'pm2 start malinovka.js'