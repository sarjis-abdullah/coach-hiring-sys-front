<template>
  <section>
    <v-container grid-list-md class="px-0">
      <v-row>
        <v-col cols="12" sm="6">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Filter by Publish Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-layout row wrap justify-center>
        <v-flex class="sport-type">
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
        <v-card-title> Edit SportType </v-card-title>
        <v-card-text class="px-3">
          <SportTypeForm
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
import SportTypeForm from "@/components/sport-type/SportTypeForm";
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
    SportTypeForm,
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
      moduleStore: "sport-type",
      date: null,
      menu2: false
    };
  },
  watch: {
    query: {
      handler() {
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      allData: "sport-type/allData",
    }),
    paginationQuery() {
      return `?page=${this.options.page}&per_page=${this.options.itemsPerPage}`;
    },
    query() {
      let query = this.paginationQuery;
      if(this.date){
        query = "?updated_at=" + this.date
      }
      return query + '&order_by=updated_at&order_direction=desc';
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
        .dispatch("sport-type/getData", this.query)
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
      !this.reportPage && this.$router.push("/sport-type/list/" + item.id);
    },
  },
};
</script>

<style>
.sport-type .v-text-field .v-input__control .v-input__slot {
  min-height: 68px !important;
}
</style>
