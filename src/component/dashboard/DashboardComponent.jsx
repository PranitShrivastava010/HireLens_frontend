import { Box, Card, CardContent, Typography, Avatar, IconButton, Divider, Grid, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Tooltip as MuiTooltip } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
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
import { format } from "date-fns";
import BusinessIcon from "@mui/icons-material/Business";
import EventIcon from "@mui/icons-material/Event";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

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

const STATUS_COLORS = {
    APPLIED: "#6c4cff",
    INTERVIEW: "#00c853",
    REJECTED: "#ff1744",
    NO_RESPONSE: "#ff9100",
    OFFER: "#ffd600",
    SAVED: "#00b0ff",
};

const GAUGE_COLORS = ["#6c4cff", "rgba(255, 255, 255, 0.1)"];

const formatDisplayDate = (value, pattern, fallback = "Date TBD") => {
    if (!value) {
        return fallback;
    }

    const parsedDate = value instanceof Date ? value : new Date(value);

    return Number.isNaN(parsedDate.getTime()) ? fallback : format(parsedDate, pattern);
};

export default function DashboardComponent({
    greeting,
    stats,
    onUpdateGoal
}) {
    const [isGoalOpen, setIsGoalOpen] = useState(false);
    const [newGoal, setNewGoal] = useState(stats?.weeklyProgress?.weeklyGoal || 10);

    const weeklyProgress = stats?.weeklyProgress || { appliedThisWeek: 0, weeklyGoal: 10, percentage: 0 };
    
    const gaugeData = [
        { name: "Applied", value: Math.min(weeklyProgress.percentage, 100) },
        { name: "Remaining", value: Math.max(0, 100 - weeklyProgress.percentage) },
    ];

    const statusSummaryData = stats?.statusSummary?.map(item => ({
        name: item.label,
        value: item.count,
        key: item.key
    })) || [];

    const weeklyActivityData = stats?.weeklyActivity ? [
        { name: 'Mon', count: stats.weeklyActivity.monday },
        { name: 'Tue', count: stats.weeklyActivity.tuesday },
        { name: 'Wed', count: stats.weeklyActivity.wednesday },
        { name: 'Thu', count: stats.weeklyActivity.thursday },
        { name: 'Fri', count: stats.weeklyActivity.friday },
        { name: 'Sat', count: stats.weeklyActivity.saturday },
        { name: 'Sun', count: stats.weeklyActivity.sunday },
    ] : [];

    const recentApplications = stats?.recentApplications || [];

    const handleGoalSubmit = () => {
        onUpdateGoal(parseInt(newGoal));
        setIsGoalOpen(false);
    }

    return (
        <Box sx={{ pb: 5 }}>
            <Box sx={{ p: 3 }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{ color: "#faf9f9", fontFamily: "Heading", mb: 0.5 }}
                >
                    {greeting} 👋
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{
                        color: "rgba(255, 255, 255, 0.6)",
                        fontFamily: "Heading"
                    }}
                >
                    Here's what's happening with your job search today.
                </Typography>
            </Box>

            <Grid
                container
                spacing={3}
                sx={{
                    px: 3,
                    mt: 2,
                    mx: 0,
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    alignItems: "stretch",
                }}
            >
                {/* Row 1: Weekly Progress & Application Status */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", minWidth: 0 }}>
                    <MotionCard
                        variants={fadeInOut}
                        initial="hidden"
                        animate="visible"
                        width="100%"
                    >
                        <CardContent sx={{ height: 380, display: "flex", flexDirection: "column" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
                                    Weekly Progress
                                </Typography>
                                <MuiTooltip title="Set Target Goal">
                                    <IconButton 
                                        size="small" 
                                        onClick={() => {
                                            setNewGoal(weeklyProgress.weeklyGoal);
                                            setIsGoalOpen(true);
                                        }}
                                        sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: "#6c4cff", bgcolor: "rgba(108, 76, 255, 0.1)" } }}
                                    >
                                        <EditRoundedIcon fontSize="small" />
                                    </IconButton>
                                </MuiTooltip>
                            </Box>

                            <Box sx={{ position: "relative", flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={gaugeData}
                                            startAngle={210}
                                            endAngle={-30}
                                            innerRadius="75%"
                                            outerRadius="100%"
                                            paddingAngle={0}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {gaugeData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={GAUGE_COLORS[index]} 
                                                    cornerRadius={index === 0 ? 10 : 0}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                <Box sx={{ position: "absolute", textAlign: "center", mt: -2 }}>
                                    <Typography variant="h3" fontWeight={800} sx={{ color: "#fff" }}>
                                        {weeklyProgress.appliedThisWeek}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 600 }}>
                                        Jobs Applied
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", display: "block" }}>
                                        Target
                                    </Typography>
                                    <Typography variant="body1" fontWeight={700} sx={{ color: "#fff" }}>
                                        {weeklyProgress.weeklyGoal} Apps/week
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "right" }}>
                                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", display: "block" }}>
                                        Achievement
                                    </Typography>
                                    <Typography variant="body1" fontWeight={700} sx={{ color: "#6c4cff" }}>
                                        {weeklyProgress.percentage}%
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </MotionCard>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", minWidth: 0 }}>
                    <MotionCard
                        variants={fadeInOut}
                        initial="hidden"
                        animate="visible"
                        width="100%"
                    >
                        <CardContent sx={{ height: 380 }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#fff" }}>
                                Application Status
                            </Typography>
                            <Box sx={{ display: "flex", height: "calc(100% - 40px)", alignItems: "center" }}>
                                <ResponsiveContainer width="60%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusSummaryData}
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {statusSummaryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.key] || "#888"} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: "#1e1e1e", border: "none", borderRadius: "8px", color: "#fff" }}
                                            itemStyle={{ color: "#fff" }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <Box sx={{ width: "40%", pl: 2 }}>
                                    {statusSummaryData.map((entry, index) => (
                                        <Box key={entry.key} sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: STATUS_COLORS[entry.key] || "#888", mr: 1.5 }} />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", display: "block", lineHeight: 1 }}>
                                                    {entry.name}
                                                </Typography>
                                                <Typography variant="body2" fontWeight={700} sx={{ color: "#fff" }}>
                                                    {entry.value}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </CardContent>
                    </MotionCard>
                </Grid>

                {/* Recent Applications & Interviews (Stacked or Spaced) */}
                <Grid size={12} sx={{ minWidth: 0 }}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                        {/* Upcoming Interviews Section */}
                        {stats?.upcomingInterviews && stats.upcomingInterviews.length > 0 && (
                            <MotionCard
                                variants={fadeInOut}
                                initial="hidden"
                                animate="visible"
                                width={recentApplications.length > 0 ? "35%" : "100%"}
                            >
                                <CardContent>
                                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff", mb: 2 }}>
                                        Interviews
                                    </Typography>
                                    {stats.upcomingInterviews.map((interview, index) => (
                                        <Box key={index} sx={{ mb: 1, p: 1, borderRadius: 2, bgcolor: "rgba(0, 200, 83, 0.1)", border: "1px solid rgba(0, 200, 83, 0.2)" }}>
                                            <Typography variant="body2" fontWeight={700} sx={{ color: "#00c853" }}>
                                                {interview.type || "Interview"}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                                                {interview.companyName} • {formatDisplayDate(interview.date, "MMM d, h:mm a")}
                                            </Typography>
                                        </Box>
                                    ))}
                                </CardContent>
                            </MotionCard>
                        )}

                        <MotionCard
                            variants={fadeInOut}
                            initial="hidden"
                            animate="visible"
                            sx={{ flexGrow: 1 }}
                            width="100%"
                        >
                            <CardContent sx={{ height: 350, display: "flex", flexDirection: "column" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
                                        Recent Applications
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#6c4cff", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                                        View All
                                    </Typography>
                                </Box>
                                
                                <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1, "&::-webkit-scrollbar": { width: "4px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "10px" } }}>
                                    {recentApplications.length > 0 ? (
                                        <Grid container spacing={2}>
                                            {recentApplications.map((app, index) => (
                                                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                                                    <Box sx={{ p: 1.5, borderRadius: 2, transition: "0.2s", bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", "&:hover": { bgcolor: "rgba(255,255,255,0.08)" } }}>
                                                        <Box sx={{ display: "flex", gap: 2 }}>
                                                            <Avatar sx={{ bgcolor: "rgba(108, 76, 255, 0.1)", color: "#6c4cff", width: 40, height: 40, fontSize: 16, fontWeight: 700 }}>
                                                                {app.companyName.charAt(0)}
                                                            </Avatar>
                                                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                                                <Typography variant="body2" fontWeight={700} sx={{ color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                                    {app.jobTitle}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", display: "flex", alignItems: "center", gap: 0.5 }}>
                                                                    <BusinessIcon sx={{ fontSize: 12 }} /> {app.companyName}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
                                                            <Box sx={{ px: 1, py: 0.2, borderRadius: 1, bgcolor: `${STATUS_COLORS[app.status.toUpperCase()] || "#6c4cff"}20`, color: STATUS_COLORS[app.status.toUpperCase()] || "#6c4cff", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>
                                                                {app.status}
                                                            </Box>
                                                            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.3)", display: "flex", alignItems: "center", gap: 0.5 }}>
                                                                <EventIcon sx={{ fontSize: 12 }} /> {formatDisplayDate(app.appliedAt, "MMM d")}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", opacity: 0.3 }}>
                                            <Typography variant="body2" fontWeight={600}>No recent activities</Typography>
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>
                        </MotionCard>
                    </Box>
                </Grid>

                {/* Final Row: Full Width Weekly Activity */}
                <Grid size={12} sx={{ display: "flex", minWidth: 0 }}>
                    <MotionCard
                        variants={fadeInOut}
                        initial="hidden"
                        animate="visible"
                        width="100%"
                    >
                        <CardContent sx={{ height: 400 }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 4, color: "#fff" }}>
                                Weekly Activity
                            </Typography>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={weeklyActivityData}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#6c4cff" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#6c4cff" stopOpacity={0.4} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 12, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 12, fontWeight: 500 }}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                                        contentStyle={{ backgroundColor: "#1e1e1e", border: "none", borderRadius: "8px", color: "#fff" }}
                                    />
                                    <Bar 
                                        dataKey="count" 
                                        fill="url(#barGradient)" 
                                        radius={[6, 6, 0, 0]} 
                                        barSize={60}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </MotionCard>
                </Grid>


            </Grid>
            {/* Goal Edit Dialog */}
            <Dialog 
                open={isGoalOpen} 
                onClose={() => setIsGoalOpen(false)}
                PaperProps={{
                    sx: {
                        bgcolor: "#1a1a1a",
                        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                        color: "#fff",
                        borderRadius: 3,
                        px: 2,
                        py: 1,
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 700 }}>Set Weekly Goal</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 3 }}>
                        How many jobs do you aim to apply for this week?
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Weekly Goal"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        slotProps={{
                            input: {
                                sx: { color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6c4cff" } }
                            },
                            inputLabel: {
                                sx: { color: "rgba(255,255,255,0.5)" }
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setIsGoalOpen(false)} sx={{ color: "rgba(255,255,255,0.5)" }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleGoalSubmit} 
                        variant="contained" 
                        sx={{ bgcolor: "#6c4cff", "&:hover": { bgcolor: "#5a3ee0" }, borderRadius: 2, px: 3, fontWeight: 700 }}
                    >
                        Update Goal
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

