import React, { useState, useEffect, useMemo, useRef,useCallback} from "react";
import './Players.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useQuery } from '@tanstack/react-query';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import RoleCellRenderer from '../components/RoleCellRenderer';
import TeamCellRenderer from '../components/TeamCellRenderer';
import DownloadIcon from '@mui/icons-material/Download';
import CustomLoadingOverlay from "../components/CustomLoadingOverlay";
import { setLoginSuccess } from '../components/redux/reducer/authReducer';
import { setselectedLeagueId, setisLeagueadmin, setCurrentLeague, setmemberof } from '../components/redux/reducer/leagueReducer';



const baseURL = import.meta.env.VITE_BASE_URL;

const fetchPlayerslist = async (id) => {
    const response = await fetch(baseURL+'/get_data?collectionName=leagueplayers&leagueId='+id);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

const fetchPlayerslistwithnoid = async () => {
  const response = await fetch(baseURL+'/get_data?collectionName=players');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};


export const AllPlayers = () => {
  const [Allplayers, setAllPlayerslist] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [soldPlayers, setSoldPlayers] = useState([]);
  const dispatch = useDispatch();

  const [isInitializing, setIsInitializing] = useState(true);
  const [shouldUseLeagueId, setShouldUseLeagueId] = useState(false);

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userProfile = useSelector((state) => state.login.userProfile);
  const selectedLeagueId = useSelector((state) => state.league.selectedLeagueId);
  const leagueinfo = useSelector((state) => state.league.currentLeague);
  const league_type = leagueinfo?.league_type
  

  const gridRef = useRef();

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const leagueId = localStorage.getItem('leagueId');
    const leaguedetailsstring = localStorage.getItem('currentLeague')
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      dispatch(setLoginSuccess(user));
    }

    if (leagueId){
      dispatch(setselectedLeagueId(leagueId));
      setShouldUseLeagueId(true);
    } else {
      setShouldUseLeagueId(false);
    }

    if (leaguedetailsstring){
      const leaguedetails = JSON.parse(leaguedetailsstring)
      dispatch(setCurrentLeague(leaguedetails))
    }
    
    setIsInitializing(false);

  }, [dispatch]);

  const leagueplayerlist = useQuery({
    queryKey:['leaguePlayerslist', selectedLeagueId], 
    queryFn:async()=>{
      let response;
      try{
        response = await fetchPlayerslist(selectedLeagueId);
      }catch(error){
        console.log(error)
      }
      return response
    },
    enabled: !isInitializing && shouldUseLeagueId && selectedLeagueId !== null && isLoggedIn,
  }
);

const listplayers = useQuery({
  queryKey:['allplayerslist'], 
  queryFn:async()=>{
    let response;
    try{
      response = await fetchPlayerslistwithnoid();
    }catch(error){
      console.log(error)
    }
    return response
  },
  enabled: !isInitializing && !shouldUseLeagueId && isLoggedIn,
}
);

useEffect(() => {
  if (leagueplayerlist.data) {
    setAllPlayerslist(leagueplayerlist.data);
  } else if (listplayers.data) {
    setAllPlayerslist(listplayers.data);
  }
}, [leagueplayerlist.data, listplayers.data]);

const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, [gridRef]);

  // if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'250px' }}>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;



  //setAllPlayerslist(data)

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };
  const auctioncolumnDefs = () => [
    { field: "player_name", headerName: "Name", width: 250},
    { field: "ipl_team_name", headerName: "IPL Team", width: 250, cellRenderer: 'teamCellRenderer' },
    { field: "status", headerName: "Status", width: 150,filter: true },
    { field: "player_role", headerName: "Role", width: 200,  cellRenderer: 'roleCellRenderer' },
  //{ field: "country", headerName: "Country", width: 220,filter: true,sort:'asc'},
  { field: "tier", headerName: "Tier", width: 80},
  { field: "isOverseas", headerName: "Overseas", width: 100 },
    //{ field: "ownerTeam", headerName: "Owner", width: 95 },
    //{ field: "boughtFor", headerName: "BoughtFor", width: 95 },
    { field: "ipl_salary", headerName: "Salary", width: 100 },
    { field: "afc_base_salary", headerName: "EFL Base Salary", width: 180 },
  { field: "rank", headerName: "Rank",sort:'asc', width: 140 },
  ];

  const draftcolumnDefs =()=> [
    { field: "player_name", headerName: "Name", width: 250},
    { field: "ipl_team_name", headerName: "IPL Team", width: 250, cellRenderer: 'teamCellRenderer' },
    { field: "status", headerName: "Status", width: 150,filter: true },
    { field: "player_role", headerName: "Role", width: 200,  cellRenderer: 'roleCellRenderer' },
  //{ field: "country", headerName: "Country", width: 220,filter: true,sort:'asc'},
  //{ field: "tier", headerName: "Tier", width: 80},
  { field: "isOverseas", headerName: "Overseas", width: 100 },
    //{ field: "ownerTeam", headerName: "Owner", width: 95 },
    //{ field: "boughtFor", headerName: "BoughtFor", width: 95 },
    { field: "ipl_salary", headerName: "Salary", width: 100 },
  // { field: "afc_base_salary", headerName: "EFL Base Salary", width: 180 },
  { field: "rank", headerName: "Rank",sort:'asc', width: 140 },
  ];

  const datacolumndefs = useMemo(()=>{
    return league_type === "auction" ?
    auctioncolumnDefs : draftcolumnDefs
  },[league_type]);

  const gridOptions = {
    //overlayLoadingTemplate: CustomLoadingOverlay,
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No data available</span>'
  };

  
  useEffect(() => {
    if (gridApi) {
      const isLoading = isInitializing || leagueplayerlist.isLoading || listplayers.isLoading;
      const hasError = leagueplayerlist.error || listplayers.error;

      if (isLoading) {
        gridApi.showLoadingOverlay();
      } else if (hasError) {
        gridApi.showNoRowsOverlay();
      } else if (Allplayers && Allplayers.length === 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }
  }, [gridApi, isInitializing, Allplayers,leagueplayerlist.isLoading,leagueplayerlist.error,listplayers.isLoading,listplayers.error ]);

  const components = {
    roleCellRenderer: RoleCellRenderer,
    teamCellRenderer: TeamCellRenderer,
    loadingOverlay: CustomLoadingOverlay
  };

  
    return (
      <>
      {isLoggedIn ?
      (
        <div className="player-page">
          <div className="player-container">
            <div className="header-container">
              <button className="download-button" onClick={onBtnExport} disabled={Allplayers.length === 0}>
                Download <DownloadIcon />
              </button>
            </div>
            <div className="ag-theme-alpine-dark player-main-container">
              <AgGridReact
                ref={gridRef}
                loading={isInitializing || leagueplayerlist.isLoading || listplayers.isLoading}
                rowData={Allplayers}
                columnDefs={datacolumndefs()}
                defaultColDef={defaultColDef}
                //pagination={true}
                //paginationPageSize={50}
                components={components}
                suppressExcelExport={true}
                animateRows={true}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
                loadingOverlayComponent="loadingOverlay"
                //overlayNoRowsTemplate='<span class="ag-overlay-no-rows-center">No data available</span>'
              />
            </div>
          </div>
        </div>

      ):(
        <div className ="player-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'250px' }}>
          <h1>Please Login to view Players</h1>
        </div>
        </div>
      )}
      </>
    );
    }
