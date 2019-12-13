<template>
    <main>
        <div>
            <h1>{{sitewide.name}} Stats</h1>
        </div>

        <div class="chart__container points__chart">
            <h2>Points Over Season</h2>
            <LineChart :data="chartData.line1.chartdata" :options="chartData.line1.options" class="chart"/>
        </div>
        <div class="chart__side__by__side">
            <div class="chart__container total__points">
                <h2>Total Points</h2>
                <BarChart :data="chartData.bar1.chartdata" :options="chartData.bar1.options" class="chart"/>
            </div>
            <div class="chart__container avg__per__game">
                <h2>Avg. Points Per Game</h2>
                <BarChart :data="chartData.bar2.chartdata" :options="chartData.bar2.options" class="chart"/>
            </div>
        </div>
        <div class="chart__container points__chart grizzly_chart">
            <h2>Grizzly Rapins</h2>
            <LineChart :data="chartData.line2.chartdata" :options="chartData.line2.options" class="chart"/>
        </div>
    </main>
</template>

<script>
import BarChart from '~/components/bar-chart';
import LineChart from '~/components/line-chart';

export default {
    components: {
        BarChart,
        LineChart
    },
    computed: {
        sitewide: function () {
            return this.$store.state.sitewide
        },
        stats: function () {
            return this.$store.state.pulleddata
        },
        playerData: function () {
            return this.$store.state.playerData;
        },
        chartData: function () {
            let currentWeek = 15;
            let labels = [];
            for (let i = 1; i < currentWeek; i++) {
                labels.push(i);
            }
            let playerData = this.$store.state.playerData;
            let playerLineArr = function () {
                let newarr = [];
                for (let p in playerData) {
                    let player = playerData[p];
                    newarr.push(player.dataset);
                }
                // console.log(newarr);
                return newarr;
            };
            let totalPerGame = function () {
                let newarr = [];
                for (let p in playerData) {
                    let player = playerData[p];
                    newarr.push(player.newData.totalData.dataset);
                }
                return newarr;
            };
            let avgPerGame = function () {
                let newarr = [];
                for (let p in playerData) {
                    let player = playerData[p];
                    newarr.push(player.newData.avgData.dataset);
                }
                return newarr;
            };
            let grizRapes = function () {
                let newarr = [];
                let opponentDataset = {data: [], label: "opponent", backgroundColor: 'transparent', borderColor: "#FFDC00"};
                for (let p in playerData) {
                    let raper = playerData[p];
                    if (raper.name === "grizzlydicks") {
                        newarr.push(raper.dataset);
                    }
                    for (let w in raper.weeks) {
                        let week = raper.weeks[w];
                        if (week.opponent === "grizzlydicks") {
                            opponentDataset.data.push(week.points);
                        }
                    }
                }
                newarr.push(opponentDataset);
                return newarr;
            };
            return {
                line1: {
                    chartdata: {
                        labels: labels,
                        datasets: playerLineArr()
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        lineTension: 1,
                        spanGaps: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 50,
                                    suggestedMax: 220,
                                    padding: 25,
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    suggestedMin: 50,
                                    suggestedMax: 220,
                                    padding: 25,
                                }
                            }]
                        }
                    }
                },
                line2: {
                    chartdata: {
                        labels: labels,
                        datasets: grizRapes()
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        lineTension: 1,
                        spanGaps: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 50,
                                    suggestedMax: 220,
                                    padding: 25,
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    suggestedMin: 50,
                                    suggestedMax: 220,
                                    padding: 25,
                                }
                            }]
                        }
                    }
                },
                bar1: {
                    chartdata: {
                        labels: ["Points"],
                        datasets: totalPerGame()
                    },
                    options: {
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 80,
                                    suggestedMax: 200,
                                    padding: 10,
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    suggestedMin: 80,
                                    suggestedMax: 200,
                                    padding: 10,
                                }
                            }]
                        }
                    }
                },
                bar2: {
                    chartdata: {
                        labels: ["Points"],
                        datasets: avgPerGame()
                    },
                    options: {
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 100,
                                    suggestedMax: 160,
                                    padding: 10,
                                }
                            }]
                        }
                    }
                }
            }
        },
        barChart: function () {

        }
    },
    head() {
        return {
            script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
        };
    },
}
</script>

<style>
main {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
}
.chart__container {
    width: 96%;
    max-width: 1800px;
    margin: 20px auto;
    padding: 10px;
}
canvas, .chart {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 500px;
}
.points__chart .chart {
    
}
.avg__per__game, .total__points {
    width: auto;
    flex: 1 1 40%;
    margin: 10px 20px;
    min-width: 400px;
}
.chart__side__by__side {
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
}
/* ------------------ MEDIA QUERY ------------------ */
@media screen and (max-width: 600px) {
    .avg__per__game, .total__points {
        min-width: 0;
    }
}
</style>
