import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const EmployeeManagement = () => {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [employees, setEmployees] = useState([])

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees')
      setEmployees(response.data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/employees', { name, position })
      setName('')
      setPosition('')
      fetchEmployees()
    } catch (error) {
      console.error('Error adding employee:', error)
    }
  }

  return (
    <div>
      <CContainer>
        <CRow>
          <CCol md={6}>
            <CCard>
              <CCardHeader>Add Employee</CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <CFormInput
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <CFormInput
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  <CButton type="submit" color="primary" className="mt-2">
                    Add Employee
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol>
            <CCard>
              <CCardHeader>Employee List</CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Position</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {employees.map((employee) => (
                      <CTableRow key={employee.id}>
                        <CTableDataCell>{employee.name}</CTableDataCell>
                        <CTableDataCell>{employee.position}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default EmployeeManagement