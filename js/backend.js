'use strict';

(function () {
  window.load = function (onLoad, onError) {
    var url = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа');
    });

    xhr.timeout = 1000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var url = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', url);
    xhr.send(data);
  };
})();
