import './CategoryBar.css';

const CATEGORIES = ['Meats & Fish', 'Vegetables', 'Bakery', 'Beverages', 'Electronics', 'Accessories'];

function CategoryBar({ active, onSelect }) {
  return (
    <div className="category-bar">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          className={`category-chip ${active === c ? 'active' : ''}`}
          onClick={() => onSelect?.(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;


