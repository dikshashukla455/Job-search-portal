import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// rows per pages dropdown
export default function RowPage(props) {
	const [rows, setRows] = React.useState(10); // setting the state of the no.of rows by default it is 10 card in one page.

	const handleChange = (event) => {
		setRows(event.target.value);
	};
	props.rowspage(rows);

	return (
		<div>
			{/* rows per dropdown */}
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-standard-label" className="rows">
					rows per page
				</InputLabel>
				<Select
					sx={{ "& .MuiSvgIcon-root": { color: "white" }, color: "white" }}
					labelId="demo-simple-select-standard-label"
					id="demo-simple-select-standard"
					value={rows}
					onChange={handleChange}
					color="primary"
					label="age"
				>
					{/* options */}
					<MenuItem value={10}>
						<em>10</em>
					</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={30}>30</MenuItem>
					<MenuItem value={40}>40</MenuItem>
					<MenuItem value={50}>50</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
