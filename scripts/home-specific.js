$(function () {
    let numbersJson = undefined;
    const numbers = document.getElementsByName('pnc-stats');
    if (numbers.length > 0) {
        numbersJson = JSON.parse(numbers[0].content);
    }

    // Counters
    if ($('.counters').length > 0 && numbersJson !== undefined) {
        var options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
        };
        $('.counters').waypoint(function () {
            var numAnim = new CountUp("counting-1", 0, numbersJson.diagnostics, 0, 6.5, options);
            numAnim.start();
            var numAnim2 = new CountUp("counting-2", 0, numbersJson.clients, 0, 6.5, options);
            numAnim2.start();
            var numAnim3 = new CountUp("counting-3", 0, numbersJson.beneficiaries, 0, 6.5, options);
            numAnim3.start();
            var numAnim4 = new CountUp("counting-4", 0, numbersJson.consults, 0, 6.5, options);
            numAnim4.start();
        }, {
                offset: '100%'
            });
    }
});