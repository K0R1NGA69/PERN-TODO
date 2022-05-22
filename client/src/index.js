import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { TodosProvider } from './Context/TodosProvider';
import './index.css';
import { queryClient } from './services/queryClient';
import App from './templates/Home/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TodosProvider>
        <App />
      </TodosProvider>
    </QueryClientProvider>

  </React.StrictMode>
);


