const groceries = document.querySelector('.groceries-input');
const bills = document.querySelector('.bills-input');
const savings = document.querySelector('.savings-input');
const hobbies = document.querySelector('.hobbies-input');

const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx,{

    type:'pie',
    data:{
        labels:['Groceries','Bills','Savings','Hobbies'],
        datasets:[
            {
                label: "Amount",
                data: [0,0,0,0],
                backgroundColor:['#ff8c00','#f14d49','#4ebbb6','#797ef6'],
                borderWidth:1

            }
        ]
    }
});

const updateChartValue = (input, dataOrder)=>{
    input.addEventListener ('change',e =>{
        myChart.data.datasets[0].data[dataOrder]=e.target.value;
        myChart.update();
    })
};

updateChartValue(groceries,0);
updateChartValue(bills,1);
updateChartValue(savings,2);
updateChartValue(hobbies,3);