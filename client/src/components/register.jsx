import React,{Component} from 'react'
import jwt_decode from 'jwt-decode'
import {connect} from 'react-redux'
import {addStudent, getClassBill,addStudentBill} from '../actions/candidateAction'
import PropTypes from 'prop-types'
class Register extends Component {
  state = {
    name:'',
    surname:'',
    clas:'',
    department:'',
    gender:'',
    religion:'',
    date:'',
    sog:'',
    lga:'',
    address:'',
    pname:'',
    psurname:'',
    email:'',
    number:'',
    paddress:'',
    msg:''
  }

  handleChange=e=>{
    this.setState({[e.target.name]:e.target.value})
  }
  handleDepartment=e=>{
    this.setState({department:e.target.value})
  }
  handleClass=e=>{
    this.setState({clas:e.target.value})
    this.props.getClassBill(e.target.value)
  }
  handleSubmit=e=>{
    e.preventDefault()
    const decode = jwt_decode(localStorage.token)
    const student = {
      name:this.state.name,
      surname:this.state.surname,
      clas:this.state.clas,
      department:this.state.department,
      gender:this.state.gender,
      religion:this.state.religion,
      date:this.state.date,
      sog:this.state.sog,
      lga:this.state.lga,
      address:this.state.address,
      pname:this.state.pname,
      psurname:this.state.psurname,
      email:this.state.email,
      number:this.state.number,
      paddress:this.state.paddress,
      school_id:decode.school_id
    }
    this.props.addStudent(student)
    const {classBill} = this.props.classBill

    const studentBill={
      clas:this.state.clas,
      amountPaid:(this.state.amountPaid==='')?0:this.state.amountPaid,
      status:(this.state.amountPaid===classBill.fees)?'paid':'debtor',
      fees:classBill.fees,
      name:this.state.name,
      surname:this.state.surname
    }
    this.props.addStudentBill(studentBill)
  }
  render(){
    return(
            <div class="main-content">
      <div class="row">
                  <div class="col-lg-9 mx-auto">
                  {
                    (this.props.students.msg)?(
                      <div class='alert alert-success'>{this.props.students.msg}</div>
                    ):(
                      <div></div>
                    )

                  }
                  <div class="card">
                                   <div class="card-header">
                                       <strong>Student's</strong> Registeration Form
                                   </div>
                                   <form onSubmit={this.handleSubmit} class="form-horizontal">
                                   <div class="card-body card-block">

                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Name</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} type="text" id="text-input" name="name" placeholder="Enter Child's Name" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Surname</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} type="text" id="text-input" name="surname" placeholder="Enter Child's Surname" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Date Of Birth</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} type="date" id="text-input" name="date" class=" form-control"/>
                                               </div>
                                           </div>


                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="selectSm" class=" form-control-label">Class</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <select name="clas" onChange={this.handleClass} id="SelectLm" class=" form-control">
                                                       <option>Please select</option>
                                                       <option>Creche</option>
                                                       <option>KG1</option>
                                                       <option>KG2</option>
                                                       <option>NUR1</option>
                                                       <option>NUR2</option>
                                                       <option>Basic1</option>
                                                       <option>Basic2</option>
                                                       <option>Basic3</option>
                                                       <option>Basic4</option>
                                                       <option>Basic5</option>
                                                       <option>Jss1</option>
                                                       <option>Jss2</option>
                                                       <option>Jss3</option>
                                                       <option>Sss1</option>
                                                       <option>Sss2</option>
                                                       <option>Sss3</option>
                                                   </select>
                                               </div>
                                           </div>
                                           {
                                             (this.state.clas==='Sss1'||this.state.clas==='Sss2'||this.state.clas==='Sss3')?(
                                               <div class="row form-group">
                                                   <div class="col col-md-3">
                                                       <label for="selectSm" class=" form-control-label">Department</label>
                                                   </div>
                                                   <div class="col-12 col-md-9">
                                                       <select onChange={this.handleDepartment} name="department" id="SelectLm" class=" form-control">
                                                           <option>Please select</option>
                                                           <option>Science</option>
                                                           <option>Commercial</option>
                                                           <option>Art</option>
                                                       </select>
                                                   </div>
                                               </div>
                                             ):(
                                               <div></div>
                                             )
                                           }

                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label class=" form-control-label">Gender</label>
                                               </div>
                                               <div class="col col-md-9">
                                                   <div class="form-check">
                                                       <div class="radio">
                                                           <label for="radio1" class="form-check-label ">
                                                               <input onChange={this.handleChange} type="radio" id="radio1" name="gender" value="Male" class="form-check-input"/> Male
                                                           </label>
                                                       </div>
                                                       <div class="radio">
                                                           <label for="radio2" class="form-check-label ">
                                                               <input onChange={this.handleChange} type="radio" id="radio2" name="gender" value="Female" class="form-check-input"/> Female
                                                           </label>
                                                       </div>

                                                   </div>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label class=" form-control-label">Religion</label>
                                               </div>
                                               <div class="col col-md-9">
                                                   <div class="form-check">
                                                       <div class="radio">
                                                           <label for="radio1" class="form-check-label ">
                                                               <input onChange={this.handleChange} type="radio" id="radio1" name="religion" value="Islam" class="form-check-input"/> Islam
                                                           </label>
                                                       </div>
                                                       <div class="radio">
                                                           <label for="radio2" class="form-check-label ">
                                                               <input onChange={this.handleChange} type="radio" id="radio2" name="religion" value="Christianity" class="form-check-input"/> Christianity
                                                           </label>
                                                       </div>

                                                   </div>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">State Of Origin</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder='Enter State Of Origin' type="text" id="text-input" name="sog" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Local Government Area</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder='Enter Local Government Area' type="text" id="text-input" name="lga" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Address</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder='Enter Home Address' type="text" id="text-input" name="address" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">School Fee Paid (#)</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder='Amount Paid During Registration' type="number" id="text-input" name="amountPaid" class="form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Guardian's Name</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder="Enter Guardian's Name" type="text" id="text-input" name="pname" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Guardian's Surname</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder="Enter Guardian's Surname" type="text" id="text-input" name="psurname" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Guardian's Email Address</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder="Enter Guardian's Email" type="text" id="text-input" name="email" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Mobile Number</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder="Enter Mobile Number" type="number" id="text-input" name="number" class=" form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Guardian's Address</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} placeholder="Enter Guardian's Address" type="text" id="text-input" name="paddress" class=" form-control"/>
                                               </div>
                                           </div>

                                           </div>
                                   <div class="card-footer">
                                       <button type="submit" class="btn btn-primary btn-sm btn-block">
                                           <i class="fa fa-dot-circle-o"></i> Submit
                                       </button>
                                       {
                                         (this.props.students.msg)?(
                                           <div class='alert alert-success'>{this.props.students.msg}</div>
                                         ):(
                                           <div></div>
                                         )

                                       }
                                   </div>
                                   </form>
                               </div>
                               </div>
                               </div>
      </div>
    )
  }
}
Register.propTypes = {
  students:PropTypes.object.isRequired,
  getClassBill:PropTypes.func.isRequired,
  classBill:PropTypes.object.isRequired
}
const mapStateToProps= state => {
    return{
      students:state.students,
      classBill:state.classBill
    }
};
export default connect(mapStateToProps,{addStudent,getClassBill,addStudentBill})(Register)
