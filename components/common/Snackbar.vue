<template>
  <div class="text-center">
    <v-snackbar
      v-bind="$attrs"
      right
      top
      dark
      timeout="3000"
      @input="$emit('close')"
    >
      <slot>Data saved successfully!</slot>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>
