'use strict';


// 1. Создайте массив, состоящий из 25 сгенерированных JS объектов, которые будут описывать фотографии, размещённые другими пользователями

var getRandomInt = function (min, max) { // включая min, не включая max
  return Math.floor(Math.random() * (max - min)) + min;
};

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomComments = function (commentsArray) {
  var photoComments = [];
  var commentsQuantity = getRandomInt(1, 200);
  for (var i = 0; i < commentsQuantity; i++) {
    var commentLength = getRandomInt(1, 3); // один комментарий должен состоять из 1-2 предложений из массива COMMENTS
    var comment = commentsArray[getRandomInt(0, commentsArray.length)];

    if (commentLength > 1) {
      for (var k = 1; k < commentLength; k++) { // т.к. "нулевой" комментарий уже есть, начинаю цикл с первого
        comment += commentsArray[getRandomInt(0, commentsArray.length)];
      }
    }

    photoComments.push(comment);
  }
  return photoComments;
};

// создаю прототип объекта фото
var PhotoContent = function (number) {
  this.url = 'photos/' + number + '.jpg';
  this.likes = getRandomInt(15, 201);
  this.comments = getRandomComments(COMMENTS);
  this.description = DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)];
};

var photos = [];

for (var i = 1; i <= 25; i++) {
  var photoInfo = new PhotoContent(i);
  photos.push(photoInfo);
}


// 2. На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
// 3. Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var photoFragment = document.createDocumentFragment();

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

for (var photoItem = 0; photoItem < photos.length; photoItem++) {
  photoFragment.appendChild(renderPhoto(photos[photoItem]));
}

var photoContainer = document.querySelector('.pictures');
photoContainer.appendChild(photoFragment);


// 4. Покажите элемент .big-picture, удалив у него класс .hidden и заполните его данными из первого элемента сгенерированного вами массива

var bigPicture = document.querySelector('.big-picture');

bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img').src = photos[0].url;

bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
bigPicture.querySelector('.social__caption').textContent = photos[0].description;

// Вставляем комментарии под большой фотографией
var bigCommentsContainer = document.querySelector('.social__comments');
var bigComment = document.querySelector('.social__comment');
var bigCommentFragment = document.createDocumentFragment();

var createBigComment = function (comment) {
  var bigCommentElement = bigComment.cloneNode(true);
  bigCommentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 7) + '.svg';
  bigCommentElement.querySelector('.social__text').textContent = comment;
  return bigCommentElement;
};

for (var commentItem = 0; commentItem < photos[0].comments.length; commentItem++) {
  bigCommentFragment.appendChild(createBigComment(photos[0].comments[commentItem]));
}

bigCommentsContainer.appendChild(bigCommentFragment);


// 5. Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс .visually-hidden.

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
