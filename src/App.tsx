import { RecoilRoot } from 'recoil';
import TodoList from './TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

export default App;
