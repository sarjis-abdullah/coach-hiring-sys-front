<template>
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
    <v-card-actions>
      <v-btn @click="!isBooked && buyPackage(item)" text :color="`${isBooked ? 'green' : 'teal'} accent-4` ">
        {{isBooked ? "Booked" : "Buy Package"}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
      item: {
          type: Object,
          default: () => {
              return {}
          }
      },
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        //this.isBooked()
      }
    }
  },
  computed: {
    isBooked() {
      const items = [];
      const item = this.item;
      item && item.packageUsers.forEach(el => {
        items.push(el.userId)
      });
      if (items.includes(14)) {
        return true
      }
      return false 
    }
  },
  methods: {
    async buyPackage(item) {
      this.$emit("buy-package", item.id)
      const res = await this.$axios.post("package-user", {
        packageId: item.id,
        userId: this.userData.id
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

