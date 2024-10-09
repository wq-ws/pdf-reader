<script setup lang="ts">
import { useNotification } from 'naive-ui'
const notification = useNotification()
const { pdfjsLib } = globalThis
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.mjs'

let pageCount = 0
const tmpArr: any[] = []
const varIndex = [18, 80, 81, 87, 90, 91]
const varIndex1 = [18, 80, 81, 88, 91, 92]
const varIndex2 = [18, 81, 82, 89, 92, 93]
const compareObj = ['客户追踪号', '型号', '物料编码', '品牌', '总价', '数量']
const sortObj = ['品牌', '型号', '数量', '总价', '客户追踪号', '物料编码']
const pageCounts = [113, 114, 115]
const emit = defineEmits(['update'])
const loadPDF = async (file: Blob | MediaSource) => {
    tmpArr.length = 0
    const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file))
    loadingTask.promise.then(async (pdf: any) => {
        pageCount = pdf.numPages
        for (let i = 1; i <= pageCount; i++) {
            const page = await pdf.getPage(i)
            const tmp = await page.getTextContent()
            if (pageCounts.includes(tmp.items.length)) {
                const obj = tmp.items
                    .filter((_: any, index: number) => {
                        return (
                            (tmp.items.length === 113 && varIndex.includes(index)) ||
                            (tmp.items.length === 114 && varIndex1.includes(index)) ||
                            (tmp.items.length === 115 && varIndex2.includes(index))
                        )
                    })
                    .reduce((acc: any, item: any, index: any) => {
                        acc[compareObj[index]] = index === 0 ? item.str.slice(12) : item.str
                        return acc
                    }, {})

                const tmpObj: any = {}
                sortObj.forEach(item => {
                    tmpObj[item] = obj[item]
                })
                tmpArr.push(tmpObj)
            } else {
                notification.error({
                    content: `第${i}页数据解析失败，请检查文件是否正确`
                })
            }
        }
        console.log(tmpArr);
        emit('update', tmpArr)
        notification.info({
            content: `共${pageCount}页，成功解析${tmpArr.length}条数据`
        })
    })
}
const handlePdf = (event: any) => {
    const file = event.target.files[0]
    file && loadPDF(file)
}
</script>

<template>
    <input type="file" @change="handlePdf" accept=".pdf" />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
