import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Title } from 'react-admin';

const Dashboard = () => (
  <div>
    <Title title="Hieromonk Studios Dashboard" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
      <Card>
        <CardHeader title="Active Contacts" />
        <CardContent>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>24</h2>
          <p style={{ color: '#666' }}>↑ 12% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader title="Active Contracts" />
        <CardContent>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>8</h2>
          <p style={{ color: '#666' }}>↑ 3 new this month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader title="Active Projects" />
        <CardContent>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>12</h2>
          <p style={{ color: '#666' }}>5 due this week</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader title="Revenue (MTD)" />
        <CardContent>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>$18.2K</h2>
          <p style={{ color: '#666' }}>↑ 8% from last month</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;