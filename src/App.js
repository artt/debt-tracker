import React from "react"
import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Drawer from "./components/Drawer"
import Box from '@mui/material/Box';


const facets = {
  class: {
    label: "ชั้นหนี้",
    groups: {
      1: "SM",
      2: "NPL",
    },
  },
  product: {
    label: "ประเภทสินเชื่อ",
    groups: {
      0: "ทุกประเภท",
      1: "บัตรเครดิต",
      2: "สินเชื่อไม่มีหลักประกันอื่น ๆ",
      3: "อสังหาริมทรัพย์",
      4: "เช่าซื้อรถ",
      5: "สินเชื่อธุรกิจ",
      6: "รถจักรยานยนต์",
      7: "เพื่อการเกษตร",
      9: "มากกว่าหนึ่งประเภท",
    },
  },
  age: {
    label: "ช่วงอายุ",
    groups: {
      1: "20–25",
      2: "26–35",
      3: "36–45",
      4: "46–60",
      5: "61–85",
      99: "ไม่ระบุ",
    },
  },
  fi: {
    label: "ประเภทสถาบันการเงิน",
    groups: {
      0: "ทุกสถาบันการเงิน",
      1: "ธนาคารพาณิชย์",
      2: "Non-bank",
      3: "SFI",
      4: "อื่น ๆ",
      9: "มากกว่าหนึ่งสถาบันการเงิน",
    },
  },
  region: {
    label: "ภูมิภาค",
    groups: {
      1: "กรุงเทพฯ",
      2: "ภาคกลาง",
      3: "ภาคเหนือ",
      4: "ภาคตะวันออกเฉียงเหนือ",
      5: "ภาคใต้",
      99: "ไม่ระบุ",
    },
  },
  urban: {
    label: "ใน/นอกเขตเมือง",
    groups: {
      1: "นอกเขตเทศเทศบาล",
      2: "ในเขตเทศบาล",
      99: "ไม่ระบุ",
    },
  },
  covid: {
    label: "กู้ก่อน/หลังโควิด",
    groups: {
      1: "เป็นผู้กู้ก่อนโควิด",
      2: "เป็นผู้กู้หลังโควิด",
    },
  },
}

function App() {

  const [data, setData] = React.useState([])
  const [facet, setFacet] = React.useState('fiType')

  React.useEffect(() => {
    fetch(`http://localhost:1443/data/nd`, {
      method: "POST",
      body: JSON.stringify({
        filters: {
          product: 0,
          fi: 0,
          class: 0,
          region: 0,
          urban: 0,
          age: 0,
          covid: 0
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setData(res)
      })
  }, [])

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
    series: Object.keys(data).map(x => ({
      name: x,
      data: data[x],
    }))
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        {/* <Drawer
          facets={facets}
          // values={values}
          facet={facet} setFacet={setFacet}
        /> */}
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
