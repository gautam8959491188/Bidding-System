import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import UserList from './components/UserList';
import AddItem from './components/AddItem';
import { Provider } from 'react-redux';
import store from './utils/Store';
import BidPage from './components/BidPage';
import LeaderBoard from './components/LeaderBoard';
import { useState } from 'react';
import ShowResults from './components/ShowResults';




function App() {


  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/SignUp",
      element: <SignUp />
    },
    {
      path: "/UserDetails",
      element: <UserDetails />
    },
    {
      path: "/UserList",
      element: <UserList />
    },
    {
      path: "/AddItem",
      element: <AddItem />
    },
    {
      path: "/BidPage",
      element: <BidPage />
    },
    {
      path: "/LeaderBoard",
      element: <LeaderBoard />
    },
    {
      path: "/ShowResults",
      element: <ShowResults />
    }

  ]);


  return (
    
  <Provider store={store}>
  <RouterProvider router={appRouter} />
  </Provider>





  );
  
}

export default App;
