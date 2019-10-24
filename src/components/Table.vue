<template>
  <v-data-table :headers="headers" :items="tableItems" :items-per-page="10" class="mainTable"></v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Table extends Vue {
  public headers: object[] = [];
  public tableItems: object[] = [];

  setHeaders() {}

  mounted() {
    let currentTable = this.$store.state.data[
      this.$route.params.groupname.slice(1)
    ][this.$route.params.subgroupname.slice(1)];

    this.headers = Object.keys(currentTable[0]).map(val => ({
      text: val,
      value: val,
      align: "center"
    }));
    this.tableItems = currentTable.map(val => {
      let obj = {};
      for (let i in val) {
        obj[i] = val[i];
      }

      return obj;
    });
  }
}
</script>
