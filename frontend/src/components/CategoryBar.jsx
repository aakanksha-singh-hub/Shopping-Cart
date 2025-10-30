import './CategoryBar.css';

const CATEGORIES = ['Meats & Fish', 'Vegetables', 'Fruits', 'Bakery', 'Beverages'];

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


