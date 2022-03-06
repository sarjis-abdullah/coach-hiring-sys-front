import moment from "moment";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      userData: null
    };
  },
  computed: {
    maxDate() {
      return moment().format("YYYY-MM-DD");
    },
  },
  mounted () {
    this.userData = cookies.get("userData")
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
