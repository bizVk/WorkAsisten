const cityCtx =
document.getElementById('cityChart');

new Chart(cityCtx,{
    type:'bar',
    data:{
        labels:[
            'Delhi',
            'Mumbai',
            'Bengaluru'
        ],
        datasets:[{
            data:[80,65,45]
        }]
    }
});