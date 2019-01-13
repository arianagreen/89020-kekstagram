'use strict';

// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

(function () {
  var onLoad = function (photos) {
    var PHOTOS_AMOUNT = 10;

    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

    var renderPhoto = function (photo) {
      var photoElement = photoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      photoElement.addEventListener('click', function () {
        window.renderBigPhoto(photo);
      });

      return photoElement;
    };

    var receivedPhotos = photos;

    // Обработчики изменения фильтров

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    var renderPreviews = function (photosArray) {
      var photoFragment = document.createDocumentFragment();
      var photoContainer = document.querySelector('.pictures');

      photosArray.forEach(function (photoItem) {
        photoFragment.appendChild(renderPhoto(photoItem));
      });

      if (photoContainer.querySelector('.picture')) {
        clearPhotos(photoContainer);
      }

      photoContainer.appendChild(photoFragment);
    };

    renderPreviews(receivedPhotos);

    var FilterActions = {
      'filter-popular': function () {
        return receivedPhotos;
      },
      'filter-new': function () {
        var newPhotos = [];
        var receivedPhotosSorted = receivedPhotos.slice().sort(function () {
          return 0.5 - Math.random();
        });

        for (var i = 0; i < PHOTOS_AMOUNT; i++) {
          newPhotos.push(receivedPhotosSorted[i]);
        }
        return newPhotos;
      },
      'filter-discussed': function () {
        return receivedPhotos.slice().sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
      }
    };

    var lastTimeout;

    var onButtonClick = function (evt) {
      window.util.switchButton(evt.target);
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        var action = evt.target.id;
        renderPreviews(FilterActions[action]());
      }, 500);
    };

    var filterButtons = document.querySelectorAll('.img-filters__button');

    filterButtons.forEach(function (button) {
      button.addEventListener('click', onButtonClick);
    });

    var clearPhotos = function (node) {
      while (node.querySelector('.picture')) {
        node.removeChild(node.querySelector('.picture'));
      }
    };
  };

  window.load(onLoad);
}());
