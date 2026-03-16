import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export async function fetchProduct(slug: string) {
  try {
    const res = await axios.get(`${API_URL}/products/${slug}`, {
      timeout: 10000,
    });
    return res.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchCompany(slug: string) {
  try {
    const res = await axios.get(`${API_URL}/companies/${slug}`, {
      timeout: 10000,
    });
    return res.data.data;
  } catch (error) {
    console.error('Error fetching company:', error);
    return null;
  }
}

export async function fetchCategories() {
  try {
    const res = await axios.get(`${API_URL}/categories`, {
      timeout: 10000,
    });
    return res.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchProducts(page = 1, perPage = 50) {
  try {
    const res = await axios.get(`${API_URL}/products`, {
      params: { page, per_page: perPage },
      timeout: 10000,
    });
    return res.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchCompanies(page = 1, perPage = 50) {
  try {
    const res = await axios.get(`${API_URL}/companies`, {
      params: { page, per_page: perPage },
      timeout: 10000,
    });
    return res.data.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
}
