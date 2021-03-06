# Бот логирования беседы ВК

### Подготовка сервера на Centos 7

```shell script
# node.js
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install nodejs
# инструменты для сбоки sqlite
sudo yum group install "Development Tools"
```

### Параметры запуска сервиса

* PORT порт на котором слушает сервис. Для VK нужен 80, если не используется промежуточный балансировщик
* SECURITY_CODE Секретный ключ из консоли сообщества ВК
* CONFIRM_CODE Строка подтверждения из консоли сообщества ВК

### Настройка запуска сервиса через SystemD

```shell script
# pwd -> директория проекта на сервере
# проверить настройки в vkbot.service
chmod a+x bin/www
npm i
sudo ln -s vkbot.service /etc/systemd/system/vkbot.service
sudo systemctl daemon-reload
sudo systemctl enable vkbot
sudo systemctl start vkbot
```

### Логи

```shell script
sudo journalctl --follow -u vkbot
```

### Схема базы

##### Таблица messages

* ID Идентификатор сообщения
* MSG Текст сообщения
* USER_ID Идентификатор пользователя
* GROUP_ID Идентификатор беседы
* DATE UNIX метка времени в мс

### Настройка сообщества ВК

Страница сообщества -> Управление -> Настройки -> Работа с API -> Callback API -> Настройки сервера

* Версия API - Выше 5.80
* Адрес - http://[сервер]/vk/callback
* Секретный ключ - Случайная строка
* Сертификат SSL - Загрузить если используется реверс-прокси или балансировщик

Страница сообщества -> Управление -> Настройки -> Работа с API -> Callback API -> Типы событий

* Входящее сообщение

Страница сообщества -> Управление -> Сообщения 

* Включены

Страница сообщества -> Управление -> Сообщения -> Настройки для бота

* Разрешать добавлять сообщество в беседы

### Добавление в беседу

* Со страницы сообщества выбрать Меню -> Добавить в беседу -> Выбрать беседу
* Настройки беседы -> Выбрать бота -> Дать доступ ко всей переписке






