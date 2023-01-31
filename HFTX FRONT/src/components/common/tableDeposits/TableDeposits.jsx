import * as React from "react";
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./table-deposits.module.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#aaa",
      main: "#0058a6",
      dark: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ccc",
      contrastText: "#232744",
    },

    status: {
      danger: "#e53e3e",
    },

    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const columns = [
  {
    field: "ammount",
    headerName: "AMMOUNT",
    flex: 1,
    minWidth: 120,
    maxWidth: 600,
    headerClassName: "-headers",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "date",
    headerName: "DATE",
    minWidth: 150,
    headerClassName: "-headers",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "detail",
    headerName: "DETAIL",
    flex: 1,
    minWidth: 120,
    headerClassName: "-headers",
    headerAlign: "center",
    align: "center",
  }
];

//const VISIBLE_FIELDS = ["ammount", "date", "detail", "time"];
/* const rows = [
  { id:1, ammount: '200', date: '05/20/2022', detail: 'Processing', time: "14:50" }, 
  { id:2, ammount: "200", date: '05/20/2022', detail: 'Processing', time: "14:50" }, 
  { id:3, ammount: "200", date: '04/30/2022', detail: 'Approved', time: "14:50" }, 
   
]; */

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter 
        style={{
          fontSize: "20px",
          borderTop: "5px solid #232744",
          marginBottom: "5px",
          
          color: "#fff",
        }}
      />
    </GridToolbarContainer>
  );
}

const DataTable = ({ info }) => {
  
  
  return (
    <div className={styles.divtabla} style={{ width: "100%" }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: 500,
            align: "rigth",

            "& .-headers": {
              backgroundColor: "#232744",
              fontFamily: "verdana",
              color: "#232744",
            },
          }}
        >
          <div>
          <DataGrid
            theme={{ theme }}
            sx={{
              border: 0,
              borderColor: "#000",
              height: "420px",

              fontFamily: "sans-serif",
              textAlign: "center",
              align: "center",

              "& .MuiList-root": {
                color: "#030303",
              },

              "& .-headers": {
                backgroundColor: "#232744",
                fontFamily: "spantaran",
                color: "#232744",
                fontWeight: "bold",
              },

              "& .MuiDataGrid-filterFormColumnInput": {
                color: "red",
                font: "sans-serif",
              },

              "& .MuiDataGrid-quickFilterInput": {
                color: "red",
                font: "sans-serif",
              },

              
            }}
            disableColumnMenu={true}
            disableSelectionOnClick={true}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            
            components={{ Toolbar: CustomToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                printOptions: { disableToolbarButton: true },
                
              },
            }}
            rows={info}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
