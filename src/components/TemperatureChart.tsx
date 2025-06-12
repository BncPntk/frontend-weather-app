import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip
} from "recharts";

type Props = {
    labels: string[];
    temperatures: number[];
};

export default function TemperatureChart({labels, temperatures}: Props) {
    const data = labels.map((label, i) => ({
        day: label,
        temp: temperatures[i],
    }));

    return (
        <div className="mt-12 rounded-xl border border-gray-200 overflow-hidden">
            <ResponsiveContainer width="100%" height={200}>
                <LineChart
                    data={data}
                    margin={{top: 0, bottom: 0, left: 0, right: 0}}
                >
                    {/* háttérrács */}
                    <CartesianGrid
                        stroke="#ffffff50"
                        strokeDasharray="0"
                        horizontal={true}
                        vertical={false}
                    />
                    <XAxis dataKey="day" hide/>
                    <YAxis hide domain={[
                        (dataMin: number) => dataMin - 2,
                        (dataMax: number) => dataMax + 2
                    ]}/>
                    <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#f1f1f1"
                        strokeWidth={1.4}
                        dot={false}
                        isAnimationActive={false}
                    />

                    <Tooltip
                        cursor={{stroke: "#ffffff33", strokeWidth: 1}}
                        content={({active, payload, label}) => {
                            if (!active || !payload || !payload.length) return null;
                            return (
                                <div className="bg-white text-black text-sm px-2 py-1 rounded shadow">
                                    <strong>{label}</strong>: {payload[0].value} °C
                                </div>
                            );
                        }}
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
