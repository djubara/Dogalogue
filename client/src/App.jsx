import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import React from 'react'
// import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from "./components/Footer"

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
 
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Header/>
      <div className = "content">
        <Outlet/>
      </div>
      <Footer/>
    </div>
    </ApolloProvider>
  )
}

export default App;
