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
import Cookies from "universal-cookie";

const cookies = new Cookies();
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
    handleRole({ roles }) {
      const editedRoles = [];
      roles.forEach((item) => {
        editedRoles.push(item.name);
      });
      console.log(editedRoles);
    },
    async handleSubmit() {
      if (this.$refs.loginForm.validate()) {
        try {
          this.loading = true;
          const response = await this.$axios.post("login", this.loginData);
          cookies.set("accessToken", response.data.accessToken, { path: "/" });
          const userData = response.data.user;
          userData.roles = response.data.roles;
          userData.accessToken = response.data.accessToken
          this.userData = userData;
          cookies.set("userData", JSON.stringify(userData), { path: "/" });
          const editedRoles = [];
          userData.roles.forEach((item) => {
            editedRoles.push(item.name);
          });
          if (editedRoles.includes("admin")) {
            console.log(12345)
            this.$router.push("/sport-type/list")
          } else if(editedRoles.includes("coach")) {
            this.$router.push("/package/list")
          }else {
            this.$router.push("/home")
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style></style>
