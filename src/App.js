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
      1: {
        label: "SM",
      },
      2: {
        label: "NPL",
      },
    },
  },
  product: {
    label: "ประเภทสินเชื่อ",
    groups: {
      0: {
        label: "ทุกประเภท",
      },
      1: {
        label: "บัตรเครดิต",
      },
      2: {
        label: "สินเชื่อไม่มีหลักประกันอื่น ๆ",
      },
      3: {
        label: "อสังหาริมทรัพย์",
      },
      4: {
        label: "เช่าซื้อรถ",
      },
      5: {
        label: "สินเชื่อธุรกิจ",
      },
      6: {
        label: "รถจักรยานยนต์",
      },
      7: {
        label: "เพื่อการเกษตร",
      },
      9: {
        label: "มากกว่าหนึ่งประเภท",
      },
    },
  },
  age: {
    label: "ช่วงอายุ",
    groups: {
      1: {
        label: "20–25",
      },
      2: {
        label: "26–35",
      },
      3: {
        label: "36–45",
      },
      4: {
        label: "46–60",
      },
      5: {
        label: "61–85",
      },
      99: {
        label: "ไม่ระบุ",
      },
    },
  },
  fi: {
    label: "ประเภทสถาบันการเงิน",
    groups: {
      0: {
        label: "ทุกสถาบันการเงิน",
      },
      1: {
        label: "ธนาคารพาณิชย์",
      },
      2: {
        label: "Non-bank",
      },
      3: {
        label: "SFI",
      },
      4: {
        label: "อื่น ๆ",
      },
      9: {
        label: "มากกว่าหนึ่งสถาบันการเงิน",
      },
    },
  },
  region: {
    label: "ภูมิภาค",
    groups: {
      1: {
        label: "กรุงเทพฯ",
      },
      2: {
        label: "ภาคกลาง",
      },
      3: {
        label: "ภาคเหนือ",
      },
      4: {
        label: "ภาคตะวันออกเฉียงเหนือ",
      },
      5: {
        label: "ภาคใต้",
      },
      99: {
        label: "ไม่ระบุ",
      },
    },
  },
  urban: {
    label: "ใน/นอกเขตเมือง",
    groups: {
      1: {
        label: "นอกเขตเทศเทศบาล",
      },
      2: {
        label: "ในเขตเทศบาล",
      },
      99: {
        label: "ไม่ระบุ",
      },
    },
  },
  covid: {
    label: "กู้ก่อน/หลังโควิด",
    groups: {
      1: {
        label: "เป็นผู้กู้ก่อนโควิด",
      },
      2: {
        label: "เป็นผู้กู้หลังโควิด",
      },
    },
  },
}

function App() {

  const [data, setData] = React.useState([])
  const [facet, setFacet] = React.useState('fi')

  React.useEffect(() => {
    fetch(`http://localhost:1443/data/nd`, {
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
        setData(Object.keys(res).map(x => {
          // console.log(x)
          // console.log(facets[facet].groups[x])
          return ({
            name: facets[facet].groups[x].label,
            data: res[x],
          })
        }))
      })
  }, [facet])

  const options = {
    chart: {
      type: 'areaspline',
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
        pointStart: Date.UTC(2009, 0, 1),
        pointIntervalUnit: 'month',
        events: {
          legendItemClick: e => e.preventDefault()
        }
      },
    },
    xAxis: {
      type: 'datetime'
    },
    series: data,
  };

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
