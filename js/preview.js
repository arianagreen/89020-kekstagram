'use strict';

// Покажите элемент .big-picture, удалив у него класс .hidden и заполните его данными из первого элемента сгенерированного вами массива

window.renderBigPhoto = function (photo) {
  // var photo = photo;
  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoCloseButton = bigPhoto.querySelector('#picture-cancel');
  var moreComments = bigPhoto.querySelector('.comments-loader');
  moreComments.classList.remove('hidden');

  bigPhoto.classList.remove('hidden');
  bigPhoto.querySelector('.big-picture__img img').src = photo.url;
  bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.social__caption').textContent = photo.description;

  var photoComments = photo.comments;

  // Вставляем комментарии под большой фотографией
  var bigCommentsContainer = document.querySelector('.social__comments');
  var bigComment = document.querySelector('.social__comment');
  var commentsShownIndicator = document.querySelector('.comments-shown');
  // var bigCommentFragment = document.createDocumentFragment();

  var createBigComment = function (comment) {
    var bigCommentElement = bigComment.cloneNode(true);
    // bigCommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomInt(1, 7) + '.svg';
    bigCommentElement.querySelector('.social__picture').src = comment.avatar;
    bigCommentElement.querySelector('.social__text').textContent = comment.message;
    return bigCommentElement;
  };


  // отрисовка комментариев
  var renderComments = function (from, to) {
    var bigCommentFragment = document.createDocumentFragment();

    for (var i = from; i < to; i++) {
      bigCommentFragment.appendChild(createBigComment(photoComments[i]));
    }

    bigCommentsContainer.appendChild(bigCommentFragment);
  };

  var onMoreCommentsClick = function () {

    var comments = photoComments;
    var commentsShown = bigCommentsContainer.querySelectorAll('.social__comment');
    if (comments.length > commentsShown.length) {
      var restComments = comments.length - commentsShown.length;
      if (restComments > 5) {
        renderComments(commentsShown.length, commentsShown.length + 5);
        commentsShownIndicator.textContent = commentsShown.length + 5;
      } else {
        renderComments(commentsShown.length, commentsShown.length + restComments);
        commentsShownIndicator.textContent = commentsShown.length + restComments;
        moreComments.classList.add('hidden');
      }
    }
  };

  moreComments.addEventListener('click', onMoreCommentsClick);


  // очистка списка комментариев
  while (bigCommentsContainer.hasChildNodes()) {
    bigCommentsContainer.removeChild(bigCommentsContainer.firstChild);
  }

  if (photoComments.length < 5) {
    renderComments(0, photoComments.length);
    commentsShownIndicator.textContent = photoComments.length;
    moreComments.classList.add('hidden');
  } else {
    renderComments(0, 5);
    commentsShownIndicator.textContent = '5';
  }


  // закрытие окна по клику и нажатию esc
  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    moreComments.removeEventListener('click', onMoreCommentsClick);
  };

  bigPhotoCloseButton.addEventListener('click', closeBigPhoto);

  window.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeBigPhoto);
  });
};
