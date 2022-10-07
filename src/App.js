import React from "react"
import './App.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Drawer from "./components/Drawer"
import Box from '@mui/material/Box';
import { facets, totalBorrowers } from "./data"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

// import streamgraph from 'highcharts/modules/streamgraph'
// streamgraph(Highcharts)

Highcharts.dateFormats = {
  q: function (timestamp) {
    var date = new Date(timestamp),
    quarter = (Math.floor(date.getUTCMonth() / 3) + 1);
    // console.log(quarter);
    return quarter;
  }
}

function formatNumber(num, percent) {
  if (percent) {
    return num.toFixed(2) + '%'
  }
  return num.toLocaleString() + ' คน'
}

function App() {

  let defaultFilters = {}
  Object.keys(facets).forEach(facet => {
    if (facets[facet].type === "single")
      defaultFilters[facet] = [0]
    else
      defaultFilters[facet] = Object.keys(facets[facet].groups).map(x => parseInt(x))
  })

  const [options, setOptions] = React.useState({})
  const [res, setRes] = React.useState({})
  const [dataReady, setDataReady] = React.useState(false)
  const [facet, setFacet] = React.useState('fi')
  const [filters, setFilters] = React.useState(defaultFilters)
  const [percent, setPercent] = React.useState(true)
  const [streamgraph, setStreamgraph] = React.useState(false)

  const serverAddress = process.env.NODE_ENV === "development"
    ? `http://localhost:1443`
    : `https://pier-debt-tracker.herokuapp.com`

  React.useEffect(() => {
    const {meta, ...restFilters} = filters
    // if meta = facet then no need to make another fetch
    // TODO: need to delete filter for facet too
    if (false) { //(meta === facet) {
      // do nothing
    }
    else {
      // setDataReady(false)
      fetch(`${serverAddress}/data/nd`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filters: restFilters,
          facet: facet,
        })
      })
        .then(res => res.json())
        .then(res => setRes(res))
    }
  }, [facet, filters, serverAddress])

  React.useEffect(() => {
    if (Object.keys(res).length === 0)
      return
    setDataReady(true)
    const pointStart = Date.UTC(parseInt(res.first_period.slice(0, 4)), (parseInt(res.first_period.slice(5)) - 1) * 3)
    setOptions({
      chart: {
        type: streamgraph ? 'streamgraph' : 'areaspline', // 'streamgraph',
        zoomType: 'x',
        style: {
          fontFamily: 'IBM Plex Sans Thai'
        }
      },
      caption: {
        text: 'จำนวนสถาบันการเงินใน NCB มีการเปลี่ยนแปลงจากสถาบันการเงินที่เข้ามาใหม่หรือการควบรวมกิจการ จำนวนผู้กู้ที่เริ่มมีปัญหาค้างชำระหนี้ส่วนหนึ่งจึงอาจแปรผันตามสถาบันการเงินที่เป็นสมาชิก NCB ณ ช่วงเวลานั้น ๆ ด้วย',
      },
      title: {
        text: 'ผู้กู้ที่เริ่มมีปัญหาค้างชำระหนี้',
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          stacking: 'normal',
          marker: {
            enabled: false,
          },
        },
        series: {
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
      yAxis: {
        title: {
          text: percent
            ? "สัดส่วนผู้กู้ (ร้อยละ)"
            : "จำนวนผู้กู้ (ราย)"
        },
      },
      tooltip: {
        headerFormat: '<b>{point.x:%YQ%q}</b><br/>',
        shadow: false,
        shared: true,
        useHTML: true,
        xDateFormat: '%Y-%m-%d',
        formatter: function() {
          let out = `<table class="tooltip-table"><caption>${Highcharts.dateFormat("%YQ%q", this.x)}</caption><tbody>`
          console.log(this.points[0])
          this.points.forEach(point => {
            out += `<tr><th>${point.series.name}</th>`
            out += `<td class="align-right">${formatNumber(point.y, percent)}</td>`
            out += `<td class="align-right">${formatNumber(point.point.altY, !percent)}</td>`
            out += `</tr>`
          })
          out += `<tr><th>Total</th>`
          out += `<td class="align-right">${formatNumber(this.points[0].total, percent)}</td>`
          out += `<td class="align-right">${formatNumber(this.points.map(p => p.point.altY).reduce((a, b) => a + b, 0), !percent)}</td>`
          out += `</tr></tbody></table>`
          return out
        }
      },
      series: Object.keys(res.data).map(x => {
        return ({
          name: facets[res.facet].groups[x].label,
          data: res.data[x].map((xx, i) => {
            const pct = xx / totalBorrowers[i] * 100
            return({
              y: percent ? pct : xx,
              altY: !percent ? pct : xx,
            })
          }),
          pointStart: pointStart,
          color: facets[res.facet].groups[x].color,
          order: facets[res.facet].groups[x].order,
        })
      }).sort((a, b) => (a.order || 0) - (b.order || 0)),
    })
  }, [res, percent, streamgraph])

  const theme = createTheme({
    typography: {
      fontFamily: `"IBM Plex Sans Thai"`,
    },
    palette: {
      mode: 'light',
    },
  })

  return (
    
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box sx={{ display: 'flex' }}>
          <Drawer
            facets={facets}
            facet={facet} setFacet={setFacet}
            filters={filters} setFilters={setFilters}
            streamgraph={streamgraph} setStreamgraph={setStreamgraph}
            percent={percent} setPercent={setPercent}
          />
          {!dataReady &&
            <Box sx={{
              display: 'flex',
              width: '100%',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <CircularProgress />
            </Box>
          }
          {dataReady &&
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{
                style: {
                  height: "100vh",
                  width: "100%",
                  padding: "50px",
                  boxSizing: "border-box",
                }
              }}
            />
          }
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
