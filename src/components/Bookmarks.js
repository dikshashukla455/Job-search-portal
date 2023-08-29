// BookmarksPage.js
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import axios from "axios";
import close from "../images/cross.svg";

function BookmarksPage() {
	const { user, isAuthenticated } = useAuth0();
	const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

	useEffect(() => {
		if (isAuthenticated) {
			fetchBookmarkedJobs();
		}
	}, [isAuthenticated]);

	const fetchBookmarkedJobs = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8080/bookmarks/${user && user.nickname}`
			);
			setBookmarkedJobs(response.data);
		} catch (error) {
			console.error("Error fetching bookmarks:", error);
		}
	};

	const onRemoveBookmarkedJob = async (jobId) => {
		const requestData = {
			jobId: jobId,
			userId: user && user.nickname,
		};

		try {
			await axios.delete("http://localhost:8080/bookmarks", {
				data: requestData,
			});
			// Perform any additional actions after successful removal
			console.log("Bookmark removed successfully");
			console.log(requestData);
			fetchBookmarkedJobs();
		} catch (error) {
			console.error("Error removing bookmark:", error);
		}
	};

	return (
		<div style={{ color: "white" }}>
			<h2 style={{ textAlign: "center" }}>Saved Jobs</h2>
			<div>
				{bookmarkedJobs.map((job) => (
					<div className="bookmark-container">
						<div key={job.jobId}>{job.jobTitle}</div>
						<div key={job.jobId} className="bookmark-location">
							{job.jobLocation}
						</div>
						<div style={{ display: "flex", alignItems: "center" }}>
							<a href={`${job.jobLink}`}>
								<button
									className="btn-apply"
								>
									Apply now
								</button>
							</a>
							<img
								src={close}
								alt=""
								style={{ marginLeft: "20px" }}
								onClick={() => onRemoveBookmarkedJob(job.jobId)}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default BookmarksPage;
