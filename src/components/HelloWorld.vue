<template>
    <div>
        <v-navigation-drawer v-model="drawer" app>
            <v-treeview :items="treeItems" :open-on-click="true">
                <template slot="label" slot-scope="props">
                    <router-link :to="props.item.to" v-if="props.item.to">{{ props.item.name }}</router-link>
                    <span v-else>{{ props.item.name }}</span>
                </template>
            </v-treeview>
        </v-navigation-drawer>
        <v-app-bar app color="teal">
            <v-app-bar-nav-icon cols="2" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center" cols="5">
                    <v-btn-toggle mandatory>
                        <v-btn @click="overlay = !overlay">
                            Import
                        </v-btn>
                        <v-btn>Export</v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col align="center" justify="center" cols="5">
                    <v-btn-toggle mandatory>
                        <v-btn>Add</v-btn>
                        <v-btn>Delete</v-btn>
                        <v-btn>Save</v-btn>
                        <v-btn>Edit</v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
        </v-app-bar>
        <router-view></router-view>
        <v-overlay :value="overlay" class="popup-root">
            <v-row align="center" justify="center">
                <template>
                    <v-file-input label="File input" @change="onFilePicked"></v-file-input>
                </template>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-btn
                        @click="overlay = false"
                >
                    Close
                </v-btn>
                <v-btn
                        @click="importFileInfo"
                >
                    Import
                </v-btn>
            </v-row>
        </v-overlay>
    </div>
</template>

<style lang="scss">
    @import "./HelloWorld.scss";
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import "@fortawesome/fontawesome-free/css/all.css";

    import readAndParseEcxel from "../utils/excel-parser";

    @Component({})
    export default class HelloWorld extends Vue {
        drawer = false;
        iconColor = "deep-purple";
        treeItems = {};
        data = {};
        overlay = false;
        lastFilePath = '';

        resultCalculation(subGroupData: any[][]) {
            const squareMeterArray = subGroupData.map(el => el[13]);
            const t =1.96;
            const j = t* this.standardDeviation(squareMeterArray) / Math.sqrt(subGroupData.length);
            const weightedAverage = subGroupData.reduce((accumulator, currentValue) => accumulator + currentValue[12], 0) / subGroupData.reduce((accumulator, currentValue) => accumulator + currentValue[8], 0);
            return {
                minValue: Math.min.apply(null, squareMeterArray),
                maxValue: Math.max.apply(null, squareMeterArray),
                middleValue: subGroupData.reduce((accumulator, currentValue) => accumulator + currentValue[13], 0) / subGroupData.length,
                weightedAverage,
                median: this.median(squareMeterArray),
                CEC: this.standardDeviation(squareMeterArray),
                count: subGroupData.length,
                j,
                lowBorderByMiddle: subGroupData.reduce((accumulator, currentValue) => accumulator + currentValue[13], 0) / subGroupData.length - j,
                lowBorderByWeightedAverage: weightedAverage - j,
                highBorderByMiddle: subGroupData.reduce((accumulator, currentValue) => accumulator + currentValue[13], 0) / subGroupData.length + j,
                highBorderByWeightedAverage: weightedAverage + j,
                variation: this.standardDeviation(squareMeterArray) / subGroupData.reduce((accumulator, currentValue) => accumulator + currentValue[13], 0) / subGroupData.length,
            };
        }

        standardDeviation(values: number[]) {
            const average = (data: number[]) => data.reduce((sum, value) => sum + value, 0) / data.length;

            const avg = average(values);
            const diffs = values.map((value) => value - avg);
            const squareDiffs = diffs.map((diff) => diff * diff);
            const avgSquareDiff = average(squareDiffs);
            return Math.sqrt(avgSquareDiff);
        };

        median(values: number[]) {
            if (values.length === 0) return 0;

            values.sort(function (a, b) {
                return a - b;
            });

            const half = Math.floor(values.length / 2);

            if (values.length % 2)
                return values[half];

            return (values[half - 1] + values[half]) / 2.0;
        }

        updateData(data: any) {
            this.data = data;
        }

        getListOfGroups() {
            return Object.keys(this.data);
        }

        setTreeItems() {
            return this.getListOfGroups().map((val_g: string, i: number) => ({
                id: `g${i}`,
                name: val_g,
                children: [
                    {id: `g${i}d1`, name: "Diagram", to: "/chart"},
                    {
                        id: `g${i}s1`,
                        name: "Subgroups",
                        children: Object.keys(this.data[val_g]).map(
                            (val_sg: string, j: number) => ({
                                id: `g${i}i${j}`,
                                name: val_sg,
                                to: `/group/:${val_g}/subgroup/:${val_sg}`
                            })
                        )
                    }
                ]
            }));
        }

        // lifecycle hook
        updated() {
            console.log(this.$route);
        }

        importFileInfo() {
            readAndParseEcxel(this.lastFilePath)
                .then(data => {
                    this.updateData(data);
                    this.$store.commit('updateData', data);
                    this.treeItems = this.setTreeItems();
                    this.overlay = false;
                })
                .catch(err => {
                    alert('parsing error');
                    console.log("err:", err);
                });
        }

        onFilePicked(event: any) {
            this.lastFilePath = event.path;
        }
    }
</script>
