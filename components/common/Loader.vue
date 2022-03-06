<template>
  <div class="text-center">
    <v-progress-circular
      v-if="!linear"
      :size="50"
      color="primary"
      indeterminate
      v-bind="$attrs"
    ></v-progress-circular>
    <v-progress-linear
      v-if="linear"
      indeterminate
      color="primary"
      v-bind="$attrs"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  props: {
    linear: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      }
    }
  }
}
</script>

<style scoped></style>
