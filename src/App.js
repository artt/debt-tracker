import React from "react"
import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Drawer from "./components/Drawer"
import Box from '@mui/material/Box';
import { facets } from "./data"
// import streamgraph from 'highcharts/modules/streamgraph'

// streamgraph(Highcharts)

Highcharts.dateFormats = {
  q: function (timestamp) {
    var date = new Date(timestamp),
    quarter = (Math.floor(date.getUTCMonth() / 3) + 1);
    // console.log(quarter);
    return quarter;
  }
};

function App() {

  const [data, setData] = React.useState([])
  const [facet, setFacet] = React.useState('fi')

  React.useEffect(() => {
    fetch(`http://localhost:1443/data/nd`, {
    // fetch(`https://debt-tracker.onrender.com/data/nd`, {
    // fetch(`https://pier-debt-tracker.herokuapp.com/data/nd`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filters: {
          product: 0,
          fi: 0,
          class: 0,
          region: 0,
          urban: 0,
          age: 0,
          covid: 0
        },
        facet: facet,
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("incoming data", res)
        setData({
          firstPeriod: Date.UTC(parseInt(res.first_period.slice(0, 4)), parseInt(res.first_period.slice(5)) * 3 - 1),
          data: Object.keys(res.data).map(x => {
            return ({
              name: facets[facet].groups[x].label,
              data: res.data[x],
            })
          }),
        })
      })
  }, [facet])

  const options = {
    chart: {
      type: 'areaspline', // 'streamgraph',
      zoomType: 'x',
    },
    title: {
      text: 'หนี้ที่เปลี่ยนสถานะ',
    },
    plotOptions: {
      areaspline: {
        stacking: 'normal',
        marker: {
          enabled: false,
        },
      },
      series: {
        pointStart: data.firstPeriod,
        pointIntervalUnit: 'month',
        pointInterval: 3,
        events: {
          legendItemClick: e => e.preventDefault()
        }
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%YQ%q}',
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x:%YQ%q}</b><br/>',
      shadow: false,
      shared: true,
      useHTML: true,
      xDateFormat: '%Y-%m-%d',
      formatter: function() {
        let out = `<table><caption>${Highcharts.dateFormat("%YQ%q", this.x)}</caption><tbody>`
        this.points.forEach(point => {
          out += `<tr><th>${point.series.name}</th>`
          out += `<td>${point.y}</td></tr>`
        })
        out += `<tr><th>Total</th><td>${this.points[0].total}</td></tr>`
        out += `</tbody></table>`
        return out
      }
    },
    series: data.data,
  }

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <Drawer
          facets={facets}
          facet={facet} setFacet={setFacet}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{
            style: {
              height: "100vh",
              width: "100%",
              padding: "50px",
              boxSizing: "border-box"
            }
          }}
        />
      </Box>
    </div>
  );
}

export default App;
