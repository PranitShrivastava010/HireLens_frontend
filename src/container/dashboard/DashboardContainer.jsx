import DashboardComponent from "../../component/dashboard/DashboardComponent";

export default function DashboardContainer() {
    const hour = new Date().getHours();

    let greeting = "Good Morning";
    if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
    if (hour >= 17) greeting = "Good Evening";

    const applied = 1
    const goal = 10

    const percentage = Math.min((applied / goal) * 100, 100);

    return (
        <DashboardComponent
            greeting={greeting}
            applied={applied}
            goal={goal}
            percentage={percentage}

        />
    )
}