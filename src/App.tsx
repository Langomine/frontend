import React from 'react'
import './App.css'
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import {List, ListItem, ListItemIcon, ListItemText, Tab, Tabs} from "@mui/material";
import { IoCheckmark } from "react-icons/io5";
import {LiaTimesSolid} from "react-icons/lia";
import GaugeComponent from 'react-gauge-component';


import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import {ChartData, ChartOptions} from "chart.js";

function App() {
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
  };

  const summaryChartOptions: ChartOptions<'radar'> = {
    responsive: true,
      scales: {
        r: {
            min: 0,
            max: 9,
        }
      },
    plugins: {
        legend: {
            display: false,
        },
    }
  }
  const summaryChartData: ChartData<'radar'> = {
    labels: ['Fluency', 'Lexical', 'Grammar', 'Pronunciation'],
      datasets: [{data: [2, 1, 3, 7]}]
  }

  return (
    <>
        <Card sx={{ minWidth: 1000 }}>
            <CardContent sx={{ minHeight: 400 }}>
                <Typography gutterBottom variant="h5" component="div">
                    Test Results
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <div>
                            <Tabs variant="fullWidth" value={tab} onChange={handleTabChange} centered
                                  indicatorColor="secondary"
                                  aria-label="secondary tabs example">
                                <Tab label="Overview"/>
                                <Tab label="Fluency"/>
                                <Tab label="Lexical"/>
                                <Tab label="Grammar"/>
                                <Tab label="Pronunciation"/>
                            </Tabs>

                            <div hidden={tab !== 0}>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <GaugeComponent
                                            type="semicircle"
                                            labels={{
                                                valueLabel: {
                                                    style: {
                                                        fill: '#444444',
                                                        textShadow: 'unset'
                                                    },
                                                    formatTextValue: (value: number) => `${value} - GOOD`
                                                }
                                            }}
                                            arc={{
                                                colorArray: ['#FF2121', '#00FF15'],
                                                padding: 0.02,
                                                subArcs:
                                                    [
                                                        { limit: 3 },
                                                        { limit: 6 },
                                                        { limit: 9 },
                                                    ]
                                            }}
                                            pointer={{type: "blob", animationDelay: 0 }}
                                            minValue={0}
                                            maxValue={9}
                                            value={7}
                                        />


                                    </Grid>
                                    <Grid size={6}>
                                        <Radar data={summaryChartData} options={summaryChartOptions}/>
                                    </Grid>
                                </Grid>

                            </div>
                            <div hidden={tab !== 1}>
                                <List dense={true}>
                                    <ListItem>
                                        <ListItemIcon sx={{color: 'green', minWidth: 25}}>
                                            <IoCheckmark/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chelsea Otakan"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{color: 'red', minWidth: 25}}>
                                            <LiaTimesSolid/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chelsea Otakan"/>
                                    </ListItem>
                                </List>
                            </div>
                            <div hidden={tab !== 2}>
                                <List dense={true}>
                                    <ListItem>
                                        <ListItemIcon sx={{color: 'green', minWidth: 25}}>
                                            <IoCheckmark/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chelsea Otakan"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{color: 'red', minWidth: 25}}>
                                            <LiaTimesSolid/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chelsea Otakan"/>
                                    </ListItem>
                                </List>
                            </div>
                            <div hidden={tab !== 3}>
                                <List dense={true}>
                                    <ListItem>
                                        <ListItemIcon sx={{color: 'green', minWidth: 25}}>
                                            <IoCheckmark/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chelsea Otakan"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{color: 'red', minWidth: 25}}>
                                            <LiaTimesSolid/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chelsea Otakan"/>
                                    </ListItem>
                                </List>
                            </div>
                            <div hidden={tab !== 4}>
                                <List dense={true}>
                                    <ListItem>
                                        <ListItemIcon sx={{color: 'green', minWidth: 25}}>
                                            <IoCheckmark/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chelsea Otakan"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{color: 'red', minWidth: 25}}>
                                            <LiaTimesSolid/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chelsea Otakan"/>
                                    </ListItem>
                                </List>
                            </div>
                        </div>

                    </Grid>
                </Grid>


            </CardContent>
            <CardActions>
                <Button size="small">New</Button>
            </CardActions>
        </Card>
    </>
  )
}

export default App
