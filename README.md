# BW-Bundler 🏗

Данная сборка основанна на сборщике Parcel (v2) 📦.

При  желании что то отредактировать в сборщике, следует руководиться - [Документацией](https://parceljs.org/docs/)

## Установка 
Для начала следует проверить, что на вашем устройстве присутсвует NodeJS(^16.14.0) и соответсвующий ему npm
При отсутсвии - [установить](https://nodejs.org/en/)

При развёртывании на сервере CentOS - ` sudo yum install nodejs ` или лучше ознакомиться c [nvm](https://habr.com/ru/company/timeweb/blog/541452/)
При желании расшарить nvm на других пользователей кроме root - [это](https://qna.habr.com/q/344925)

При установке nvm на windows с путём до менеджера 
на кириллице - исправить путь в `C:\Users\%username%\AppData\Roaming\nvm`

## Cтарт на сборщике

1. Клонируем себе копию сборщика папку проекта.
    ` git clone https://gitlab.com/Mihalchenko_Sergey/bw-bundler.git ./ `
2. При работе желательно использовать менеджер пакетов [yarn](https://yarnpkg.com/getting-started)
    Так что устанавливаемп его глобально `npm i yarn -g`, ну или `npm i yarn --dev` если не получается глобально.
3. Открываем директорию с сборщиком через git bash (powershell требует добавить утилиты в PATH и ничего не работает).
4. Устанавливаем зависимости `yarn install`
5. Удаляем папку `.git`, инициализируем свой репозиторий 

**Сборщик заряжен на работу** 🥳🥳🥳

## Команды yarn 
*Выполнять в GitBash (Там должно работать)*

1. `yarn dev` - запускает сервер, начинает отслеживать изменения в файлах **.pug** и **.html** в корневом каталоге и папке **components** 
2. `yarn build` - запускает сбор проекта. Билд будет лежать в корневой паке, папка с билдом - `dist`
 
## Нюансы*

* Перед финальной сборкой следует удалить папки `dist` и `parcel-cache` (они удаляются сами, но на всякий).
* В любой непонятной ситации с недоходом стилей и чего угодно до страницы порядок такой 
    1.  `ctrl + f5`.  Если не помогло то
    2.  Остановить сервер сборки и удалить `dist` и `parcel-cache`, снова запустить сборщик
    3.  Звать на помощь
* Не должно быть автосейва, задержка минимум секунды 3. Parcel закеширует незаконченный ввод и бужет устойчиво выдывать ошидку ☠, решение пункт 1.
* При сборке каждый файл получает хэш в название. Он будет всегда одинаковым, даже емли менять файлы. Но если изменить расположение файла относительно корня сборщика.
* После сборки инлайново вставленные пути в html поломаются. Это не проблема, если дальше верстку натягивать. Если это не надо натягивать, то зачем ты вписал инлайновые стили с путём ?
* Устанавливать дополнительные инструменты для обработки **scss**, **pug** и.т.д не требуется. Parcel сам поймет что подключено и установит зависимости. 
* Можно подключать в html файлы с расширением scss, ts 
* Стили подключаются в файле **index.js** туда вообще подключается всё, а он сам на страницу.
* Js подключается с `type="module"`. После сборки, если открыть индекс файл на компьютере, то скрипты не будут работать. Модули требуют исполнение на сервере. Без сервера выдает CROS. 

## Структура 
Все движения происходят в `src`
На верхнем уровне `src` лежат индекс файлы разметки `html` и `pug`, есть ещё шаблонизаторы (Смотреть  [Документацию](https://parceljs.org/docs/)). В них подключается вообще всё окружение, стили и скрипты. 
1. `js папка` - в ней лежат скрипты и индекс файл со всеми подключениями. На сборщике можно использовать импорт и экспорт модулей / requre.
2. `scss` - тут находятся стили проектаю
    1.  `local-styles` - папка с конкретными стилями проекта, можно создать `components`, и писать туда стили для [**BEM**](https://ru.bem.info/methodology/quick-start/) компонетов.
    2.  `mixins` - папка с scss [миксинами](https://sass-scss.ru/guide/)
        1.  `media` - базовый набор миксинов для удобного адаптива о них ниже.
        2.  `other` - остальные миксины общего назначения. Везде можно дописывать свои.
    3. `variables` - тут нужно хранить свои файлики с переменными, например цвета в файле `colors.scss`
    4. `index.scss` файл в который импортруются все стили, и этот файл в дальнешем идёт на импорт в `index.js`.

## Миксины
### Медиа миксины 
Сами переменные размеров контейнера настраиваются в `bw-bundler\src\scss\variables\media.scss`
**Тут указываются размеры для медиа запросов, соответсвенно 1 - это первая точка, на которой произойдут какието изменения. Сам размер контейнера и всё по контейнеру происходит в `bw-bundler\src\scss\mixins\other.scss\create-container`**
В файле media.scss есть такие миксины:
1.  `at($scale)` - применит стили, если разрешение больше указанной точки.
2.  `below($scale)` - применит стили, если разрешение меньше указанной точки.
3.  `between($scale)` - применит стили, если разрешение между указанными точками.

Как параметр для этих миксинов можно указать:
1.  Строку с названием поинта для переключения из медиа переменных, например `@include below("1") { ... }`- применит         стили из тела свойства если разрешение меньше указанного на первом поинте.
2.  Указать число, которое скажет, на каком разрешении нужно добавить стили. `@include below(1337) { ... }` - применит стили, если разрешение меньше 1337.

В файле `other.scss` имеются миксины для различных удоств.
1.  `create-container` - миксина позволяет создать быстро контейнер со всем нужными переключениями и переходами. Нужно, что бы колличесво переключений размера контейнера не было больше, чем колличесво поинтов в файле с переменными. Ну и соттветсвенно, если колличесво поинтов изменилось, нужно подправить этот миксин, и сделать нужное колличесво переключений. Смысл там уловим.
2.  `space($margin)` - создаст отступы между элементам идущими в ряд и уберет отступ у последнего. Бюджетный и кросбраузерный аналог `gap`. Пример `@include space(20px);` `@include space(2vh);`
3.  `space-bottom($margin)` то же самое, что и `space`, только отсуп вних у всех элементов, кроме последнего вниз.
4.  `add-icon($url, $width, $height, $padding: 10px)` - добавить иконку перед элемнтом.

**При любых непонятных ситуациях с технологиями - смотрите их документации.** 🤔
## Верстаем с кайфом 🚀
