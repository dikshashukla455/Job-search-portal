import "./App.css";
import {customTheme} from "./components/Theme"
import Job from "./components/Job";
import { ThemeProvider } from "@mui/system";
function App() {
	return (
		<div className="App">
		<ThemeProvider theme={customTheme}>
			<Job />
			</ThemeProvider>
		</div>
	);
}

export default App;
