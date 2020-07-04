<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        clearable
        placeholder="姓名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="forceRefresh"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 5px"
        @click="handleCreate"
      >
        新增
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="姓名" prop="name" width="150" align="center" />
      <el-table-column label="性别" prop="sex" width="150" align="center" />
      <el-table-column label="年龄" prop="age" width="150" align="center" />
      <el-table-column label="疑似日期" prop="suspectDate" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ Date.parse(scope.row.suspectDate) | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="疑似省(市)" prop="suspectProvince" width="250" align="center" />
      <el-table-column label="疑似市(区)" prop="suspectCity" width="250" align="center" />
      <el-table-column label="状态" prop="state" width="150" align="center" />
      <el-table-column label="操作" align="center" width="150" fixed="right">
        <template slot-scope="{ row }">
          <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button type="text" icon="el-icon-delete" style="color:#f56c6c" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
import Pagination from '../../components/Pagination/index'
import { suspectPersonList, deleteSuspectPerson } from '../../api/suspectPerson'
import { parseTime } from '@/utils'
export default {
  name: 'SuspectPersonList',
  components: { Pagination },
  filters: {
    timeFilter(time) {
      if (time) {
        return parseTime(time, '{y}-{m}-{d} ')
      } else {
        return '无'
      }
    }
  },
  data() {
    return {
      listQuery: {},
      tableKey: 0,
      listLoading: true,
      list: [],
      total: 0
    }
  },
  created() {
    this.getList()
    this.parseQuery()
  },
  methods: {
    parseQuery() {
      // 收集查询条件
      const query = Object.assign({}, this.$route.query)
      let listQuery = {
        page: 1,
        pageSize: 10
      }
      if (query) {
        query.page && (query.page = Number(query.page))
        query.pageSize && (query.pageSize = Number(query.pageSize))
        listQuery = {
          ...listQuery,
          ...query
        }
      }
      this.listQuery = listQuery
    },
    handleFilter() {
      console.log('handleFilter')
    },
    sortChange(data) {
      console.log()
    },
    getList() {
      this.listLoading = true
      suspectPersonList(this.listQuery).then(response => {
        const { data, total } = response
        this.list = data.list
        this.total = total
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      this.$router.push(`/epidemic/SuspectPersonForm/edit/` + row.id)
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除确诊人员吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSuspectPerson(row.id).then(response => {
          this.$message({
            duration: 500,
            message: '删除成功',
            type: 'success'
          })
          this.refresh()
        })
      })
    },
    refresh() {
      this.getList()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.refresh()
    },
    handleCreate() {
      this.$router.push('/epidemic/SuspectPersonForm/add')
    },
    forceRefresh() {
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
