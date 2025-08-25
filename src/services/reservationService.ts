export interface TableAvailabilityRequest {
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  party_size: number;
}

export interface AlternativeTime {
  time: string;
  available_tables: number;
}

export interface TableAvailabilityResponse {
  available: boolean;
  table_id?: number;
  table_name?: string;
  message: string;
  alternatives: AlternativeTime[];
}

export interface ReservationData {
  reservation_date: string; // ISO datetime string
  party_size: number;
  special_requests?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
}

export interface ReservationConfirmation {
  reservation_id: string;
  table_name: string;
  date: string;
  time: string;
  party_size: number;
  customer_name: string;
  status: string;
  confirmation_sent: boolean;
}

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Function to get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Mock mode for development
const MOCK_MODE = true; // Set to false when backend is available

export const reservationService = {
  async checkTableAvailability(request: TableAvailabilityRequest): Promise<TableAvailabilityResponse> {
    if (MOCK_MODE) {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate availability logic
      const isAvailable = Math.random() > 0.3; // 70% chance of availability
      
      if (isAvailable) {
        return {
          available: true,
          table_id: 2,
          table_name: 'Table 2',
          message: `Table for ${request.party_size} available at ${request.time}`,
          alternatives: []
        };
      } else {
        // Generate mock alternatives
        const alternatives: AlternativeTime[] = [
          { time: '18:00', available_tables: 2 },
          { time: '20:00', available_tables: 1 },
          { time: '20:30', available_tables: 3 }
        ];
        
        return {
          available: false,
          message: `No table available at ${request.time}, but available at other times`,
          alternatives
        };
      }
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(`${API_BASE_URL}/tables/check-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to check availability: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking table availability:', error);
      throw error;
    }
  },

  async confirmReservation(reservationData: ReservationData, tableId: number): Promise<ReservationConfirmation> {
    if (MOCK_MODE) {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockConfirmation: ReservationConfirmation = {
        reservation_id: `RES-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        table_name: 'Table 2',
        date: reservationData.reservation_date.split('T')[0],
        time: reservationData.reservation_date.split('T')[1].substring(0, 5),
        party_size: reservationData.party_size,
        customer_name: reservationData.customer_name,
        status: 'confirmed',
        confirmation_sent: true
      };

      return mockConfirmation;
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      // First create the reservation
      const reservationResponse = await fetch(`${API_BASE_URL}/reservations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          reservation_date: reservationData.reservation_date,
          party_size: reservationData.party_size,
          special_requests: reservationData.special_requests || ''
        }),
      });

      if (!reservationResponse.ok) {
        const errorData = await reservationResponse.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to create reservation');
      }

      const reservation = await reservationResponse.json();

      // Then confirm it with the table assignment
      const confirmResponse = await fetch(`${API_BASE_URL}/tables/confirm-reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...reservation,
          table_id: tableId
        }),
      });

      if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to confirm reservation');
      }

      return await confirmResponse.json();
    } catch (error) {
      console.error('Error confirming reservation:', error);
      throw error;
    }
  },

  async cancelReservation(reservationId: string): Promise<boolean> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error canceling reservation:', error);
      throw error;
    }
  },

  async getMyReservations(): Promise<any[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return []; // Return empty array for mock
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/my-reservations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  }
};