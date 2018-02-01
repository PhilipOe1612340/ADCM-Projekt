<template>
  <div>
    <br>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-20 md-medium-hide"></div>
      <div class="md-layout-item md-large-size-35 md-medium-size-45 md-small-size-95">
        <form validate class="md-layout" @submit.prevent="validateUser">
          <md-card class="md-layout-item">
            <md-card-header>
              <div class="md-title">Kontakt</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('name')">
                    <label for="first-name">Name</label>
                    <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.name" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.name.required">Ihr Name wird benötigt</span>
                    <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid first name</span>
                  </md-field>
                </div>
              </div>

              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">Ihre Email wird benötigt</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('betreff')">
                    <label for="first-name">Betreff</label>
                    <md-input name="first-name" autocomplete="given-name" v-model="form.betreff" :disabled="sending" />
                  </md-field>
                </div>
              </div>

              <md-field>
                <label>Ihre Mitteilung</label>
                <md-textarea v-model="form.text"></md-textarea>
              </md-field>
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions>
              <md-button type="submit" class="md-primary" @click="validateUser" :disabled="sending">Absenden</md-button>
            </md-card-actions>
          </md-card>

          <md-snackbar :md-active.sync="userSaved">Ihre Nachricht wurde zugestellt</md-snackbar>
        </form>
      </div>
      <div class="md-layout-item md-large-size-35 md-medium-size-45 md-small-size-95">
        Agentur_dcm<br/>
        Agentur für Design und Fotographie</p>
        <p>dcm Galerie<br/>
        Schorndorfer Str. 33<br/>
        D – 70736 Fellbach</p>
        <p>Postanschrift<br/>
        Fellbacher Str. 109<br/>
        D – 70736 Fellbach</p>
        <p>Tel	+49 (0)711 300 36 91<br/> </p>
        Email <a href="mailto:info@agentur-dcm.de">info@agentur-dcm.de</a>
      </div>
      <div class="md-layout-item md-large-size-5 md-medium-hide"></div>
    </div>
  </div>
</template>


<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      Name: null,
      email: null
    },
    userSaved: false,
    sending: false
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      text: {
        required,
        minLength: minLength(3)
      },
      betreff: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.email = null;
      this.form.betreff = null;
      this.form.text = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.name} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-layout-item {
  overflow-x: hidden;
  margin: 0 10px 10px 10px;

  &:after {
    width: 100%;
    display: block;
    background: md-get-palette-color(red, 200);
  }
}
</style>
