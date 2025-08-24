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

export const orderService = {
  async createOrder(orderData: OrderCreate): Promise<Order> {
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

