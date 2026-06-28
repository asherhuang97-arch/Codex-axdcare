import type { Lead } from "./types";

export interface LeadScoreBreakdown {
  relevance: number;
  shipmentFrequency: number;
  productMatch: number;
  companyFit: number;
  contactCompleteness: number;
  marketValue: number;
  total: number;
  level: "A-Level Hot Lead" | "B-Level Qualified Lead" | "C-Level Low Priority" | "Do Not Contact";
}

const highValueMarkets = ["United States", "Germany", "France", "United Kingdom", "Australia", "United Arab Emirates", "Saudi Arabia"];

export function scoreLead(lead: Lead): LeadScoreBreakdown {
  const text = `${lead.importRecord.productDescription} ${lead.productInterest} ${lead.matchedAxdProduct}`.toLowerCase();
  const relevance = /medical|healthcare|blood pressure|nebulizer|thermometer|pharmacy/.test(text) ? 25 : 12;
  const shipmentFrequency = Math.min(20, Math.round((lead.importRecord.shipmentCount / 20) * 20));
  const productMatch = /blood pressure|nebulizer|thermometer/.test(text) ? 20 : 10;
  const companyFit = ["Distributor", "Importer", "Private Label Brand", "Pharmacy Chain", "Medical Wholesaler"].includes(lead.company.businessType) ? 15 : 8;
  const completeFields = [lead.contact.email, lead.contact.phone, lead.contact.whatsapp, lead.company.website].filter(Boolean).length;
  const contactCompleteness = Math.round((completeFields / 4) * 10);
  const marketValue = highValueMarkets.includes(lead.company.country) ? 10 : 7;
  const total = relevance + shipmentFrequency + productMatch + companyFit + contactCompleteness + marketValue;

  return {
    relevance,
    shipmentFrequency,
    productMatch,
    companyFit,
    contactCompleteness,
    marketValue,
    total,
    level:
      total >= 80
        ? "A-Level Hot Lead"
        : total >= 60
          ? "B-Level Qualified Lead"
          : total >= 40
            ? "C-Level Low Priority"
            : "Do Not Contact",
  };
}
