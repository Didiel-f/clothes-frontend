"use client";

import { useMemo } from "react";

type Measurement = {
  chest?: number; 
  waist?: number; 
  hip?: number; 
  length?: number;
  shoulder?: number; 
  sleeve?: number; 
  inseam?: number; 
  footLength?: number;
};

type SizeRow = { 
  label: string; 
  measurements: Measurement; 
  note?: string 
};

export type SizeGuide = {
  title: string;
  productType: "tops" | "bottoms" | "jackets" | "dresses" | "accessories" | "shoes";
  target: "adults" | "kids";
  rows: SizeRow[];
  fitNotes?: string;
  howToMeasure?: { title: string; description?: string }[];
};

export function SizeGuideTable({ guide }: { guide: SizeGuide }) {
  const headerKeys = useMemo(() => {
    const keys: (keyof Measurement)[] = [
      "chest","waist","hip","length","shoulder","sleeve","inseam","footLength"
    ];
    return keys.filter(k => guide.rows.some(r => r.measurements?.[k] != null));
  }, [guide.rows]);

  const measurementLabels: Record<string, string> = {
    chest: "Pecho",
    waist: "Cintura",
    hip: "Cadera",
    length: "Largo",
    shoulder: "Hombro",
    sleeve: "Manga",
    inseam: "Entrepierna",
    footLength: "Largo pie",
  };

  console.log('📏 Size Guide completo:', guide);
  console.log('📋 Rows con measurements:');
  guide.rows.forEach((row, idx) => {
    console.log(`  Talla ${row.label} (${idx}):`, {
      measurements: row.measurements,
      footLength: row.measurements?.footLength,
      note: row.note
    });
  });
  console.log('🔑 Header keys detectados:', headerKeys);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{guide.title}</h2>
        <span className="text-sm text-gray-600">Unidad: cm</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left border font-semibold">Medida</th>
              {guide.rows.map((row) => (
                <th key={row.label} className="p-2 text-center border font-semibold">
                  {row.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {headerKeys.map((key, idx) => (
              <tr key={key} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-2 border font-medium">
                  {measurementLabels[key]} <span className="text-gray-500 font-normal">(cm)</span>
                </td>
                {guide.rows.map((row) => (
                  <td key={row.label} className="p-2 border text-center">
                    {row.measurements?.[key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
            {/* Fila de notas si alguna talla tiene nota */}
            {guide.rows.some(row => row.note) && (
              <tr className={headerKeys.length % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-2 border font-medium">Nota</td>
                {guide.rows.map((row) => (
                  <td key={row.label} className="p-2 border text-center text-xs">
                    {row.note ?? "—"}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {guide.fitNotes && (
        <div className="p-3 rounded bg-amber-50 border text-amber-900">
          <strong>Consejo de calce:</strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: guide.fitNotes }} />
        </div>
      )}

      {guide.howToMeasure && guide.howToMeasure.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Cómo medir:</h3>
          <ul className="space-y-2">
            {guide.howToMeasure.map((item, idx) => (
              <li key={idx}>
                <strong>{item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

