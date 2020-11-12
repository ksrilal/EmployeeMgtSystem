import { Component, OnInit } from '@angular/core';
import { AppService } from "./app.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(private AppService: AppService, private fb: FormBuilder){  }

  addTypeBlockState = false;
  addTypeBlockBtn = false;
  addEmployeeBlockState = false;
  addEmployeeBlockBtn = false;

  addEmployeeBlockOpen() {
    this.addEmployeeBlockState =true;
    this.addTypeBlockBtn = true;
    this.addEmployeeBlockBtn = true;
  }
  addEmployeeBlockClose() {
    this.addEmployeeBlockState =false;
    this.addTypeBlockBtn = false;
    this.addEmployeeBlockBtn = false;
    this.employeeform.reset();
  }
  addTypeBlockOpen() {
    this.addTypeBlockState =true;
    this.addTypeBlockBtn = true;
    this.addEmployeeBlockBtn = true;
  }
  addTypeBlockClose() {
    this.addTypeBlockState =false;
    this.addTypeBlockBtn = false;
    this.addEmployeeBlockBtn = false;
    this.typeform.reset();
  }  

  ngOnInit(): void {
    
    this.AppService.getType().subscribe(
      data => {
        //console.log(data);
        this.Type = data;
      },
      err => {
        console.log(err);
      }
    );

    this.AppService.getEmployee().subscribe(
      data => {
        console.log(data);
        data.forEach(element => {
          for(let i=0;i<this.Type.length;i++) {
            if(element.type_id == this.Type[i].type_id) {
              element.type_id = this.Type[i].type_name;
            }
          }
        });
        this.source = data;
        this.orgSource = data;
      },
      err => {
        console.log(err);
      }
    );
  } 
  orgSource;
  source;
  Type;

  settings = {
    actions: {
      columnTitle: '',
      position: 'right',
      add: false
    },
    pager: {
      perPage: 6
    },
    edit: {
      confirmSave: true
    },
    delete: {
      //deleteButtonContent: ' DELETE',
      confirmDelete: true
    }, 
    columns: {
      emp_code: {
        title: 'Code'
      },
      emp_name: {
        title: 'Name'
      },
      emp_email: {
        title: 'Email'
      },
      emp_gender: {
        title: 'Gender'
      },
      emp_dateofbirth: {
        title: 'Date of Birth'
      },
      type_id: {
        title: 'Employee Type'
      },
      emp_active: {
        title: 'State'
      },
    }
  };

  onEditConfirm(event) {
    let flag = false;
    let temp = event.newData.type_id;
    for(let i=0;i<this.Type.length;i++) {
      if(event.newData.type_id == this.Type[i].type_name) {
        event.newData.type_id = this.Type[i].type_id;
        flag = true;
      }
    }
    if(!flag) alert("Type not match!")
    else if(
      event.newData.code != "" &&
      event.newData.name != "" &&
      event.newData.gender != "" &&
      event.newData.email != "" &&
      event.newData.dateofbirth != "" &&
      event.newData.dateofbirth != "" &&
      event.newData.type_id != ""
    ) {
      if (window.confirm('Are you sure you want to edit?')) {
        console.log(event.newData);
        this.AppService.editEmployee(event.data.emp_id, event.newData).subscribe(res => console.log(res));
        event.newData.type_id = temp;
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    } else {
      alert("ERROR!");
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      //console.log(event.data.emp_id);
      this.AppService.deleteEmployee(event.data.emp_id).subscribe(res => console.log(res));;
      event.confirm.resolve(event.data);
    } else {
      event.confirm.reject();
    }
  }

  MasterForm = this.fb.group({
    employeeform: new FormGroup({
      emp_code: new FormControl("", Validators.required),
      emp_name: new FormControl("", Validators.required),
      emp_email: new FormControl("", [Validators.required, Validators.email]),
      emp_gender: new FormControl("male", Validators.required),
      emp_dateofbirth: new FormControl("", Validators.required),
      type_id: new FormControl(0, Validators.required),
      emp_active: new FormControl(""),
    }),
    typeform: new FormGroup({
      type_code: new FormControl("", Validators.required),
      type_name: new FormControl("", Validators.required),
      type_active: new FormControl(""),
    })
  });

  get employeeform() {
    return this.MasterForm.get('employeeform');
  }
  get typeform() {
    return this.MasterForm.get('typeform');
  }
  get fe() { 
    return (<FormGroup>this.MasterForm.get('employeeform')).controls; 
  }
  get ft() { 
    return (<FormGroup>this.MasterForm.get('typeform')).controls; 
  }
  
  get emp_email() {
    return this.employeeform.get("emp_email");
  }
  get emp_name() {
    return this.employeeform.get("emp_name");
  }
  get emp_code() {
    return this.employeeform.get("emp_code");
  }
  get emp_gender() {
    return this.employeeform.get("emp_gender");
  }
  get emp_dateofbirth() {
    return this.employeeform.get("emp_dateofbirth");
  }
  get emp_active() {
    return this.employeeform.get("emp_active");
  }
  get type_id() {
    return this.employeeform.get("type_id");
  }
  get type_code() {
    return this.typeform.get("type_code");
  }
  get type_name() {
    return this.typeform.get("type_name");
  }
  get type_active() {
    return this.typeform.get("type_active");
  }

  onSubmitEmployee() {
    if(this.employeeform.value.emp_active == true) this.employeeform.value.emp_active = "Active";
    else this.employeeform.value.emp_active = "Not Active";
    this.AppService.addEmployee(this.employeeform.value).subscribe(res => console.log(res));
    this.addEmployeeBlockState =false;
    this.addTypeBlockBtn = false;
    this.addEmployeeBlockBtn = false;
    this.employeeform.reset();
  }

  onSubmitType() {
    console.log(this.typeform.value);
    this.AppService.addType(this.typeform.value).subscribe(res => console.log(res));
    this.addTypeBlockState =false;
    this.addTypeBlockBtn = false;
    this.addEmployeeBlockBtn = false;
    this.typeform.reset();
  }

  onSearchEmployee(event: any) {
    //console.log(event.target.value);
    if(event.target.value == "")
      this.source = this.orgSource;
    else
      this.source = this.source.filter(xx => xx.emp_name.includes(event.target.value));
 }
  
}
