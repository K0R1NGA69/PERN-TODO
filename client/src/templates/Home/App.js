import './App.css';
//Components
import InputTodo from '../../Components/InputTodo';
import ListTodos from '../../Components/ListTodos';


function App() {
  return (
    <div className='container'>
      <InputTodo/>
      <ListTodos/>
      
    </div>
  );
}

export default App;
