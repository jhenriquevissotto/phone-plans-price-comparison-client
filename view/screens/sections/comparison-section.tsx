import { ComparisonTable } from "~/view/components/comparison-table";

const S = {
  section: {
    display: "flex",
    justifyContent: "center",
  },
  ComparisonTable: {
    marginTop: 100,
  },
};

export function ComparisonTableSection() {
  return (
    <section style={S.section}>
      <ComparisonTable style={S.ComparisonTable} />
    </section>
  );
}
