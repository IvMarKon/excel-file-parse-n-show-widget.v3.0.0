<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-treeview :items="treeItems" open-on-click="true">
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
            <v-btn>Import</v-btn>
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

  updateData(data) {
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
        { id: `g${i}d1`, name: "Diagram", to: "/chart" },
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
  mounted() {
    readAndParseEcxel(
      "C:\\Users\\Ivan\\Desktop\\node.js - sandbox\\excel-view-widget\\excel-widget\\upload\\test.xlsx"
    )
      .then(data => {
        this.updateData(data);
        this.treeItems = this.setTreeItems();
      })
      .catch(err => {
        console.log("err:", err);
      });
  }
}
</script>
