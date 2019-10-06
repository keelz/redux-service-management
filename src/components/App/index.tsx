import React, { useEffect } from 'react';
import logo from '../../common/assets/img/logo.svg';
import '../../common/assets/css/index.css';
import './App.css';

export interface IAppProps {}

export interface IAppStateProps {
  init: boolean;
}

export interface IAppDispatchProps {
  appSetInitAction: (init: boolean) => any;
}

type Props =
  & IAppProps
  & IAppStateProps
  & IAppDispatchProps;

const App: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.init) {
      props.appSetInitAction(true);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
