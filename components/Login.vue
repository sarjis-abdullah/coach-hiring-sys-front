<template>
  <v-form @submit.prevent="handleSubmit" ref="loginForm">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="email"
              name="login"
              label="Login"
              type="email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              type="password"
              :rules="passwordRules"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" color="primary" type="submit"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 4) ||
          "Password length must be greater than 5 letters",
      ],
      loading: false,
    };
  },
  computed: {
    loginData() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    async handleSubmit() {
      console.log(this.$refs.loginForm.validate(), this.$refs.loginForm);
      if (this.$refs.loginForm.validate()) {
        try {
          this.loading = true;
          const response = await this.$axios.post("login", this.loginData);
          console.log(response.data)
        } catch (error) {
            console.error(error);
        }finally {
            this.loading = false;
        }
      }
    },
  },
};
</script>

<style></style>
