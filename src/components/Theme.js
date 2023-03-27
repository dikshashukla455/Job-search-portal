import { createTheme } from "@mui/material/styles";
export const customTheme = createTheme({
	palette: {
		primary: {
			main: "#FFFFFF",
		},
		secondary: {
			light: "#cfd8dc",
			main: "#d500f9",
		},
	},
	typography: {
		h4: {
			fontSize: "30px",
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: ({ ownerState }) => ({
					backgroundColor: "rgb(255,255,255,0.4)",
					borderRadius: "5px",
				}),
			},
		},
		MuiPaginationItem: {
			styleOverrides: {
				root: ({ ownerState }) => ({
					color: "#ffffff",
				}),
			},
		},
	},
});
