import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { TakeRandomQuiz } from './components/TakeRandomQuiz';
import { GlobalProvider } from './context/GlobalState';
import { NewUser } from './components/NewUser';

function App() {
	return (
		<GlobalProvider>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/'>
						<div className='container'>
							<TakeRandomQuiz />
						</div>
					</Route>
					<Route exact path='/user'>
						<div className='container'>
							<NewUser />
						</div>
					</Route>
				</Switch>
			</Router>
		</GlobalProvider>
	);
}

export default App;
