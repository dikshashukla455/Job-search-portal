import React from "react";
import { Box } from "@mui/material";
// Dialog box for job details section
function DialogBoxContent(props) {
	return (
		<Box fontSize="16px" style={{ color: "#e6e6e6" }}>
			<div>
				{/* job-id */}
				{props.jobId && (
					<>
						{" "}
						<b>Job-id:</b> {props.jobId}
					</>
				)}
			</div>
			{/* job position */}
			<div>
				{props.title && (
					<>
						<b>Title:</b> {props.title}
					</>
				)}
			</div>
			{/* company */}
			<div>
				{props.company && (
					<>
						{" "}
						<b>Company:</b> {props.company}
					</>
				)}
			</div>
			{/* job location */}
			<div>
				{props.location && (
					<>
						{" "}
						<b>Location:</b> {props.location}
					</>
				)}
			</div>
			{/* job description */}
			<div>
				{props.description && (
					<>
						{" "}
						<b>Job-description:</b> {props.description}
					</>
				)}
			</div>
			{/* job salary */}
			<div>
				{props.salary && (
					<>
						{" "}
						<b>Salary:</b> {props.salary}{" "}
					</>
				)}
			</div>
			<div>
				{/* contract time of job */}
				{props.contract_time && (
					<>
						{" "}
						<b>Contract:</b> {props.contract_time}
					</>
				)}
			</div>
		</Box>
	);
}

export default DialogBoxContent;
