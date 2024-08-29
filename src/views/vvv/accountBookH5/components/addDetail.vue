<template>
	<el-dialog v-model="visible" title="记一笔" width="600">
		<el-form ref="formRef" style="max-width: 800px" :model="form" :rules="rules" label-width="70" class="demo-form"
			:size="formSize" status-icon>
			<el-form-item label="金额" prop="money">
				<el-input v-model="form.money" />
			</el-form-item>
			<el-form-item label="分类" prop="type">
				<el-select v-model="form.type" placeholder="请选择..." filterable remote>
					<el-option v-for="item in typeAry" :key="item.code" :label="item.value" :value="item.code" />
				</el-select>
			</el-form-item>
			<el-form-item label="时间" required>
				<el-form-item prop="date">
					<el-date-picker v-model="form.date" type="datetime" placeholder="Select date and time" :shortcuts="shortcuts"
						format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
				</el-form-item>
			</el-form-item>
			<el-form-item label="商家" prop="business">
				<el-select v-model="form.business" placeholder="请选择..." filterable remote>
					<el-option v-for="item in businessAry" :key="item.code" :label="item.value" :value="item.code" />
				</el-select>
			</el-form-item>
			<el-form-item label="大类" prop="bigType">
				<el-select v-model="form.bigType" placeholder="请选择..." filterable remote>
					<el-option v-for="item in bigTypeAry" :key="item.code" :label="item.value" :value="item.code" />
				</el-select>
			</el-form-item>
			<el-form-item label="备注" prop="notes">
				<el-input v-model="form.notes" />
			</el-form-item>
			<el-form-item label="图片" prop="imgUrl">
				<el-upload class="avatar-uploader" name="image" :action=uploadUrl :headers="uploadHeaders"
					:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
					<el-icon v-else class="avatar-uploader-icon">
						<Plus />
					</el-icon>
				</el-upload>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="cancelFn">取消</el-button>
				<el-button type="primary" @click="saveFn(formRef)">
					保存
				</el-button>
			</div>
		</template>
	</el-dialog>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { addDetail } from "../../../../api/accoutBook/main.ts";
import { getDictData, formatDate } from "../../../../utils/util.ts";

import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
interface form {
	money: number
	member: number,
	date: string,
	business: number
	bigType: number
	type: number,
	imgUrl: string
	notes: string
}

type optionT = {
	label: string,	
	value: number,
	sort?: number
}
let typeAry = reactive<optionT[]>([])
let businessAry= reactive<optionT[]> ([])
let bigTypeAry= reactive<optionT[]>([])
const form = ref<form>({
	money: 0,
	bigType: 1, business: 1, imgUrl: "", member: 1, notes: "",
	date: formatDate(new Date()),
	type: 1,
})
const initData = async () => {
	typeAry = await getDictData('detailType')
	businessAry = await getDictData('business')
	bigTypeAry = await getDictData('bigType')
	

}
initData()
const uploadHeaders = {
	userId: localStorage.getItem('userId'),
	token: localStorage.getItem('token')
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
	res,
	uploadFile
) => {
	form.imgUrl = res.imgUrl
	// form.imgUrl = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	// if (rawFile.type !== 'image/jpeg') {
	//   ElMessage.error('Avatar picture must be JPG format!')
	//   return false
	// } else if (rawFile.size / 1024 / 1024 > 2) {
	//   ElMessage.error('Avatar picture size can not exceed 2MB!')
	//   return false
	// }
	return true
}
const uploadUrl = 'api/upload/img'

const shortcuts = [
	{
		text: 'Today',
		value: new Date(),
	},
	{
		text: 'Yesterday',
		value: () => {
			const date = new Date()
			date.setDate(date.getDate() - 1)
			return date
		},
	},
	{
		text: 'A week ago',
		value: () => {
			const date = new Date()
			date.setDate(date.getDate() - 7)
			return date
		},
	},
]



const visible = ref(false)
const formSize = ref<ComponentSize>('default')
const formRef = ref<FormInstance>()


const memberAry = ['Lm', '月光', '宝贝']

const rules = reactive<FormRules<form>>({
	name: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	region: [
		{
			required: true,
			message: 'Please select Activity zone',
			trigger: 'change',
		},
	],
	count: [
		{
			required: true,
			message: 'Please select Activity count',
			trigger: 'change',
		},
	],
	date1: [
		{
			type: 'date',
			required: true,
			message: 'Please pick a date',
			trigger: 'change',
		},
	],
	date2: [
		{
			type: 'date',
			required: true,
			message: 'Please pick a time',
			trigger: 'change',
		},
	],
	location: [
		{
			required: true,
			message: 'Please select a location',
			trigger: 'change',
		},
	],
	type: [
		{
			required: true,
			message: 'Please select at least one activity type',
			trigger: 'change',
		},
	],
	resource: [
		{
			required: true,
			message: 'Please select activity resource',
			trigger: 'change',
		},
	],
	desc: [
		{ required: true, message: 'Please input activity form', trigger: 'blur' },
	],
})

const saveFn = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			addDetail(form).then((res: any) => {
				console.log(res)
			})
		} else {
			console.log('error submit!', fields)
		}
	})
}

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}
const cancelFn = () => {
	visible.value = false
}
const setVisible = (v = true) => {
	visible.value = v
	console.log(form);

	// resetForm(formRef.value)
}


defineExpose({ setVisible })

</script>
<style scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>