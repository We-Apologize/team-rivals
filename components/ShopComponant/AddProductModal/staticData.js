const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const categories = [
    {
      value: "Jersey",
      label: "Jersey",
    },
    {
      value: "Shorts",
      label: "Shorts",
    },
    {
      value: "Pin",
      label: "Pin",
    },
    {
      value: "Muffler",
      label: "Muffler",
    },
  ];
  const sizes = [
      {
          value: "U",
          label: "U",
        },
        {
          value: "S",
          label: "S",
        },
    {
      value: "M",
      label: "M",
    },
    
    {
      value: "L",
      label: "L",
    },
    {
      value: "XL",
      label: "XL",
    },
    {
      value: "XXL",
      label: "XXL",
    },
    {
      value: "XXXL",
      label: "XXXL",
    },
  ];
const makeStock = ()=>{
  let s = [];
  for(let i=0;i<sizes.length;i++){
    s.push({size:sizes[i].label,piece:0})
  }
  return s;
}
const dummyStock = makeStock();
export  {style,sizes,categories,dummyStock};