import React from "react";
import { FaDroplet, FaUser, FaClock, FaCircleCheck, FaFaucetDrip, FaGauge, FaChartLine, FaBolt, FaIndianRupeeSign } from "react-icons/fa6";
import { GiLeak, GiStraightPipe } from "react-icons/gi";

// Base styling properties passed from GaugeChart
interface CustomIconProps {
  className?: string;
  style?: React.CSSProperties;
}

// 1. Coverage: Faucet with drop
export const CoverageIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={style}>
    <FaFaucetDrip className="w-full h-full text-blue-500 drop-shadow-sm" style={style} />
  </div>
);

// 2. Per Capita: Person with water drop
export const PerCapitaIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={style}>
    <FaUser className="w-4/5 h-4/5 text-blue-500 drop-shadow-sm" style={style} />
    <FaDroplet className="absolute -bottom-1 -right-1 w-2/5 h-2/5 text-cyan-400 drop-shadow-sm" />
  </div>
);

// 3. Water Loss: Leaking Pipe
export const WaterLossIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={style}>
    <GiLeak className="w-full h-full text-blue-600 drop-shadow-sm" style={style} />
  </div>
);

// 4. Continuity: Clock/Dial with water drop
export const ContinuityIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={style}>
    <FaClock className="w-4/5 h-4/5 text-slate-500 drop-shadow-sm" style={style} />
    <FaDroplet className="absolute -bottom-1 -right-1 w-2/5 h-2/5 text-blue-500 drop-shadow-sm" />
  </div>
);

// 5. Quality: Water drop with checkmark
export const QualityIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={style}>
    <FaDroplet className="w-4/5 h-4/5 text-blue-500 drop-shadow-sm" style={style} />
    <FaCircleCheck className="absolute -bottom-1 -right-1 w-2/5 h-2/5 text-green-500 drop-shadow-md bg-white rounded-full" />
  </div>
);

// 6. Pressure: Pipe with gauge
export const PressureIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={style}>
    <GiStraightPipe className="absolute w-full h-full text-slate-400 drop-shadow-sm" style={style} />
    <FaGauge className="absolute top-0 w-3/5 h-3/5 text-slate-700 bg-white rounded-full border border-slate-200 shadow-sm p-0.5" />
  </div>
);

// Standard wrappers for other KPIs so they fit the same prop structure perfectly
export const RevenueRatioIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <FaChartLine className={className} style={style} />
);

export const ZapIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <FaBolt className={className} style={style} />
);

export const BasicGaugeIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <FaGauge className={className} style={style} />
);

export const MoneyIcon: React.FC<CustomIconProps> = ({ className, style }) => (
  <FaIndianRupeeSign className={className} style={style} />
);
