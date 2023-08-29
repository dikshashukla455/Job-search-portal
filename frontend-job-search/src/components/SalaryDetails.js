import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import {
	Typography,
	TextField,
	Autocomplete,
	Button,
	Box,
} from "@mui/material";
import { Country } from "./Country";
import { Category } from "./Category";
function SalaryDetails() {
	const [positionInput, setPositionInput] = React.useState("");
	const [positionValue, setPositionValue] = React.useState("");
	const [value, setValue] = React.useState(); // setting the value of the location dropdown
	const [inputValue, setInputValue] = React.useState(""); // setting the input value state of the location dropdown
	// by submitting the api request (dynamic)
	const [data, setData] = React.useState(""); // setting the state for getting the api response
	const [chartData, setChartData] = React.useState({
		labels: [
			"2022-08",
			"2023-03",
			"2023-02",
			"2023-01",
			"2022-10",
			"2022-12",
			"2022-09",
			"2023-07",
			"2022-11",
			"2023-05",
			"2023-04",
			"2023-06",
		],
		datasets: [
			{
				label: "Salaries based on the Monthly Data",
				data: [
					52886.36, 55351.61, 55255.81, 55166.76, 51692.5, 55082.97, 52564.97,
					54019.64, 53395.89, 54755.31, 55399.83, 54590.89,
				],
				fill: false,
				borderColor: "#d500f9",
				tension: 0.1,
			},
		],
	});
	const onSubmitHandler = (e) => {
		fetch(
			`http://api.adzuna.com/v1/api/jobs/${value?.code}/history?app_id=e415d53f&app_key=05d362349ecb86d20c09b182da21a40f&category=${positionValue?.tag}&content-type=application/json`
		)
			.then((response) => response.json())
			.then((response) => {
				const salaryData = response.month;
				const labels = Object.keys(salaryData);
				const values = Object.values(salaryData);
				setChartData((prevChartData) => ({
					...prevChartData,
					labels,
					datasets: [
						{
							...prevChartData.datasets[0],
							data: values,
						},
					],
				}));
				console.log(response);
			});
		e.preventDefault();
	};

	return (
		<Box sx={{ color: "white" }}>
			<Typography
				variant="h4"
				fontWeight={600}
				mt={3}
				mb={5}
				style={{ textAlign: "center" }}
			>
				Salary Details
			</Typography>
			{/* form section */}
			<form action="" onSubmit={onSubmitHandler}>
				<center>
					{/* input fields for job search portal */}
					<div style={{ display: "flex", justifyContent: "center" }}>
						{/* position field */}
						{/* location dropdown */}
						<Autocomplete
							id="controllable-states-demo"
							onChange={(event, newValue) => {
								setPositionValue(newValue);
							}}
							positionValue={positionValue}
							positionInput={positionInput}
							onInputChange={(event, newInputValue) => {
								setPositionInput(newInputValue);
							}}
							options={Category}
							sx={{ width: 200 }}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Select Category"
									variant="filled"
								/>
							)}
						/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						{/* location dropdown */}
						<Autocomplete
							id="controllable-states-demo"
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
							value={value}
							inputValue={inputValue}
							onInputChange={(event, newInputValue) => {
								setInputValue(newInputValue);
							}}
							options={Country}
							sx={{ width: 200 }}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Select Country"
									variant="filled"
								/>
							)}
						/>
						&nbsp;&nbsp;&nbsp;&nbsp;
						{/* button for sending the api request */}
						<Button
							variant="contained"
							color="secondary"
							onClick={onSubmitHandler}
							sx={{ padding: "0 10px" }}
						>
							Submit
						</Button>
					</div>
				</center>
			</form>
			<br />
			<br />
			<center>
				<div style={{ width: "1000px" }}>
					<Chart
						type="line"
						data={chartData}
						options={{
							scales: {
								x: {
									ticks: {
										color: "white", // Change this color to your desired color
									},
								},
								y: {
									ticks: {
										color: "white", // Change this color to your desired color
									},
								},
							},
						}}
					/>
				</div>
			</center>
		</Box>
	);
}

export default SalaryDetails;
