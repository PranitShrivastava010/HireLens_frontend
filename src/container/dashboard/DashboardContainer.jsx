import { useSelector } from "react-redux";
import DashboardComponent from "../../component/dashboard/DashboardComponent";
import { useEffect, useState } from "react";

export default function DashboardContainer() {

    const { user } = useSelector((state) => state.auth)

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 17) return "Good Evening";
        if (hour >= 12) return "Good Afternoon";
        return "Good Morning";
    };

    const [greeting, setGreeting] = useState(getGreeting());

    useEffect(() => {
        const now = new Date();
        const hour = now.getHours();

        let nextChange;

        if (hour < 12) {
            nextChange = new Date(now.setHours(12, 0, 0, 0));
        } else if (hour < 17) {
            nextChange = new Date(now.setHours(17, 0, 0, 0));
        } else {
            nextChange = new Date(now.setHours(24, 0, 0, 0));
        }

        const timeout = setTimeout(() => {
            setGreeting(getGreeting());
        }, nextChange - new Date());

        return () => clearTimeout(timeout);
    }, [greeting]);

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