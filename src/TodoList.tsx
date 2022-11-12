import TodoItemCreator from './components/TodoItemCreator';
import TodoListFilters from './components/TodoListFilters';
import TodoListStatus from './components/TodoListStatus';
import TodoItemsRender from './components/TodoItemsRender';
import Title from './components/Title';
import Save from './components/Save';

export default function TodoList() {
  return (
    <div>
      <Title />
      <TodoItemCreator />
      <TodoItemsRender />
      <TodoListFilters />
      <TodoListStatus />
      <Save />
    </div>
  );
}
