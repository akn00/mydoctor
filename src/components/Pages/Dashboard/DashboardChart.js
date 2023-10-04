import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Before 3',
    pv: 1800,
  },
  {
    name: 'Before 2',
    pv: 4000,
  },
  {
    name: 'Before 1',
    pv: 2500,
  },
  {
    name: 'Yesterday',
    pv: 3500,
  },
  {
    name: 'Today',
    pv: 4800,
  },
  
];

export default class Example extends PureComponent {

  render() {
    return (
        <LineChart
        data={data}
        width={420}
        height={270}
        style={{
          position: "relative",
          cursor: "default",
        }}
        margin={{
            top: 15,
            right: 30,
            bottom: 5,
          }}
      >
        <XAxis
          axisLine={{ stroke: "lightgray" }}
          tickLine={{ stroke: "lightgray" }}
          tick={{ fill: "lightgray", fontSize: "10" }}
          dataKey="name"
        />
        <YAxis
          axisLine={{ stroke: "lightgray" }}
          tickLine={{ stroke: "lightgray" }}
          tick={{ fill: "lightgray", fontSize: "10" }}
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
