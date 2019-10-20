<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-treeview :items="treeItems"></v-treeview>
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
    <router-view>
      <v-data-table :headers="headers" :items="desserts" :items-per-page="10" class="mainTable"></v-data-table>
    </router-view>
  </div>
</template>

<style lang="scss">
@import "./HelloWorld.scss";
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import "@fortawesome/fontawesome-free/css/all.css";

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
  public headers: object[] = [
    {
      text: "Dessert (100g serving)",
      align: "left",
      sortable: false,
      value: "name"
    },
    { text: "Calories", value: "calories" },
    { text: "Fat (g)", value: "fat" },
    { text: "Carbs (g)", value: "carbs" },
    { text: "Protein (g)", value: "protein" },
    { text: "Iron (%)", value: "iron" }
  ];
  public desserts: object[] = [
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%"
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: "1%"
    },
    {
      name: "Eclair",
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: "7%"
    },
    {
      name: "Cupcake",
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: "8%"
    },
    {
      name: "Gingerbread",
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: "16%"
    },
    {
      name: "Jelly bean",
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: "0%"
    },
    {
      name: "Lollipop",
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: "2%"
    },
    {
      name: "Honeycomb",
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: "45%"
    },
    {
      name: "Donut",
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: "22%"
    },
    {
      name: "KitKat",
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: "6%"
    }
  ];
}
</script>
