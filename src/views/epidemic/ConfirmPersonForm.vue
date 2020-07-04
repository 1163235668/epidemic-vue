<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div class="text item">
        <el-form label-width="150px" class="form-container">
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="confirmPerson.name"
                  type="input"
                  placeholder="姓名"
                  clearable
                  autosize
                  resize="both"
                  tabindex="1"
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="年龄" prop="age">
                <el-input
                  v-model="confirmPerson.age"
                  type="input"
                  placeholder="年龄"
                  clearable
                  autosize
                  resize="both"
                  tabindex="1"
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="性别" prop="sex">
                <el-input
                  v-model="confirmPerson.sex"
                  type="input"
                  placeholder="性别"
                  clearable
                  autosize
                  resize="both"
                  tabindex="1"
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="确诊日期" prop="confirmDate">
                <el-date-picker
                  v-model="confirmPerson.confirmDate"
                  clearable
                  align="right"
                  type="date"
                  placeholder="确诊日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="确诊省(市)" prop="sex">
                <el-input
                  v-model="confirmPerson.confirmProvince"
                  type="input"
                  placeholder="确诊省(市)"
                  clearable
                  autosize
                  resize="both"
                  tabindex="1"
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="确诊市(区)" prop="sex">
                <el-input
                  v-model="confirmPerson.confirmCity"
                  type="input"
                  placeholder="确诊市(区)"
                  clearable
                  autosize
                  resize="both"
                  tabindex="1"
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item>
                <el-button type="primary" @click="submitConfirmPerson()">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { findConfirmPersonEdit, saveConfirmPerson, updateConfirmPerson } from '../../api/confirmPerson'
export default {
  name: 'ConfirmPersonForm',
  data() {
    return {
      confirmPerson: {},
      confirmPersonId: null
    }
  },
  created() {
    this.confirmPersonId = this.$route.params.confirmPersonId
    if (this.confirmPersonId)// 编辑
    {
      this.findConfirmPersonEdit(this.confirmPersonId)
    }
  },
  methods: {
    submitConfirmPerson() {
      if (this.confirmPersonId)// 编辑
      {
        this.updateConfirmPerson()
      } else// 保存
      {
        this.saveConfirmPerson()
      }
    },
    // 新增
    saveConfirmPerson() {
      var d = new Date(this.confirmPerson.confirmDate)
      this.confirmPerson.confirmDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      saveConfirmPerson(this.confirmPerson).then(response => {
        console.log(response)
        this.loading = false
        this.$message({
          duration: 500,
          message: '确诊人员添加成功',
          type: 'success'
        })
        var router = this.$router
        router.push({ path: '/epidemic/ConfirmPersonList' })
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: '保存出错,原因是：' + error.data.message
        })
      })
    },
    findConfirmPersonEdit(confirmPersonId) {
      findConfirmPersonEdit(confirmPersonId).then(response => {
        this.confirmPerson = response.data
      })
    },
    // 修改
    updateConfirmPerson() {
      var d = new Date(this.confirmPerson.confirmDate)
      this.confirmPerson.confirmDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      updateConfirmPerson(this.confirmPerson).then(response => {
        this.$message({
          duration: 500,
          message: '确诊人员修改成功',
          type: 'success'
        })
        var router = this.$router
        router.push({ path: '/epidemic/ConfirmPersonList' })
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: '修改出错,原因是：' + error.data.message
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
