'use strict';

// Покажите элемент .big-picture, удалив у него класс .hidden и заполните его данными из первого элемента сгенерированного вами массива

window.renderBigPhoto = function (photo) {
  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoCloseButton = bigPhoto.querySelector('#picture-cancel');

  bigPhoto.classList.remove('hidden');
  bigPhoto.querySelector('.big-picture__img img').src = photo.url;
  bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.social__caption').textContent = photo.description;

  // Вставляем комментарии под большой фотографией
  var bigCommentsContainer = document.querySelector('.social__comments');
  var bigComment = document.querySelector('.social__comment');
  var bigCommentFragment = document.createDocumentFragment();

  var createBigComment = function (comment) {
    var bigCommentElement = bigComment.cloneNode(true);
    // bigCommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomInt(1, 7) + '.svg';
    bigCommentElement.querySelector('.social__picture').src = comment.avatar;
    bigCommentElement.querySelector('.social__text').textContent = comment.message;
    return bigCommentElement;
  };

  for (var i = 0; i < photo.comments.length; i++) {
    bigCommentFragment.appendChild(createBigComment(photo.comments[i]));
  }
  // очистка списка комментариев
  while (bigCommentsContainer.hasChildNodes()) {
    bigCommentsContainer.removeChild(bigCommentsContainer.firstChild);
  }

  bigCommentsContainer.appendChild(bigCommentFragment);

  // закрытие окна по клику и нажатию esc
  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
  };

  bigPhotoCloseButton.addEventListener('click', closeBigPhoto);

  window.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeBigPhoto);
  });
};
