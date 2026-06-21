const npsCtx = document.getElementById('npsChart');

new Chart(npsCtx,{
    type:'doughnut',
    data:{
        labels:['Promoter','Passive','Detractor'],
        datasets:[{
            data:[70,20,10]
        }]
    }
});

const ctx = document.getElementById('reviewChart');

new Chart(ctx,{
    type:'pie',
    data:{
        labels:['Positive','Neutral','Negative'],
        datasets:[{
            data:[10,5,2]
        }]
    }
});