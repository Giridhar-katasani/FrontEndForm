import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './../model/employee';

@Injectable()
export class EmployeeService {
    selectedEmployee:Employee
    url:string = "http://localhost:3000/employ";
    employees : Employee[]
    atFirst = {
        _id:'',
        name:'',
        position:'',
        company:'',
        salary:''

    }

    constructor(private http:HttpClient) {

    }

    postEmployee(emp) {
        console.log(emp);
        return this.http.post(this.url, emp);
    }

    getEmployees() {
       return this.http.get(this.url);
    }

    updateEmployee(emp) {
        return this.http.put(this.url+`/${emp._id}`, emp);
    }

    deleteEmployee(emp) {
        console.log(`/${emp._id}`);
        return this.http.delete(this.url + `/${emp._id}`);
    }
} 