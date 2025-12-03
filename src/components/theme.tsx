import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif',
        fontWeightRegular: 400,
    },
    palette: {
        background: {
            default: "linear - gradient(90deg, rgba(42, 123, 155, 1) 0 %, rgba(87, 199, 133, 1) 50 %, rgba(237, 221, 83, 1) 100 %)", 
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)",
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    textTransform: 'none',
                }
            }
        }
    },
});

export default customTheme; 