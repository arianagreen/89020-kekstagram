'use strict';

// Создайте массив, состоящий из 25 сгенерированных JS объектов, которые будут описывать фотографии, размещённые другими пользователями

(function () {

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
    var commentsQuantity = window.util.getRandomInt(1, 200);
    for (var i = 0; i < commentsQuantity; i++) {
      var commentLength = window.util.getRandomInt(1, 3); // один комментарий должен состоять из 1-2 предложений из массива COMMENTS
      var comment = commentsArray[window.util.getRandomInt(0, commentsArray.length)];

      if (commentLength > 1) {
        for (var k = 1; k < commentLength; k++) { // т.к. "нулевой" комментарий уже есть, начинаю цикл с первого
          comment += commentsArray[window.util.getRandomInt(0, commentsArray.length)];
        }
      }

      photoComments.push(comment);
    }
    return photoComments;
  };

  // создаю прототип объекта фото
  var PhotoContent = function (number) {
    this.url = 'photos/' + number + '.jpg';
    this.likes = window.util.getRandomInt(15, 201);
    this.comments = getRandomComments(COMMENTS);
    this.description = DESCRIPTIONS[window.util.getRandomInt(0, DESCRIPTIONS.length)];
  };

  window.makePhotos = function () {
    var photos = [];

    for (var i = 1; i <= 25; i++) {
      var photoInfo = new PhotoContent(i);
      photos.push(photoInfo);
    }

    return photos;
  };
}());
