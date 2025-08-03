export default function DLSolutionsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Batobaye Market",
    "url": "https://batobaye.shop",
    "description": "Votre destination pour l'électroménager et l'électronique de qualité. Livraison gratuite, garantie 2 ans, support 24/7.",
    "author": {
      "@type": "Organization",
      "name": "DL Solutions Sarl",
      "url": "https://www.daveandlucesolutions.com",
      "description": "Experts en transformation digitale - Développement web & mobile",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Douala",
        "addressCountry": "CM"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://www.daveandlucesolutions.com"
      }
    },
    "creator": {
      "@type": "Organization",
      "name": "DL Solutions Sarl",
      "url": "https://www.daveandlucesolutions.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Batobaye Market"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://batobaye.shop/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 