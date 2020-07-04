<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div class="text item">
        <el-form label-width="150px" class="form-container">
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="suspectPerson.name"
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
                  v-model="suspectPerson.age"
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
                  v-model="suspectPerson.sex"
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
              <el-form-item label="疑似日期" prop="confirmDate">
                <el-date-picker
                  v-model="suspectPerson.suspectDate"
                  clearable
                  align="right"
                  type="date"
                  placeholder="疑似日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="疑似省(市)" prop="sex">
                <el-input
                  v-model="suspectPerson.suspectProvince"
                  type="input"
                  placeholder="疑似省(市)"
                  clearable
                  autosize
                  resize="both"
                  tabindex="1"
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="疑似市(区)" prop="sex">
                <el-input
                  v-model="suspectPerson.suspectCity"
                  type="input"
                  placeholder="疑似市(区)"
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
                <el-button type="primary" @click="submitSuspectPerson()">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { findSuspectPersonEdit, saveSuspectPerson, updateSuspectPerson } from '../../api/suspectPerson'
export default {
  name: 'SuspectPersonForm',
  data() {
    return {
      suspectPerson: {},
      suspectPersonId: null
    }
  },
  created() {
    this.suspectPersonId = this.$route.params.suspectPersonId
    if (this.suspectPersonId)// 编辑
    {
      this.findSuspectPersonEdit(this.suspectPersonId)
    }
  },
  methods: {
    submitSuspectPerson() {
      if (this.suspectPersonId)// 编辑
      {
        this.updateSuspectPerson()
      } else// 保存
      {
        this.saveSuspectPerson()
      }
    },
    // 新增
    saveSuspectPerson() {
      var d = new Date(this.suspectPerson.suspectDate)
      this.suspectPerson.suspectDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      saveSuspectPerson(this.suspectPerson).then(response => {
        this.loading = false
        this.$message({
          duration: 500,
          message: '疑似人员添加成功',
          type: 'success'
        })
        var router = this.$router
        router.push({ path: '/epidemic/SuspectPersonList' })
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: '保存出错,原因是：' + error.data.message
        })
      })
    },
    findSuspectPersonEdit(suspectPersonId) {
      findSuspectPersonEdit(suspectPersonId).then(response => {
        this.suspectPerson = response.data
      })
    },
    // 修改
    updateSuspectPerson() {
      var d = new Date(this.suspectPerson.suspectDate)
      this.suspectPerson.suspectDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      updateSuspectPerson(this.suspectPerson).then(response => {
        this.$message({
          duration: 500,
          message: '疑似人员修改成功',
          type: 'success'
        })
        var router = this.$router
        router.push({ path: '/epidemic/SuspectPersonList' })
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
