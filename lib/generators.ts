import type { Lead } from "./types";

export function generateEmailDraft(lead: Lead, sequenceDay: 1 | 3 | 7 | 14 | 30 = 1) {
  const firstName = lead.contact.firstName;
  const companyName = lead.company.name;
  const country = lead.company.country;

  const templates = {
    1: {
      subject: "OEM Blood Pressure Monitor & Nebulizer Supply Support",
      body: `Hi ${firstName},

I noticed that ${companyName} is active in the healthcare and medical device market in ${country}.

We are Shenzhen AXD Electronic Co., Ltd., a home healthcare device manufacturer specializing in blood pressure monitors, nebulizers and infrared thermometers.

We support OEM/ODM projects for distributors, importers and private label brands.

May I know if you are currently sourcing any of the following products?

* Blood Pressure Monitors
* Mesh Nebulizers
* Compressor Nebulizers
* Infrared Thermometers

I can send our catalog and product specifications for your review.

Best regards,
AXDCARE Sales Team`,
    },
    3: {
      subject: `Product match for ${companyName}`,
      body: `Hi ${firstName},

Based on your import history, ${lead.matchedAxdProduct} may be a relevant match for your current healthcare device portfolio.

Would you like me to send model options, MOQ and packaging details for review?

Best regards,
AXDCARE Sales Team`,
    },
    7: {
      subject: "OEM/ODM capability for home healthcare devices",
      body: `Hi ${firstName},

AXDCARE supports private label packaging, user manual customization and product specification guidance for distributors and brand owners.

I can share our OEM/ODM capability sheet if this is useful for your team.

Best regards,
AXDCARE Sales Team`,
    },
    14: {
      subject: "Catalog and quotation support",
      body: `Hi ${firstName},

Would you like to review our latest catalog for blood pressure monitors, nebulizers and infrared thermometers?

If you have a target product or market requirement, I can prepare a focused quotation.

Best regards,
AXDCARE Sales Team`,
    },
    30: {
      subject: "Checking if home healthcare devices are still relevant",
      body: `Hi ${firstName},

Just checking whether blood pressure monitors, nebulizers or infrared thermometers are still relevant for your sourcing plan.

If not now, I am happy to reconnect when your next purchasing window opens.

Best regards,
AXDCARE Sales Team`,
    },
  };

  return templates[sequenceDay];
}

export function generateWhatsAppMessage(lead: Lead) {
  return `Hi ${lead.contact.firstName}, this is AXDCARE from Shenzhen, China.

We manufacture blood pressure monitors, nebulizers and infrared thermometers for distributors and private label brands.

May I send you our product catalog for review?`;
}
