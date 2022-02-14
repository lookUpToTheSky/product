import request from '@/utils/request.js'
export function getArticle(data) {
    return request({
        url: '/article/list',
        method: 'get',
        params: data
    })
}