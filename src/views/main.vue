<template>
    <div>
        <div class="load-image">
            <el-image
            style="height: 400px;width:700px"
            :src="src"
            :fit="'contain'"></el-image><br>
            <el-button type="primary" v-on:click="getImg">选取图片</el-button>
            <el-button type="primary" v-bind:disabled="dis" v-on:click="upload_iden">上传识别</el-button>
            <el-button type="primary" v-on:click="toExplain">分类科普</el-button><br>
            <h3 v-bind:value="result_iden">{{result_iden}}</h3>
        </div>
    </div>
</template>

<script>
let inputElement = null
export default {
    data() {
        return {
            src : '',
            canUpload : false,
            imgData : null,
            result_iden : '识别结果：',
            dis : false
        }
    },
    methods: {
        getImg() {
            if(inputElement == null){
                // 创建组件
                inputElement = document.createElement('input')
                // 设置组件属性
                inputElement.setAttribute('type','file')
                //
                inputElement.setAttribute('name','upload_img')
                // 隐藏组件
                inputElement.style.display='none'
                // 适应的浏览器版本不同
                if (window.addEventListener) {
					inputElement.addEventListener('change', this.uploadFile, false)
				} else {
					inputElement.attachEvent('onchange', this.uploadFile)
				}
                // 放在body下
                document.body.appendChild(inputElement)
            }
            inputElement.click()
        },
        uploadFile(e) {
            // 选取了文件
            if(e && e.target && e.target.files && e.target.files.length > 0){
                // 第一个文件
                let myFile = e.target.files[0]
                // 计算文件大小
                let imgSize = myFile.size /1024/1024
                if(imgSize > 5){
                    this.$message.error("图片不能超过5M")
                } else if(myFile.type.indexOf('image') == -1){
                    this.$message.error("请选取图片")
                } else {
                    let reader = new FileReader()
                    let that = this
                    // 读取文件
                    reader.readAsDataURL(myFile)
                    // 读取上传后执行
                    reader.onload = function(){
                        that.src = this.result
                        that.imgData = new FormData()
                        that.imgData.append("file",myFile)
                        that.canUpload = true
                        that.result_iden = '识别结果：'
                    }
                }
            }
        },
        upload_iden(){
            if(this.canUpload){
                let configs = {headers:{'Content-Type':'multipart/form-data'}}
                this.dis = true
                this.$axios.post("http://116.62.109.242:5001/upload",this.imgData,configs,200).then(res => {
                    this.result_iden = '识别结果：'
                    this.result_iden+=res.data
                    this.dis = false
                })
            }
        },
        toExplain(){
            this.$router.push({name: 'explain'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .load-image{
        text-align: center;
    }
</style>