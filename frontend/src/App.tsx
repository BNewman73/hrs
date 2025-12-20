import Container from "@mui/material/Container";
import RoomCard from "./components/RoomCard";
import { Box } from "@mui/material";


function App() {
  
  return <> 


   <Container maxWidth="lg" >

     <Box  sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      placeItems:"center",
      minHeight: "100vh",
      
    }}>

  <RoomCard />
     </Box>
  

   </Container>
  </>;
}

export default App;
