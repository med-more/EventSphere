import { useEffect, useState } from 'react';
import { getStats } from '../api/axios';

const StatsCounter = ({ value }) => {
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
    <div>StatsCounter</div>
  )
}

export default StatsCounter