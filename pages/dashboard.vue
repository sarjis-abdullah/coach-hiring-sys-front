<template>
  <v-container>
    <v-card-title>
      <nuxt-link to="/home">All Packages</nuxt-link>
    </v-card-title>
    <v-layout>
      <v-row>
        <v-col v-for="item in packages" :key="item.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <p>
                {{ item.package.publishDate }}
              </p>
              <p class="text-h4 text--primary">
                {{ item.package.title }}
              </p>

              <div class="text--primary">
                {{ item.package.description }}
              </div>
              <p>
                {{ item.package.sessionTime }}
              </p>
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
  middleware: 'auth',
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
      return `?include=u.packages&page=${this.page}&per_page=${this.perPage} &id=14`;
    },
  },
  created() {
    this.getAllData();
  },
  methods: {
    async getAllData() {
      const response = await this.$axios.get("user" + this.query);
      this.packages = response.data.data[0].packages;
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
