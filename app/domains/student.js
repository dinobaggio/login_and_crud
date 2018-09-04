'use strict';

let Student = function(code, name, department, age, birthday, salary){
  this.code = code;
  this.name = name;
  this.department = department;
  this.age = age;
  this.birthday = birthday;
  this.salary = salary;
};

module.exports = Student;
