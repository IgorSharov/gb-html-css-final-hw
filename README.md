# GeekBrains HTML-CSS Final homework

Заключительная домашняя работа курса по HTML-CSS на GeekBrains.  
[Ссылка на результат](https://igorsharov.github.io/gb-html-css-final-hw/)

### Задание
Сверстать статическую страницу для отображения на широкоформатном мониторе (не адаптивную) на основании предоставленного psd макета. Разместить её на GitHub Pages.

### Сделано
* Написан Gulp-сборщик, который:
  * отображает в консоли ход выполнения сборки
  * интерпретирует SASS-файлы в CSS
  * добавляет авто префиксы для реализации кросс-браузерности
  * минифицирует CSS
  * минифицирует изображения
  * позволяет запустить веб сервер с онлайн отображением изменений в коде
* Добавлена поддержка bootstrap
* Проект размещён на GitHub

### Не сделано
* Вёрстка реализована без учёта принципов Mobile First Design

### Для запуска Gulp требуется
1. Установить [Node.JS](https://nodejs.org/en/)
2. В директории проекта выполнить  
  ```
  npm i  
  npm run gulp
  ```
