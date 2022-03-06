import moment from "moment";

export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
    };
  },
  computed: {
    maxDate() {
      return moment().format("YYYY-MM-DD");
    },
  },
  methods: {
    showSnackbarMsg(data) {
      this.setSnackbarMsg(data.color, data.msg);
    },
    setSnackbarMsg(color, msg) {
      this.snackbarText = msg;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
};
