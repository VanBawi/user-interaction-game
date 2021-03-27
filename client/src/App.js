import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { TakeRandomQuiz } from './components/TakeRandomQuiz';
import { GlobalProvider } from './context/GlobalState';

import { NewUser } from './components/NewUser';
import { UserGlobalProvider } from './context/UserState';
import { UploadFile } from './components/UploadFile';

function App() {
	return (
		<GlobalProvider>
			<UserGlobalProvider>
				<Router>
					<Header />
					<Switch>
						<Route exact path='/quiz'>
							<TakeRandomQuiz />
						</Route>
						<Route exact path='/:id'>
							<UploadFile />
						</Route>
						<Route exact path='/'>
							<NewUser />
						</Route>
					</Switch>
				</Router>
			</UserGlobalProvider>
		</GlobalProvider>
	);
}

export default App;
