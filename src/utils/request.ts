import axios from 'axios';
import QS from 'qs';
// 配置请求 token和baseURL
axios.defaults.headers['Authorization'] = 'token';
// axios.defaults.baseURL = 'https://www.baidu.com';

interface DataProps {
    url: string;
    method?: string;
    requestType?: string; //formData 格式请求时传
    isUpload?: boolean; //上传
    filename?: string; //下载时传文件名
    [key: string]: any;
}
const request = (body: DataProps) => {
    const { method, params, data, url, requestType, responseType, isUpload, filename, ...other } = body;
    // get 传参处理
    if (method == 'get' && params) {
        body.params = QS.stringify(params);
        other.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    // 处理上传
    // post formdata 传参处理
    if (method == 'post' && (requestType == 'formData' || isUpload) && data && data instanceof Object) {
        const form = new FormData();
        Object.entries(data).forEach(([key, val]) => {
            form.append(key, val as any);
        });
        body.data = form;
        other.headers['Content-Type'] = 'multiprat/form-data';
    }
    // 处理下载、普通返回
    axios.interceptors.response.use(res => {
        res as any;
        const str = (res?.headers && res?.headers['Content-Disposition']) || '';
        if (str && (responseType == 'blob' || res.data instanceof Blob)) {
            // 是下载
            const tempUrl = URL.createObjectURL(res.data);
            // revokeObjectURL（）对应释放
            const a: any = document.createElement('a');
            a.href = tempUrl;
            a.download = filename;
            document.body.appendChild(a);
            // 浏览器上
            a.click();
            // 某些手机上必须使用下面这种写法
            // const event = document.createEvent("MouseEvent");
            // event.initEvent('click', false, false);
            // a.dispatchEvent(event);
            document.body.removeChild(a);
        }
        return res.data ?? { code: '', message: '' };
    });

    return axios({
        ...other,
        method: method || 'get',
        url,
        params: body.params,
        data: body.data
    });
};

export default request;
