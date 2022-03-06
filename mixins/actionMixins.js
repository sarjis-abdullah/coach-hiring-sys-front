export default {
  data() {
    return {
      // For Delete
      confirmDataModal: false,
      deleteDataId: null,
      // For edit
      editDataFormDialog: false,
      isDataEdit: false,
    }
  },
  methods: {
    // For delete
    closeConfirmData() {
      this.deleteDataId = null
      this.confirmDataModal = false
    },
    deleteData(id) {
      this.deleteDataId = id
      this.confirmDataModal = true
    },
    confirmedDeleteData(type = 'all') {
      this.$store
        .dispatch(this.moduleStore + '/deleteData', { id: this.deleteDataId })
        .then((response) => {
          if (200 <= response.status < 300) {
            this.setSnackbarMsg('success', 'Data removed successfully')
            this.closeConfirmData()
            if (type === 'all') {
              this.getData()
            } else {
              this.$router.go(-1)
            }
          } else {
            this.showSnackbarMsg('red', 'Something went wrong')
          }
        })
        .catch((error) => {
          this.setSnackbarMsg('red', 'Something went wrong')
          if (error.response.data.errors) {
            this.handleServerErrorMessage(error.response.data.errors)
          }
        })
        .finally(() => {
          this.buttonLoading = false
        })
    },
    // For Edit
    async editData(data) {
      let promise = new Promise((resolve, reject) => {
        this.editDataFormDialog = true
        this.isDataEdit = true
        resolve(this.editDataFormDialog)
      })
      let result = await promise
      this.$refs.DataForm.setEditData(data)
    },
    closeEditDataFormDialog() {
      this.editDataFormDialog = false
      this.isDataEdit = false
    },
  },
}
