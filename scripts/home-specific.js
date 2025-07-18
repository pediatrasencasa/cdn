$(function () {

    // Counters
    if ($('.counters').length > 0) {

        fetch('https://pediatrasencasa.github.io/cdn/data/statistics.json')
            .catch(error => console.error(error))
            .then(response => response.json())
            .then(datas => {
                const data = datas[0];
                console.log(data);

                var options = {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.',
                    prefix: '',
                    suffix: ''
                };

                $('.counters').waypoint(function () {
                    var numAnim = new CountUp("counting-1", 0, data.diagnostics, 0, 6.5, options);
                    numAnim.start();
                    var numAnim2 = new CountUp("counting-2", 0, data.clients, 0, 6.5, options);
                    numAnim2.start();
                    var numAnim3 = new CountUp("counting-3", 0, data.beneficiaries, 0, 6.5, options);
                    numAnim3.start();
                    var numAnim4 = new CountUp("counting-4", 0, data.consults, 0, 6.5, options);
                    numAnim4.start();
                }, { offset: '100%' });
            });
    }
});