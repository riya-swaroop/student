import React from 'react'
import { useState } from 'react';
import {Admin,Resource} from  'react-admin'
import restProvider from 'ra-data-simple-rest'
import PostList from './components/PostList'
import PostCreate from './components/PostCreate'
import PostEdit from './components/PostEdit'
import UserList from './components/UserList'
import UserCreate from './components/UserCreate'
import UserEdit from './components/UserEdit'
function App() {
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoggedin, setIsLoggedin] = useState(false);

const login = (e) => {
	e.preventDefault();
	console.log(name, email, password);
	const userData = {
	name,
	email,
	password,
	};
	localStorage.setItem('token-info', JSON.stringify(userData));
	setIsLoggedin(true);
	setName('');
	setEmail('');
	setPassword('');
};

const logout = () => {
	localStorage.removeItem('token-info');
	setIsLoggedin(false);
};

return (
	<>
	<div style={{ textAlign: 'center' }}>
		<h1>Student Management System</h1>
		{!isLoggedin ? (
		<>
			<form action="">
			<input
				type="text"
				onChange={(e) => setName(e.target.value)}
				value={name}
				placeholder="Name"
			/>
			<input
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				placeholder="Email"
			/>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				placeholder="Password"
			/>
			<button type="submit" onClick={login}>
				GO
			</button>
			</form>
		</>
		) : (
		<>
			<h1>Admin is logged in</h1><Admin dataProvider={restProvider('http://localhost:3000')}>
    <Resource name='posts'list={PostList} create={PostCreate} edit={PostEdit}/>
    <Resource name='users'list={UserList} create={UserCreate} edit={UserEdit}/>
  </Admin>

			<button onClickCapture={logout}>logout </button>
		</>
		)}
	</div>
	</>
);
}

export default App;

  


  