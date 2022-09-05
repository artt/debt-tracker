import React from "react"
import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Drawer from "./components/Drawer"
import Box from '@mui/material/Box';


const facets = {
  loanType: "ประเภทสินเชื่อ",
  ageGroup: "ช่วงอายุ",
  fiType: "ประเภทสถาบันการเงิน",
  isUrban: "ใน/นอกเขตเมือง",
  region: "ภูมิภาค",
  isNewBorrower: "ผู้กู้รายใหม่/รายเดิม",
}

const values = {
  accounts: "จำนวนบัญชี",
  amount: "มูลหนี้",
}

function App() {

  const [data, setData] = React.useState([])
  const [optControlled, setOptControlled] = React.useState(true)
  const [facet, setFacet] = React.useState('fiType')
  const [value, setValue] = React.useState('amount')

  React.useEffect(() => {
    fetch(`http://localhost:3003/data/${facet}/${value}`)
      .then(res => res.json())
      .then(res => {
        setData(res)
      })
  }, [facet, value])

  React.useEffect(() => {
    console.log(`value = ${value}`)
  }, [value])

  const options = {
    chart: {
      type: 'areaspline',
    },
    title: {
      text: 'หนี้ใหม่'
    },
    plotOptions: {
      areaspline: {
        stacking: 'normal',
      },
      series: {
        pointStart: Date.UTC(2009, 0, 1),
        pointIntervalUnit: 'month',
      },
    },
    xAxis: {
      type: 'datetime'
    },
    series: data.filter(x => x.isControlled === (optControlled ? 1 : 0)).map(x => ({
      name: x[facet],
      data: x['value'],
    }))
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <Drawer
          facets={facets}
          values={values}
          facet={facet} setFacet={setFacet}
          value={value} setValue={setValue}
          optControlled={optControlled} setOptControlled={setOptControlled}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{
            style: {
              height: "100vh",
              width: "100%",
              padding: "100px",
              boxSizing: "border-box"
            }
          }}
        />
      </Box>
    </div>
  );
}

export default App;
