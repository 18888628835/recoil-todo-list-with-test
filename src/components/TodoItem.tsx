import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState, TodoState } from '../store/Atom';

//修改数据
function replaceItemAtIndex(arr: TodoState[], index: number, newValue: TodoState) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
//删除数据
function removeItemAtIndex(arr: TodoState[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const TodoItem: React.FC<{ item: TodoState }> = (props) => {
  const { item } = props;
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  // 修改文字
  const editItemText = (e: ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: e.target.value,
    });
    //重新设置仓库中的数据
    setTodoList(newList);
  };
  // 切换仓库中的isComplete数据
  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };
  // 删除仓库中的数据
  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div data-testid={`todo-item-${index}`}>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItem;
