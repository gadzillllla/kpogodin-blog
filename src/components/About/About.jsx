import React from 'react';
import styles from './About.module.css';
import Checkbox from 'components/ToDoCheckbox';

const About = () => (
  <div className={styles.root}>
    <div className={styles.info}>
      <img className={styles.ava} src="https://avatars1.githubusercontent.com/u/37631833?s=460&v=4" />
      <h1>Костя Погодин</h1>
      <p>
        Всем Привет! Меня зовут Костя и я forontend-разработчик. Делаю сайтики на ReactJS с мая 2018 года. Это мой
        личный блог, но я его больше програмирую и добавляю фичи, чем наполняю контентом. Блогер из меня так себе, но я
        постараюсь. Или нет.
      </p>
    </div>
    <div className={styles.block}>
      <h1> v1.0 Описание основных фич, реализованных в данной версии: </h1>
      <ol>
        <li>В блог я могу писать посты (функция доступна только под моей учетной записью)</li>
        <li>
          Любому пользователю можно зарегистрироваться с помощью e-mail и сразу войти, а так-же доступен вход через
          facebook и google
        </li>
        <li>В постах можно оставлять комментарии любому авторизованному пользователю</li>
        <li>Посту можно ставить лайк и при желании забрать его назад</li>
        <li>
          Написание постов происходит в отдельном редакторе, который генерит html, можно вставлять видео и картинки
        </li>
        <li>К посту можно оставлять хэштеги, а потом осуществлять сортировку по ним</li>
        <li>в редакторе доступна функция "Cохранить черновик"</li>
      </ol>
      <h1> Что предстоит сделать: </h1>
      <Checkbox disabled label={'Поиск хештега'} />
      <Checkbox disabled label={'Настройки аккаунта (аватарка, имя и т.д.)'} />
      <Checkbox disabled label={'Лайки к комментариям и сортировка их по популярности'} />
      <Checkbox disabled label={'Сортировка постов по популярности'} />
      <Checkbox disabled label={'смена темы: ночная/дневная'} />
      <Checkbox disabled label={'интерактивная страница about для админа, это вот все щас захардкожено =('} />
    </div>
    <footer className={styles.footer}>
      {/* <div>contacts</div>
      <img
        style={{ width: '50px', height: '50px' }}
      />
      <div>build on</div> */}
    </footer>
  </div>
);

export default About;
