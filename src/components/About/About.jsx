import React from 'react';
import styles from './About.module.css';
import Checkbox from 'components/ToDoCheckbox';
import TopTitle from 'components/TopTitle';
import { Icon } from 'antd';

const Telegram = () => (
  <svg width="25" height="25" viewBox="0 0 512 420">
    <path
      fill="black"
      d="m121.453125 253.171875 63.554687 158.886719 82.75-82.753906 141.535157 112.503906 102.707031-441.308594-512 205.480469zm-39.933594-47.640625 244.046875-97.945312-194.074218 117.363281zm287.535157-89.25-161.980469 148.1875-19.484375 73.425781-36.035156-90.085937zm-149.851563 219.230469 9.816406-36.996094 15.144531 12.035156zm171.65625 53.394531-147.386719-117.152344 221.902344-203.007812zm0 0"
    />
  </svg>
);

const About = () => (
  <div className={styles.root}>
    <TopTitle title="ABOUT" />
    <div className={styles.info}>
      <header>
        <div className={styles.links}>
          <a href="https://www.instagram.com/kpogodin_/">
            <Icon style={{ color: 'black', fontSize: '25px' }} type="instagram" />
          </a>
          <a href="https://www.youtube.com/channel/UCT_IoHUWKvy5FjDVm0Ee0ug">
            <Icon style={{ color: 'black', fontSize: '25px' }} type="youtube" />
          </a>
          <a href="https://t.me/kpogodin">
            <Icon style={{ color: 'black', fontSize: '25px' }} component={Telegram} />
          </a>
          <a href="https://github.com/gadzillllla">
            <Icon style={{ color: 'black', fontSize: '25px' }} type="github" />
          </a>
          <a href="https://twitter.com/GadziLLLLLa">
            <Icon style={{ color: 'black', fontSize: '25px' }} type="twitter" />
          </a>
        </div>
      </header>
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
      <Checkbox disabled label={'просмотр изображений по клику'} />
      <Checkbox disabled label={'интерактивная страница about для админа, это вот все щас захардкожено =('} />
      <Checkbox disabled label={'новый, блять, дизайн ВСЕГО =)'} />
    </div>
    <footer className={styles.footer}>
      <p>
        build on <a href="https://reactjs.org/">reactJS</a> + <a href="https://firebase.google.com/">firebase</a>
      </p>
    </footer>
  </div>
);

export default About;
