import { useState } from "react";

const targetMarkets = [
  "UAE",
  "Saudi Arabia",
  "Nigeria",
  "South Africa",
  "Indonesia",
  "Europe",
  "USA",
  "Latin America",
  "Other",
];

const requiredServices = [
  "OEM (Logo Printing)",
  "ODM (Product Design)",
  "Private Label",
  "Packaging Customization",
  "App / Bluetooth Development",
];

const companyTypes = [
  "Distributor",
  "Importer",
  "Brand Owner (Private Label)",
  "Pharmacy Chain",
  "Hospital / Clinic",
  "Medical Wholesaler",
];

export default function B2BInquiryForm({ endpoint = "/api/inquiry" }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.fullName || !data.email || !data.phone || !data.company) {
      setStatus("Please complete all required fields.");
      return;
    }

    if (data.website) {
      setStatus("Submission blocked by anti-spam protection.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit inquiry");
      form.reset();
      setStatus("Submitted successfully. Our sales team will contact you soon.");
    } catch {
      setStatus("Submission failed. Please try again or email Snow@axdcare.com.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="b2b-inquiry-form" onSubmit={handleSubmit}>
      <label>
        Full Name <span>*</span>
        <input name="fullName" required placeholder="Your full name" autoComplete="name" />
      </label>
      <label>
        Email Address <span>*</span>
        <input name="email" type="email" required placeholder="name@company.com" autoComplete="email" />
      </label>
      <label>
        Phone / WhatsApp <span>*</span>
        <input name="phone" type="tel" required placeholder="+971 / +966 / +234 ..." autoComplete="tel" />
      </label>
      <label>
        Company Name <span>*</span>
        <input name="company" required placeholder="Your company name" autoComplete="organization" />
      </label>
      <label>
        Target Market
        <select name="targetMarket" defaultValue="">
          <option value="">Please select target market</option>
          {targetMarkets.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        Required Service
        <select name="requiredService" defaultValue="">
          <option value="">Please select required service</option>
          {requiredServices.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        Company Type
        <select name="companyType" defaultValue="">
          <option value="">Please select company type</option>
          {companyTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="full">
        Project Details
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us your target market, product volume, OEM requirements and timeline."
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="button primary full" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Inquiry"}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
