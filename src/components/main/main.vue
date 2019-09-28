<style lang="less">
  @import './main.less';
</style>
<template>
  <div class="main-view">
    <Layout>
      <Header>
        <div class="layout-logo">
          <img src=""/>
        </div>
        <div class="layout-nav">
          <Dropdown @on-click="handleDropdown">
            <Icon type="md-person" />
            {{userData.userName}}
            <Icon type="ios-arrow-down"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem name="updatePassword">修改密码</DropdownItem>
              <DropdownItem name="logout" divided>退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider>
          <Menu theme="dark" width="auto" :active-name="activeMenu.name" :open-names="activeMenu.open" class="menu-item" :accordion="true">
            <MenuItem name="buyList" :to="{name: 'buyList'}">
              <Icon custom="iconfont icon-buy-record" />
              <span>购买记录</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout class="main-layout">
          <Breadcrumb>
            <BreadcrumbItem v-for="(breadcrumbItem, index) in breadcrumbList" :key="index">{{breadcrumbItem}}</BreadcrumbItem>
          </Breadcrumb>
          <Content>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Modal v-model="updatePasswordData.visible" :loading="updatePasswordData.loading" :mask-closable="false" title="密码修改" @on-ok="handleUpdatePasswordSubmit" @on-cancel="handleUpdatePasswordCancel" ok-text="修改">
      <Form ref="updatePasswordModalForm" :model="updatePasswordData.formData" :rules="updatePasswordData.formRule" :label-width="100">
        <FormItem label="旧密码" prop="oldPwd">
          <Input type="password" v-model="updatePasswordData.formData.oldPwd"></Input>
        </FormItem>
        <FormItem label="新密码" prop="pwd">
          <Input type="password" v-model="updatePasswordData.formData.pwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="confirmPwd">
          <Input type="password" v-model="updatePasswordData.formData.confirmPwd"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { updatePassword } from '@/api/user'
export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updatePasswordData.formData.pwd) {
        callback(new Error('两次密码输入不一致!'))
      } else {
        callback()
      }
    }
    return {
      updatePasswordData: {
        visible: false,
        loading: true,
        formData: {
          oldPwd: '',
          pwd: '',
          confirmPwd: ''
        },
        formRule: {
          oldPwd: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirmPwd: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    }
  },
  computed: {
    breadcrumbList () {
      return this.$route.meta.breadcrumb
    },
    activeMenu () {
      let _this = this
      let currPageName = _this.$route.name
      let tempActiveMenu = {name: '', open: []}
      switch (currPageName) {
        case 'agencyList':
          tempActiveMenu.name = 'agencyList'
          tempActiveMenu.open = []
          break
        case 'agencyDevelopList':
          tempActiveMenu.name = 'agencyDevelopList'
          tempActiveMenu.open = []
          break
        case 'buyList':
          tempActiveMenu.name = 'buyList'
          tempActiveMenu.open = []
          break
        case 'bonusList':
          tempActiveMenu.name = 'bonusList'
          tempActiveMenu.open = []
          break
        case 'courseList':
          tempActiveMenu.name = 'courseList'
          tempActiveMenu.open = []
          break
        case 'fodderList':
          tempActiveMenu.name = 'fodderList'
          tempActiveMenu.open = []
          break
        case 'settingProfit':
          tempActiveMenu.name = 'settingProfit'
          tempActiveMenu.open = ['setting']
          break
        case 'settingStartup':
          tempActiveMenu.name = 'settingStartup'
          tempActiveMenu.open = ['setting']
          break
        case 'settingShare':
          tempActiveMenu.name = 'settingShare'
          tempActiveMenu.open = ['setting']
          break
        default:
          tempActiveMenu = {name: '', open: []}
      }
      return tempActiveMenu
    }
  },
  methods: {
    ...mapActions([
      'handleLogout'
    ]),
    resetUpdatePasswordModal () {
      let _this = this
      _this.updatePasswordData.formData = { oldPwd: '', pwd: '', confirmPwd: '' }
      _this.$refs['updatePasswordModalForm'].resetFields()
    },
    logout () {
      this.handleLogout().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    handleUpdatePasswordSubmit () {
      let _this = this
      _this.$refs['updatePasswordModalForm'].validate((valid) => {
        if (valid) {
          updatePassword(_this.updatePasswordData.formData).then(() => {
            _this.$Message.success('修改成功')
            _this.updatePasswordData.visible = false
          }).catch(() => {
            _this.updatePasswordData.loading = false
            _this.$nextTick(() => {
              _this.updatePasswordData.loading = true
            })
          })
        } else {
          _this.updatePasswordData.loading = false
          _this.$nextTick(() => {
            _this.updatePasswordData.loading = true
          })
        }
      })
    },
    handleUpdatePasswordCancel () {
      let _this = this
      _this.resetUpdatePasswordModal()
    },
    handleDropdown (name) {
      let _this = this
      switch (name) {
        case 'updatePassword':
          _this.resetUpdatePasswordModal()
          _this.updatePasswordData.visible = true
          break
        case 'logout':
          this.logout()
          break
      }
    }
  }
}
</script>
