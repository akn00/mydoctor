import React from 'react';
import "./CardSp.css"
import dummyImg from "../../assets/SpecialitiesDummyImg.svg"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; const CardSp = () => {
    return (
        <div className='cardSp'>
            <Card variant="outlined">
                <CardContent style={{display:"flex", alignItems:"center", flexDirection:"column", gap:"2rem"}}>
                   <img src={dummyImg} alt="card img"/>
                    <Typography color="text.primary" style={{fontWeight:"normal"}}>
                        Bone Marrow
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default CardSp;