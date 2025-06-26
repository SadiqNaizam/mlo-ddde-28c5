import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Package } from 'lucide-react';

type OrderStatus = 'New' | 'In Progress' | 'Ready for Pickup' | 'Completed';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  dueDate: string; // e.g., "2024-08-15"
  status: OrderStatus;
  items: OrderItem[];
}

interface OrderKanbanCardProps {
  order: Order;
}

const OrderKanbanCard: React.FC<OrderKanbanCardProps> = ({ order }) => {
  console.log(`OrderKanbanCard loaded for Order ID: ${order.id}`);

  const getStatusBadgeVariant = (status: OrderStatus): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'New':
        return 'default'; // Blue
      case 'In Progress':
        return 'secondary'; // Gray
      case 'Ready for Pickup':
        return 'default'; // Blue, to indicate action needed
      case 'Completed':
        return 'outline'; // Subdued
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="mb-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing">
      <CardHeader className="p-4 border-b">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-bold text-gray-800">
            Order #{order.id}
          </CardTitle>
          <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4 text-gray-400" />
          <span>{order.customerName}</span>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-400" />
            Items
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.quantity}x {item.name}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 border-t rounded-b-lg">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Due: {new Date(order.dueDate).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

// Example of a default export with sample props for storybook or testing
const defaultOrder: Order = {
  id: 'AB-1024',
  customerName: 'Jane Doe',
  dueDate: '2024-12-25',
  status: 'In Progress',
  items: [
    { name: 'Sourdough Loaf', quantity: 2 },
    { name: 'Butter Croissant', quantity: 6 },
  ]
};

// You can use this in your Kanban board like <OrderKanbanCard order={someOrder} />
// For demonstration, we can export a version with default props, but the main export is the component itself.
// This is just a comment, the actual export is below.

export default OrderKanbanCard;