import './PromoBanner.css';

function PromoBanner() {
  return (
    <div className="promo-banner">
      <div className="promo-content">
        <div className="promo-left">
          <div className="promo-kicker">Limited Time</div>
          <h2 className="promo-title">Save 25% on your first order</h2>
          <p className="promo-sub">Use code HELLOFOOD at checkout</p>
        </div>
        <div className="promo-right">
          <div className="percent">25%</div>
          <div className="off">OFF</div>
        </div>
      </div>
    </div>
  );
}

export default PromoBanner;


