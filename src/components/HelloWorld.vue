<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-treeview :items="treeItems">
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

import excelParser from ''

@Component({})
export default class HelloWorld extends Vue {
  public drawer: any = false;
  public iconColor: string = "deep-purple";
  public treeItems: object[] = [
    {
      id: "g1",
      name: "Group 1",
      children: [
        { id: "g1d1", name: "Diagram" },
        {
          id: "g1s1",
          name: "Subgroup 1",
          children: [
            { id: "g1s1i1", name: "Item 1" },
            { id: "g1s1i2", name: "Item 2" },
            { id: "g1s1i3", name: "Item 3" }
          ]
        }
      ]
    }
  ];
}
</script>
