<template>
  <v-container>
      <v-card-title>
        <nuxt-link to="/dashboard">All Booking Packages</nuxt-link>
      </v-card-title>
    <v-layout>
      
      <v-row>
        <v-col v-for="item in packages" :key="item.id" cols="12" sm="4">
          <AthleteSinglePackage :item="item" @buy-package="buyPackage" />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import AthleteSinglePackage from "@/components/athlete/AthleteSinglePackage.vue";
export default {
  components: {
    AthleteSinglePackage,
  },
  data: () => ({
    reveal: false,
    page: 1,
    perPage: 30,
    packages: [],
  }),
  computed: {
    query() {
      return `?include=p.pu&page=${this.page}&per_page=${this.perPage}`;
    },
  },
  created() {
    this.getAllData();
  },
  methods: {
    async getAllData() {
      const response = await this.$axios.get("package" + this.query);
      this.packages = response.data.data;
    },
    buyPackage(id) {
      this.packages = this.packages.map((item) => {
        if (id == item.id) {
          const packageUsers = item.packageUsers;
          packageUsers.push({
            userId: this.userData.id,
          });
          return {
            ...item,
            packageUsers,
          };
        }
        return item;
      });
    },
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
