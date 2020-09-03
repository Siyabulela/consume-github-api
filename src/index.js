const axios = require("axios");

var numberOfPulls,
    updatedDate,
    createdDate,
    mergedDate,
    closedDate;

function repos(repoName, dateStart, dateEnd) {
    axios({
            method: "get",
            url: `https://api.github.com/repos/Umuzi-org/${repoName}/pulls?state=all`,
            headers: {
                "Content-Type": "application/json",
            },
            auth: {
                username: `username`, //Your GitHub username here.
                password: `password`, //Your GitHub password here.
            },
        })
        .then((response) => {
            numberOfPulls = response.data[0].number;
            dateStart = new Date(dateStart.split("/"));
            dateEnd = new Date(dateEnd.split("/"));

            for (i = 0; i < numberOfPulls; i++) {
                createdDate = new Date(response.data[i].created_at);
                updatedDate = new Date(response.data[i].updated_at);
                closedDate = new Date(response.data[i].closed_at);
                mergedDate = response.data[i].merged_at;

                if (mergedDate != null) 
                    mergedDate = new Date(mergedDate);

                if (
                    (createdDate > dateStart && createdDate < dateEnd) ||
                    (updatedDate > dateStart && updatedDate < dateEnd) ||
                    (closedDate > dateStart && closedDate < dateEnd) ||
                    (mergedDate > dateStart && mergedDate < dateEnd)
                ) {
                    console.log(
                        `-------------------------------------------------------`
                    );
                    console.log(`Pull number : #${response.data[i].number}`);
                    console.log(`Date created: ${createdDate}`);
                    console.log(`Date updated: ${updatedDate}`);
                    console.log(`Date merged : ${mergedDate}`);
                    console.log(`Date Closed : ${closedDate}`);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
repos(`Siyabulela-Khumalo-266-string-calculator`, `05/20/2019`, `06/29/2021`);
//DATE FORMAT - MM/DD/YYYY