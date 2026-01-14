import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
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
import CommonCard from "../common/CommonCard";
// import { RechartsDevtools } from '@recharts/devtools';

const MotionCard = motion(CommonCard)

const fadeInOut = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
            ease: "easeIn",
        },
    },
};


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
                    sx={{ color: "#faf9f9", fontFamily: "MyFont" }}
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
                <MotionCard
                    variants={fadeInOut}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    // sx={{
                    //     width: "50%",
                    //     borderRadius: 3,
                    //     background: "rgba(240, 240, 240, 0.6)", // light grey glass
                    //     backdropFilter: "blur(10px)",            // frosted effect
                    //     WebkitBackdropFilter: "blur(10px)",      // Safari support
                    //     border: "1px solid rgba(200, 200, 200, 0.5)", // subtle grey border
                    //     boxShadow: "0 8px 24px rgba(0,0,0,0.05)",     // soft shadow
                    //     color: "#222",                            // darker text for contrast
                    //     transition: "all 0.3s ease",
                    //     ":hover": {
                    //         background: "rgba(240, 240, 240, 0.75)",
                    //         boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                    //     },
                    // }}
                >
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
                </MotionCard>
                <MotionCard
                    variants={fadeInOut}
                    initial="hidden"
                    animate="visible"
                    // exit="exit"
                    // sx={{
                    //     width: "50%",
                    //     borderRadius: 3,
                    //     background: "rgba(240, 240, 240, 0.6)", // light grey glass
                    //     backdropFilter: "blur(10px)",            // frosted effect
                    //     WebkitBackdropFilter: "blur(10px)",      // Safari support
                    //     border: "1px solid rgba(200, 200, 200, 0.5)", // subtle grey border
                    //     boxShadow: "0 8px 24px rgba(0,0,0,0.05)",     // soft shadow
                    //     color: "#222",                            // darker text for contrast
                    //     transition: "all 0.3s ease",
                    //     ":hover": {
                    //         background: "rgba(240, 240, 240, 0.75)",
                    //         boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                    //     },
                    // }}
                >
                    <CardContent sx={{ height: 350 }}>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: -5 }}>
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
                </MotionCard>
            </Box>
            <Box sx={{ mt: 5, ml: 3 }}>
                <MotionCard
                    variants={fadeInOut}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    width="95%"
                    // sx={{
                    //     borderRadius: 3,
                    //     background: "rgba(240, 240, 240, 0.6)", // light grey glass
                    //     backdropFilter: "blur(10px)",            // frosted effect
                    //     WebkitBackdropFilter: "blur(10px)",      // Safari support
                    //     border: "1px solid rgba(200, 200, 200, 0.5)", // subtle grey border
                    //     boxShadow: "0 8px 24px rgba(0,0,0,0.05)",     // soft shadow
                    //     color: "#222",                            // darker text for contrast
                    //     transition: "all 0.3s ease",
                    //     ":hover": {
                    //         background: "rgba(240, 240, 240, 0.75)",
                    //         boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                    //     },
                    // }}
                >
                    <CardContent
                        sx={{
                            height: 350,
                            minHeight: 300,
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
                </MotionCard>
            </Box>
        </Box>
    )
}