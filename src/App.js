import "./App.css";
import { customTheme } from "./components/Theme";
import Job from "./components/Job";
import { ThemeProvider } from "@mui/system";
import User from "./components/User";
import Bookmarks from "./components/Bookmarks";
import { Routes, Route } from "react-router-dom";
import SalaryDetails from "./components/SalaryDetails";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={customTheme}>
				<User />
				<Routes>
					<Route exact path="/bookmarks" element={<Bookmarks />} />
					<Route exact path="/salaryDetails" element={<SalaryDetails />} />
					<Route exact path="/" element={<Job />} />
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;
