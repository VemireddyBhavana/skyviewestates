import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Layout/Navbar';
import { IMAGES } from '../constants/data';
import AnimatedSection from '../components/Common/AnimatedSection';

const MortgageCalculatorPage = () => {
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = () => {
    const r = (interestRate / 12) / 100;
    const n = tenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);
  };

  const handleDownload = () => {
    let csv = "Month,EMI,Principal,Interest,Remaining Balance\n";
    let balance = loanAmount;
    const r = (interestRate / 12) / 100;
    
    for (let i = 1; i <= tenure * 12; i++) {
      const interest = balance * r;
      const principal = emi - interest;
      balance = balance - principal;
      csv += `${i},${emi},${Math.round(principal)},${Math.round(interest)},${Math.max(0, Math.round(balance))}\n`;
      if (i > 12 && i % 12 === 0) {
          // Just to keep CSV small if they want many years, but user asked for "repayment schedule"
      }
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `repayment_schedule_sunbright.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="finance-page">
      <header className="hero-section small" style={{ backgroundImage: `url(${IMAGES.heroServices})` }}>
        <div className="hero-overlay">
          <Navbar />
          <div className="hero-content">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="hero-subtitle">Financial Planning</span>
              <h1 className="hero-title">Real Estate Finance & EMI Advisor</h1>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="section-container" style={{ padding: '80px 20px' }}>
        <div className="finance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          <AnimatedSection direction="left">
            <div className="calculator-card" style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
              <h2 style={{ marginBottom: '30px', fontSize: '1.8rem' }}>EMI Calculator</h2>
              
              <div className="input-group" style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: '#666', fontWeight: '500' }}>Loan Amount (₹)</label>
                <input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(e.target.value)} 
                  style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
                />
                <input 
                  type="range" 
                  min="1000000" 
                  max="100000000" 
                  step="500000" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(e.target.value)} 
                  style={{ width: '100%', marginTop: '10px', accentColor: '#D4AF37' }}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: '#666', fontWeight: '500' }}>Interest Rate (%)</label>
                <input 
                  type="number" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(e.target.value)} 
                  style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: '#666', fontWeight: '500' }}>Tenure (Years)</label>
                <select 
                  value={tenure} 
                  onChange={(e) => setTenure(e.target.value)} 
                  style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
                >
                  {[5, 10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} Years</option>)}
                </select>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="results-card" style={{ background: '#0a0a0a', color: '#fff', padding: '40px', borderRadius: '20px', height: '100%' }}>
              <h2 style={{ marginBottom: '40px', fontSize: '1.8rem', color: '#D4AF37' }}>Your Repayment Summary</h2>
              
              <div className="result-item" style={{ marginBottom: '30px' }}>
                <span style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Monthly EMI</span>
                <span style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37' }}>{formatCurrency(emi)}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid #222', paddingTop: '30px' }}>
                <div>
                  <span style={{ color: '#888', display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Principal Amount</span>
                  <span style={{ fontWeight: '600' }}>{formatCurrency(loanAmount)}</span>
                </div>
                <div>
                  <span style={{ color: '#888', display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Total Interest</span>
                  <span style={{ fontWeight: '600' }}>{formatCurrency(totalInterest)}</span>
                </div>
              </div>

              <div style={{ marginTop: '30px', padding: '20px', background: '#1a1a1a', borderRadius: '10px' }}>
                <span style={{ color: '#888', display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Total Payable Amount</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{formatCurrency(totalPayment)}</span>
              </div>

              <button 
                className="btn-hero" 
                style={{ width: '100%', marginTop: '40px', background: '#D4AF37', color: '#000', cursor: 'pointer' }}
                onClick={handleDownload}
              >
                Download Repayment Schedule
              </button>
            </div>
          </AnimatedSection>
        </div>

        <div className="finance-info" style={{ marginTop: '100px' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Partner Banks & Schemes</h2>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                Sun Bright Properties partners with India's leading financial institutions to provide our clients with exclusive interest rates and simplified documentation processes.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px', opacity: 0.5, flexWrap: 'wrap' }}>
                {['HDFC BANK', 'ICICI BANK', 'SBI', 'AXIS BANK', 'KOTAK'].map(bank => (
                  <span key={bank} style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '2px' }}>{bank}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculatorPage;
