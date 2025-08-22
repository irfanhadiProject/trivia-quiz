import { useEffect, useState } from 'react';

function CategorySelect({ onChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.trivia_categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal mendapatkan kategori:', err);
        setLoading(false);
      });
  }, []);

  return (
    <select
      name="category"
      className="border rounded p-2 w-full"
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
    >
      <option className="text-black" value="">
        Pilih Kategori
      </option>
      {categories.map((cat) => (
        <option className="text-black" key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;
