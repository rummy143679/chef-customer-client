import { useEffect, useState } from "react";

const StatCard = ({ title, value, icon, gradient }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value); // support decimals like rating
    if (start === end) return;

    let duration = 1000;
    let incrementTime = 20;
    let step = end / (duration / incrementTime);

    let timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start.toFixed(1)); // supports rating like 4.5
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="col-md-4">
      <div className={`card stat-card ${gradient} border-0 h-100 text-center`}>
        <div className="card-body">
          <i className={`bi ${icon} stat-icon text-white`}></i>
          <h6 className="mt-3 text-white">{title}</h6>
          <h3 className="fw-bold text-white">{count}</h3>
        </div>
      </div>
    </div>
  );
};

export default StatCard;