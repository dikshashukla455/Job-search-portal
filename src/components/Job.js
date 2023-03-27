import React from "react";
import {
	Typography,
	TextField,
	Autocomplete,
	Grid,
	Pagination,
	Button,
	Box,
	Paper,
} from "@mui/material";
import { Country } from "./Country";
import Contract from "./Contract";
import JobList from "./JobList";
import RowPage from "./RowPage";
import RotateLoader from "react-spinners/RotateLoader";

function Job() {
	const [positionInput, setPositionInput] = React.useState("");
	const [value, setValue] = React.useState(); // setting the value of the location dropdown
	const [inputValue, setInputValue] = React.useState(""); // setting the input value state of the location dropdown
	const [contract, setContract] = React.useState(""); // setting the contract state of the contract type dropdown
	const [rowsPerPage, setRowsPerPage] = React.useState(); // setting the state of the rows per page dropdown
	const [data, setData] = React.useState(""); // setting the state for getting the api response
	const [Loadings, SetLoadings] = React.useState(false); // setting the state of the loader initially it will be false
	const [page, setPage] = React.useState(1); // setting the pagination state with  1st page by default
	const itemsPerPage = rowsPerPage; // number of cards(jobs) per page
	const handleChange = (event, value) => {
		setPage(value);
	};
	const onSearchHandler = (e) => {
		setPositionInput(e.target.value);
	};
	const onContract = (time) => {
		setContract(time);
	};
	const onpageHandler = (result) => {
		setRowsPerPage(result);
	};
	// adding conditions to the api request
	const full_time = contract === "full-time" ? `&full_time=1` : ``;
	const part_time = contract === "part-time" ? `&part_time=1` : ``;
	const contract_time = contract === "contract" ? `&contract=1` : ``;
	// API REQUEST
	// a sample api request
	React.useEffect(() => {
		SetLoadings(true);
		fetch(
			`http://api.adzuna.com:80/v1/api/jobs/gb/search/1?app_id=e415d53f&app_key=05d362349ecb86d20c09b182da21a40f&results_per_page=50&&what=&part_time=1&content-type=application/json`
		)
			.then((response) => response.json())
			.then((response) => {
				SetLoadings(false);
				setData(response);
			});
		setPositionInput("");
		setInputValue("");
		setContract("");
	}, []);
	// by submitting the api request (dynamic)
	const onSubmitHandler = (e) => {
		SetLoadings(true);
		fetch(
			`http://api.adzuna.com:80/v1/api/jobs/${value?.code}/search/1?app_id=e415d53f&app_key=05d362349ecb86d20c09b182da21a40f&results_per_page=${rowsPerPage}&&what=${positionInput}${full_time}${part_time}${contract_time}&content-type=application/json`
		)
			.then((response) => response.json())
			.then((response) => {
				SetLoadings(false);
				setData(response);
			});
		e.preventDefault();
	};

	return (
		// job portal section
		<Box sx={{ color: "white" }}>
			<Typography
				variant="h4"
				fontWeight={600}
				mt={3}
				mb={5}
				style={{ textAlign: "center" }}
			>
				Job Search Portal
			</Typography>
			{/* form section */}
			<form action="" onSubmit={onSubmitHandler}>
				<center>
					{/* input fields for job search portal */}
					<div style={{ display: "flex", justifyContent: "center" }}>
						{/* position field */}
						<TextField
							id="filled-basic"
							label="Position"
							variant="filled"
							color="primary"
							style={{ margin: "0 20px" }}
							onChange={onSearchHandler}
						/>
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
						{/* Contract type dropdown */}
						<Contract contractTime={onContract} />
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
			{/* no. of jobs component */}
			<Box className="jobs-section" sx={{ width: "70%", marginX: "auto" }}>
				{Loadings ? (
					<center>
						<div>
							<br />
							{/* added the loader when the api request is sent */}
							<RotateLoader color="#d500f9" loading={Loadings} size={15} />
						</div>
					</center>
				) : (
					<>
						{/* jobs cards in a grid manner */}
						<Grid container spacing={3}>
							{data.results
								?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
								.map((job) => (
									<Grid item xs={12} sm={12} md={6} lg={6} xl={6} mx="auto">
										{/* each job card having a below information */}
										<JobList
											jobId={job.id}
											title={job.title}
											company={job.company.display_name}
											description={job.description}
											salary={job.salary_max}
											location={job.location.display_name}
											contractType={job.contract_time}
											category={job.category.label}
											apply={job.redirect_url}
										/>
									</Grid>
								))}
						</Grid>
						{/* functionality for if no jobs are available */}
						{data.count === 0 && (
							<Box
								display="flex"
								alignItems="center"
								justifyContent="center"
								flexDirection="column"
								height="50vh"
							>
								<Typography
									variant="h2"
									color="secondary"
									fontWeight="bold"
									mb={5}
								>
									Sorry :(
								</Typography>
								<Typography variant="h3" color="primary" mt={2}>
									No jobs are available
								</Typography>
							</Box>
						)}
						{/* functionality for if no jobs are available in pagination*/}
						{data.count !== 0 && (
							<Box display="flex" justifyContent="center" alignItems="center">
								{/* PAGINATION */}
								<Pagination
									className="pagination"
									count={Math.ceil((data.results?.length || 0) / itemsPerPage)}
									page={page}
									onChange={handleChange}
									defaultPage={1}
									color="secondary"
								/>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<RowPage rowspage={onpageHandler} />
							</Box>
						)}
					</>
				)}
			</Box>
		</Box>
	);
}

export default Job;
