<template>
  <v-container>
    <v-layout>
      <v-card-title>
        <nuxt-link to="/dashboard">All Booking Packages</nuxt-link>
      </v-card-title>
      <v-row>
        <v-col v-for="item in packages" :key="item.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <p>2022 01 02</p>
              <p class="text-h4 text--primary">
                {{ item.title }}
              </p>

              <div class="text--primary">
                {{ item.description }}
              </div>
              <p>2022 01 02</p>
            </v-card-text>
          </v-card>
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
      const query = this.userData ? `&userId=${this.userData.id}` : "";
      return `?page=${this.page}&per_page=${this.perPage} &userId=14`;
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
