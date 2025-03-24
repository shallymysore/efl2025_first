import React, { useState, useEffect } from "react";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import { Breadcrumb } from 'antd';
import './Linegraph.css';
import { useQuery } from '@tanstack/react-query';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


const baseURL = import.meta.env.VITE_BASE_URL;

const getallownerslist = async () => {
    const response = await fetch(baseURL+'/get_data?collectionName=eflDraft_ownerTeams');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
    };


  const gettimestamp = async () => {
    const response = await fetch(baseURL+'/get_data?collectionName=global_data');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

export const Linegraph = () => {
    const [chartData, setChartData] = useState(null);
    const [teamsdata, setTeamData] = useState([]);
    const [timsestamps, setTimestamps] = useState([]);
    

    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    console.log("a",isPortrait)

    const breadcrumbStyle = {
      display: 'flex',
      //justifyContent: 'space-between',
    };
  
    const secondItemStyle = {
      display: 'flex',
      justifyContent: 'center',
      fontWeight:'bold',
      color:'green'
    };

    const { isLoading: isLoadingTeams, error: errorTeams, data: stats } = useQuery({ queryKey: ['teams'], queryFn: getallownerslist });

  //console.log("NOP",stats)

  useEffect(() => {
    if (stats) {
        setTeamData(stats);
    }
  }, [stats]); 


  const { isLoading: isLoadingTS, error: errorTS, data: timsestamp } = useQuery({ queryKey: ['timestamp'], queryFn: gettimestamp });

  //console.log("NOP",stats)

  useEffect(() => {
    if (timsestamp) {
        setTimestamps(timsestamp);
    }
  }, [timsestamp]); 


    /***
    useEffect(() => {
        async function getallteampoints(){
          try {
            const response = await fetch(baseURL+'/getallownersdata');
            if(response.ok){
              const dat = await response.json();
              //console.log("x",dat)
              setTeamData(dat);
            } else {
              console.log('Error: ' + response.status + response.body);
            }
          } catch (error) {
            console.error(error);
          }
        }
        getallteampoints();
      }, [])

      useEffect(() => {
        async function gettimestamps(){
          try {
            const response = await fetch(baseURL+'/gettimestamps');
            if(response.ok){
              const data = await response.json();
              setTimestamps(data);
            } else {
              console.log('Error: ' + response.status + response.body);
            }
          } catch (error) {
            console.error(error);
          }
        }
        gettimestamps();
      }, [])***/

      const options = {
        animation: {
            duration: 0,
          },
          plugins: {
            legend: true,
            title: {
              display: true,
              text: () => "standings"
            }
          },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days'
                }
              },
            y: {
                reverse: true,
                title: {
                    display: true,
                    text: 'Rank'
                }
              }
          }
      };

    useEffect(() => {
        if (teamsdata && teamsdata.length > 0) {
            const [team1, team2, team3, team4, team5, team6, team7, team8, team9] = teamsdata;
            const numDays = team1.standings.length;
            //const numDays = 7;
            const labels = Array.from({ length: numDays }, (_, i) => `day${i + 1}`);
            const datasets = [
                {
                    label: team1.teamName,
                    data: team1.standings,
                    //data: [1,2,4,6,7,2,3],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(255, 206, 86, 0.5)",
                    backgroundColor:"rgba(255, 206, 86, 0.5)"
                },
                {
                    label: team2.teamName,
                    data: team2.standings,
                    //data:[2,4,7,3,6,5,1],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(255, 99, 71, 0.5)",
                    backgroundColor: "rgba(255, 99, 71, 0.5)"
                },
                {
                    label: team3.teamName,
                    data: team3.standings,
                    //data:[3,7,6,2,5,1,5],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(106, 209, 98, 0.5)",
                    backgroundColor: "rgba(106, 209, 98, 0.5)"
                },
                {
                    label: team4.teamName,
                    data: team4.standings,
                    //data:[4,6,2,7,1,3,4],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(54, 162, 235, 0.5)",
                    backgroundColor: "rgba(54, 162, 235, 0.5)"
                },
                {
                    label: team5.teamName,
                    data: team5.standings,
                    //data:[5,5,3,1,4,6,7],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(153, 102, 255, 0.5)",
                    backgroundColor: "rgba(153, 102, 255, 0.5)"
                },
                {
                    label: team6.teamName,
                    data: team6.standings,
                    //data:[6,1,5,4,3,7,2],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(255, 159, 64, 0.5)",
                    backgroundColor: "rgba(255, 159, 64, 0.5)"
                }/*,
                {
                    label: team7.teamName,
                    data: team7.standings,
                    //data:[7,3,1,5,2,4,6],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(200, 142, 144, 0.5)",
                    backgroundColor: "rgba(200, 142, 144, 0.5)"
                },
                {
                  label: team8.teamName,
                  data: team8.standings,
                  //data:[8,1,5,2,3,4,6],
                  fill: false,
                  tension: 0.4,
                  curve: 'smooth',
                  borderColor: "rgba(75, 192, 192, 0.5)",
                  backgroundColor: "rgba(75, 192, 192, 0.5)"
              },
              {
                label: team9.teamName,
                data: team9.standings,
                //data:[8,1,5,2,3,4,6],
                fill: false,
                tension: 0.4,
                curve: 'smooth',
                borderColor: "rgba(150, 25, 32, 0.5)",
                backgroundColor: "rgba(150, 25, 32, 0.5)"
            }*/
            ];
            const data = { labels, datasets };
            
            setChartData(data);
        // re-render the Linechart whenever the teamsStats prop changes
        };
    },[teamsdata])

    if (isLoadingTeams || isLoadingTS) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'250px' }}>Loading...</div>;
    if (errorTS||errorTeams) return <div>Error: {errorTeams.message}</div>;
  
  
   
    if (teamsdata.length === 0) return <div>Loading teams data...</div>;

    return (
        <div className="linegraphpage">
      <div className="linegraphcontainer">
        {timsestamps[0] &&
      <Breadcrumb className="breadcrumb" items={[{title:'Standing Updated At '+timsestamps[0].rankingsUpdatedAt}]}/>
      }
        {isPortrait ? (
           <div className="chart" style={{height:"77vh",overflowX:"auto",aspectRatio:1}}>
           {chartData && <Line data={chartData} options={options} />}
       </div>
        ):(
        <div className="chart" style={{height:"77vh",overflowX:"auto",aspectRatio:1.8}}>
            {chartData && <Line data={chartData} options={options} />}
        </div>)}
        </div>
        </div>
    );
}