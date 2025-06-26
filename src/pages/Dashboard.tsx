import React from 'react';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import MetricWidget from '@/components/MetricWidget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { DollarSign, ClipboardList, PackageWarning, CalendarCheck2, Clock, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

// Placeholder data
const salesData = [
  { day: 'Mon', sales: 400 },
  { day: 'Tue', sales: 300 },
  { day: 'Wed', sales: 500 },
  { day: 'Thu', sales: 450 },
  { day: 'Fri', sales: 600 },
  { day: 'Sat', sales: 800 },
  { day: 'Sun', sales: 750 },
];

const upcomingBakes = [
  { id: 1, name: 'Sourdough Loaves', time: 'Tomorrow, 6:00 AM' },
  { id: 2, name: 'Butter Croissants', time: 'Tomorrow, 8:00 AM' },
  { id: 3, name: 'Baguette Shaping', time: 'Tomorrow, 11:00 AM' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Jane Doe', status: 'Fulfilled' },
  { id: 'ORD-002', customer: 'John Smith', status: 'Pending' },
  { id: 'ORD-003', customer: 'Alice Johnson', status: 'Fulfilled' },
];

const Dashboard = () => {
  console.log('Dashboard loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-y-auto">
          <div className="flex items-center pt-6">
              <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          </div>
          {/* Metric Widgets Section */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
            <MetricWidget
              icon={DollarSign}
              title="Today's Sales"
              value="$1,250.00"
              trend="up"
              trendText="+12% from yesterday"
            />
            <MetricWidget
              icon={ClipboardList}
              title="New Orders"
              value="15"
              trend="neutral"
              trendText="2 pending fulfillment"
              linkTo="/order-fulfillment"
            />
            <MetricWidget
              icon={PackageWarning}
              title="Low Stock Items"
              value="3"
              trend="down"
              trendText="Flour, Butter, Yeast"
              linkTo="/inventory-tracking"
            />
            <MetricWidget
              icon={CalendarCheck2}
              title="Upcoming Bakes"
              value="5"
              trendText="3 scheduled for tomorrow"
              linkTo="/baking-schedule"
            />
          </section>

          {/* Main Content Grid (Chart and Summaries) */}
          <section className="grid gap-4 md:gap-8 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Weekly Sales Trend</CardTitle>
                <CardDescription>A summary of sales over the last 7 days.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `$${value}`} />
                    <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                    <Legend />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {upcomingBakes.map((bake) => (
                      <li key={bake.id} className="flex items-start">
                        <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{bake.name}</p>
                          <p className="text-sm text-muted-foreground">{bake.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Link to="/baking-schedule" className="text-sm text-primary hover:underline mt-4 block text-right">
                    View Full Schedule &rarr;
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recentOrders.map((order) => (
                      <li key={order.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-muted-foreground mr-3" />
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.id}</p>
                          </div>
                        </div>
                        <Badge variant={order.status === 'Fulfilled' ? 'default' : 'secondary'}
                          className={order.status === 'Fulfilled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {order.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                   <Link to="/order-fulfillment" className="text-sm text-primary hover:underline mt-4 block text-right">
                    View All Orders &rarr;
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;