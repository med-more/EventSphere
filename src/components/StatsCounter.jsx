import { useEffect, useState } from 'react';
import { getStats } from '../api/axios';

const StatItem = ({ label ,value, icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() =>{
        let start = 0;
        const end = parseInt(value, 10);
        if(start === end) return;

        let totalDuration = 2000;
        let incrementTime = (totalDuration / end) * 5;

        if(end > 1000) incrementTime = 10;

        let timer = setInterval(() =>{
            start += Math.ceil(end / 100);
            if(start > end) start = end;
            setCount(start);
            if(start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value]);


  return (
        <div className="text-center p-6 bg-dark-grey rounded-2xl border border-dark-grey/50 hover:border-bright-orange/30 transition-all duration-300 group hover:transform hover:scale-105">
            <div className={`text-4xl mb-4 text-bright-orange group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div className="text-3xl md:text-4xl font-bold text-light-beige mb-2 font-mono">
                {count.toLocaleString()}
                <span className="text-bright-orange text-sm ml-1">+</span>
            </div>
            <p className="text-light-beige/70 text-sm uppercase tracking-wider font-medium">{label}</p>
        </div>
    );
};

const StatsCounter = () => {
    const [stats, setStats] = useState({
        totalTicketsSold: 0,
        happyCustomers: 0,
        eventsHosted: 0
    });

    useEffect(() => {
        const fetchStats = async () =>{
            try {
                const response = await getStats();
                if (response.data) {
                    setStats(response.data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 10000);
        return () => clearInterval(interval);
    }, []);
}

export default StatsCounter