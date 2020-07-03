const axios = require('axios');

var pullRequests = [],
    numberOfPulls, createdDate, i = 0;

function repos(repoName, dateStart, dateEnd) {
    axios({
            method: "get",
            url: `https://api.github.com/repos/Umuzi-org/${repoName}/pulls?state=all`,
            headers: {
                "Content-Type": "application/json"
            },
            auth: {
                username: `Username`,
                password: `Password`
            }
        }).then(response => {
            numberOfPulls = response.data[0].number

            var dateFrom = dateStart.split("/");
            var dateTo = dateEnd.split("/");
            dateStart = new Date(dateFrom);
            dateEnd = new Date(dateTo);

            for (i = 0; i < numberOfPulls; i++) {
                createdDate = new Date(response.data[i].created_at)

                if (createdDate > dateStart && createdDate < dateEnd) {
                    pullRequests[i] = response.data[i]
                }
            }
            console.log(pullRequests)
        })
        .catch(err => {
            console.log(err)
        });
}

repos(`Siyabulela-Khumalo-269-password-checker`, `05/20/2019`, `06/29/2021`);
//DATE FORMAT - MM/DD/YYYY