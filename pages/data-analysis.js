import Head from "next/head";
import { useEffect, useState } from "react";
import { NavAside } from "components";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

export default () => {

  const [data, setData] = useState({
    labels: ["2007", "2008", "2009", "2010", "2011", "2012", "2013"],
    datasets: [
      {
        label: "Men",
        data: [106898, 103937, 99492, 87213, 101943, 118848, 103120],
        borderColor: 'blue',
        tension: 0,
        pointStyle: 'rect',
        pointBorderColor: 'blue',
        pointBackgroundColor: '#fff',
        showLine: true,
      },
      {
        label: "Female",
        data: [97516, 94796, 91818, 79673, 94684, 110633, 95993],
        borderColor: 'black',
        tension: 0,
        pointStyle: 'rect',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        showLine: true
      }
    ]
  })
  return (
    <div className="flex">
      <Head>
        <title>Data Analysis</title>
      </Head>
      <NavAside />
      <main>
        <h1>data analysis</h1>
        <Line data={data}>Hello</Line>
      </main>
    </div>
  )
}