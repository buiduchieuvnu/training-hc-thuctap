package com.example.hc_thucTap.service;

import com.example.hc_thucTap.model.Employee;

import java.util.List;

public interface IEmployeeService {
    // Ham them nhan vien
    public Employee addEmployee(Employee employee);

    // Ham chinh sua thong tin nhan vien
    public Employee updateEmployee(long id, Employee employee);

    // Ham xoa nhan vien
    public boolean deleteEmployee(long id);

    // Ham lay ra danh sach nhan vien
    public List<Employee> getAllEmployee();

    // Ham lay ra 1 nhan vien
    public Employee getOneEmployee(long id);
}
