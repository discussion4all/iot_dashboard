import axios from 'axios';
export default class TestApi {
    constructor() {
    }

    getData() {
        return axios.get('https://wisvt1646i.execute-api.ap-southeast-1.amazonaws.com/dev/assignedItemsList/0/5', this.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    getPdataData() {
        return axios.get('https://wisvt1646i.execute-api.ap-southeast-1.amazonaws.com/dev/productItemsList/0/5', this.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    setTokenToRequest() {
        axios.interceptors.request.use(
            config => {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsInVzZXJJZCI6MSwiYnVzaW5lc3NJZCI6MSwidXNlclR5cGUiOiJzdGFmZiIsImlhdCI6MTUyODQwODQ3MywiZXhwIjoxNTMxMDAwNDczfQ.GnJgyQMBn4o1Iz_aaHKPnKY-rRdVP5K-k37XA4bl4Cw';
                console.log('sadddddd' + token);

                if (token) {
                    config.headers.Authorization = `${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

    }

}