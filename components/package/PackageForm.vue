<template>
  <v-card flat>
    <v-form ref="form" @submit.prevent="edit ? updateData() : submitData()">
      <v-container>
        <v-row class="sport-type">
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="name"
              label="Sport Type Name"
              type="text"
              filled
              :rules="nameRules"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-btn :loading="loading" type="submit"> 
            {{edit ? "Update" : "Save"}}
            </v-btn>
            <v-btn @click="close"> Cancel </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <snackbar
      v-model="snackbar"
      :color="snackbarColor"
      @close="snackbar = false"
      >{{ snackbarText }}</snackbar
    >
  </v-card>
</template>

<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: null,
      loading: false,
      nameRules: [(v) => !!v || "Email is required"],
    };
  },
  computed: {
    formData() {
      return {
        name: this.name,
      };
    },
  },
  methods: {
    // For post data
    submitData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("sport-type/saveData", this.formData)
          .then((response) => {
            if (200 <= response.status < 300) {
              this.setSnackbarMsg("success", "Data saved successfully");
            }
          })
          .catch((error) => {
            this.setSnackbarMsg(
              "red",
              error?.response?.data?.message || "Something went wrong"
            );
            if (error.response.data.errors) {
              this.handleServerErrorMessage(error.response.data.errors);
            }
          })
          .finally(() => {
            this.close();
            this.loading = false;
          });
      }
    },
    close() {
      this.$refs.form.reset();
      if (this.edit) this.$emit("close");
    },
    setEditData(data) {
      this.editId = data.id;
      this.name = data.name;
    },
    updateData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("sport-type/editData", {
            id: this.editId,
            data: this.formData,
          })
          .then((response) => {
            if (200 <= response.status < 300) {
              this.$emit("show-snackbar-msg", {
                color: "success",
                msg: "Data updated successfully",
              });
              this.close();
              this.$emit("get-data");
            }
          })
          .catch((error) => {
            this.$emit("show-snackbar-msg", {
              color: "red",
              msg: "Something went wrong",
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style>
.sport-type .v-text-field .v-input__control .v-input__slot {
  min-height: 68px !important;
}
</style>
