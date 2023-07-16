<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="8">
            <CCardGroup>
              <CCard class="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p class="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="noreg"
                        v-model="noreg"
                      />
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        v-model="password"
                        placeholder="Password"
                        autocomplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol :xs="6">
                        <CButton @click="login()" color="primary" class="px-4"> Login </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
            <CAlert v-if="isError" color="danger"><CIcon icon="cil-warning" class="flex-shrink-0 me-2" width="24" height="24" />{{errMsg}}</CAlert>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  import { LOGIN } from "@/store/modules/auth.module";
  export default {
    name: 'Login',
    data() {
      return {
        noreg: null,
        password: null,
        isError: false,
        errMsg: null
      }
    },
    methods: {
      async login() {
        this.isError = false
        Swal.showLoading()
        await this.$store
            .dispatch(LOGIN, { noreg: this.noreg, password: this.password })
            .then((data) => {
                Swal.fire(
                    `Hallo, ${data.data.fullname}`,
                    '',
                    'success'
                )
                this.$router.push({ name: "Home" })
            })
            .catch(err => {
                this.isError = true
                this.errMsg = err.data.message
                Swal.fire(
                    `${err.data.message}`,
                    '',
                    'error'
                )
            })
      }
    }
  }
  </script>
  