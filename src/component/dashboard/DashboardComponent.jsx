import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import {
    BarChart,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';

export default function DashboardComponent({
    greeting,
    applied,
    goal,
    percentage
}) {
    const data = [
        { name: "Applied", value: percentage },
        { name: "Remaining", value: 100 - percentage },
    ];

    const COLORS = ["#6c4cff", "#eee"];

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    const data02 = [
        { name: 'Group A', value: 2400 },
        { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 },
        { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 },
        { name: 'Group F', value: 4800 },
    ];

    const data03 = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
        },
    ];
    return (
        <Box>
            <Box sx={{ p: 3 }}>
                <Typography
                    variant="h4"
                    fontWeight={600}
                    sx={{ color: "#222", fontFamily: "Heading" }}
                >
                    {greeting} 👋
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{
                        color: "#868585ff",
                        fontFamily: "Heading"
                    }}
                >
                    Apply, Track and Crack your desired job
                </Typography>
            </Box>
            <Box sx={{ ml: 3, mt: 5, display: "flex", gap: 5 }}>
                <Card sx={{ width: "50%", borderRadius: 3, boxShadow: 4 }}>
                    <CardContent sx={{ height: 350 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Weekly Progress
                        </Typography>

                        <Box
                            sx={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                mt: 2,
                                height: 250, // give it explicit height
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        startAngle={180}
                                        endAngle={0}
                                        innerRadius="60%"
                                        outerRadius="100%"
                                        paddingAngle={0}
                                        dataKey="value"
                                        cornerRadius={10}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center Text */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    textAlign: "center",
                                }}
                            >
                                <Typography variant="h4" fontWeight={700}>
                                    {applied}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    job applied
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 2, textAlign: "right" }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    backgroundColor: "#f0e8ff",
                                    color: "#6c4cff",
                                    borderRadius: 1,
                                    px: 1,
                                    py: 0.3,
                                    fontWeight: 600,
                                }}
                            >
                                Weekly goal: {goal}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ width: "50%", borderRadius: 3, boxShadow: 4 }}>
                    <CardContent sx={{ height: 350 }}>
                        <Typography variant="subtitle1" fontWeight={600} sx={{mb: -5}}>
                            Summary
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data01}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={60}
                                    fill="#8884d8"
                                />
                                <Pie
                                    data={data02}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    fill="#82ca9d"
                                    label
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Box>
            <Box sx={{ mt: 5, ml: 3 }}>
                <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                    <CardContent
                        sx={{
                            height: 350,      // ✅ REQUIRED
                            minHeight: 300,   // extra safety
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data03}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="pv"
                                    fill="#8884d8"
                                    radius={[8, 8, 0, 0]}
                                    barSize={15}
                                    isAnimationActive={true}     
                                    animationBegin={200}
                                    animationDuration={800}
                                    animationEasing="ease-out"
                                />
                                <Bar
                                    dataKey="uv"
                                    fill="#82ca9d"
                                    radius={[8, 8, 0, 0]}
                                    barSize={15}
                                    isAnimationActive={true} 
                                    animationBegin={300}
                                    animationDuration={900}
                                    animationEasing="ease-out"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}