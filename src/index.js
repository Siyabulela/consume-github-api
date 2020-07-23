const axios = require("axios");

var pullRequests = [],
    numberOfPulls,
    createdDate, updatedDate, createdDate, mergedDate;

function repos(repoName, dateStart, dateEnd) {
    axios({
            method: "get",
            url: `https://api.github.com/repos/Umuzi-org/${repoName}/pulls?state=all`,
            headers: {
                "Content-Type": "application/json",
            },
            auth: {
                username: `USERNAME`, //Your GitHub username here.
                password: `PASSWORD`, //Your GitHub password here.
            },
        })
        .then((response) => {
            numberOfPulls = response.data[0].number;

            var dateFrom = dateStart.split("/");
            var dateTo = dateEnd.split("/");
            dateStart = new Date(dateFrom);
            dateEnd = new Date(dateTo);

            for (i = 0; i < numberOfPulls; i++) {
                createdDate = new Date(response.data[i].created_at);
                updatedDate = new Date(response.data[i].updated_at);
                closedDate = new Date(response.data[i].closed_at);
                mergedDate = response.data[i].merged_at;

                if (mergedDate != null) {
                    mergedDate = new Date(mergedDate)
                }

                if ((createdDate > dateStart && createdDate < dateEnd) ||
                    (updatedDate > dateStart && updatedDate < dateEnd) ||
                    (closedDate > dateStart && closedDate < dateEnd) ||
                    (mergedDate > dateStart && mergedDate < dateEnd)) {
                    pullRequests[i] = response.data[i];
                }
            }
            console.log(pullRequests);

        })
        .catch((err) => {
            console.log(err);
        });
}

repos(`Siyabulela-Khumalo-266-string-calculator`, `05/20/2019`, `06/29/2021`);
//DATE FORMAT - MM/DD/YYYY