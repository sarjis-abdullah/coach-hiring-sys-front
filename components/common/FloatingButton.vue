<template>
  <v-speed-dial
    v-model="fab"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :direction="direction"
    :transition="transition"
    style="display: inline-block"
  >
    <template v-slot:activator>
      <v-btn v-bind="size" v-model="fab" color="blue darken-2" dark fab>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <v-btn
      v-bind="size"
      fab
      dark
      color="green"
      @click="$emit('edit')"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      v-bind="size"
      fab
      dark
      color="red"
      @click="$emit('delete')"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>
<script>
export default {
  data() {
    return {
      direction: 'left',
      transition: 'slide-x-reverse-transition',
      top: false,
      bottom: false,
      right: false,
      left: false,
      fab: false,
    }
  },
  props: ['showShowButton', 'accessEdit', 'accessDelete'],
  computed: {
    size() {
      const size = {
        xs: 'x-small',
        sm: 'small',
        md: 'small',
        lg: 'small',
        xl: 'small',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
  },
}
</script>
