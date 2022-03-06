<template>
  <section>
    <loader v-if="loading"></loader>
    <v-card v-if="!loading">
      <v-card-title :class="$vuetify.breakpoint.xs ? 'subtitle-2' : ''">
        <v-btn class="mr-1" color="primary" icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        SportType Data
        <!-- <template v-if="false">
          <v-btn
            class="ml-2"
            text
            color="primary"
            @click="editData(singleData)"
          >
            Edit
          </v-btn>
          <v-btn text color="error" @click="deleteData(singleData.id)">
            Delete
          </v-btn>
        </template> -->

        <v-spacer></v-spacer>
        <v-icon class="mr-1">mdi-calendar</v-icon>
        {{ getDateFormat(singleData.date) }}
        <!-- <floating-button
          v-if="$vuetify.breakpoint.xs"
          class="ml-2"
          @delete="deleteData(singleData.id)"
          @edit="editData(singleData)"
          :access-edit="false"
          :access-delete="false"
        ></floating-button> -->
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row row wrap>
            <v-col cols="12" sm="4">
              <v-list>
                <template>
                  <v-list-item>

                    <v-list-item-content>
                      <v-list-item-title
                        @click="
                          $router.push('/staff/list/' + singleData.userId)
                        "
                        ><a>{{
                          (singleData.user && singleData.user.name) || '---'
                        }}</a></v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        (singleData.user && singleData.user.designation) ||
                        '---'
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Amount</v-list-item-title>
                  <v-list-item-subtitle class="text-capitalize">{{
                    amountWithCommas(singleData.amount) | currencyIcon
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Status</v-list-item-title>
                  <v-list-item-subtitle class="text-capitalize">
                    <v-chip v-if="singleData.status === 1" color="success">
                      {{ singleData.status && 'Deposit' }}
                    </v-chip>
                    <v-chip v-else color="error"> Withdraw </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Notes</v-list-item-title>
                  <v-list-item-subtitle
                    class="text-capitalize list-subtitle-long text-justify"
                    >{{ singleData.notes || 'N/A' }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <div v-if="confirmDataModal">
      <confirm-modal
        v-model="confirmDataModal"
        @close="closeConfirmData"
        @delete="confirmedDeleteData('single')"
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
            @get-data="getSingleData"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import Loader from '~/components/common/Loader.vue'
import FloatingButton from '@/components/common/FloatingButton'
import ActionMixins from '@/mixins/actionMixins'
import SportTypeForm from '@/components/sport-type/SportTypeForm'
import FormCommon from '@/mixins/formCommonMixins'
import ConfirmModal from '@/components/common/ConfirmModal'
export default {
  components: {
    FloatingButton,
    ConfirmModal,
    SportTypeForm,
  },
  mixins: [FormCommon, ActionMixins],
  data() {
    return {
      loading: false,
      // For common action
      moduleStore: 'sport-type',
    }
  },
  created() {
    this.getSingleData()
  },
  computed: {
    ...mapGetters({
      singleData: 'SportType/singleData',
    }),
  },
  methods: {
    getSingleData() {
      this.loading = true
      this.$store
        .dispatch(
          'sport-type/getSingleData',
          '/' + this.$route.params.id + '?include=c.user,user.attachment'
        )
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
