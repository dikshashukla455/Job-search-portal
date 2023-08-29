import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogBoxContent from "./DialogBoxContent";
import DialogTitle from "@mui/material/DialogTitle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function JobList(props) {
	// adding the functionality of open and close dialog box
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { user } = useAuth0();
	const getBookmarkState = () => {
		const savedStates =
			JSON.parse(localStorage.getItem("bookmarkedStates")) || {};
		return savedStates[props.jobId] || false;
	};

	// Function to set bookmarked state for a specific job ID
	const setBookmarkState = (value) => {
		const savedStates =
			JSON.parse(localStorage.getItem("bookmarkedStates")) || {};
		localStorage.setItem(
			"bookmarkedStates",
			JSON.stringify({ ...savedStates, [props.jobId]: value })
		);
	};

	// Initialize bookmarked state with the value from localStorage or false if not present
	const [bookmarked, setBookmarked] = React.useState(getBookmarkState());

	const onBookmarkHandler = async () => {
		try {
			const requestData = {
				jobId: props.jobId,
				userId: user && user.nickname,
				jobTitle: props.title,
				jobLocation: props.location,
				jobLink: props.apply,
			};

			await axios.post("http://localhost:8080/bookmarks/toggle", requestData);
			const newBookmarked = !bookmarked;
			setBookmarked(newBookmarked);
			// Save the updated bookmarked state for the specific job ID
			setBookmarkState(newBookmarked);
			console.log(requestData);
			console.log("bookmarked");
		} catch (error) {
			console.error("Error toggling bookmark:", error);
		}
	};

	return (
		<Box>
			{/* each job in a card component (with some information) */}
			<Card
				sx={{
					backgroundColor: "#3b4754",
					borderRadius: "10px",
					height: "260px",
					position: "relative",
				}}
			>
				{/* position of the job */}
				<CardContent>
					<Typography
						sx={{ fontSize: 24 }}
						color="secondary.light"
						gutterBottom
					>
						{props.title}
					</Typography>
					{/* company */}
					<Typography
						variant="h6"
						component="div"
						color="primary"
						sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
					>
						<BusinessIcon fontSize="18px" />
						&nbsp;&nbsp;
						{props.company}
					</Typography>
					{/* location of the jobs */}
					<Typography
						color="secondary.light"
						sx={{ display: "flex", alignItems: "center" }}
					>
						<LocationOnIcon fontSize="14px" />
						&nbsp;&nbsp;{props.location}
					</Typography>
					{/* contract time of the job */}
					{props.contractType && (
						<Typography
							fontSize="14px"
							color="primary"
							sx={{ display: "flex", alignItems: "center" }}
						>
							<AccessTimeFilledIcon fontSize="14px" />
							&nbsp;&nbsp;&nbsp;
							{props.contractType}
						</Typography>
					)}
				</CardContent>
				<div className="">
					{/* category of the job */}
					<CardActions>
						<Box
							style={{ position: "absolute", bottom: "4%" }}
							className="job_category"
						>
							{props.category}
						</Box>
						{/* button for view details related to the job */}
						<div
							style={{ position: "absolute", bottom: "4%", right: "3%" }}
							className="details-btn"
						>
							<Button
								size="medium"
								onClick={handleOpen}
								color="primary"
								variant="outlined"
							>
								View Details
							</Button>
						</div>
						{/* dialog box for more details with apply link of the job */}
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
							variant="dialogBox"
						>
							<div
								style={{
									color: "white",
									backgroundColor: "#22303e",
									paddingTop: "2rem",
								}}
							>
								<div onClick={onBookmarkHandler}>
									{bookmarked ? (
										<TurnedInIcon
											style={{
												position: "absolute",
												top: "3%",
												right: "5%",
												cursor: "pointer",
											}}
										/>
									) : (
										<TurnedInNotIcon
											style={{
												position: "absolute",
												top: "3%",
												right: "5%",
												cursor: "pointer",
											}}
										/>
									)}
								</div>
								<Typography variant="h4" ml={3}>
									Job Details
								</Typography>
								<DialogTitle>
									<DialogBoxContent
										jobId={props.jobId}
										title={props.title}
										company={props.company}
										location={props.location}
										description={props.description}
										salary={props.salary}
										contract_time={props.contractType}
									/>
									<a href={`${props.apply}`} target="_blank">
										<Button
											color="secondary"
											fontWeight="fontWeightBold"
											variant="contained"
											fontSize="bodyMedium.fontSize"
											onClick={handleClose}
											sx={{
												width: "100%",
												padding: "14px 0",
												margin: "20px 0 10px 0",
											}}
										>
											Apply now
										</Button>
									</a>
								</DialogTitle>
							</div>
						</Dialog>
					</CardActions>
				</div>
			</Card>
		</Box>
	);
}

export default JobList;
