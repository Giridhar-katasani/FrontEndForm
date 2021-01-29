import { EmployeeService } from './../service/EmployeeService';
import { Employee } from "./../model/employee";

import { NgModel } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // constructor(private http:HttpClient) { }

  constructor(public employeeService:EmployeeService) { }
  // private url:string = "http://localhost:3000/employ";
  // public employees :Employee[];
  
  // public SelectedEmployee:Employee;
  // private emp : Employee;
  tempEmploye :Employee;
  log(input:NgModel) {
    // console.log(input);
  }

  resetForm(form) {
    if (form)
      form.reset();
    console.log(form);
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      company: "",
      salary: null
    }
  }

  submit(f) {
    console.log(f);
    if(f.value._id =="" || f.value._id == null) {
      delete f.value._id;
      this.employeeService.postEmployee(f.value).subscribe(res => {
        this.resetForm(f);
        this.refreshEmployeeList();
        console.log(res);
      })
    }
    else {
      console.log("helo form update");
      console.log(f.value);
      this.employeeService.updateEmployee(f.value).subscribe(res => {
        console.log(res);
        this.refreshEmployeeList();
      })
        
    }
    
    // this.emp = f.value;
    // console.log(this.emp);
    // this.http.post(this.url, this.emp).subscribe(res => console.log(res));
  }

  update(employ:Employee){
    console.log(employ);
    // this.SelectedEmployee = employ;
    this.employeeService.selectedEmployee = employ;
    console.log("helo");
  }

  delete(employ:Employee) {
    console.log("deleting");
    this.employeeService.deleteEmployee(employ).subscribe(res => {
      console.log("deleted sucessfully");
    });
    this.refreshEmployeeList();
  }
  refreshEmployeeList() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employeeService.employees = res as Employee[];
      console.log(this);
    })
  }

  ngOnInit(): void {
    this.refreshEmployeeList();
    // this.http.get(this.url).subscribe(response => {
    //   this.employees = response as Employee[];
    //   console.log(JSON.stringify(response));
    // })
    console.log("oninit");
  }
}
