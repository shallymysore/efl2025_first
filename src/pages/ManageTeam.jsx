import React, { useState, useMemo} from 'react';
import './ManageTeam.css'
import DataTable from 'react-data-table-component';

const baseURL = import.meta.env.VITE_BASE_URL;

export const ManageTeam = ()=> {
    const [playername, setPlayername] = useState('')
    const [player, setPlayer] = useState([])
    const [delplayer, setDelplayer] = useState()

    
    const handlegetplayer = async () => {
        try{
            const response = await fetch(baseURL+'/getspecificplayer?playerName='+playername);
            if(response.ok)
            {
                const json = await response.json();
                setPlayer([json])
            } else {
                console.log('Error: ' + response.status + response.body);
            }
        

            }catch (error) {
            console.error(error);
            }
        };


        const columns = [
            { selector: (row) => row['player_name'], name: 'Name' , sortable: true},
            { selector: (row) => row['ipl_team_name'], name: 'IPL Team' , sortable: true},
            { selector: (row) => row['status'], name: 'Status' , sortable: true},
            { selector: (row) => row['player_role'], name: 'Role' , sortable: true},
            { selector: (row) => row['country'], name: 'Country' , sortable: true},
            { selector: (row) => row['tier'], name: 'Tier', sortable: true },
            { selector: (row) => row['boughtFor'], name: 'BoughtFor', sortable: true },
            {
              id: 'ownerTeam',
              selector: (row) => row['ownerTeam'],
              name: 'OwnerTeam',
              sortable: true,
            },
          ];


          const contextActions = useMemo(() => {
            const Deleteplayer =() =>{
               const deleteplayer = delplayer
               const payload = { ownerTeam: deleteplayer[0].ownerTeam ,status: "unsold",boughtFor:deleteplayer[0].boughtFor,player_role:deleteplayer[0].player_role,country:deleteplayer[0].country};
               fetch(baseURL+'/deleteplayer/'+deleteplayer[0]._id.$oid, {
                   method: 'PUT',
                   headers: {
                       'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(payload)
                   })
                   
                   .then(response => response.json())
                   .then(data => {
                    console.log(data);
                    //window.location.reload()
                    setPlayer(player.filter((p) => p._id.$oid !== deleteplayer[0]._id.$oid)); 
                  })
                   .catch(error => {
                     console.error(error);
                   });
           };

           const Dropplayer =() =>{
            const dropplayer = delplayer
            //const payload = { ownerTeam: deleteplayer[0].ownerTeam ,status: "unsold",boughtFor:deleteplayer[0].boughtFor,player_role:deleteplayer[0].player_role,country:deleteplayer[0].country};
            const payload ={}
            fetch(baseURL+'/dropplayer/'+dropplayer[0]._id.$oid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payload)
                })
                
                .then(response => response.json())
                .then(data => {
                 console.log(data);
                 //window.location.reload()
                 setPlayer(player.filter((p) => p._id.$oid !== dropplayer[0]._id.$oid)); 
               })
                .catch(error => {
                  console.error(error);
                });
        };
       
           return (
            <>
               <button type="button" className="action-button" key="delete" onClick={Deleteplayer} style={{ backgroundColor: 'red' }}>
                   Delete
               </button>
              
               <button type="button" className="action-button" key="drop" onClick={Dropplayer} style={{ backgroundColor: 'green' }}>
               Drop Player
           </button>
           </>
           );
       }, [delplayer, player]);
       
        const handleChange = ({ selectedRows }) => {
            setDelplayer(selectedRows);
         };


  return (
    <div className='manageteampage'>
    
        <div className='manageteamcontainer'>
            <h1>Please enter the player name</h1>
            <input type="text" placeholder="Player Name" value={playername} onChange={(e) => setPlayername(e.target.value)} /> 
            <button className="action-button" onClick={handlegetplayer}>Get Player</button>
        </div>
        <div className='playertable'>
      <DataTable
        title={"Player Details"}
        columns={columns}
        data={player}
        defaultSortFieldId="ownerTeam"
        selectableRows ={true}
        highlightOnHover ={true}
        selectableRowsHighlight
        contextActions={contextActions}
        onSelectedRowsChange={handleChange}

      />
    </div>
    </div>
    
  )
}
