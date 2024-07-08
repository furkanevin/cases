export async function getByCategory(category, limit = 100) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}?limit=${limit}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getById(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
