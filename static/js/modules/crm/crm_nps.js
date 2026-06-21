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