<template>
  <section>
    <v-container grid-list-md class="px-0">
      <v-layout row wrap justify-center>
        <v-flex class="package">
          <v-card class="pa-3">
            <v-data-table
              class="cursor-pointer"
              :headers="headers"
              :items="allData"
              :loading="dataTableLoading"
              :options.sync="options"
              :hide-default-footer="reportPage"
              :server-items-length="totalItems"
              :footer-props="{
                'items-per-page-options': [5, 10, 15, 20, 50, 100, -1],
              }"
              @click:row="showRowData"
            >
              <template v-slot:item.actions="{ item }">
                <span @click.stop>
                  <floating-button
                    @delete="deleteData(item.id)"
                    @edit="editData(item)"
                    :showShowButton="true"
                    :access-edit="false"
                    :access-delete="false"
                  ></floating-button>
                </span>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div v-if="confirmDataModal">
      <confirm-modal
        v-model="confirmDataModal"
        @close="closeConfirmData"
        @delete="confirmedDeleteData"
      ></confirm-modal>
    </div>
    <snackbar
      v-model="snackbar"
      :color="snackbarColor"
      @close="snackbar = false"
      >{{ snackbarText }}</snackbar
    >
    <v-dialog v-model="editDataFormDialog" max-width="800">
      <v-card>
        <v-card-title> Edit Package </v-card-title>
        <v-card-text class="px-3">
          <PackageForm
            ref="DataForm"
            :edit="isDataEdit"
            @close="closeEditDataFormDialog"
            @show-snackbar-msg="showSnackbarMsg"
            @get-data="getData"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import FloatingButton from "@/components/common/FloatingButton";
import PackageForm from "@/components/package/PackageForm";
import ConfirmModal from "@/components/common/ConfirmModal";
import ActionMixins from "@/mixins/actionMixins";
export default {
  props: {
    reportPage: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [ActionMixins],
  components: {
    
    FloatingButton,
    PackageForm,
    ConfirmModal,
  },
  data() {
    return {
      options: {
        page: 1,
        itemsPerPage: 10,
      },
      totalItems: null,
      dataTableLoading: false,
      // For common action
      moduleStore: "package",
    };
  },
  watch: {
    query: {
      handler() {
        if (this.userData) {
          this.getData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      allData: "package/allData",
    }),
    paginationQuery() {
      return `?page=${this.options.page}&per_page=${this.options.itemsPerPage}&order_by=updated_at&order_direction=desc`;
    },
    query() {
      return this.paginationQuery;
    },
    headers() {
      let items = [
        {
          text: "Name",
          value: "name",
          sortable: false,
        },
        {
          text: "Actions",
          sortable: false,
          value: "actions",
        },
      ];
      return items;
    },
  },
  methods: {
    getData() {
      this.dataTableLoading = true;
      this.$store
        .dispatch("package/getData", this.query)
        .then((response) => {
          this.totalItems = this.allData.length;
          return Promise.resolve(response)
        })
        .catch(err=> {
          return Promise.reject(err)
        })
        .finally(() => {
          this.dataTableLoading = false;
        });
    },
    showRowData(item) {
      !this.reportPage && this.$router.push("/package/list/" + item.id);
    },
  },
};
</script>

<style>
.package .v-text-field .v-input__control .v-input__slot {
  min-height: 68px !important;
}
</style>
