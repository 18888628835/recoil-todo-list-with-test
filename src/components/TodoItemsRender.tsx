import { useRecoilValue } from 'recoil';
import { filteredTodoListState } from '../store/Atom';
import TodoItem from './TodoItem';

const TodoItemsRender = () => {
  const todoList = useRecoilValue(filteredTodoListState);
  const TodoItems = todoList.map((todoItem) => <TodoItem key={todoItem.id} item={todoItem} />);

  return <div>{TodoItems}</div>;
};

export default TodoItemsRender;
