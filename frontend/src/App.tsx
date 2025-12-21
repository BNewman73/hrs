import Container from "@mui/material/Container";
import RoomCard from "./components/RoomCard";
import { Box, Button, Toolbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./shared/store/hooks";
import { deleteRoom, fetchRooms } from "./features/roomSlice";
import { useEffect, useState } from "react";
import RoomCreateForm from "./components/RoomCreateForm";
import NavBar from "./components/NavBar";
import GlobalSnackbar from "./components/GlobalSnackbar";
import { showToast } from "./features/toastSlice";

function App() {
  const [roomNumber, setRoomNumber] =useState<string>('');
const dispatch =useAppDispatch(); 
const rooms = useAppSelector((state)=>state.room.items);
console.log(rooms)
useEffect(()=>{
 dispatch(fetchRooms())

  
},[dispatch])
  return <> 
<NavBar /> 
 <GlobalSnackbar />
 <Toolbar />
   <Container maxWidth="lg" >

<Button onClick={async ()=>{  dispatch(deleteRoom(roomNumber)).unwrap().then(()=>{
  dispatch(showToast({message:`Room ${roomNumber} was deleted`,severity:"success"}))}).catch(()=>
  dispatch(showToast({message:"Room failed to be deleted",severity:"error"})))}}>
  Delete ROOM
</Button>
<input type="text" value={roomNumber}  onChange={(e)=>setRoomNumber(e.target.value)} />
     <Box  sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      placeItems:"center",
      minHeight: "100vh",
      
    }}>

  <RoomCard />
   <RoomCreateForm/>
     </Box>
 

   </Container>
   
  </>;
}

export default App;
