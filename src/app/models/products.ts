export interface Products {
  p_name: string;
  p_id: number;
  p_cost: number;
  p_availability: number;
  p_details?: string;
  p_category?: string;
}

export interface Cart {
  p_name: string;
  p_id: number;
  p_cost: number;
  p_availability: number;
  p_details?: string;
  p_category?: string;
  p_qty: number;
}
