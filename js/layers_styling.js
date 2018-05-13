function gardenStyle(feature) {
  return {
    fillColor: "#FF00FF",
    fillOpacity: 1,
    color: '#B04173',
    weight: 4,
  };
}
  

  {
    type: "unique", // Defines the symbology as a unique type where features with an attribute of a specific value are symbolized the same way
    property: "DISTRICT", // The property (field, attribute) to use for defining unique values and styles
    values: [ // An array of values to set symbology. Each value has a specific symbology
        {
            value: "A", // If feature.properties.DISTRICT == "A"
            vectorOptions: { // Use these Leaflet Path options for features matching
                fillColor: "#6600FF",
                fillOpacity: 0.6,
                color: "#666666",
                opacity: 0.8,
                weight: 1
            }
        },
        {
            value: "B",
            vectorOptions: {
                fillColor: "#660066",
                fillOpacity: 0.6,
                color: "#666666",
                opacity: 0.8,
                weight: 1
            }
        },
        {
            value: "C",
            vectorOptions: {
                fillColor: "#FF9900",
                fillOpacity: 0.6,
                color: "#666666",
                opacity: 0.8,
                weight: 1
            }
        }
    ]
}
