export interface OrderItem {
  menu_item_id: number;
  quantity: number;
  special_instructions?: string;
}

export interface OrderCreate {
  order_type: 'dine_in' | 'takeout' | 'delivery';
  delivery_address?: string;
  delivery_notes?: string;
  table_number?: string;
  items: OrderItem[];
}

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  order_type: string;
  status: string;
  payment_status: string;
  subtotal: number;
  tax_amount: number;
  service_charge: number;
  total_amount: number;
  delivery_address?: string;
  delivery_notes?: string;
  table_number?: string;
  estimated_ready_time?: string;
  created_at: string;
  updated_at?: string;
  order_items: any[];
  customer?: {
    name: string;
    email: string;
    phone?: string;
  };
}

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Function to get token from localStorage (fallback)
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Mock data for development
const mockOrders: Order[] = [
  {
    id: 1,
    order_number: "ORD-001",
    customer_id: 1,
    order_type: "dine_in",
    status: "pending",
    payment_status: "pending",
    subtotal: 45.00,
    tax_amount: 4.50,
    service_charge: 2.25,
    total_amount: 51.75,
    table_number: "5",
    estimated_ready_time: "25 minutes",
    created_at: new Date().toISOString(),
    order_items: [
      { menu_item_id: 1, quantity: 2, special_instructions: "No onions" }
    ],
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890"
    }
  }
];

const MOCK_MODE = true; // Set to false when backend is available

export const orderService = {
  async createOrder(orderData: OrderCreate): Promise<Order> {
    if (MOCK_MODE) {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

      const newOrder: Order = {
        id: mockOrders.length + 1,
        order_number: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
        customer_id: 1,
        order_type: orderData.order_type,
        status: "pending",
        payment_status: "pending",
        subtotal: 35.00,
        tax_amount: 3.50,
        service_charge: 1.75,
        total_amount: 40.25,
        delivery_address: orderData.delivery_address,
        delivery_notes: orderData.delivery_notes,
        table_number: orderData.table_number,
        estimated_ready_time: "20 minutes",
        created_at: new Date().toISOString(),
        order_items: orderData.items,
        customer: {
          name: "Mock Customer",
          email: "customer@example.com"
        }
      };

      mockOrders.push(newOrder);
      return newOrder;
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to create order: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getOrders(): Promise<Order[]> {
    if (MOCK_MODE) {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockOrders];
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(`${API_BASE_URL}/orders/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    if (MOCK_MODE) {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));

      const order = mockOrders.find(o => o.id === orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      order.status = status;
      order.updated_at = new Date().toISOString();
      return { ...order };
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },
};
