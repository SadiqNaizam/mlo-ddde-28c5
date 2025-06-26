import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import OrderKanbanCard from '@/components/OrderKanbanCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Icons
import { PlusCircle } from 'lucide-react';

// Define types locally for use in this component, matching OrderKanbanCard props
type OrderStatus = 'New' | 'In Progress' | 'Ready for Pickup' | 'Completed';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  dueDate: string;
  status: OrderStatus;
  items: OrderItem[];
}

// Placeholder data for the Kanban board
const sampleOrders: Order[] = [
  {
    id: 'AB-1024',
    customerName: 'Jane Doe',
    dueDate: '2024-09-15',
    status: 'New',
    items: [
      { name: 'Sourdough Loaf', quantity: 2 },
      { name: 'Butter Croissant', quantity: 6 },
    ],
  },
  {
    id: 'AB-1025',
    customerName: 'John Smith',
    dueDate: '2024-09-14',
    status: 'In Progress',
    items: [{ name: 'Chocolate Babka', quantity: 1 }],
  },
  {
    id: 'AB-1026',
    customerName: 'Alice Johnson',
    dueDate: '2024-09-13',
    status: 'Ready for Pickup',
    items: [
        { name: 'Dozen Bagels', quantity: 1 },
        { name: 'Rye Bread', quantity: 1 }
    ],
  },
  {
    id: 'AB-1021',
    customerName: 'Robert Brown',
    dueDate: '2024-09-12',
    status: 'Completed',
    items: [{ name: 'Pain au Chocolat', quantity: 4 }],
  },
   {
    id: 'AB-1027',
    customerName: 'Emily White',
    dueDate: '2024-09-18',
    status: 'New',
    items: [{ name: 'Focaccia', quantity: 1 }],
  },
  {
    id: 'AB-1022',
    customerName: 'Michael Green',
    dueDate: '2024-09-11',
    status: 'Completed',
    items: [{ name: 'Cinnamon Buns', quantity: 6 }],
  },
];

const OrderFulfillment = () => {
  console.log('OrderFulfillment page loaded');

  const statuses: OrderStatus[] = ['New', 'In Progress', 'Ready for Pickup', 'Completed'];

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4 sm:px-6 sm:py-0">
          <div className="flex items-center justify-between pt-4">
            <h1 className="text-2xl font-bold tracking-tight">Order Fulfillment</h1>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Order
            </Button>
          </div>
          
          <Tabs defaultValue="kanban" className="flex-1 flex flex-col">
            <TabsList>
              <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
              <TabsTrigger value="list" disabled>List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="kanban" className="flex-1 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full items-start">
                {statuses.map((status) => {
                  const ordersInColumn = sampleOrders.filter((o) => o.status === status);
                  return (
                    <Card key={status} className="flex flex-col h-full bg-background/80">
                      <CardHeader className="p-4 border-b">
                        <CardTitle className="flex items-center justify-between">
                          <span className="font-semibold text-lg">{status}</span>
                          <Badge variant="secondary" className="rounded-full">{ordersInColumn.length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 flex-1 overflow-y-auto">
                        {ordersInColumn.length > 0 ? (
                          ordersInColumn.map((order) => (
                            <OrderKanbanCard key={order.id} order={order} />
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-4">No orders in this stage.</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>All Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>A table view of all orders will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </main>
        <Footer />
      </div>
    </div>
  );
};

export default OrderFulfillment;