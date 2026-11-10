function $(id) { return document.getElementById(id); }

function showTrace(containerId, steps, result) {
  var box = $(containerId);
  if (!box) return;
  var html = '<div class="trace-title">Пошаговый разбор</div><ol>';
  for (var i = 0; i < steps.length; i++) {
    html += '<li><span class="mono">' + steps[i] + '</span></li>';
  }
  html += '</ol><div class="result-box"><span class="out-label">Результат</span>' + result + '</div>';
  box.innerHTML = html;
}

function dumpUsers(arr, label) {
  var out = label || 'users';
  var strs = [];
  for (var i = 0; i < arr.length; i++) {
    strs.push(arr[i].name + ' (' + arr[i].age + ', ' + arr[i].role + ')');
  }
  return out + ': ' + strs.join('; ');
}

var defaultUsers = [
  { name: 'Олег', age: 21, role: 'user' },
  { name: 'Мария', age: 30, role: 'admin' },
  { name: 'Пётр', age: 17, role: 'user' },
  { name: 'Анна', age: 25, role: 'editor' }
];

function ex1() {
  var users = defaultUsers;
  var steps = [
    'Массив объектов users содержит ' + users.length + ' элемента',
    'Доступ к полю через .:'
  ];
  for (var i = 0; i < users.length; i++) {
    steps.push('users[' + i + '].name = "' + users[i].name + '", .age = ' + users[i].age + ', .role = "' + users[i].role + '"');
  }
  var result = dumpUsers(users, 'Список');
  console.log('Первый:', users[0].name, '| Поле role третьего:', users[2].role);
  showTrace('ex1-trace', steps, result);
}

function ex2() {
  var users = defaultUsers;
  var target = $('ex2-name').value;
  var found = -1;
  var steps = ['Ищем пользователя с именем "' + target + '"', 'Массив: ' + dumpUsers(users)];
  for (var i = 0; i < users.length; i++) {
    if (users[i].name === target) {
      found = i;
      steps.push('Найдено! users[' + i + '].name совпадает');
      break;
    } else {
      steps.push('users[' + i + '].name = "' + users[i].name + '" — не совпадает');
    }
  }
  if (found === -1) steps.push('Пользователь не найден');
  var result = found === -1 ? 'не найден' : 'найден: ' + users[found].name + ', возраст ' + users[found].age + ', роль ' + users[found].role;
  console.log(result);
  showTrace('ex2-trace', steps, result);
}

function ex3() {
  var users = defaultUsers;
  var adults = [];
  var steps = ['Порог: age >= 18', 'Массив: ' + dumpUsers(users)];
  for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 18) {
      adults.push(users[i]);
      steps.push('users[' + i + '] (' + users[i].name + ', ' + users[i].age + ') — добавлен');
    } else {
      steps.push('users[' + i + '] (' + users[i].name + ', ' + users[i].age + ') — пропущен');
    }
  }
  steps.push('В отфильтрованном массиве ' + adults.length + ' элементов');
  var result = dumpUsers(adults, 'Совершеннолетние');
  console.log(result);
  showTrace('ex3-trace', steps, result);
}

function ex4() {
  var users = [
    { name: 'Олег', age: 21 }, { name: 'Мария', age: 30 },
    { name: 'Пётр', age: 17 }, { name: 'Анна', age: 25 }
  ];
  var steps = ['Исходный массив (по порядку):'];
  for (var i = 0; i < users.length; i++) steps.push('  ' + users[i].name + ' — ' + users[i].age);
  steps.push('Сортируем по age по возрастанию (пузырьковая сортировка):');
  for (var i = 0; i < users.length - 1; i++) {
    for (var j = 0; j < users.length - 1 - i; j++) {
      if (users[j].age > users[j + 1].age) {
        var t = users[j];
        users[j] = users[j + 1];
        users[j + 1] = t;
        steps.push('  Поменяли местами ' + users[j].name + ' и ' + users[j + 1].name);
      }
    }
  }
  steps.push('После сортировки:');
  for (var i = 0; i < users.length; i++) steps.push('  ' + users[i].name + ' — ' + users[i].age);
  var result = dumpUsers(users, 'Отсортировано по возрасту');
  console.log(result);
  showTrace('ex4-trace', steps, result);
}

function ex5() {
  var users = [
    { name: 'Олег', score: 85 }, { name: 'Мария', score: 92 },
    { name: 'Пётр', score: 78 }, { name: 'Анна', score: 88 }
  ];
  var sum = 0;
  var steps = ['Баллы участников:'];
  for (var i = 0; i < users.length; i++) steps.push('  ' + users[i].name + ' — ' + users[i].score);
  steps.push('Суммируем поле score:');
  for (var i = 0; i < users.length; i++) {
    sum += users[i].score;
    steps.push('  + ' + users[i].score + ' → сумма = ' + sum);
  }
  var avg = sum / users.length;
  steps.push('Средний балл = ' + sum + ' / ' + users.length + ' = ' + avg.toFixed(2));
  var result = 'Сумма: ' + sum + ', Среднее: ' + avg.toFixed(2);
  console.log(result);
  showTrace('ex5-trace', steps, result);
}

(function() {
  var pres = document.querySelectorAll('pre.code');
  for (var i = 0; i < pres.length; i++) {
    var pre = pres[i];
    if (pre.parentNode.classList.contains('code-window')) continue;
    var title = pre.getAttribute('data-title');
    if (!title) {
      var el = pre.parentNode;
      while (el && el !== document.body) {
        var h = el.querySelector('.example-head h3, details.theory > summary');
        if (h) { title = h.textContent.trim(); break; }
        el = el.parentNode;
      }
      if (!title) title = 'object-array.js';
    }
    var codeWindow = document.createElement('div');
    codeWindow.className = 'code-window';
    var bar = document.createElement('div');
    bar.className = 'code-bar';
    var dotR = document.createElement('span'); dotR.className = 'dot r';
    var dotY = document.createElement('span'); dotY.className = 'dot y';
    var dotG = document.createElement('span'); dotG.className = 'dot g';
    var titleSpan = document.createElement('span');
    titleSpan.className = 'code-title';
    titleSpan.textContent = title;
    var copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Копировать';
    copyBtn.addEventListener('click', function(btn, code) {
      return function() {
        navigator.clipboard.writeText(code.textContent).then(function() {
          btn.textContent = 'Скопировано';
          btn.classList.add('copied');
          setTimeout(function() { btn.textContent = 'Копировать'; btn.classList.remove('copied'); }, 2000);
        }).catch(function() { btn.textContent = 'Ошибка'; });
      };
    }(copyBtn, pre));
    bar.appendChild(dotR); bar.appendChild(dotY); bar.appendChild(dotG);
    bar.appendChild(titleSpan); bar.appendChild(copyBtn);
    pre.parentNode.insertBefore(codeWindow, pre);
    codeWindow.appendChild(bar);
    codeWindow.appendChild(pre);
  }
})();