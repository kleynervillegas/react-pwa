import logo from './logo.svg';
import './App.css';
import React, { useEffect} from "react";

function App() {

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);


  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "print event", event,isReadyForInstall);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  const upload = async () => {
		console.log("👍", "butInstall-clicked");
		const promptEvent = window.deferredPrompt;
		
		if (!promptEvent) {
			// The deferred prompt isn't available.
			console.log("oops, no prompt event guardado en window");
			return;
		}
		// Show the install prompt.
		promptEvent.prompt();
		// Log the result
		const result = await promptEvent.userChoice;
		console.log("👍", "userChoice", result);
		// Reset the deferred prompt variable, since
		// prompt() can only be called once.
		window.deferredPrompt = null;
		// Hide the install button.
		setIsReadyForInstall(false);
	}




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        { isReadyForInstall&& <a onClick={upload} className="d-block text-corpoelec mt-2 mb-3">Descaragr App</a>}
      </header>

    </div>
  );
}

export default App;
