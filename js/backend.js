'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var SERVER_TIME = 10000;
  var STATUS_OK = 200;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
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

    xhr.timeout = SERVER_TIME; // 10s

    return xhr;
  };

  window.load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
