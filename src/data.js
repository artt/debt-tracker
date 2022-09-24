export const facets = {
  product: {
    label: "ประเภทสินเชื่อ",
    type: "single",
    groups: {
      0: {
        label: "ทุกประเภท",
      },
      1: {
        label: "บัตรเครดิต",
        color: "#5652a2",
      },
      2: {
        label: "สินเชื่อไม่มีหลักประกันอื่น ๆ",
        color: "#7d79d2",
      },
      3: {
        label: "อสังหาริมทรัพย์",
        color: "#2fa035",
      },
      4: {
        label: "เช่าซื้อรถ",
        color: "#Ee6c34",
      },
      5: {
        label: "สินเชื่อธุรกิจ",
        color: "#3db7c7",
      },
      6: {
        label: "รถจักรยานยนต์",
        color: "#Ffcc00",
      },
      7: {
        label: "เพื่อการเกษตร",
        color: "#9bd64a",
      },
      9: {
        label: "มากกว่าหนึ่งประเภท",
        color: "#9e9e9e",
      },
    },
  },
  fi: {
    label: "ประเภทสถาบันการเงิน",
    type: "single",
    groups: {
      0: {
        label: "ทุกสถาบันการเงิน",
      },
      1: {
        label: "ธนาคารพาณิชย์",
        color: "#1723b3",
      },
      2: {
        label: "Non-bank",
        color: "#D28822",
      },
      3: {
        label: "SFI",
        color: "#58c54c",
      },
      4: {
        label: "อื่น ๆ",
        color: "#686c9c",
      },
      9: {
        label: "มากกว่าหนึ่งสถาบันการเงิน",
        color: "#9e9e9e",
      },
    },
  },
  class: {
    label: "ชั้นหนี้",
    groups: {
      1: {
        label: "SM",
        color: "#eab676"
      },
      2: {
        label: "NPL",
        color: "#B91964"
      },
    },
  },
  age: {
    label: "ช่วงอายุ",
    groups: {
      1: {
        label: "20–25",
        color: "#Ff8669",
      },
      2: {
        label: "26–35",
        color: "#Ecd22f",
      },
      3: {
        label: "36–45",
        color: "#Ec892f",
      },
      4: {
        label: "46–60",
        color: "#3283b7",
      },
      5: {
        label: "61–85",
        color: "#816539",
      },
      99: {
        label: "ไม่มีข้อมูล",
        color: "#9e9e9e",
      },
    },
  },
  region: {
    label: "ภูมิภาค",
    groups: {
      1: {
        label: "กรุงเทพฯ",
        color: "#A41a9b",
      },
      2: {
        label: "ภาคกลาง",
        color: "#B9bf24",
      },
      3: {
        label: "ภาคเหนือ",
        color: "#425ae2",
      },
      4: {
        label: "ภาคตะวันออกเฉียงเหนือ",
        color: "#E48634",
      },
      5: {
        label: "ภาคใต้",
        color: "#378536",
      },
      99: {
        label: "ไม่มีข้อมูล",
        color: "#9e9e9e",
      },
    },
  },
  urban: {
    label: "ใน/นอกเขตเมือง",
    groups: {
      1: {
        label: "นอกเขตเทศเทศบาล",
        color: "#4dd245",
      },
      2: {
        label: "ในเขตเทศบาล",
        color: "#A06c5a",
      },
      99: {
        label: "ไม่มีข้อมูล",
        color: "#9e9e9e",
      },
    },
  },
  covid: {
    label: "กู้ก่อน/หลังโควิด",
    groups: {
      1: {
        label: "เป็นผู้กู้ก่อนโควิด",
        color: "#5a87a0",
      },
      2: {
        label: "เป็นผู้กู้หลังโควิด",
        color: "#Ffd949",
      },
    },
  },
}