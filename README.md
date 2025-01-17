# Приложение "Магазин"
## Предметная область
Онлайн магазин. Основной пользователь - клиент магазина. Дополнительные участники - менеджеры.

Пользователь может зайти на сайт и найти нужный ему товар при помощи фильтров, сортировки и поиска по названию и содержанию продукта.
У пользователя есть карзина, в которую он может добавлять и далять из неё нужные ему товары, а также посмотреть общую информацию по всему, что находится в карзине.
Пользователь может оформить заказ.
Для этого пользователь дложен авторизоваться или создать новый аккаунт.
Для оформелниея заказа пользователель также должен указать желаемый способ получения и оплаты а также адрес получения.
Авторизованый пользователь может просмотреть своиз заказы и состав этих заказов.

Мэнеджер может просматривать не доставленные заказы а также редактировать детали и содержание товаров

## Основная цель
1. Разработка системы с максимумом функционала по предметной области 
2. Использование готового UI кита (Выбран MUI)
3. SSR везде где только можно, чтобы понять эту технологию (Next.js)
4. Рабочая БД и Бэк (База PostgreSQL)
5. Скорость разработки с минимумом заморочек. Только результат

## Особенности
- Для реализации формы выбора адреса был выбран API Яндекс карт и их GeoSuggest.
- Бэкэнд - Серверные экшены и роуты next.js

## Что хочется добавить
- [ ] Роль админа, который сможет управлять ролями
- [ ] Оценки товаров и отзывы
- [ ] Возможность изменять статус заказа пользователем или менеджером
- [ ] Авторизация и регистрация при помощи телефона
- [ ] Возможность для менеджера редактировать список и порядок фотографий товаров
- [ ] Чат для связи покупателя с менеджером

## Авторизационные данные для тестов!

**Клиент: Логин - `user@mail.com`, Пароль - `User1234`**

**Менеджер: Логин - `alex@mail.com`, Пароль - `Alex1234`**

Также можно зарегестрировать нового пользователя.
