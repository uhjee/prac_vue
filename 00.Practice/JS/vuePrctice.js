  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!',
      seen: true
    }
  });

  var app2 = new Vue({
    el: '#app-2',
    data: {
      message: '이 페이지는 ' + new Date() + '에 로드되었습니다.'
    }
  });

  var app4 = new Vue({
    el: '#app-4',
    data: {
      todos: [{
          text: '안녕하세요'
        },
        {
          text: '안녕하십니까'
        },
        {
          text: '와치텍'
        }
      ]
    }
  });
  // app4.todos.push({text:'New item'});

  var app5 = new Vue({
    el: '#app-5',
    data: {
      message: '안녕하세요! Vue.js!'
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('');
      }
    }
  });

  var app6 = new Vue({
    el: '#app-6',
    data: {
      message: '안녕하세요 Vueeeeeeeeeee!'
    }
  });

  Vue.component('todo-item', {
    //                'prop' 이라고 하는 사용자 정의 속성 비슷한 것을
    //                입력받을 수 있습니다. 여기서는 todo라는 이름으로 정의
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
  });

  var app7 = new Vue({
    el: '#app-7',
    data: {
      groceryList: [{
          id: 0,
          text: 'Vegetables'
        },
        {
          id: 1,
          text: 'cheese'
        },
        {
          id: 2,
          text: 'Whatever else humans are supposed to eat'
        }
      ]
    }
  });

  var app8 = new Vue({
    el: '#app-8',
    data: {
      fruits: []
    }
  })

  var model = {
    fruits: []
  };