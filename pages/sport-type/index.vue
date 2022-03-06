<template>
  <div>
    <v-tabs v-model="tab" background-color="#1BBD36" dark>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="item in tabItems" :key="item.name" :to="item.to">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabItems: [
        {
          name: 'List',
          to: '/sport-type/list',
        },
        {
          name: '+ Add',
          to: '/sport-type/add',
        },
      ],
      tab: null,
    }
  },
}
</script>

<style scoped></style>
