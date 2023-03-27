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
import CloseImg from "../images/cross.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
function JobList(props) {
	// adding the functionality of open and close dialog box
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
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
							sx={{
								marginLeft: "5px",
								backgroundColor: "#d500f9",
								color: "white",
								padding: "7px 15px 7px 15px",
								borderRadius: "5px",
							}}
						>
							{props.category}
						</Box>
						{/* button for view details related to the job */}
						<div
							className=""
							style={{ position: "absolute", bottom: "4%", right: "3%" }}
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
							<div style={{ color: "white", backgroundColor: "#22303e" }}>
								<div className="close-img" onClick={handleClose}>
									<img src={CloseImg} alt="" width="12px" />
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
