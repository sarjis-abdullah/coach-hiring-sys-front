<template>
  <v-dialog v-bind="$attrs" max-width="320" @click:outside="$emit('close')">
    <v-card outlined>
      <div class="text-center my-5 py-5">
        <v-icon large color="error">mdi-close</v-icon>
        <h2 class="text-center">Are you Sure ?</h2>
        <div class="mt-5">
          <custom-button
            color="primary"
            class="mx-1"
            @click.stop="$emit('close')"
            >Cancel</custom-button
          ><custom-button
            :loading="loading"
            class="mx-1"
            color="error"
            @click="sureDelete"
            >Delete</custom-button
          >
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  created() {
    this.loading = false
  },
  methods: {
    sureDelete() {
      this.loading = true
      this.$emit('delete')
    },
  },
}
</script>
