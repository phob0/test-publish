<template>
  <q-page padding>
    <q-form
      autofocus
      ref="form"
      @submit="onSubmit"
    >
      <q-card class="kps-form">
        <q-card-section class="row items-center">
          <div>
            <h4 class="q-mb-none">{{ loading ? 'Please Wait' : (form.item.id ? 'Edit Location' : 'Create Location') }}</h4>
            <div
              v-if="editing"
              class="text-faded"
              v-text="formTitle"
            ></div>
          </div>
          <q-space></q-space>
          <q-btn
            color="tertiary"
            flat
            icon="fal fa-arrow-alt-left"
            round
            v-go-back.single
          >
            <q-tooltip
              anchor="bottom middle"
              self="center middle">Go Back</q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-section id="section-general" class="relative-position">
          <div class="row q-col-gutter-sm">

            <q-input
              :class="locale.code === defaultLocale ? 'col-xs-12' : 'col-xs-6'"
              :key="`country_name-${locale.code}`"
              :label="locale.code === defaultLocale ? 'Country' : ''"
              maxlength="50"
              outlined
              :rules="form.rules.country_name[locale.code]"
              v-for="locale in locales"
              v-model="form.item.country_name[locale.code]"
              v-show="country_name_translating || locale.code === defaultLocale"
            >
              <template v-slot:append>
                <span class="kps-input-locale">{{ locale.code }}</span>

                <span
                  class="on-right"
                  v-if="locale.code === defaultLocale"
                >
                <q-btn
                  @click="country_name_translating = !country_name_translating"
                  color="secondary"
                  dense
                  flat
                  icon="fal fa-globe-europe"
                  round
                >
                  <q-tooltip>Translations</q-tooltip>
                </q-btn>
              </span>
              </template>
            </q-input>

            <q-input
              :class="locale.code === defaultLocale ? 'col-xs-12' : 'col-xs-6'"
              :key="`city_name-${locale.code}`"
              :label="locale.code === defaultLocale ? 'City' : ''"
              maxlength="50"
              outlined
              :rules="form.rules.city_name[locale.code]"
              v-for="locale in locales"
              v-model="form.item.city_name[locale.code]"
              v-show="city_name_translating || locale.code === defaultLocale"
            >
              <template v-slot:append>
                <span class="kps-input-locale">{{ locale.code }}</span>

                <span
                  class="on-right"
                  v-if="locale.code === defaultLocale"
                >
                <q-btn
                  @click="city_name_translating = !city_name_translating"
                  color="secondary"
                  dense
                  flat
                  icon="fal fa-globe-europe"
                  round
                >
                  <q-tooltip>Translations</q-tooltip>
                </q-btn>
              </span>
              </template>
            </q-input>

            <q-input
              class="col-xs-12"
              label="Institute"
              maxlength="100"
              outlined
              :rules="form.rules.institute_name"
              v-model="form.item.institute_name"
            />

            <q-input
              class="col-xs-12"
              label="Responsible"
              maxlength="100"
              outlined
              :rules="form.rules.responsible_name"
              v-model="form.item.responsible_name"
            />

            <q-input
              class="col-xs-6"
              label="Phone Number"
              maxlength="50"
              outlined
              :rules="form.rules.responsible_phone"
              v-model="form.item.responsible_phone"
            />

            <q-input
              class="col-xs-6"
              label="Email Address"
              maxlength="50"
              outlined
              :rules="form.rules.responsible_email"
              v-model="form.item.responsible_email"
            />

          </div>

          <q-inner-loading :showing="loading">
            <i class="fal fa-fan fa-spin fa-3x text-accent"></i>
          </q-inner-loading>
        </q-card-section>

        <q-card-actions class="justify-end">
          <q-btn
            color="accent"
            :loading="loading"
            label="Submit"
            type="submit"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import EditsItem from '../../mixins/EditsItem'

export default {
  name: 'LocationPage',

  mixins: [EditsItem],

  props: {
    module: {
      type: String,
      default: 'location'
    }
  },

  data() {
    return {
      form: {
        item: this.getNewItem(),
        rules: this.getValidationRules()
      },

      country_name_translating: false,
      city_name_translating: false
    }
  },

  computed: {
    formTitle() {
      return this.form.item.institute_name
    }
  },

  methods: {
    getNewItem() {
      return {
        id: 0,
        country_name: Object.fromEntries(this.getLocalesList().map(locale => [locale, ''])),
        city_name: Object.fromEntries(this.getLocalesList().map(locale => [locale, ''])),
        institute_name: '',
        responsible_name: '',
        responsible_phone: '',
        responsible_email: ''
      }
    },

    getValidationRules() {
      let rules = {
        country_name: [],
        city_name: [],
        institute_name: [
          val => !!val || this.errorMessages.required,
          () => !this.remoteErrors['institute_name'] || this.remoteErrors['institute_name'][0]
        ],
        responsible_name: [
          () => !this.remoteErrors['responsible_name'] || this.remoteErrors['responsible_name'][0]
        ],
        responsible_phone: [
          () => !this.remoteErrors['responsible_phone'] || this.remoteErrors['responsible_phone'][0]
        ],
        responsible_email: [
          () => !this.remoteErrors['responsible_email'] || this.remoteErrors['responsible_email'][0]
        ]
      }

      rules.country_name = Object.fromEntries(this.getLocalesList().map(locale => {
        let rules = [
          () => !this.remoteErrors['country_name'] || !this.remoteErrors['country_name'][locale] || this.remoteErrors['country_name'][locale][0]
        ]

        if (locale === this.getDefaultLocale()) {
          rules.unshift(val => !!val || this.errorMessages.required)
        }

        return [locale, rules]
      }))

      rules.city_name = Object.fromEntries(this.getLocalesList().map(locale => {
        let rules = [
          () => !this.remoteErrors['city_name'] || !this.remoteErrors['city_name'][locale] || this.remoteErrors['city_name'][locale][0]
        ]

        if (locale === this.getDefaultLocale()) {
          rules.unshift(val => !!val || this.errorMessages.required)
        }

        return [locale, rules]
      }))

      return rules
    }
  }
}
</script>
