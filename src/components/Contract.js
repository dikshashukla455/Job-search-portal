import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = ["full-time", "part-time", "contract"];

export default function Contract(props) {
	const [value, setValue] = React.useState();
	const [inputValue, setInputValue] = React.useState("");
	props.contractTime(value);
	return (
		// contract type dropdown
		<div>
			<Autocomplete
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="controllable-states-demo"
				options={options}
				sx={{ width: 200 }}
				renderInput={(params) => (
					<TextField {...params} label="Contract time" variant="filled" />
				)}
			/>
		</div>
	);
}
