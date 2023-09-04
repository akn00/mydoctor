import React from 'react';
import "./CardSp.css"
// import dummyImg from "../../assets/SpecialitiesDummyImg.svg"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; 
import { useNavigate } from 'react-router-dom';

const CardSp = ({key,name,imageUrl}) => {
    const navigate = useNavigate();
    const baseUrl="http://my-doctors.net"
    const finalUrl= baseUrl+imageUrl;
    function handleClick(){
        navigate(`/search?sp=${name}`)
        console.log(name);
    }
    
    return (
        <div className='cardSp' onClick={handleClick}>
            <Card variant="outlined">
                <CardContent style={{display:"flex", alignItems:"center", flexDirection:"column", gap:"2rem"}}>
                   <img src={finalUrl} alt="card img"/>
                    <Typography color="text.primary" style={{fontWeight:"normal"}}>
                       {name}
                    </Typography>
                </CardContent>
            </Card>
        </div> 
    );
}

export default CardSp;