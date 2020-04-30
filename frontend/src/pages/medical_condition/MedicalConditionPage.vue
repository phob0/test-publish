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
            <h4 class="q-mb-none">{{ loading ? 'Please Wait' : (form.item.id ? 'Edit Medical Condition' : 'Create Medical Condition') }}</h4>
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
              :key="`name-${locale.code}`"
              :label="locale.code === defaultLocale ? 'Name' : ''"
              maxlength="50"
              outlined
              :rules="form.rules.name[locale.code]"
              v-for="locale in locales"
              v-model="form.item.name[locale.code]"
              v-show="name_translating || locale.code === defaultLocale"
            >
              <template v-slot:append>
                <span class="kps-input-locale">{{ locale.code }}</span>

                <span
                  class="on-right"
                  v-if="locale.code === defaultLocale"
                >
                <q-btn
                  @click="name_translating = !name_translating"
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
  name: 'MedicalConditionPage',

  mixins: [EditsItem],

  props: {
    module: {
      type: String,
      default: 'medicalCondition'
    }
  },

  data() {
    return {
      form: {
        item: this.getNewItem(),
        rules: this.getValidationRules()
      },

      name_translating: false
    }
  },

  computed: {
    formTitle() {
      return this.form.item.name[this.defaultLocale]
    }
  },

  methods: {
    getNewItem() {
      return {
        id: 0,
        name: Object.fromEntries(this.getLocalesList().map(locale => [locale, '']))
      }
    },

    getValidationRules() {
      let rules = {
        name: []
      }

      rules.name = Object.fromEntries(this.getLocalesList().map(locale => {
        let rules = [
          () => !this.remoteErrors['name'] || !this.remoteErrors['name'][locale] || this.remoteErrors['name'][locale][0]
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
