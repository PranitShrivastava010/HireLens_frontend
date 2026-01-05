import { useSelector } from "react-redux";
import DashboardComponent from "../../component/dashboard/DashboardComponent";

export default function DashboardContainer() {
    const hour = new Date().getHours();

    const {user} = useSelector((state) => state.auth)

    let greeting = "Good Morning";
    if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
    if (hour >= 17) greeting = "Good Evening";

    const applied = 1
    const goal = 10

    const percentage = Math.min((applied / goal) * 100, 100);

    const greetingWithName = user?.name ? `${greeting}, ${user.name}` : greeting;

    return (
        <DashboardComponent
            greeting={greetingWithName}
            applied={applied}
            goal={goal}
            percentage={percentage}

        />
    )
}