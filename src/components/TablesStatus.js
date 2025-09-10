import React from 'react';
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
// 【修正点】useNavigate を react-router-dom からインポートします
import { useNavigate } from 'react-router-dom';

/**
 * お客様一組の情報を、指定された座標に表示するコンポーネント
 */
const CustomerTable = ({ customer, x, y }) => {
  const { id, people, entryTime, status, memo } = customer;
  
  // 【修正点】フックはコンポーネントのトップレベルで呼び出します
  const navigate = useNavigate();

  // ボックスがクリックされたときに実行される関数
  const handleTableClick = () => {
    // '/table/卓番' というURLに遷移します
    navigate(`/table/${id}`);
  };

  const backgroundColor = status ? 'primary.main' : 'grey.300';
  const textColor = status ? 'white' : 'black';

  return (
    // 【修正点】クリックイベントを個々のテーブルであるPaperコンポーネントに設定します
    <Paper
      elevation={3}
      onClick={handleTableClick} // ← ここにonClickを設定
      sx={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        width: 200,
        height: 150,
        borderRadius: 2,
        padding: 2,
        bgcolor: backgroundColor,
        color: textColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer', // クリックできることを示すカーソル
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
          zIndex: 1,
        }
      }}
    >
      {status ? (
        <>
          <Typography variant="body2">{id}卓</Typography>
          <Typography variant="h6">{people}名様</Typography>
          <Typography variant="body2">時間: {entryTime}</Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            {memo ? `メモ: ${memo}` : ''}
          </Typography>
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="body2">{id}卓</Typography>
            <Typography variant="h6">ご案内待ち</Typography>
        </Box>
      )}
    </Paper>
  );
};

// --- このコンポーネントの使い方 ---
export default function TablesStatus() {
  const tableLayoutData = [
    { customer: { id: 1, people: 4, entryTime: '18:30', status: true, memo: '窓際の席希望' }, position: { x: 50, y: 50 } },
    { customer: { id: 2, people: 2, entryTime: '19:00', status: false, memo: 'お子様椅子' }, position: { x: 300, y: 50 } },
    { customer: { id: 3, people: 3, entryTime: '19:15', status: true, memo: 'アレルギー有' }, position: { x: 550, y: 50 } },
    { customer: { id: 4, people: 2, entryTime: '19:20', status: true, memo: '記念日' }, position: { x: 50, y: 240 } },
    { customer: { id: 5, people: 5, entryTime: '19:45', status: false, memo: '' }, position: { x: 300, y: 240 } },
    { customer: { id: 6, people: 6, entryTime: '19:50', status: false, memo: '' }, position: { x: 550, y: 240 } },
  ];

  return (
    // 【修正点】親BoxのonClickは不要なので削除します
    <Box
      sx={{
        position: 'relative',
        height: '440px',
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: 2,
        mb: 4,
      }}
    >
      {/* 【修正点】<body1>は存在しないため、Typographyに変更し、Box内に配置します */}
      <Typography variant="h5" sx={{ p: 2, position: 'absolute' }}>座席表</Typography>
      
      {tableLayoutData.map(item => (
        <CustomerTable
          // keyは一意である必要があるため、item.customer.id を使います
          key={item.customer.id} 
          customer={item.customer}
          x={item.position.x}
          y={item.position.y}
        />
      ))}
    </Box>
  );
}

