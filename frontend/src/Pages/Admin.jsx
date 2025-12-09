import { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  FaUsers, 
  FaShoppingCart, 
  FaMoneyBillWave,
  FaChartLine 
} from 'react-icons/fa';

// Tremor components
import { Card, Text, Metric, ProgressBar } from "@tremor/react";
import { BarChart, LineChart } from '@tremor/react';

/*------------------------- CSS Files -------------------------------*/
import "../static/admin.css";

// Custom Components
import AdminSideBar from '../Components/AdminSideBar';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: open ? drawerWidth : theme.spacing(9),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
);

import PropTypes from 'prop-types';

const StatsCard = ({ icon: Icon, title, value, trend, color }) => {
  const theme = useTheme();
  
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 140,
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        borderRadius: 2,
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon size={24} color={color} style={{ marginRight: '8px' }} />
        <Typography color="textSecondary" variant="body2">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: trend >= 0 ? 'success.main' : 'error.main',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaChartLine style={{ marginRight: '4px' }} />
        {trend >= 0 ? '+' : ''}{trend}% vs last month
      </Typography>
    </Paper>
  );
};

const AdminPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [userStats, setUserStats] = useState({ total: 0, active: 0, new: 0 });
  const [orderStats, setOrderStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [revenue, setRevenue] = useState({ total: 0, trend: 0 });

  useEffect(() => {
    // Simulate fetching real-time data
    const generateData = () => {
      const now = new Date();
      const data = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          sales: Math.floor(Math.random() * 1000) + 500,
          users: Math.floor(Math.random() * 100) + 50,
          orders: Math.floor(Math.random() * 200) + 100,
        });
      }
      return data;
    };

    const updateStats = () => {
      const data = generateData();
      setSalesData(data);
      setUserStats({
        total: 1250,
        active: 890,
        new: 125,
      });
      setOrderStats({
        total: 450,
        pending: 45,
        completed: 405,
      });
      setRevenue({
        total: 25890,
        trend: 12.5,
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [
      {
        name: 'Revenue',
        data: [2890, 3250, 2800, 4500, 3800, 3900, 4200],
      },
      {
        name: 'Orders',
        data: [45, 52, 38, 65, 48, 55, 62],
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSideBar />
      <Main open={true}>
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={FaUsers}
              title="Total Users"
              value={userStats.total}
              trend={8.5}
              color="#3498db"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={FaShoppingCart}
              title="Total Orders"
              value={orderStats.total}
              trend={12.3}
              color="#e74c3c"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={FaMoneyBillWave}
              title="Revenue"
              value={`$${revenue.total}`}
              trend={revenue.trend}
              color="#2ecc71"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={FaUsers}
              title="Active Users"
              value={userStats.active}
              trend={5.2}
              color="#9b59b6"
            />
          </Grid>

          {/* Sales Chart */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Sales Overview
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3498db"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Order Status */}
          <Grid item xs={12} md={4}>
            <Card>
              <Text>Order Completion Rate</Text>
              <Metric>{((orderStats.completed / orderStats.total) * 100).toFixed(1)}%</Metric>
              <ProgressBar value={orderStats.completed} max={orderStats.total} />
            </Card>
          </Grid>

          {/* Revenue Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <Text>Weekly Revenue</Text>
              <BarChart
                data={chartData.data[0].data.map((value, index) => ({
                  name: chartData.categories[index],
                  "Revenue": value,
                }))}
                index="name"
                categories={["Revenue"]}
                colors={["blue"]}
                valueFormatter={(number) => `$${number.toLocaleString()}`}
                yAxisWidth={48}
              />
            </Card>
          </Grid>

          {/* Orders Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <Text>Orders Trend</Text>
              <LineChart
                data={chartData.data[1].data.map((value, index) => ({
                  name: chartData.categories[index],
                  "Orders": value,
                }))}
                index="name"
                categories={["Orders"]}
                colors={["rose"]}
                valueFormatter={(number) => number.toString()}
                yAxisWidth={40}
              />
            </Card>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
};

StatsCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default AdminPage;


