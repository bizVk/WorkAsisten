const trendCtx =
document.getElementById('trendChart');

new Chart(trendCtx,{
    type:'line',
    data:{
        labels:[
            'Jan','Feb','Mar',
            'Apr','May','Jun'
        ],
        datasets:[{
            label:'Reviews',
            data:[25,32,40,55,62,70]
        }]
    }
});