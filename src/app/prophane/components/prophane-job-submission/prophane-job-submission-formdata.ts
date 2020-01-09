export const ProphaneReportStyles: ProphaneReportStyle[] = [
  {id: 0, name: 'MetaProteomeAnalyzer (MPA)', valueString: 'mpa'},
  {id: 1, name: 'Scaffold', valueString: 'scaffold'},
  {id: 2, name: 'Generic Format', valueString: 'generic'},
  // {id: 3, name: 'Proteome Discoverer'}
];

export interface ProphaneReportStyle {
  id: number;
  name: string;
  valueString: string;
}

