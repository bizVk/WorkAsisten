const nationCtx =
document.getElementById('nationChart');

new Chart(nationCtx,{
    type:'bar',
    data:{
        labels:[
            'India',
            'Canada',
            'Germany',
            'UAE'
        ],
        datasets:[{
            data:[120,45,25,15]
        }]
    }
});