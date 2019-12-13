export const state = () => ({
    sitewide: {},
    pulleddata: {}
});



// function sortItems(data) {
//     let newdata = [];
//     for (var d in data) {
//         let keys = Object.keys(newdata);
//         let item = data[d];
//         if (item.shown || item.status || item.status === 'published') {
//             newdata.push(item);
//         }
//     }
//     return newdata;
// }

let colors = [
    "#0074D9",
    "7FDBFF",
    "#39CCCC",
    "#2ECC40",
    "#FFDC00",
    "#FF4136",
    "#F012BE",
    "#B10DC9",
    "#111111",
    "#01FF70",
];

export const mutations = {
    setSitewide(state, data) {
        state.sitewide = data;
    },
    setPulledData(state, data) {
        state.pulleddata = data;
    },
    setPlayerData(state, weeks) {
        let newObj = {};
        let count = 0;
        for (let w in weeks) {
            let week = weeks[w];
            for (let t in week) {
                let team = week[t];
                let teamname = t;
                if (teamname.length > 3) {
                    if (!newObj.hasOwnProperty(teamname)) {
                        newObj[teamname] = {
                            overallPoints: 0,
                            avgPoints: 0,
                            newData: {
                                totalData: {
                                    dataset : {
                                        label: teamname,
                                        barPercentage: 0.5,
                                        backgroundColor: colors[count],
                                        borderColor: colors[count],
                                        data: []
                                    }
                                },
                                avgData: {
                                    dataset : {
                                        label: teamname,
                                        barPercentage: 0.5,
                                        backgroundColor: colors[count],
                                        borderColor: colors[count],
                                        data: []
                                    }
                                }
                            },
                            weeks: {}
                        }
                    }
                    if (!newObj[teamname].weeks.hasOwnProperty(w)) {
                        newObj[teamname].weeks[w] = team;
                    }
                    if (!newObj[teamname].hasOwnProperty("dataset")) {
                        newObj[teamname]["dataset"] = {
                            label: teamname,
                            borderColor: colors[count],
                            backgroundColor: 'transparent',
                            data: []
                        };
                    }
                    newObj[teamname]["dataset"].data.push(parseInt(team.points));
                    count++;
                }
            }
        }
        
        let currentWeek = 14;

        for (let p in newObj) {
            let player = newObj[p];
            let points = 0;
            for (let w in player.weeks) {
                points += parseInt(player.weeks[w].points);
            }
            player.overallPoints = points;
            player.avgPoints = points / currentWeek;
            player.newData.totalData.dataset.data.push(parseInt(points));
            player.newData.avgData.dataset.data.push(parseInt(points) / currentWeek);
        }
        state.playerData = newObj;
    },
    setAvgData(state, weeks) {
        
    }
};

export const getters = {
    sitewide: state => state.sitewide,
    playerData: state => state.playerData
}

export const actions = {
    async nuxtServerInit({ commit }) {
        let sitewideFiles = await require.context('~/assets/content/sitewide/', false, /\.json$/);
        let sitewides = sitewideFiles.keys().map(key => {
            let res = sitewideFiles(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setSitewide', sitewides[0]);

        let pulledData = await require.context('~/static/stats/', false, /\.json$/);
        let d = pulledData.keys().map(key => {
            let res = pulledData(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setPulledData', d[0]);
        await commit('setPlayerData', d[0]);
        await commit('setAvgData', d[0]);
    }
};