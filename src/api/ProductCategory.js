import Api from "./Api";
import Axios from 'axios';

export default class ProductCategory extends Api {
    static allRelations = [];

    static controllerName = 'product-categories';

    static getList(query = {}, relations = [], options = null) {

        return super.getList(query, relations, options);
    }

    static get(id, relations = this.allRelations) {
        var qs = require('qs');

        var query = {
            advisor: {
                value: this.getCurrentAdvisor() === null ? '' : this.getCurrentAdvisor().id
            },
            OutsourcedCompany: {}
        };

        var headers = this.getInitialHeaders();

        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';

        var config = {
            params: query,
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' })
            },
            headers: headers
        };

        return Axios.get(this.API_BASE_URL + '/case/' + id + '?expandRelations=' + relations.join(), config);
    }

    static create(data) {
        var headers = this.getInitialHeaders();

        var config = {
            headers: headers
        };

        return Axios.post(this.API_BASE_URL + '/' + this.controllerName, data, config);
    }

    static update(id, data) {
        var headers = this.getInitialHeaders();

        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';

        var config = {
            headers: headers
        };

        return Axios.put(this.API_BASE_URL + '/' + this.controllerName + '/' + id, data, config);
    }

    static delete(id) {
        var headers = this.getInitialHeaders();
        
        headers['Accept'] = 'application/json';

        var config = {
            headers: headers
        };

        return Axios.delete(this.API_BASE_URL + this.controllerName + id, config);
    }
}