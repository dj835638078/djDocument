import React from 'react';  //凡是使用的jsx语法，一点要引入react
import ReactDOM from 'react-dom';
import Todolist from './TodoList';

ReactDOM.render(//将react生成的组件或者内容挂载到页面的某个节点之下
  <React.StrictMode>
    <Todolist />
  </React.StrictMode>,
  document.getElementById('root')
);
