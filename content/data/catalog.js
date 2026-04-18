// Content catalog (source of truth for which country/class/subject combos exist).
// The UI POC still hard-codes SG + O-Level, but future dropdowns can read this.
// Mirrored into Supabase catalog_countries / catalog_classes / catalog_subjects
// by 20260417000000_country_class.sql (seed data).
window.LEVELUP_CATALOG = {
  default: { country: "sg", class: "olevel" },
  countries: {
    sg: {
      label: "Singapore",
      active: true,
      classes: {
        olevel: {
          label: "O-Level",
          active: true,
          subjects: [
            { slug: "chemistry", label: "O-Level Chemistry" },
            { slug: "physics",   label: "O-Level Physics"   },
            { slug: "geography", label: "O-Level Geography" },
          ],
        },
        psle:   { label: "PSLE",         active: false, subjects: [] },
        p5:     { label: "Primary 5",    active: false, subjects: [] },
        p6:     { label: "Primary 6",    active: false, subjects: [] },
        s1:     { label: "Secondary 1",  active: false, subjects: [] },
        s2:     { label: "Secondary 2",  active: false, subjects: [] },
        s3:     { label: "Secondary 3",  active: false, subjects: [] },
        s4:     { label: "Secondary 4",  active: false, subjects: [] },
        alevel: { label: "A-Level",      active: false, subjects: [] },
      },
    },
    hk: { label: "Hong Kong", active: false, classes: {} },
    in: { label: "India",     active: false, classes: {} },
    us: { label: "USA",       active: false, classes: {} },
  },
};
