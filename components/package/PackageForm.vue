<template>
  <v-card flat>
    <v-form ref="form" @submit.prevent="edit ? updateData() : submitData()">
      <v-container>
        <v-row class="package">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="title"
              label="Title"
              type="text"
              filled
              :rules="rules"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="price"
              label="Price"
              type="number"
              min="0"
              filled
              :rules="rules"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="publishDate"
              label="Publish Date"
              type="text"
              filled
              :rules="rules"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="sessionTime"
              label="Session Time"
              type="text"
              filled
              :rules="rules"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="description"
              label="Description"
              type="text"
              filled
              :rules="rules"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-btn :loading="loading" type="submit">
              {{ edit ? "Update" : "Save" }}
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
      title: null,
      description: null,
      price: null,
      publishDate: null,
      sessionTime: null,
      loading: false,
      rules: [(v) => !!v || "Required"],
    };
  },
  computed: {
    formData() {
      return {
        title: this.title,
        description: this.description,
        price: this.price,
        publishDate: this.publishDate,
        sessionTime: this.sessionTime,
      };
    },
  },
  methods: {
    // For post data
    submitData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("package/saveData", this.formData)
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
    setEditData({id, title, description, price, publishDate, sessionTime}) {
      this.editId = id;
      this.title = title
      this.description = description
      this.price = price
      this.publishDate = publishDate
      this.sessionTime = sessionTime
    },
    updateData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("package/editData", {
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
.package .v-text-field .v-input__control .v-input__slot {
  min-height: 68px !important;
}
</style>
