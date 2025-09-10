import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, LinearProgress, Box, Typography
} from '@mui/material';
import LoginButton from './LoginButton';
import { API_BASE_URL } from '../config';
import HpBar from './HpBar';

const API_URL = `${API_BASE_URL}/employees/employeeprofiles/`;


export default function EmpList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get(API_URL)
        .then(res => {
          setEmployees(res.data);
        })
        .catch(error => {
          console.error("従業員データの取得に失敗しました:", error);
        });
    };
    
    fetchData();
    const intervalId = setInterval(fetchData, 30000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="employee list">
        <TableHead>
          <TableRow>
            <TableCell align="right">従業員番号</TableCell>
            <TableCell>氏名</TableCell>
            <TableCell>持ち場</TableCell>
            <TableCell>HP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell align="right">
                <LoginButton userId={emp.employee_number} />
                {emp.employee_number}
              </TableCell>
              <TableCell component="th" scope="row">
                {emp.user.last_name} {emp.user.first_name}
              </TableCell>
              <TableCell>
                {emp.current_role ? (
                  <Typography variant="body2">{emp.current_role}</Typography>
                ) : (
                  emp.hp !== null ? (
                     <Typography variant="body2" color="text.secondary">待機中</Typography>
                  ) : (
                     '' // N/Aを空白に変更
                  )
                )}
              </TableCell>
              <TableCell>
                {/* 【修正点】N/Aを空白に変更 */}
                {emp.hp !== null ? <HpBar value={emp.hp} /> : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

